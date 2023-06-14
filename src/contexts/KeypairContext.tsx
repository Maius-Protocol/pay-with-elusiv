import React, { useContext, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Keypair, PublicKey } from '@solana/web3.js';
import bs58, { encode } from 'bs58';
import { message } from 'antd';
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

  const [serializedKeypairs, setKeypairs] = useLocalStorage<
    SerializedKeypairInterface[]
  >('keypairs', []);

  const keypairs: IAppKeypairs = useMemo(() => {
    return serializedKeypairs?.map((k) => ({
      keypair: Keypair.fromSecretKey(bs58.decode(k.privateKey)),
      used_at: k.used_at,
      created_at: k.created_at,
    }));
  }, [serializedKeypairs]);

  const createKeypair = ({ used_at }) => {
    const _keypair = Keypair.generate();
    setKeypairs([
      ...serializedKeypairs,
      {
        privateKey: encode(_keypair.secretKey),
        used_at,
        created_at: new Date(),
      },
    ]);
    message.success(
      `Created a new keypair with PublicKey: ${_keypair?.publicKey?.toBase58()}`
    );
    return _keypair;
  };

  const removeKeypair = (publicKey: PublicKey) => {
    setKeypairs(
      serializedKeypairs?.filter((e) => {
        return (
          publicKey?.toBase58() !==
          Keypair.fromSecretKey(
            bs58.decode(e.privateKey)
          )?.publicKey?.toBase58()
        );
      })
    );
    message.success(`Removed keypair: ${publicKey?.toBase58()}`);
  };

  return (
    <KeypairContext.Provider
      value={{
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
