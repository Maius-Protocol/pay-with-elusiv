import type { PublicKey, SendOptions, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';

export interface PayWithElusivEvent {
    connect(...args: unknown[]): unknown;
    disconnect(...args: unknown[]): unknown;
    accountChanged(...args: unknown[]): unknown;
}

export interface PayWithElusivEventEmitter {
    on<E extends keyof PayWithElusivEvent>(event: E, listener: PayWithElusivEvent[E], context?: any): void;
    off<E extends keyof PayWithElusivEvent>(event: E, listener: PayWithElusivEvent[E], context?: any): void;
}

export interface PayWithElusiv extends PayWithElusivEventEmitter {
    publicKey: PublicKey | null;
    connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
    signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
}
