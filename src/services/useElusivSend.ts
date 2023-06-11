import {useMutation, useQuery} from 'react-query';
import useElusivInstance from './useElusivInstance';
import { TokenType } from '@elusiv/sdk';
import {PublicKey} from "@solana/web3.js";

function useElusivSend(amount: number, recipient: PublicKey, tokenType: TokenType) {
    const { data: elusivInstance } = useElusivInstance();
    return useQuery(
        ['elusiv-send', recipient],
        async () => {
            const sendTx = await elusivInstance?.buildSendTx(amount, recipient, tokenType);
            // Sign it (only needed for topups, as we're topping up from our public key there)
            return elusivInstance?.sendElusivTx(sendTx!);
        }
    );
}

export default useElusivSend;
