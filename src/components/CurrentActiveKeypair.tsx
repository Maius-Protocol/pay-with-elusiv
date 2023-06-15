import { Alert, Divider } from 'antd';
import React from 'react';
import { useKeypairContext } from '../contexts/KeypairContext';

const CurrentActiveKeypair = () => {
  const { activeKeypair } = useKeypairContext();
  const publicKey = activeKeypair?.keypair?.publicKey?.toBase58();
  return (
    <Alert
      message={
        <a
          target="_blank"
          href={`https://solscan.io/account/${publicKey}?cluster=devnet`}
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
        </div>
      }
      type="warning"
      style={{ marginTop: '12px' }}
    />
  );
};

export default CurrentActiveKeypair;
