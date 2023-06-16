import { Button, Modal, Form, Select, notification } from 'antd';
import React, { useState } from 'react';
import { TokenDecimal, TokenImage } from '../constants/constant';
import { useMutation } from 'react-query';
import { ElusivTopUpInput } from '../services/useElusivTopUp';
import { useElusivContext } from '../contexts/ElusivContext';
import useDisclosure from '../hooks/useDisclosure';
import DepositForm from './DepositForm';
import type { NotificationPlacement } from 'antd/es/notification/interface';

const TokenSelect = () => {
  const { isOpen, open, close } = useDisclosure();
  const [form] = Form.useForm();
  const { depositToElusiv } = useElusivContext();
  const [api, contextHolder] = notification.useNotification();
  let tokenAmount = 0;
  let token = 'USDC';
  const { Option } = Select;

  const { mutateAsync: topup, isLoading: isTopuping } = useMutation(
    async ({ amount, tokenType }: ElusivTopUpInput) => {
      return await depositToElusiv(amount, tokenType);
    }
  );

  const openNotification = (placement: NotificationPlacement) => {
    if (token === 'LAMPORTS') {
      token = 'SOL';
    }
    api.success({
      message: `Deposit!`,
      description: `${tokenAmount} ${token} was successfully deposit!`,
      placement,
    });
  };

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
    openNotification('top');
    close();
  };

  return (
    <>
      {contextHolder}
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
          <DepositForm form={form} />
        </Form>
      </Modal>
    </>
  );
};

export default TokenSelect;
