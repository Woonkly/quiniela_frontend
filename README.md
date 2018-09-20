# Quiniela World Cup - frontend
[![Woonkly](https://woonkly.com/img/email-assets/powered-by.png)](https://woonkly.com)

The main purpose of this project is to act like an interface between the users who want to gamble on the FIFA &copy; World Cup 2018 and the Woonkly Soccer pool smart contract on the ethereum network and get the chance to win ETH.

## Technologies you will need.
* [Backend](https://github.com/Woonkly/quiniela_backend) - The backend designed for this project.
* [Node.js](https://nodejs.org/en/) - Cross-platform, open source runtime environment for the server layer.
* [MetaMask](https://metamask.io/) - A bridge that allows you to run Ethereum dApps right in your browser without running a full Ethereum node.


## Setting up the project.
After you download the project, you need to install all the dependencies and start the project:
``` bash
$npm install
$npm start

# Build for production with minification.
$npm run build
```

## Changing the project´s configuration.
If you want to change the project´s basic configuration all you need to do is to go to the _config_ directory and modify the _dev.env.js_ file. In this file, you can type your own settings.
For example:
``` javascript
module.exports = merge(prodEnv, {
  //the enviroment.
  NODE_ENV: '"development"',

  //the port that the backend is going to use.
  BASE_URL: '"http://localhost:8080"',

  //the base url to generate the gamble.
  COUNTRIES_URL: '"http://localhost:8081/#/gamble"',

  //the contract address that you are using.
  CONTRACT_ADDRESS:'"0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"',

 //The base url to genrate the Etherscantrasaction status.
  ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',

 //Ethereum´s Network where your Smart Contract will be deploy.
  NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
})
```
Maybe you will need to also make changes in the _prod.env.js_ file:
For example:
```javascript
module.exports = {
    //the enviroment.
    NODE_ENV: '"production"',

    //the backend´s endpoint.
    BASE_URL:'"http://ec2-18-219-245-172.us-east-2.compute.amazonaws.com"',

     //the base url to generate the gamble.
    COUNTRIES_URL: '"http://boveda.woonkly.com/#/gamble"',
    
    //the contract address that you are using.
    CONTRACT_ADDRESS:'"0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"',

    //The base url to genrate the Etherscantrasaction status.
    ETHERSCAN_URL: '"https://ropsten.etherscan.io/tx"',

    //Ethereum´s Network where your Smart Contract will be deploy.
    NETWORK_ID: '"3"' // 3 -> ROPSTEN network | 1 -> Mainet
}
```

## Routes
The project has different path, each of one let´s you do different things:

* **'/'** - This is the Home page.
* **'/register'** - Here, a user who wants to participate in the quiniela provides its name and e-mail. After that, this site provides a new _url_.
* **'/gamble/:hash'** - This site, provided by the '/register' path, contains a unique hash code, here the user can gamble and predict which teams are going to win. You will need a password (given by the administrator).
* **'/winners'** - Here, the administrator decides which users are the Quiniela´s winners, and distributes the prize between the winners.
* **'/vote'** - Here, users say if they agree with the administrator´s decision.

## Using the Project.
**_NOTE:_** Make sure your backend is running.

**_NOTE:_** You need an Metamask account.

## If you are a developer...

This project uses [Vue CLI](https://github.com/vuejs/vue-cli) v2.9.6.

In order to user this project, you need start the project with:
``` bash
$ npm install
$ npm start
```
Now your project is running in http://localhost:8081

**_NOTE:_** You can always change the defult port.

## If you are a user...

You need to log into your Metamask account. Then you need to access to the _register path_. After you provide your data, the page will provide a link, search that link.

Now you are in the gamble section, select the temas you think have the best chance, provide the password (the administrator should give it to you).
