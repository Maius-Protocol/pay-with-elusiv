import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Avatar, Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const AccountHeader = () => {
  const { connected, wallet } = useWallet();

  if (!connected) {
    return <WalletMultiButton style={{ width: '100%' }} />;
  }

  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex flex-row align-items-center">
        <Avatar
          shape="circle"
          size={32}
          icon={<UserOutlined style={{ fontSize: 24 }} />}
          style={{ marginRight: '16px' }}
        />
        <div
          style={{
            maxWidth: '164px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {wallet?.adapter?.publicKey?.toBase58()}
        </div>
      </div>
      <div>
        <Button type="dashed">
          <div className="d-flex flex-row align-items-center">
            <LogoutOutlined style={{ marginRight: '8px' }} />
            Disconnect
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AccountHeader;
