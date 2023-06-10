import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Avatar, Button, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useAnimatedNavigate from '../hooks/useAnimatedNavigate';
import { RoutesName } from '../constants/routes';

const AccountHeader = () => {
  const { connected, disconnect, wallet } = useWallet();
  const navigate = useAnimatedNavigate();

  const disconnectWallet = async () => {
    await disconnect();
    navigate(RoutesName.WELCOME);
  };

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
        <Button
          onClick={() => {
            disconnectWallet();
          }}
          type="dashed"
        >
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
