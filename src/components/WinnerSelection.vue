<template lang="html">
  <section id="select-winners" class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <span class="title is-4">Seleccione a los usuarios ganadores.</span>
        </div>
        <div v-if="!txHash" class="column is-12">
          <table id="players" class="table mx-auto">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Primero</th>
                <th>Segundo</th>
                <th>Tercero</th>
                <th>Fecha</th>
                <th>ETH</th>
                <th><abbr title="Marque esta casilla si este jugador resulto ganador de la quiniela">Ganó(?)</abbr></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, idx) in players" :class="{'is-selected':selectedPlayers.includes(player.address)}">
                <td>{{player.name}}</td>
                <td class="text-capitalize">{{countryName(player.firstPlace-1)}}</td>
                <td class="text-capitalize">{{countryName(player.secondPlace-1)}}</td>
                <td class="text-capitalize">{{countryName(player.thirdPlace-1)}}</td>
                <td>{{player.dateGambled}}</td>
                <td>
                  <div class="field">
                    <div class="control">
                      <input @keyup.prevent.190="addZero(player.address)" class="input is-primary" v-model="eth[player.address]" type="number" placeholder="ETH">
                    </div>
                  </div>
                </td>
                <td class="text-center"><input type="checkbox" :value="player.address" v-model="selectedPlayers"></td>
              </tr>
            </tbody>
          </table>
          <div class="send-button-wrapper text-center">
            <button @click="sendWinners" class="button is-link mx-auto" type="button">Seleccionar Ganadores ¡YA!</button>
          </div>
        </div>

        <div v-if="!txHash" class="column is-12">
          <table class="table mx-auto text-center">
            <thead>
              <tr>
                <th>Total en el Contrato</th>
                <th>Ingresado</th>
                <th>Restante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">{{contractBalance.eth}}</td>
                <td class="text-center">{{totalRaised}}</td>
                <td class="text-center">{{remainingFromContract}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="txHash" class="column is-12-tablet is-6-desktop mx-auto">
          <article class="message is-info">
            <div class="message-header">
              <p>Revise su transacción</p>
            </div>
            <div class="message-body">
              Su transacción fue enviada, puede revisar su estado en el siguiente link: <br>
              <a :href="txUrl" target="_blank">{{txUrl}}</a>
            </div>
          </article>
        </div>

        <div v-if="confirmTransaction" class="column is-12-tablet is-6-desktop mx-auto">
          <article class="message is-primary">
            <div class="message-header">
              <p>Revise Metamask</p>
            </div>
            <div class="message-body">
              Por favor confirme su transacción, su voto será enviado junto con la transaccion que usted autorize.
            </div>
          </article>
        </div>

        <div class="column is-12-tablet is-6-desktop mx-auto">
          <article class="message is-warning">
            <div class="message-header">
              <p>Atención</p>
            </div>
            <div class="message-body">
              <strong>Señor Santos</strong>, por favor sea cuidadoso por que esta operacion solo se puede realizar una <i><strong><abbr title="No se puede deshacer">ÚNICA</abbr></strong></i> vez.
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { verifyWeb3AndInstantiateContract } from '@/utils/smartContractUtils'
import countriesArray from '@/assets/countriesArray'

var woonklySmartContract

export default {
  name: 'WinnerSelection',
  data () {
    return {
      txHash: null,
      confirmTransaction: false,
      eth: {},
      trueSelectedPlayers: [],
      players: [],
      contractBalance: {
        eth: 0,
        wei: 0,
      }
    }
  },
  computed: {
    txUrl () {
      return `${process.env.ETHERSCAN_URL}/${this.txHash}`
    },
    totalRaised () {
      if (this.trueSelectedPlayers.length === 0) return 0

      // else
      return this.trueSelectedPlayers.reduce((acc, el) => {
        return acc += parseFloat(this.eth[el])
      }, 0)
    },
    remainingFromContract () {
      return this.contractBalance.eth - this.totalRaised
    },
    selectedPlayers: {
      get () {
        return this.trueSelectedPlayers
      },
      set (val) {
        this.trueSelectedPlayers = val
      }
    },
    countryName () {
      return (countryId) => {
        return countriesArray[countryId]
      }
    }
  },
  methods: {
    addZero (address) {
      this.eth[address] = 0.1
    },
    sendWinners () {
      let { trueSelectedPlayers: winners } = this

      let addressesArray = []
      let ethArray = []

      winners.forEach(key => {
        if (key in this.eth) {
          addressesArray.push(key)
          ethArray.push(this.eth[key])
        }
      })

      this.confirmTransaction = true

      woonklySmartContract.setWinners(addressesArray, ethArray, { value: 0, to: process.env.CONTRACT_ADDRESS, gasPrice: 10 * 1E9 }, (err, res) => {
        this.confirmTransaction = true
        this.txHash = res
      })
    },
    requestParticipants (contractInstance) {
      woonklySmartContract = contractInstance

      // Get the smart contract balance
      this.refreshContractBalance()

      // The players lenght return the number of players gambling
      woonklySmartContract.playersLength((err, res) => {
        // For each player on the pool we call the "players" function
        for (let i = 0; i < res.c[0]; i++) {
          woonklySmartContract.players(i, (err, res) => {
            // The "players" function return us the address wich is used to call the "users function"
            woonklySmartContract.users(res, (err2, res2) => {
              // Finally, the "users" function return the data asociated with that player
              var player = {
                firstPlace: res2[1].c[0],
                secondPlace: res2[2].c[0],
                thirdPlace: res2[3].c[0],
                name: res2[4],
                dateGambled: null,
                address: res
              }
              var data = new Date(res2[5].c[0] * 1000)
              player.dateGambled = data.toLocaleString('es-MX')
              // Just some data format and push onto the players array
              this.players.push(player)
            })
          })
        } // for loop
      })
    },
    refreshContractBalance () {
      window.web3.eth.getBalance(process.env.CONTRACT_ADDRESS, (err, res) => {
        this.contractBalance.wei = res.c[0]
        this.contractBalance.eth = this.contractBalance.wei / 1E4
      })
    }
  },
  mounted () {
    verifyWeb3AndInstantiateContract(this.requestParticipants, process.env.CONTRACT_ADDRESS)
  }
}
</script>

<style lang="scss">
#select-winners {
  #players {
    td {
      & > input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        height: 16px;
        outline: none;
      }
    }
  }
}
</style>
