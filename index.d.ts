import type { network as Network } from "@leofcoin/multi-wallet";
import type { base58String } from "@vandeurenglenn/base58";
type Generated = {
    identity: {
        mnemonic: base58String;
        multiWIF: base58String;
        walletId: base58String;
    };
    accounts: [
        [
            name: string,
            externalAddress: base58String,
            internalAddress: base58String
        ]
    ];
};
export default _default;
/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
declare function _default(password: string, network: string | Network): Promise<Generated>;
