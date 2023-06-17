import { Alert, Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useDisclosure from '../hooks/useDisclosure';

const SetupAutoClaimWallet = () => {
  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure();
  const [autoClaimWallet, setAutoClaimWallet] = useLocalStorage(
    'auto_claim_key',
    undefined
  );

  const onFinish = ({ auto_claim_key }) => {
    setAutoClaimWallet(auto_claim_key);
  };

  return (
    <>
      {!autoClaimWallet && (
        <Alert
          message="Please setup an address for automatically claim"
          type="info"
          showIcon
          action={
            <Button
              onClick={() => {
                open();
              }}
              size="small"
              type="primary"
            >
              Continue
            </Button>
          }
          style={{ marginBottom: '16px' }}
        />
      )}
      {autoClaimWallet && (
        <Alert
          description={`${autoClaimWallet}`}
          message="Remaining balance is automatically claim to following address"
          type="warning"
          // showIcon
          action={
            <Button
              onClick={() => {
                setAutoClaimWallet(undefined);
                open();
              }}
              size="small"
              type="dashed"
            >
              Remove
            </Button>
          }
          style={{ marginBottom: '16px' }}
        />
      )}
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          close();
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Public Address"
            name="auto_claim_key"
            rules={[{ required: true, message: 'Please input address!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SetupAutoClaimWallet;
