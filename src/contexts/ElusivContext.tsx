import React, { useContext, useEffect } from 'react';
import useElusivSend from '../services/useElusivSend';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { TokenType } from '@elusiv/sdk';
import useElusivTopUp from '../services/useElusivTopUp';
import useElusivBalance from '../services/useElusivBalance';

const ElusivContext = React.createContext({});

const ElusivProvider = ({ children }) => {
  const { mutateAsync: topup } = useElusivTopUp();
  const { mutateAsync: send } = useElusivSend();
  const { refetch: refetchUSDC } = useElusivBalance('USDC');
  const { refetch: refetchSOL } = useElusivBalance('LAMPORTS');
  const { wallet } = useWallet();

  const depositToElusiv = async (amount: number, token: TokenType) => {
    await topup({ amount, tokenType: token });
    if (token === 'LAMPORTS') {
      await refetchSOL();
    }
    if (token === 'USDC') {
      await refetchUSDC();
    }
  };

  const sendFromElusivToAddress = async (
    amount: number,
    token: TokenType,
    recipient: string
  ) => {
    await send({ amount, tokenType: token, recipient });
  };

  console.log('Current Wallet', wallet?.adapter?.publicKey?.toBase58());

  return (
    <ElusivContext.Provider
      value={{
        depositToElusiv,
        sendFromElusivToAddress,
      }}
    >
      {children}
    </ElusivContext.Provider>
  );
};

export function useElusivContext() {
  const context = useContext<any>(ElusivContext);

  if (!context) {
  }
  return context;
}

export default ElusivProvider;
