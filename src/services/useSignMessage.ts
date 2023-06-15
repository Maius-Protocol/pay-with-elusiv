import { useMutation, useQuery } from 'react-query';
import { SEED_MESSAGE } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

function useSignMessage() {
  const { signMessage, wallet } = useWallet();
  const encoder = new TextEncoder();
  const pubKey = wallet?.adapter?.publicKey?.toBase58();
  return useQuery(
    ['signed-message', pubKey],
    async () => {
      if (window.localStorage && window.localStorage.getItem('seed_message')) {
        return bs58.decode(window.localStorage.getItem('seed_message'));
      }
      const message = await signMessage!(encoder.encode(SEED_MESSAGE));
      window.localStorage.setItem('seed_message', bs58.encode(message));
      return message;
    },
    {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!signMessage && !!pubKey,
    }
  );
}

export default useSignMessage;
