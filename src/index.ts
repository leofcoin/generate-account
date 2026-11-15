import type { network as Network } from "@leofcoin/multi-wallet";
import type { base58String } from "@vandeurenglenn/base58";
import MultiWallet from "@leofcoin/multi-wallet";
import base58 from "@vandeurenglenn/base58";
import { encrypt } from "@leofcoin/identity-utils";

type Generated = {
  identity: {
    mnemonic: base58String;
    multiWIF: base58String;
    walletId: base58String;
  };
  accounts: [
    [
      name: string,
      externalAddress: base58String,
      internalAddress: base58String,
    ],
  ];
};

/**
 * @params {String} network
 * @return {object} { identity, accounts, config }
 */
export default async (
  password: string,
  network: string | Network,
): Promise<Generated> => {
  if (!password) throw new Error("wallets need to be password protected.");
  let wallet = new MultiWallet(network);
  const mnemonic = await wallet.generate(password);
  wallet = new MultiWallet(network);
  await wallet.recover(mnemonic, password);
  const encryptedMnemonic = await encrypt(password, mnemonic);
  const encryptedMultiWIF = await encrypt(password, await wallet.multiWIF);
  const external = await wallet.account(1).external(1);
  const externalAddress = await external.address;

  const internal = await wallet.account(1).internal(1);
  const internalAddress = await internal.address;
  if (externalAddress === undefined || internalAddress === undefined) {
    throw new Error("Unable to derive account addresses.");
  }

  return {
    identity: {
      mnemonic: base58.encode(encryptedMnemonic),
      multiWIF: base58.encode(encryptedMultiWIF),
      walletId: await external.id,
    },
    accounts: [["main account", externalAddress, internalAddress]],
  };
};
