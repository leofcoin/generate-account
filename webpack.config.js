const path = require('path');
module.exports = [
  {
    entry: './src/generate-account.js',
    optimization: {
      minimize: false
    },
    experiments: {
      outputModule: true
    },
    output: {
      library: {
        type: 'module'
      },
      filename: 'generate-account.js',
      path: path.resolve(__dirname, 'dist/browser'),
    }
  }
]
