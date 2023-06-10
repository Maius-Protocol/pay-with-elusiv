import { useQuery } from 'react-query';
import { Elusiv } from '@elusiv/sdk';
import { useAppContext } from '../contexts/AppContext';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import useSignMessage from './useSignMessage';
import { PublicKey } from '@solana/web3.js';

function useElusivInstance() {
  const { cluster } = useAppContext();
  const { connection } = useConnection();
  const { data } = useSignMessage();
  const { wallet } = useWallet();
  const pubKey = wallet?.adapter?.publicKey?.toBase58();

  return useQuery(
    ['elusiv-instance', pubKey],
    async () => {
      return await Elusiv.getElusivInstance(
        data!,
        new PublicKey(pubKey!),
        connection,
        cluster
      );
    },
    {
      retry: false,
      enabled: !!pubKey && !!data,
    }
  );
}

export default useElusivInstance;
