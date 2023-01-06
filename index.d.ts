/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
declare const _default: (network: network) => Promise<{
    identity: {
        mnemonic: any;
        walletId: any;
    };
    accounts: any[][];
}>;
export default _default;
