import { Avatar, Button, List, message } from 'antd';
import { encode } from 'bs58';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useKeypairContext } from '../contexts/KeypairContext';

const ListKeypairs = () => {
  const { keypairs } = useKeypairContext();
  return (
    <List
      itemLayout="horizontal"
      bordered
      dataSource={keypairs}
      style={{ marginTop: '12px', backgroundColor: 'white' }}
      renderItem={(item, index) => {
        let time;
        try {
          time = format(parseISO(item?.created_at), 'MMMM do yyyy, HH:mm:ss');
        } catch (e) {
          time = 'error';
        }
        return (
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
                  <div style={{ marginTop: '6px' }}>Created At: {time}</div>
                  <div style={{ marginTop: '6px' }}>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          encode(item?.keypair?.secretKey)
                        );

                        message.success('Copied private key');
                      }}
                      style={{ marginRight: '8px' }}
                    >
                      Copy Private Key
                    </Button>
                    <Button>Claim & Destroy</Button>
                  </div>
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};
export default ListKeypairs;
