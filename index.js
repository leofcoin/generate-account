import MultiWallet from '@leofcoin/multi-wallet';

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
var index = async (password, network) => {
    if (!password)
        throw new Error('wallets need to be password protected.');
    let wallet = new MultiWallet(network);
    /**
     * @type {string}
     */
    const mnemonic = await wallet.generate(password);
    wallet = new MultiWallet(network);
    await wallet.recover(mnemonic, password, network);
    /**
     * @type {object}
     */
    const external = await wallet.account(1).external(1);
    const externalAddress = await external.address;
    const internal = await wallet.account(1).internal(1);
    const internalAddress = await internal.address;
    return {
        identity: {
            mnemonic,
            walletId: await external.id
        },
        accounts: [['main account', externalAddress, internalAddress]]
    };
};

export { index as default };
