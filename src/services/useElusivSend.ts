import { useMutation, useQuery } from 'react-query';
import useElusivInstance from './useElusivInstance';
import { TokenType, TokenTypeArr } from '@elusiv/sdk';
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import useSignMessage from './useSignMessage';
import { axiosInstance } from '../constants/axios';
import bs58 from 'bs58';
import { useAppContext } from '../contexts/AppContext';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import base64 from 'base-64';
interface ElusivSendInput {
  amount: number;
  recipient: string;
  tokenType: TokenType;
}

function useElusivSend() {
  const { cluster } = useAppContext();
  const { connection } = useConnection();
  const { signTransaction, sendTransaction } = useWallet();
  // const { data: elusivInstance } = useElusivInstance();
  const { data: seed } = useSignMessage();
  return useMutation(
    async ({ amount, recipient, tokenType }: ElusivSendInput) => {
      const sender = new PublicKey(recipient);
      console.log('seed', seed);

      const { data } = await axiosInstance.get('/instructions', {
        params: {
          seed: bs58.encode(seed!),
          cluster: cluster,
          userPublicKey: sender,
          token: tokenType,
          amount: amount,
        },
      });
      const transactionEncoded = data?.transaction;
      const transactionDecoded = new Buffer(transactionEncoded, 'base64');
      const transaction = Transaction.from(transactionDecoded);

      const signedTransaction = await signTransaction!(transaction);

      const { data: signature } = await axiosInstance.post(
        '/instructions',
        {
          topupTxData: data?.topupTxData,
          signedTransaction: signedTransaction
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

      // const signature = await sendTransaction(signedTransaction, connection);
      console.log('SIGNATURE', signature);
      return signature;
      // // Sign it (only needed for topups, as we're topping up from our public key there)
      // return elusivInstance?.sendElusivTx(sendTx!);
    }
  );
}

export default useElusivSend;
