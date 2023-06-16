import React from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  List,
  message,
  Space,
} from 'antd';
import AccountHeader from '../../components/AccountHeader';
import useAnimatedNavigate from '../../hooks/useAnimatedNavigate';
import BalanceElusivCard from '../../components/BalanceElusivCard';
import useElusivInstance from '../../services/useElusivInstance';
import { useKeypairContext } from '../../contexts/KeypairContext';
import { Keypair, PublicKey } from '@solana/web3.js';
import { encode } from 'bs58';
import ListKeypairs from '../../components/ListKeypairs';
import CurrentActiveKeypair from '../../components/CurrentActiveKeypair';
import CreateAndDepositKeypair from '../../components/CreateAndDepositKeypair';

const Popup = () => {
  const navigate = useAnimatedNavigate();
  const { activeKeypair, keypairs, createKeypair, removeKeypair } =
    useKeypairContext();

  return (
    <div className="p-3">
      <div className="mt-2">
        <AccountHeader />
      </div>
      <Divider style={{ marginTop: '16px' }} />
      {/*<Alert*/}
      {/*  message="Please setup an address for automatically claim"*/}
      {/*  type="info"*/}
      {/*  showIcon*/}
      {/*  action={*/}
      {/*    <Button size="small" type="primary">*/}
      {/*      Continue*/}
      {/*    </Button>*/}
      {/*  }*/}
      {/*  style={{ marginBottom: '16px' }}*/}
      {/*/>*/}

      {/*<div>*/}
      {/*  <h4>(Debug)</h4>*/}
      {/*  <Button*/}
      {/*    onClick={() => {*/}
      {/*      const keypair: Keypair = createKeypair({});*/}
      {/*      keypair.publicKey.toBase58();*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Create new keypair*/}
      {/*  </Button>*/}
      {/*</div>*/}

      <BalanceElusivCard />
      <CreateAndDepositKeypair />
      {activeKeypair && <CurrentActiveKeypair />}
      <ListKeypairs />
    </div>
  );
};

export default Popup;
