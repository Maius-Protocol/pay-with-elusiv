import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58, { encode } from 'bs58';
import { message } from 'antd';
import _ from 'lodash';
const KeypairContext = React.createContext({});

interface SerializedKeypairInterface {
  privateKey: string;
  used_at: string;
  created_at: Date;
}

interface IAppKeypairs {
  keypair: Keypair;
  used_at: string;
  created_at: Date;
}

const KeypairProvider = ({ children }) => {
  const [messageApi] = message.useMessage();
  const [activeKeypair, setActiveKeypair] = useState<IAppKeypairs | undefined>(
    undefined
  );

  const [serializedKeypairs, setKeypairs] = useLocalStorage<
    SerializedKeypairInterface[]
  >('keypairs', []);

  const keypairs: IAppKeypairs = useMemo(() => {
    return _.orderBy(serializedKeypairs, 'created_at', 'desc')?.map((k) => ({
      keypair: Keypair.fromSecretKey(bs58.decode(k.privateKey)),
      used_at: k.used_at,
      created_at: k.created_at,
    }));
  }, [serializedKeypairs]);

  const createKeypair = () => {
    const _keypair = Keypair.generate();
    let url;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      url = tabs[0].url;
    });
    setKeypairs([
      ...serializedKeypairs,
      {
        privateKey: encode(_keypair.secretKey),
        used_at: url,
        created_at: new Date(),
      },
    ]);
    message.success(
      `Created a new keypair with PublicKey: ${_keypair?.publicKey?.toBase58()}`
    );

    setActiveKeypair({
      keypair: _keypair,
      used_at: url,
      created_at: new Date(),
    });
    return _keypair;
  };

  const removeKeypair = (publicKey: PublicKey) => {
    setKeypairs([
      ...serializedKeypairs?.filter((e) => {
        return (
          publicKey?.toBase58() !==
          Keypair.fromSecretKey(
            bs58.decode(e.privateKey)
          )?.publicKey?.toBase58()
        );
      }),
    ]);
    message.success(`Removed keypair: ${publicKey?.toBase58()}`);
  };

  useEffect(() => {
    if (activeKeypair) {
      window.localStorage.setItem(
        'active_keypair',
        activeKeypair?.keypair?.publicKey?.toBase58()
      );
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { currentPrivateKey: encode(activeKeypair?.keypair?.secretKey) },
          function (response) {}
        );
      });
    }
  }, [activeKeypair]);

  useEffect(() => {
    if (window.localStorage.getItem('active_keypair')) {
      setActiveKeypair(
        keypairs?.find((k) => {
          return (
            k.keypair.publicKey?.toBase58() ===
            window.localStorage.getItem('active_keypair')
          );
        })
      );
    }
  }, []);

  return (
    <KeypairContext.Provider
      value={{
        activeKeypair,
        keypairs,
        createKeypair,
        removeKeypair,
      }}
    >
      {children}
    </KeypairContext.Provider>
  );
};

export function useKeypairContext() {
  const context = useContext<any>(KeypairContext);

  if (!context) {
  }
  return context;
}

export default KeypairProvider;
