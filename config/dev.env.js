'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"', //enviroment
  BASE_URL: '"http://localhost:8080"',
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',
  CONTRACT_ADDRESS: '"0x509cCE0945DE322Eb7eb8bFB929bC0713F057677"', //here goes your contrac's address
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})