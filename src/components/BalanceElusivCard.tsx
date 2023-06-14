import { Button, Card, Statistic } from 'antd';
import React from 'react';
import useElusivBalance from '../services/useElusivBalance';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ElusivTopUpInput } from '../services/useElusivTopUp';
import { useMutation } from 'react-query';
import { useElusivContext } from '../contexts/ElusivContext';
import CountUp from 'react-countup';

const formatter = (value: number) => (
  <CountUp end={value} separator="," decimals={2} />
);

const BalanceElusivCard = () => {
  const { depositToElusiv } = useElusivContext();
  const { data: elusivBalanceUSDC, isLoading: isLoadingUSDC } =
    useElusivBalance('USDC');
  const { data: elusivBalanceSOL, isLoading: isLoadingSOL } =
    useElusivBalance('LAMPORTS');
  const { mutateAsync: topup, isLoading: isTopuping } = useMutation(
    async ({ amount, tokenType }: ElusivTopUpInput) => {
      return await depositToElusiv(amount, tokenType);
    }
  );

  return (
    <Card>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Statistic
          loading={isLoadingUSDC || isNaN(elusivBalanceUSDC!)}
          title="Private Balance"
          value={(elusivBalanceUSDC! / LAMPORTS_PER_SOL) * 1000}
          precision={2}
          suffix=" USDC"
          formatter={formatter}
        />
        <Statistic
          loading={isLoadingSOL || isNaN(elusivBalanceSOL!)}
          title="Private Balance"
          value={elusivBalanceSOL! / LAMPORTS_PER_SOL}
          precision={2}
          suffix=" SOL"
          formatter={formatter}
        />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Button
          block
          onClick={() => {
            topup({
              amount: LAMPORTS_PER_SOL * 0.1,
              tokenType: 'LAMPORTS',
            });
          }}
          loading={isTopuping}
          style={{ marginRight: 24 }}
          type="primary"
        >
          Topup (0.1 SOL)
        </Button>
        <Button
          block
          onClick={() => {}}
          loading={isTopuping}
          style={{ marginRight: 24 }}
          type="primary"
        >
          Send to Huy (0.1 SOL)
        </Button>
      </div>
    </Card>
  );
};

export default BalanceElusivCard;
