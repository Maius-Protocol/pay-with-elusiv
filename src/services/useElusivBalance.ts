import { useQuery } from 'react-query';
import useElusivInstance from './useElusivInstance';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenType } from '@elusiv/sdk';

function useElusivBalance(tokenType: TokenType) {
  const { wallet } = useWallet();
  const pubKey = wallet?.adapter?.publicKey?.toBase58();
  const { data: elusivInstance } = useElusivInstance();

  return useQuery([pubKey], async () => {
    const amount = await elusivInstance?.getLatestPrivateBalance(tokenType);
    return Number(amount);
  });
}

export default useElusivBalance;
