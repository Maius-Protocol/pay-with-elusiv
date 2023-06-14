import { registerWallet } from './register.js';
import { PayWithElusivWallet } from './wallet.js';
import type { PayWithElusiv } from './window.js';

export function initialize(payWithElusiv: PayWithElusiv): void {
    registerWallet(new PayWithElusivWallet(payWithElusiv));
}
