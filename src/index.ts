import MultiWallet from '@leofcoin/multi-wallet'
import { randombytes } from '@leofcoin/crypto'
import smartConcat from '@vandeurenglenn/typed-array-smart-concat'
import base58 from '@vandeurenglenn/base58'

declare type generated = {
  identity: {
    mnemonic: string
    multiWIF: string
    walletId: string
  },
  accounts: [[name: string, externalAddress: string, internalAddress: string]]
}

const passwordToKey = (password: Uint8Array) => 
  globalThis.crypto.subtle.importKey(
    'raw',
    password,
    'PBKDF2',
    false,
    ['deriveKey']
  )

const deriveKey = (key, salt, iterations = 250000, hashAlgorithm = 'SHA-512') => 
  globalThis.crypto.subtle.deriveKey({
    name: 'PBKDF2',
    salt,
    iterations,
    hash: hashAlgorithm
  },
  key,
  {
    name: 'AES-GCM',
    length: 256
  },
  false,
  ['encrypt', 'decrypt']
)

const encrypt = async (password: string, data: string, version = new TextEncoder().encode('1')) => {
  const passwordKey = await passwordToKey(new TextEncoder().encode(password))
  const salt = randombytes(16)
  const iv = randombytes(16)
  
  const key = await deriveKey(passwordKey, salt)

  const encrypted = await globalThis.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    new TextEncoder().encode(data)
  )
  
  return smartConcat([version, salt, iv, new Uint8Array(encrypted)])
}

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
export default async (password: string, network:  network): Promise<generated> => {
    if (!password) throw new Error('wallets need to be password protected.')
    let wallet = new MultiWallet(network);
    /**
     * @type {string}
     */
    let mnemonic = await wallet.generate(password);
    wallet = new MultiWallet(network)
    await wallet.recover(mnemonic, password, network)
    mnemonic = new Uint8Array(await encrypt(password, mnemonic))
    const multiWIF = new Uint8Array(await encrypt(password, await wallet.toMultiWif()))
    /**
     * @type {object}
     */
    const external = await wallet.account(1).external(1)
    const externalAddress = await external.address

    const internal = await wallet.account(1).internal(1)
    const internalAddress = await internal.address
    return {
      identity: {
        mnemonic: base58.encode(mnemonic),
        multiWIF: base58.encode(multiWIF),
        walletId: await external.id
      },
      accounts: [['main account', externalAddress, internalAddress]]
    }
  }
