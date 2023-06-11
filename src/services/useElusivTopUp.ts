import { useQuery } from 'react-query';
import useElusivInstance from './useElusivInstance';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenType } from '@elusiv/sdk';

function useElusivTopUp(amount: number, tokenType: TokenType) {
    const { wallet } = useWallet();
    const pubKey = wallet?.adapter?.publicKey?.toBase58();
    const { data: elusivInstance } = useElusivInstance();

    return useQuery(
        ['elusiv-top-up', pubKey],
        async () => {
            const topupTx = await elusivInstance?.buildTopUpTx(amount, tokenType);
            // Sign it (only needed for topups, as we're topping up from our public key there)
            return await window.solana.signAndSendTransaction(topupTx);
        },
        {
            enabled: !!elusivInstance && !!pubKey,
        }
    );
}

export default useElusivTopUp;
