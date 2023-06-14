import React from 'react';
import { Alert, Button, Card, Divider } from 'antd';
import AccountHeader from '../../components/AccountHeader';
import useAnimatedNavigate from '../../hooks/useAnimatedNavigate';
import BalanceElusivCard from '../../components/BalanceElusivCard';
import useElusivInstance from '../../services/useElusivInstance';
import { useKeypairContext } from '../../contexts/KeypairContext';
import { PublicKey } from '@solana/web3.js';

const Popup = () => {
  const navigate = useAnimatedNavigate();
  const { createKeypair, removeKeypair } = useKeypairContext();
  return (
    <div className="p-3">
      <div className="mt-2">
        <AccountHeader />
      </div>
      <Divider style={{ marginTop: '16px' }} />
      <Alert
        message="Please setup an address for automatically claim"
        type="info"
        showIcon
        action={
          <Button size="small" type="primary">
            Continue
          </Button>
        }
        style={{ marginBottom: '16px' }}
      />

      <div>
        <h4>(Debug)</h4>
        <Button
          onClick={() => {
            createKeypair({
              used_at: 'https://google.com',
            });
          }}
        >
          Create new keypair
        </Button>
        <Button
          onClick={() => {
            removeKeypair(
              new PublicKey('DqZ51QXi8YCXZ4vPUVqt4dnmcSc7JynqbEVdpF2fVouP')
            );
          }}
        >
          Remove Keypair
        </Button>
      </div>
      <BalanceElusivCard />
    </div>
  );
};

export default Popup;
