import MultiWallet from '@leofcoin/multi-wallet'

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
export default async network => {
    const wallet = new MultiWallet(network);
    /**
     * @type {string}
     */
    const mnemonic = await wallet.generate();
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
        multiWIF: wallet.export(),
        publicKey: external.publicKey,
        privateKey: external.privateKey,
        walletId: external.id
      },
      accounts: [['main account', external.address, internal.address]],
      config: {
        miner: {
          intensity: 1,
          address: external.address,
          donationAddress: undefined,
          donationAmount: 1 //percent
        }
       }
    }
  }