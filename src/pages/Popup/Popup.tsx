import React from 'react';
import { Button, Divider } from 'antd';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import AccountHeader from '../../components/AccountHeader';
import AuthorizedWrapped from '../../components/AuthorizedWrapped';

const Popup = () => {
  return (
    <div className="p-3">
      <div className="mt-2">
        <AccountHeader />
      </div>
      <Divider />
      <AuthorizedWrapped />
    </div>
  );
};

export default Popup;
