<template lang="html">
  <section id="select-winners" class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <span class="title is-4">Seleccione a los usuarios ganadores.</span>
        </div>
        <div class="column is-12">
          <table id="players" class="table mx-auto">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Primero</th>
                <th>Segundo</th>
                <th>Tercero</th>
                <th>Fecha</th>
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
                <td class="text-center"><input type="checkbox" :value="player.address" v-model="selectedPlayers"></td>
              </tr>
            </tbody>
          </table>
          <div class="send-button-wrapper text-center">
            <button @click="sendWinners" class="button is-link mx-auto" type="button">Seleccionar Ganadores ¡YA!</button>
          </div>
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
      trueSelectedPlayers: [],
      players: []
    }
  },
  computed: {
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
    sendWinners () {
      let { trueSelectedPlayers: winners } = this

      console.log('caca que estoy a punto de mandar al smartcontract:', winners)

      woonklySmartContract.setWinners(winners, (err, res) => {
        console.log(res)
      })
    },
    requestParticipants (contractInstance) {
      woonklySmartContract = contractInstance

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
    }
  },
  mounted () {
    verifyWeb3AndInstantiateContract(this.requestParticipants)
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
