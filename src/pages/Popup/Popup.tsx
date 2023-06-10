import React from 'react';
import { Card, Divider } from 'antd';
import AccountHeader from '../../components/AccountHeader';
import useAnimatedNavigate from '../../hooks/useAnimatedNavigate';
import BalanceElusivCard from '../../components/BalanceElusivCard';
import useElusivInstance from '../../services/useElusivInstance';

const Popup = () => {
  const navigate = useAnimatedNavigate();
  return (
    <div className="p-3">
      <div className="mt-2">
        <AccountHeader />
      </div>
      <Divider style={{ marginTop: '16px' }} />
      <BalanceElusivCard />
    </div>
  );
};

export default Popup;
