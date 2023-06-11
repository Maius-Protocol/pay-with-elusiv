import {useMutation, useQuery} from 'react-query';
import useElusivInstance from './useElusivInstance';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import { TokenType } from '@elusiv/sdk';

function useElusivTopUp(amount: number, tokenType: TokenType) {
    const { wallet, sendTransaction, signTransaction } = useWallet();
    const { connection } = useConnection();
    const pubKey = wallet?.adapter?.publicKey?.toBase58();
    const { data: elusivInstance } = useElusivInstance();

    return useMutation(async () => {
            const topupTx = await elusivInstance?.buildTopUpTx(amount, tokenType);
            // Sign it (only needed for topups, as we're topping up from our public key there)

            await signTransaction!((await topupTx!).tx)

            return await sendTransaction((await topupTx!).tx, connection)
        }
    );
}

export default useElusivTopUp;
