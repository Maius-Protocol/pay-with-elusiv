import { Collapse, CollapseProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useKeypairContext } from '../contexts/KeypairContext';
import KeypairHeaderPanel from './KeypairHeaderPanel';
import KeypairChildrenPanel from './KeypairChildrenPanel';

const ListKeypairs = () => {
  const { keypairs } = useKeypairContext();
  const items: CollapseProps['items'] = [];
  keypairs.map((keypair, index) => {
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
    <Collapse
      items={items}
      expandIcon={() => <DownOutlined />}
      expandIconPosition={'end'}
    />
  );
};
export default ListKeypairs;
