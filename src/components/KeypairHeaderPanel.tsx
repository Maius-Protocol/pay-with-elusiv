import { Avatar, Button, List, message, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { encode } from 'bs58';
import React from 'react';
import { shortenHashOrAddress } from '../common/common';

const KeypairHeaderPanel = ({ item, time }) => {
  return (
    <Space align={'start'}>
      <Avatar
        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item?.used_at}`}
      />
      <div>
        <div>
          <div
            style={{
              fontSize: '.75rem',
              lineHeight: '1rem',
            }}
          >
            {time}
          </div>
          <Space align="center">
            <div
              style={{
                fontWeight: 'bold',
                width: '300px',
                textOverflow: 'ellipsis',
              }}
            >
              {shortenHashOrAddress(item?.keypair?.publicKey?.toBase58())}
            </div>
            <Button
              size={'small'}
              type={'text'}
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(
                  item?.keypair?.publicKey.toBase58()
                );
                message.success('Copied');
              }}
            />
          </Space>
        </div>

        <div style={{ marginTop: '6px' }}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(encode(item?.keypair?.secretKey));

              message.success('Copied private key');
            }}
            type={'dashed'}
            style={{ marginRight: '8px', fontSize: 12 }}
          >
            Copy Private Key
          </Button>
          <Button style={{ fontSize: 12 }}>Claim & Destroy</Button>
        </div>
      </div>
    </Space>
  );
};
export default KeypairHeaderPanel;
