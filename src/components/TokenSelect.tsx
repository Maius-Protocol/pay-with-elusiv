import { Button, Modal, Form, Input, Space, Select, Avatar } from 'antd';
import React, { useState } from 'react';
import { TokenDecimal, TokenImage } from '../constants/constant';
import { useMutation } from 'react-query';
import { ElusivTopUpInput } from '../services/useElusivTopUp';
import { useElusivContext } from '../contexts/ElusivContext';
import useDisclosure from '../hooks/useDisclosure';

export const DepositForm = () => {
  return (
    <>
      <Form.Item name="token" label="Assets">
        <Space>
          <Select
            style={{ width: 180 }}
            placeholder="Please select"
            defaultValue={'USDC'}
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

const TokenSelect = () => {
  const { isOpen, open, close } = useDisclosure();
  const [form] = Form.useForm();
  const { depositToElusiv } = useElusivContext();
  const { Option } = Select;

  const { mutateAsync: topup, isLoading: isTopuping } = useMutation(
    async ({ amount, tokenType }: ElusivTopUpInput) => {
      return await depositToElusiv(amount, tokenType);
    }
  );

  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values) => {
    const { tokenAmount, token } = values;
    const tokenDecimal = TokenDecimal[token];
    await topup({
      amount: tokenAmount * 10 ** tokenDecimal,
      tokenType: token,
    } as ElusivTopUpInput);
    close();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          open();
        }}
      >
        Deposit to Elusiv Vault
      </Button>
      <Modal
        title="Deposit to Elusiv Vault"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={isTopuping}
        onCancel={() => close()}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ token: 'USDC' }}>
          <DepositForm />
        </Form>
      </Modal>
    </>
  );
};

export default TokenSelect;
