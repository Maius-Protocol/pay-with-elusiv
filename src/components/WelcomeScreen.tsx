import React, { useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Divider, Result, Typography } from 'antd';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import useAnimatedNavigate from '../hooks/useAnimatedNavigate';
import { RoutesName } from '../constants/routes';

const WelcomeScreen = () => {
  const { connected, connecting } = useWallet();
  const navigate = useAnimatedNavigate();

  useEffect(() => {
    if (!connecting) {
      if (connected) {
        navigate(RoutesName.HOME);
      }
    }
  }, [connected, connecting]);
  return (
    <div className="p-3">
      <div className="mt-2"></div>
      <Result
        icon={<SmileOutlined />}
        title="Welcome to Pay with Elusiv"
        subTitle="Pay with privacy for anything"
        extra={
          <div className="d-flex flex-row align-items-center justify-content-center w-100">
            <WalletMultiButton />
          </div>
        }
      />
      <Divider style={{ marginTop: '16px' }} />

      <div className="mt-2">
        <div className="text-center">
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            a product from Maius Team ♥
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
