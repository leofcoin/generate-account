import MultiWallet from '@leofcoin/multi-wallet'

declare type generated = {
  identity: {
    mnemonic: string
    walletId: string
  },
  accounts: [[name: string, externalAddress: string, internalAddress: string]]
}

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
export default async (password: String, network:  network): Promise<generated> => {
    if (!password) throw new Error('wallets need to be password protected.')
    let wallet = new MultiWallet(network);
    /**
     * @type {string}
     */
    const mnemonic = await wallet.generate(password);

    wallet = new MultiWallet(network)
    await wallet.recover(mnemonic, password, network)

    /**
     * @type {object}
     */
    const external = await wallet.account(1).external(1)
    const externalAddress = await external.address

    const internal = await wallet.account(1).internal(1)
    const internalAddress = await internal.address
    return {
      identity: {
        mnemonic,
        walletId: await external.id
      },
      accounts: [['main account', externalAddress, internalAddress]]
    }
  }
