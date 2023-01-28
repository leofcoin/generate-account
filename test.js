import generate from './index.js'
import Multi from '@leofcoin/multi-wallet'
const generated = await generate('hello world','leofcoin:olivia')
let multi = new Multi('leofcoin:olivia')
await multi.recover(generated.identity.mnemonic, undefined, 'leofcoin:olivia')
multi = new Multi('leofcoin:olivia')
await multi.recover(generated.identity.mnemonic, 'hello world', 'leofcoin:olivia')
console.log(await (await multi.account(0).external(0)).address)
console.log(generated);