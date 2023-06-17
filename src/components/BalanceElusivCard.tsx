import { Button, Card, Statistic, Space, Avatar } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ElusivTopUpInput } from '../services/useElusivTopUp';
import { useMutation } from 'react-query';
import { useElusivContext } from '../contexts/ElusivContext';
import TokenSelect from './TokenSelect';
import CountUp from 'react-countup';
import { TokenImage, TokenMintAddress } from '../constants/constant';
import useGetTokenBalance from '../services/useGetAccountBalance';
import { useWallet } from '@solana/wallet-adapter-react';

const formatter = (value: number) => (
  <CountUp end={value} separator="," decimals={2} />
);

const BalanceElusivCard = () => {
  const { wallet } = useWallet();
  const { depositToElusiv } = useElusivContext();
  const { data: elusivBalanceUSDC, isLoading: isLoadingUSDC } =
    useElusivBalance('USDC');
  const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
    useGetTokenBalance(
      wallet?.adapter.publicKey?.toBase58()!,
      TokenMintAddress['USDC']
    );
  const { data: elusivBalanceSOL, isLoading: isLoadingSOL } =
    useElusivBalance('LAMPORTS');
  const { mutateAsync: topup, isLoading: isTopuping } = useMutation(
    async ({ amount, tokenType }: ElusivTopUpInput) => {
      return await depositToElusiv(amount, tokenType);
    }
  );

  return (
    <Card title="Elusiv Vault Balance">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Space>
          <Avatar src={TokenImage['LAMPORTS']} size={'large'} />
          <Statistic
            loading={isLoadingSOL || isNaN(elusivBalanceSOL!)}
            title="Solana"
            value={elusivBalanceSOL! / LAMPORTS_PER_SOL}
            valueStyle={{ fontSize: 16, lineHeight: 1 }}
            precision={2}
            suffix=" SOL"
            formatter={formatter}
          />
        </Space>
        <Space>
          <Avatar src={TokenImage['USDC']} size={'large'} />
          <Statistic
            loading={isLoadingUSDC || isNaN(elusivBalanceUSDC!)}
            title="USDC Coin"
            value={(elusivBalanceUSDC! / LAMPORTS_PER_SOL) * 1000}
            valueStyle={{ fontSize: 16, lineHeight: 1 }}
            precision={2}
            suffix=" USDC"
            formatter={formatter}
          />
        </Space>
      </div>
      {/*<div className="d-flex flex-row align-items-center justify-content-between">*/}
      {/*  <TokenSelect></TokenSelect>*/}
      {/*</div>*/}
    </Card>
  );
};

export default BalanceElusivCard;
