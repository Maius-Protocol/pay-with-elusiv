import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const AccountHeader = () => {
  const { connected } = useWallet();

  if (!connected) {
    return <WalletMultiButton style={{ width: '100%' }} />;
  }

  return <div />;
};

export default AccountHeader;
