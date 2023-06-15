import { Alert, Button, Form, Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import useDisclosure from '../hooks/useDisclosure';
import { useMutation } from 'react-query';
import { useElusivContext } from '../contexts/ElusivContext';
import { ElusivSendInput } from '../services/useElusivSend';
import { DepositForm } from './TokenSelect';
import { TokenDecimal } from '../constants/constant';
import Input from 'antd/es/input/Input';
import { useKeypairContext } from '../contexts/KeypairContext';
import { Keypair } from '@solana/web3.js';

const CreateAndDepositKeypair = () => {
  const [form] = Form.useForm();
  const { open, isOpen, close } = useDisclosure();
  const { sendFromElusivToAddress } = useElusivContext();
  const { createKeypair, activeKeypair } = useKeypairContext();

  const { mutateAsync: sendBalance, isLoading: isSending } = useMutation(
    async ({ amount, tokenType, recipient }: ElusivSendInput) => {
      return await sendFromElusivToAddress(amount, tokenType, recipient);
    }
  );
  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values) => {
    const _keypair: Keypair = activeKeypair?.keypair;
    const { tokenAmount, token } = values;
    const tokenDecimal = TokenDecimal[token];
    await sendBalance({
      amount: tokenAmount * 10 ** tokenDecimal,
      tokenType: token,
      recipient: _keypair?.publicKey?.toBase58(),
    });
    close();
  };

  useEffect(() => {
    if (isOpen) {
      createKeypair();
    }
  }, [isOpen]);

  return (
    <>
      <Alert
        message="Create a new keypair"
        description="Use a one-time keypair and deposit for transact privately"
        type="info"
        style={{ marginTop: '12px' }}
        action={
          <Space direction="vertical">
            <Button
              onClick={() => {
                open();
              }}
              size="small"
              type="primary"
            >
              Create & Deposit
            </Button>
          </Space>
        }
      />

      <Modal
        title="How much you want to use in this keypair"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={isSending}
        onCancel={close}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ token: 'USDC' }}>
          <DepositForm />
          <Form.Item label="Send To">
            <Input
              disabled
              value={activeKeypair?.keypair?.publicKey?.toBase58()}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAndDepositKeypair;
