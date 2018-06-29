'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8080"',
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',
  CONTRACT_ADDRESS: '"0x6B812248B6Bd5E1bb31543219883D298a8C591a4"',
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})
