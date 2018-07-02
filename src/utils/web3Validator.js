export function web3PresentAndValidated (finishedValidation, setAccount) {
  if (!window.web3) {
    finishedValidation(false)
    window.alert('Por favor instale Metamask o use Mist')
    return false
  } else {
    window.web3.eth.getAccounts((err, acc) => {
      if (err !== null) {
        console.error(err)
        finishedValidation(false)
      }
      if (acc.length === 0) {
        console.log('Please login with your ETH account')
        finishedValidation(false)
      } else {
        setAccount(acc[0])
        window.web3.version.getNetwork((err, netId) => {
          if (err !== null) {
            console.error(err)
            finishedValidation(false)
          }
          if (netId === process.env.NETWORK_ID) {
            finishedValidation(true)
          } else {
            console.error('The user is connected to a invalid ETH network')
            finishedValidation(false)
          }
        })
      }
    })
  }
  // End of the validation
}
