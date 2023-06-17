import { Avatar, Button, Card, List, message, Space, Statistic } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { encode } from 'bs58';
import React from 'react';
import { shortenHashOrAddress } from '../common/common';
import useGetTokenBalance from '../services/useGetAccountBalance';
import {
  TokenDecimal,
  TokenImage,
  TokenMintAddress,
} from '../constants/constant';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import CountUp from 'react-countup';

const KeypairChildrenPanel = ({ item }) => {
  const formatter = (value: number) => (
    <CountUp end={value} separator="," decimals={2} />
  );
  const { data: usdcBalance, isLoading: isLoadingUsdcBalance } =
    useGetTokenBalance(
      item?.keypair?.publicKey?.toBase58(),
      TokenMintAddress['USDC']
    );
  const { data: solBalance, isLoading: isLoadingSolBalance } =
    useGetTokenBalance(
      item?.keypair?.publicKey?.toBase58(),
      TokenMintAddress['LAMPORTS']
    );
  return (
    <Card title="Balance">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <Space>
          <Avatar src={TokenImage['LAMPORTS']} />
          <Statistic
            loading={isLoadingSolBalance || isNaN(solBalance!)}
            title="Solana"
            value={solBalance!}
            valueStyle={{ fontSize: 12, lineHeight: 1 }}
            precision={2}
            suffix=" SOL"
            formatter={formatter}
          />
        </Space>
        <Space>
          <Avatar src={TokenImage['USDC']} />
          <Statistic
            loading={isLoadingUsdcBalance || isNaN(usdcBalance!)}
            title="USDC Coin"
            value={usdcBalance!}
            valueStyle={{ fontSize: 12, lineHeight: 1 }}
            precision={2}
            suffix=" USDC"
            formatter={formatter}
          />
        </Space>
      </div>
    </Card>
  );
};
export default KeypairChildrenPanel;
