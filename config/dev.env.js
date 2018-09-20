'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8150"',//http://localhost:8080
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',
  CONTRACT_ADDRESS: '"0x9d48cdcf54c223966d2ebf57d8c1a396e97e08f8"',
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})
