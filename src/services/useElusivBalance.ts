import { useQuery } from 'react-query';
import useElusivInstance from './useElusivInstance';
import { useWallet } from '@solana/wallet-adapter-react';

function useElusivBalance() {
  const { wallet } = useWallet();
  const pubKey = wallet?.adapter?.publicKey?.toBase58();
  const { data: elusivInstance } = useElusivInstance();

  return useQuery([pubKey], () => {
    return elusivInstance?.getLatestPrivateBalance('USDC');
  });
}

export default useElusivBalance;
