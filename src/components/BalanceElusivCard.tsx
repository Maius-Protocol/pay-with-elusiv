import { Card, Typography, Button } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';
import useElusivSend from '../services/useElusivSend';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import useElusivTopUp from "../services/useElusivTopUp";

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
  const { isLoading: isTopUp, mutateAsync: topUp } = useElusivTopUp();
  const { isLoading: isSending, mutateAsync: send } = useElusivSend();
  const { wallet } = useWallet();

  return (
    <Card loading={isLoading}>
      <Button
        onClick={() => {
          topUp({
            amount: 10_000_000,
            tokenType: 'USDC',
          });
        }}
        loading={isTopUp}
        style={{ marginRight: 24 }}
        type="primary"
      >
        Topup Wallet
      </Button>
        <Button
            onClick={() => {
                send({
                    amount: 10_000_000,
                    recipient: "5v4DXdsXcPe9wrg98fZEHeY2DeamEyMAqLipj3du9ejU",
                    tokenType: 'USDC',
                });
            }}
            loading={isSending}
            style={{ marginRight: 24 }}
            type="primary"
        >
            Send Wallet
        </Button>
      <Typography.Title level={3}>
        {(elusivBalance!/1_000_000)} USDC
      </Typography.Title>
    </Card>
  );
};

export default BalanceElusivCard;
