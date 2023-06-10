import { Card, Typography } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';

function bytesToNumber(byteArray) {
  if (!byteArray || !byteArray.length) {
    return 0;
  }
  let result = 0;
  for (let i = byteArray.length - 1; i >= 0; i--) {
    result = result * 256 + byteArray[i];
  }

  return result;
}
const BalanceElusivCard = () => {
  const { data: elusivBalance, isLoading } = useElusivBalance('USDC');

  console.log(elusivBalance, 'elusivBalance');
  return (
    <Card loading={isLoading}>
      <Typography.Title level={3}>
        {elusivBalance?.toString()} USDC
      </Typography.Title>
    </Card>
  );
};

export default BalanceElusivCard;
