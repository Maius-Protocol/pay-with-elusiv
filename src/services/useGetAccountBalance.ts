import {
  clusterApiUrl,
  Connection,
  GetProgramAccountsFilter,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useQuery } from 'react-query';
import { TokenType } from '@elusiv/sdk';
import useElusivBalance from './useElusivBalance';
import { TokenMintAddress } from '../constants/constant';
import { useAppContext } from '../contexts/AppContext';
import { useMemo } from 'react';

const anotherEndpoint =
  'https://rpc-devnet.helius.xyz/?api-key=1c0d5340-1025-4447-8ca8-e42da83feedd';

function useGetTokenBalance(wallet: string, mintAddress: string) {
  const { cluster } = useAppContext();
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(cluster), [cluster]);
  const solanaConnection = new Connection(endpoint);
  return useQuery(
    ['account-balance', wallet, mintAddress],
    async () => {
      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165, //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32, //location of our query in the account (bytes)
            bytes: wallet, //our search criteria, a base58 encoded string
          },
        },
        {
          memcmp: {
            offset: 0, //number of bytes
            bytes: mintAddress, //base58 encoded string
          },
        },
      ];

      let balance = 0;

      if (mintAddress === TokenMintAddress['LAMPORTS']) {
        balance = await solanaConnection.getBalance(new PublicKey(wallet));
        return balance / LAMPORTS_PER_SOL;
      }

      const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        { filters: filters }
      );

      accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo: any = account.account.data;
        const mintAddressKey: string =
          parsedAccountInfo['parsed']['info']['mint'];
        const tokenBalance: number =
          parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount'];
        if (mintAddressKey === mintAddress) {
          balance = tokenBalance;
        }
      });
      return balance;
    },
    {
      enabled: !!mintAddress && !!wallet,
    }
  );
}

export default useGetTokenBalance;
