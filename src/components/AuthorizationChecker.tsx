import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import useAnimatedNavigate from '../hooks/useAnimatedNavigate';
import { router, RoutesName } from '../constants/routes';

const AuthorizationChecker = () => {
  const { connected, connecting } = useWallet();
  const navigate = useAnimatedNavigate();

  useEffect(() => {
    if (!connecting) {
      if (connected) {
        navigate(RoutesName.HOME);
      }
      if (!connected) {
        navigate(RoutesName.WELCOME);
      }
    }
  }, [connected, connecting]);

  return (
    <div
      style={{ height: '100vh' }}
      className="d-flex flex-row align-items-center justify-content-center"
    >
      <Spin />
    </div>
  );
};

export default AuthorizationChecker;
