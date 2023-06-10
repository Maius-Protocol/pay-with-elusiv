import { useMutation, useQuery } from 'react-query';
import { SEED_MESSAGE } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';

function useSignMessage() {
  const { signMessage, wallet } = useWallet();
  const encoder = new TextEncoder();
  const pubKey = wallet?.adapter?.publicKey?.toBase58();
  return useQuery(
    ['signed-message', pubKey],
    () => {
      return signMessage!(encoder.encode(SEED_MESSAGE));
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
