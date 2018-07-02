import { web3PresentAndValidated } from '@/utils/web3Validator'
import contractABI from '@/assets/contractAbi'

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
