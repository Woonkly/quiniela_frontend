import { web3PresentAndValidated } from '@/utils/web3Validator'
import contractABI from '@/assets/contractAbi'
import countriesArray from '@/assets/countriesArray'

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
    woonklySmartContract.winnersLength((err, res) => {
      if (err !== null) {
        console.error(err)
        return false
      }
      for (let i = 0; i < res.c[0]; i++) {
        woonklySmartContract.winners(i, (err2, res2) => {
          woonklySmartContract.users(res2, (err3, res3) => {
            // Finally, the "users" function return the data asociated with that player
            players.push({
              firstPlace: countriesArray[res3[1].c[0]-1],
              secondPlace: countriesArray[res3[2].c[0]-1],
              thirdPlace: countriesArray[res3[3].c[0]-1],
              name: res3[4],
              address: res2
            })
          })
        })
      }
    })
  }, address)
}