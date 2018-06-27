export function web3PresentAndValidated (finishedValidation, setAccount) {
  if (!window.web3) {
    finishedValidation(false)
    console.log('Please install metamask or use mist')
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
          switch (netId) {
            case '1':
              console.log('The user is on the mainet')
              // TODO: Once in production set the validation in this point
              break
            case '3':
              console.log('ON ROPSTEN NETWORK')
              finishedValidation(true)
              break
            default:
              console.log('User not in mainet', `Network ID: ${netId}`)
              finishedValidation(false)
          }
        })
      }
    })
  }
  // End of the validation
}
