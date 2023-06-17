import { useMutation } from 'react-query';
import useGetTokenBalance from './useGetAccountBalance';
import { TokenDecimal, TokenMintAddress } from '../constants/constant';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { Elusiv, SEED_MESSAGE } from '@elusiv/sdk';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { axiosInstance } from '../constants/axios';
import { useAppContext } from '../contexts/AppContext';
import { useLocalStorage } from 'usehooks-ts';
import { useConnection } from '@solana/wallet-adapter-react';
import { message, notification } from 'antd';
function useClaimWallet(keypair: Keypair) {
  const publicKey = keypair?.publicKey?.toBase58();
  const { connection } = useConnection();
  const { cluster } = useAppContext();
  const [autoClaimWallet] = useLocalStorage('auto_claim_key', undefined);
  const { data: solBalance } = useGetTokenBalance(
    publicKey,
    TokenMintAddress['LAMPORTS']
  );
  const { data: usdcBalance } = useGetTokenBalance(
    publicKey,
    TokenMintAddress['USDC']
  );
  const encoder = new TextEncoder();

  return useMutation(async () => {
    const seed = nacl.sign(encoder.encode(SEED_MESSAGE), keypair?.secretKey);
    const token = 'LAMPORTS';
    notification.warning({
      message: `Claim process for: ${publicKey}`,
      description: `Start with ${token}. Please do not close extension.`,
    });
    const tokenAmount = solBalance;
    const tokenDecimal = TokenDecimal[token];
    let signature_topup;
    if (tokenAmount > 0.0) {
      notification.info({
        message: `Claim process for: ${publicKey}`,
        description: `Current public balance is ${tokenAmount}, will moving all to Elusiv Vault`,
      });
      const sender = new PublicKey(publicKey!);
      const tokenType = token;
      const amount = tokenAmount * 0.95 * 10 ** tokenDecimal;
      const { data } = await axiosInstance.get('/top-up', {
        params: {
          seed: bs58.encode(seed!),
          cluster: cluster,
          userPublicKey: sender,
          token: tokenType,
          amount: amount,
        },
      });

      notification.success({
        message: `Claim process for: ${publicKey}`,
        description: `Built deposit to Elusiv transaction successfully, amount: ${
          tokenAmount * 0.95
        }, ${token}`,
      });

      const transactionEncoded = data?.transaction;
      const transactionDecoded = new Buffer(transactionEncoded, 'base64');
      const transaction = Transaction.from(transactionDecoded);
      transaction.sign(keypair);

      const { data: _signature_topup } = await axiosInstance.post(
        '/top-up',
        {
          topupTxData: data?.topupTxData,
          signedTransaction: transaction
            .serialize({
              verifySignatures: false,
              requireAllSignatures: false,
            })
            .toString('base64'),
        },
        {
          params: {
            seed: bs58.encode(seed!),
            cluster: cluster,
            userPublicKey: sender,
          },
        }
      );
      notification.success({
        message: `Claim process for: ${publicKey}`,
        description: `Sent ${amount} to Elusiv, Signature: ${_signature_topup}`,
      });
      signature_topup = _signature_topup;
    }

    const recipientPubKey = new PublicKey(autoClaimWallet);
    const elusivInstance = await Elusiv.getElusivInstance(
      seed!,
      new PublicKey(publicKey!),
      connection,
      cluster
    );
    const amount = Number(await elusivInstance?.getLatestPrivateBalance(token));

    notification.info({
      message: `Claim process for: ${publicKey}`,
      description: `Sending all ${amount} ${token} (calculated in lamports) from Elusiv Vault to ${autoClaimWallet}`,
    });

    const { data: signature } = await axiosInstance.get('/send', {
      params: {
        seed: bs58.encode(seed!),
        cluster: cluster,
        sender: publicKey,
        recipient: recipientPubKey,
        token: token,
        amount: amount * 0.95,
      },
    });

    notification.info({
      message: `Claim process for: ${publicKey}`,
      description: `Sent successfully, signature: ${signature}`,
    });
    return {
      signature_topup,
      signature_send: signature,
    };
  }, {});
}

export default useClaimWallet;
