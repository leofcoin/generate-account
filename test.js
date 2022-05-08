const gen = require('./dist/commonjs/generate-account')

gen('leofcoin').then(res => console.log(res))
