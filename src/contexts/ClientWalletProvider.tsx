import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

import {
  GlowWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  UnsafeBurnerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import React, { useMemo, useState } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { cluster } from '../constants/network';
import ElusivProvider from './ElusivContextProvider';
import { useAppContext } from './AppContext';

export function ClientWalletProvider({ children }): JSX.Element {
  const { cluster } = useAppContext();
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(cluster), [cluster]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new MathWalletAdapter(),
      new UnsafeBurnerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default ClientWalletProvider;
