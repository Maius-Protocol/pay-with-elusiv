import { Button, Modal, Form, Input, Space, Select, Avatar } from 'antd';
import React, { useState } from 'react';
import { TokenDecimal, TokenImage } from '../constants/constant';
import { useMutation } from 'react-query';
import { ElusivTopUpInput } from '../services/useElusivTopUp';
import { useElusivContext } from '../contexts/ElusivContext';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const TokenSelect = () => {
  const { depositToElusiv } = useElusivContext();
  let tokenAmount = 0;
  let tokenDecimal = 6;
  let token = 'USDC';
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Option } = Select;
  const showModal = () => {
    setOpen(true);
  };

  const { mutateAsync: topup, isLoading: isTopuping } = useMutation(
    async ({ amount, tokenType }: ElusivTopUpInput) => {
      return await depositToElusiv(amount, tokenType);
    }
  );

  const handleOk = async () => {
    await topup({
      amount: tokenAmount * 10 ** tokenDecimal,
      tokenType: token,
    } as ElusivTopUpInput);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSelectleChange = (value: string) => {
    token = value;
    tokenDecimal = TokenDecimal[value];
  };
  const handleInputChange = (e: { target: { value: string } }) => {
    tokenAmount = parseInt(e.target.value);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Send
      </Button>
      <Modal
        title="Deposit"
        open={open}
        onOk={handleOk}
        confirmLoading={isTopuping}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Assets">
            <Space>
              <Select
                style={{ width: 180 }}
                placeholder="Please select"
                defaultValue={'USDC'}
                onChange={handleSelectleChange}
                optionLabelProp="label"
              >
                <Option value="USDC" label="USDC">
                  <Space>
                    <Avatar src={TokenImage['USDC']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      USDC
                    </p>
                  </Space>
                </Option>
                <Option value="LAMPORTS" label="SOL">
                  <Space>
                    <Avatar src={TokenImage['LAMPORTS']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      SOL
                    </p>
                  </Space>
                </Option>
                <Option value="USDT" label="USDT">
                  <Space>
                    <Avatar src={TokenImage['USDT']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      USDT
                    </p>
                  </Space>
                </Option>
                <Option value="mSOL" label="mSOL">
                  <Space>
                    <Avatar src={TokenImage['mSOL']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      mSOL
                    </p>
                  </Space>
                </Option>
                <Option value="BONK" label="BONK">
                  <Space>
                    <Avatar src={TokenImage['BONK']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      BONK
                    </p>
                  </Space>
                </Option>
                <Option value="SAMO" label="SAMO">
                  <Space>
                    <Avatar src={TokenImage['SAMO']} size="small" />
                    <p style={{ margin: '0 0px', verticalAlign: 'middle' }}>
                      SAMO
                    </p>
                  </Space>
                </Option>
              </Select>
            </Space>
          </Form.Item>
          <Form.Item label="Amount">
            <Space style={{ width: '100%' }}>
              <Input onChange={handleInputChange} placeholder={'0'} />
              <Button size={'small'}>Max</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TokenSelect;
