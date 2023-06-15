import { Avatar, Button, Form, Input, Select, Space } from 'antd';
import { TokenImage } from '../constants/constant';
import React from 'react';

const DepositForm = ({ form }) => {
  return (
    <>
      <Form.Item name="token" label="Assets">
        <Space>
          <Select
            style={{ width: 180 }}
            placeholder="Please select"
            defaultValue={'USDC'}
            onChange={(e) => {
              form.setFieldValue('token', e);
            }}
            optionLabelProp="label"
          >
            <Option value="USDC" label="USDC">
              <Space>
                <Avatar src={TokenImage['USDC']} size="small" />
                <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>USDC</p>
              </Space>
            </Option>
            <Option value="LAMPORTS" label="SOL">
              <Space>
                <Avatar src={TokenImage['LAMPORTS']} size="small" />
                <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>SOL</p>
              </Space>
            </Option>
            {/*<Option value="USDT" label="USDT">*/}
            {/*  <Space>*/}
            {/*    <Avatar src={TokenImage['USDT']} size="small" />*/}
            {/*    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>*/}
            {/*      USDT*/}
            {/*    </p>*/}
            {/*  </Space>*/}
            {/*</Option>*/}
            {/*<Option value="mSOL" label="mSOL">*/}
            {/*  <Space>*/}
            {/*    <Avatar src={TokenImage['mSOL']} size="small" />*/}
            {/*    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>*/}
            {/*      mSOL*/}
            {/*    </p>*/}
            {/*  </Space>*/}
            {/*</Option>*/}
            {/*<Option value="BONK" label="BONK">*/}
            {/*  <Space>*/}
            {/*    <Avatar src={TokenImage['BONK']} size="small" />*/}
            {/*    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>*/}
            {/*      BONK*/}
            {/*    </p>*/}
            {/*  </Space>*/}
            {/*</Option>*/}
            {/*<Option value="SAMO" label="SAMO">*/}
            {/*  <Space>*/}
            {/*    <Avatar src={TokenImage['SAMO']} size="small" />*/}
            {/*    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>*/}
            {/*      SAMO*/}
            {/*    </p>*/}
            {/*  </Space>*/}
            {/*</Option>*/}
          </Select>
        </Space>
      </Form.Item>
      <Form.Item name="tokenAmount" label="Amount">
        <Space style={{ width: '100%' }}>
          <Input placeholder={'0'} />
          <Button size={'small'}>Max</Button>
        </Space>
      </Form.Item>
    </>
  );
};

export default DepositForm;
