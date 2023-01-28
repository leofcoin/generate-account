declare type generated = {
    identity: {
        mnemonic: base58String;
        multiWIF: base58String;
        walletId: base58String;
    };
    accounts: [[name: string, externalAddress: base58String, internalAddress: base58String]];
};
/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
declare const _default: (password: string, network: MultiWallet.network) => Promise<generated>;
export default _default;
