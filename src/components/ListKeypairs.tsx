import { Collapse, CollapseProps, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useKeypairContext } from '../contexts/KeypairContext';
import KeypairHeaderPanel from './KeypairHeaderPanel';
import KeypairChildrenPanel from './KeypairChildrenPanel';

const ListKeypairs = () => {
  const { keypairs } = useKeypairContext();
  const items: CollapseProps['items'] = [];
  keypairs.forEach((keypair, index) => {
    let time;
    try {
      time = format(parseISO(keypair?.created_at), 'dd MMM yyyy, HH:mm');
    } catch (e) {
      time = 'error';
    }
    items!.push({
      key: index,
      label: (
        <KeypairHeaderPanel item={keypair} time={time}></KeypairHeaderPanel>
      ),
      children: <KeypairChildrenPanel item={keypair}></KeypairChildrenPanel>,
    });
  });
  return (
    <div style={{ paddingTop: '12px' }}>
      <Card title={'Your temporary wallets'}>
        <Collapse
          items={items}
          collapsible="icon"
          expandIcon={() => <DownOutlined />}
          expandIconPosition={'end'}
        />
      </Card>
    </div>
  );
};
export default ListKeypairs;
