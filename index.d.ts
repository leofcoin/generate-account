declare type generated = {
    identity: {
        mnemonic: string;
        multiWIF: string;
        walletId: string;
    };
    accounts: [[name: string, externalAddress: string, internalAddress: string]];
};
/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
declare const _default: (password: string, network: network) => Promise<generated>;
export default _default;
