import { Card, Typography, Button, Statistic } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';
import useElusivSend from '../services/useElusivSend';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import useElusivTopUp from "../services/useElusivTopUp";

const BalanceElusivCard = () => {
  const { data: elusivBalanceUSDC, isLoading } = useElusivBalance('USDC');
  const { isLoading: isSending, mutateAsync: send } = useElusivSend();
  const { wallet } = useWallet();

  console.log(elusivBalanceUSDC, 'elusivBalance');
  return (
    <Card>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Statistic
          loading={isLoading || isNaN(elusivBalanceUSDC!)}
          title="Private Balance"
          value={elusivBalanceUSDC! / LAMPORTS_PER_SOL}
          precision={2}
          suffix=" SOL"
        />
        <Statistic
          loading={isLoading || isNaN(elusivBalanceUSDC!)}
          title="Private Balance"
          value={(elusivBalanceUSDC! / LAMPORTS_PER_SOL) * 1000}
          precision={2}
          suffix=" USDC"
        />
      </div>

      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    send({*/}
      {/*      amount: 0.2,*/}
      {/*      recipient: wallet?.adapter?.publicKey?.toBase58()!,*/}
      {/*      tokenType: 'LAMPORTS',*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  loading={isSending}*/}
      {/*  style={{ marginRight: 24 }}*/}
      {/*  type="primary"*/}
      {/*>*/}
      {/*  Reclaim Topup Wallet*/}
      {/*</Button>*/}
    </Card>
  );
};

export default BalanceElusivCard;
