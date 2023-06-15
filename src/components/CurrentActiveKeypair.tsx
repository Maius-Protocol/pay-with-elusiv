import { Alert, Button, Divider } from 'antd';
import React from 'react';
import { useKeypairContext } from '../contexts/KeypairContext';
import { CreateAndDepositModal } from './CreateAndDepositKeypair';
import useDisclosure from '../hooks/useDisclosure';

const CurrentActiveKeypair = () => {
  const { activeKeypair } = useKeypairContext();
  const modalState = useDisclosure();
  const publicKey = activeKeypair?.keypair?.publicKey?.toBase58();
  return (
    <>
      <Alert
        message={
          <a
            target="_blank"
            href={`https://solana.fm/address/${publicKey}?cluster=devnet-solana`}
          >
            Current Active Keypair
          </a>
        }
        description={
          <div>
            <Divider style={{ margin: '6px 0' }} />
            <div>
              <b>Public Key</b>
            </div>
            <div>{publicKey}</div>
            <div className="mt-2">
              <b>Used At</b>
            </div>
            <div>{activeKeypair?.used_at}</div>

            <Button
              type="primary"
              style={{ marginTop: '8px' }}
              onClick={() => {
                modalState.open();
              }}
            >
              Deposit more
            </Button>
          </div>
        }
        type="warning"
        style={{ marginTop: '12px' }}
      />
      <CreateAndDepositModal createNewOne={false} modalState={modalState} />
    </>
  );
};

export default CurrentActiveKeypair;
