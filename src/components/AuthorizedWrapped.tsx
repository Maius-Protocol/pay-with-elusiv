import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';

const AuthorizedWrapped = () => {
  const { connected } = useWallet();

  console.log(connected);
  if (connected) {
    return <div></div>;
  }

  return (
    <Result
      icon={<SmileOutlined />}
      title="Welcome to Pay with Elusiv"
      subTitle="a product from Maius Team"
      extra={<Button type="primary">Connect wallet</Button>}
    />
  );
};

export default AuthorizedWrapped;
