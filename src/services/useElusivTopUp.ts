import { useMutation, useQuery } from 'react-query';
import useElusivInstance from './useElusivInstance';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TokenType } from '@elusiv/sdk';
import { useAppContext } from '../contexts/AppContext';
import useSignMessage from './useSignMessage';
import { PublicKey, Transaction } from '@solana/web3.js';
import { axiosInstance } from '../constants/axios';
import bs58 from 'bs58';
import { message } from 'antd';

export interface ElusivTopUpInput {
  amount: number;
  tokenType: TokenType;
}

function useElusivTopUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const { cluster } = useAppContext();
  const { wallet } = useWallet();
  const { signTransaction } = useWallet();
  const { data: seed } = useSignMessage();
  return useMutation(async ({ amount, tokenType }: ElusivTopUpInput) => {
    const sender = new PublicKey(wallet?.adapter.publicKey?.toBase58()!);
    console.log('Sender:', sender);
    const { data } = await axiosInstance.get('/top-up', {
      params: {
        seed: bs58.encode(seed!),
        cluster: cluster,
        userPublicKey: sender,
        token: tokenType,
        amount: amount,
      },
    });
    console.log('Params', {
      seed: bs58.encode(seed!),
      cluster: cluster,
      userPublicKey: sender,
      token: tokenType,
      amount: amount,
    });
    const transactionEncoded = data?.transaction;
    const transactionDecoded = new Buffer(transactionEncoded, 'base64');
    const transaction = Transaction.from(transactionDecoded);

    const signedTransaction = await signTransaction!(transaction);

    const { data: signature } = await axiosInstance.post(
      '/top-up',
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

    messageApi.open({
      type: 'success',
      content: 'Top-up Successfully!',
    });
    return signature;
  });
}

export default useElusivTopUp;
