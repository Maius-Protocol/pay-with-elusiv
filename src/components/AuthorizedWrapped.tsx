import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const AuthorizedWrapped = () => {
  const { connected } = useWallet();

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
