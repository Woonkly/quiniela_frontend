'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// TODO: Change ehterscan url and contract address when production ready
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8080"',
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',
  CONTRACT_ADDRESS: '"0x987fD0d0cCeC5E37E3f050E9B2F25f0b3c4e042F"',
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})
