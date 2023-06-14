import React from 'react';
import { Alert, Avatar, Button, Card, Divider, List } from 'antd';
import AccountHeader from '../../components/AccountHeader';
import useAnimatedNavigate from '../../hooks/useAnimatedNavigate';
import BalanceElusivCard from '../../components/BalanceElusivCard';
import useElusivInstance from '../../services/useElusivInstance';
import { useKeypairContext } from '../../contexts/KeypairContext';
import { Keypair, PublicKey } from '@solana/web3.js';
import { encode } from 'bs58';

const Popup = () => {
  const navigate = useAnimatedNavigate();
  const { keypairs, createKeypair, removeKeypair } = useKeypairContext();
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
            const keypair: Keypair = createKeypair({});
            keypair.publicKey.toBase58();
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
      <List
        itemLayout="horizontal"
        bordered
        dataSource={keypairs}
        style={{ marginTop: '12px', backgroundColor: 'white' }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item?.used_at}`}
                />
              }
              title={
                <a href={item?.used_at} target="_blank">
                  {item?.used_at}
                </a>
              }
              description={
                <div>
                  <div style={{ width: '150px', textOverflow: 'ellipsis' }}>
                    {item?.keypair?.publicKey?.toBase58()?.trim(20)}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <Button style={{ marginRight: '8px' }}>
                      Copy Private Key
                    </Button>
                    <Button>Claim & Destroy</Button>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Popup;
