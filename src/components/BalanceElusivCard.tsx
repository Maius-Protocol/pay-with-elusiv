import { Card, Typography, Button } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';
import useElusivSend from '../services/useElusivSend';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

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
  const { isLoading: isSending, mutateAsync: send } = useElusivSend();
  const { wallet } = useWallet();

  console.log(elusivBalance, 'elusivBalance');
  return (
    <Card loading={isLoading}>
      <Button
        onClick={() => {
          send({
            amount: 0.2,
            recipient: wallet?.adapter?.publicKey?.toBase58()!,
            tokenType: 'LAMPORTS',
          });
        }}
        loading={isSending}
        style={{ marginRight: 24 }}
        type="primary"
      >
        Reclaim Topup Wallet
      </Button>
      <Typography.Title level={3}>
        {elusivBalance?.toString()} USDC
      </Typography.Title>
    </Card>
  );
};

export default BalanceElusivCard;
