import React from 'react';
import { Divider } from 'antd';
import AccountHeader from '../../components/AccountHeader';
import useAnimatedNavigate from '../../hooks/useAnimatedNavigate';

const Popup = () => {
  const navigate = useAnimatedNavigate();
  return (
    <div className="p-3">
      <div className="mt-2">
        <AccountHeader />
      </div>
      <Divider style={{ marginTop: '16px' }} />
    </div>
  );
};

export default Popup;
