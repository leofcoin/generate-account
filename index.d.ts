declare type generated = {
    identity: {
        mnemonic: string;
        walletId: string;
    };
    accounts: [[name: string, externalAddress: string, internalAddress: string]];
};
/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
declare const _default: (password: String, network: network) => Promise<generated>;
export default _default;
