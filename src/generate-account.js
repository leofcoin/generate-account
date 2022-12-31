import MultiWallet from '@leofcoin/multi-wallet'

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
export default async network => {
    let wallet = new MultiWallet(network);
    /**
     * @type {string}
     */
    const mnemonic = await wallet.generate('password');

    wallet = new MultiWallet(network)
    await wallet.recover(mnemonic, 'password', network)
    /**
     * @type {object}
     */
    const account = wallet.account(1)
    /**
     * @type {object}
     */
    const external = account.external(1)
    const internal = account.internal(1)

    return {
      identity: {
        mnemonic,
        walletId: await external.id
      },
      accounts: [['main account', await external.address, await internal.address]]
      // config: {
      //  }
    }
  }
