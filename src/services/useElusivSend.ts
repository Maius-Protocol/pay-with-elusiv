import { useMutation } from 'react-query';
import { TokenType } from '@elusiv/sdk';
import {
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import useSignMessage from './useSignMessage';
import { axiosInstance } from '../constants/axios';
import bs58 from 'bs58';
import { useAppContext } from '../contexts/AppContext';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface ElusivSendInput {
  amount: number;
  recipient: string
  tokenType: TokenType;
}

function useElusivSend() {
  const { cluster } = useAppContext();
  const { wallet } = useWallet();
  const { data: seed } = useSignMessage();
  return useMutation(
    async ({ amount, recipient, tokenType }: ElusivSendInput) => {
      const recipientPubKey = new PublicKey(recipient);

      const { data: signature } = await axiosInstance.get('/send', {
        params: {
          seed: bs58.encode(seed!),
          cluster: cluster,
          sender: wallet?.adapter?.publicKey?.toBase58(),
          recipient: recipientPubKey,
          token: tokenType,
          amount: amount,
        },
      });
      // const signature = await sendTransaction(signedTransaction, connection);
      console.log('SIGNATURE', signature);
      return signature;
    }
  );
}

export default useElusivSend;
