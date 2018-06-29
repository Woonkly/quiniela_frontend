'use strict'

// TODO: Change this to true "production" values
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BASE_URL: '"http://localhost:8080"',
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',
  CONTRACT_ADDRESS: '"0x509cCE0945DE322Eb7eb8bFB929bC0713F0576775"',
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})
