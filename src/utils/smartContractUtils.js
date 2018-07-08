import { web3PresentAndValidated } from '@/utils/web3Validator'
import contractABI from '@/assets/contractAbi'
import countriesArray from '@/assets/countriesArray'

var validateError = function (err) {
  if (err !== null) {
    console.error(err)
    return false
  }
}

export function verifyWeb3AndInstantiateContract (callback, contractLoction) {
  let account
  // First parameter is the function to be executed when the validation ends
  // The second functions sets the user account
  web3PresentAndValidated((valid) => {
    if (!valid) {
      console.log('web3 is not present or the used has not logged in')
    } else {
      // eslint-disable-next-line no-undef
      var localWeb3 = new Web3(window.web3.currentProvider)
      localWeb3.eth.defaultAccount = account
      // declare woonkly contract ABI
      var woonklyContractAbi = localWeb3.eth.contract(contractABI)

      var smartContractContainer
      if (contractLoction) {
        smartContractContainer = woonklyContractAbi.at(contractLoction)
      }

      callback(smartContractContainer)
    }
  }, (acc) => { account = acc })
}

// This function initialize smart contract and get the current players from it
export function requestPoolPlayers (address, players) {
  verifyWeb3AndInstantiateContract((woonklySmartContract) => {
    woonklySmartContract.playersLength((err, res) => {
      if (validateError(err)) return false
      // For each player on the pool we call the "players" function
      for (let i = 0; i < res.c[0]; i++) {
        woonklySmartContract.players(i, (err1, res) => {
          if (validateError(err1)) return false
          // The "players" function return us the address wich is used to call the "users function"
          woonklySmartContract.users(res, (err2, res2) => {
            if (validateError(err2)) return false
            // Finally, the "users" function return the data asociated with that player
            var player = {
              firstPlace: countriesArray[res2[1].c[0] - 1],
              secondPlace: countriesArray[res2[2].c[0] - 1],
              thirdPlace: countriesArray[res2[3].c[0] - 1],
              name: res2[4]
            }
            // Just some data format and push onto the players array
            players.push(player)
          })
        })
      } // for loop
    })
  }, address)
}