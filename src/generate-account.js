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
    const mnemonic = await wallet.generate();

    wallet = new MultiWallet(network)
    await wallet.recover(mnemonic, network)
    /**
     * @type {object}
     */
    const account = wallet.account(0)
    /**
     * @type {object}
     */
    const external = account.external(0)
    const internal = account.internal(0)

    return {
      identity: {
        mnemonic,
        // multiWIF: wallet.export(),
        publicKey: external.publicKey,
        privateKey: external.privateKey,
        walletId: external.id
      },
      accounts: [['main account', external.address, internal.address]]
      // config: {
      //  }
    }
  }
