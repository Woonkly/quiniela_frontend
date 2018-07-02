<template lang="html">
  <section id="vote-winners" class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <span class="title is-4">Indique si esta de acuerdo con la seleccion de los ganadores.</span>
        </div>

        <div v-if="!txHash" class="column is-12">
          <table class="table mx-auto">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Primero</th>
                <th>Segundo</th>
                <th>Tercero</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="winner in winners">
                <td>{{winner.name}}</td>
                <td>{{winner.firstPlace}}</td>
                <td>{{winner.secondPlace}}</td>
                <td>{{winner.thirdPlace}}</td>
              </tr>
            </tbody>
          </table>
          <div class="send-button-wrapper text-center">
            <button @click="vote(true)" class="button is-primary mx-auto" type="button">¡Sí, estoy de acuerdo!</button>
            <button @click="vote(false)" class="button is-danger mx-auto" type="button">¡No, no merecen crypto!</button>
          </div>
        </div>

        <div class="column is-12"></div>

        <div class="column is-12-tablet is-6-desktop mx-auto">
          <article v-if="txHash" class="message is-info">
            <div class="message-header">
              <p>Información de tu transacción</p>
              <button @click="txHash = null" class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              Su transacción fue enviada, puede revisar su estado en el siguiente link: <br>
              <a :href="txUrl" target="_blank">{{txUrl}}</a>
            </div>
          </article>
        </div>

        <div class="column is-12"></div>

        <div v-if="confirmTransaction" class="column is-12-tablet is-6-desktop mx-auto">
          <article class="message is-primary">
            <div class="message-header">
              <p>Revise su transacción</p>
            </div>
            <div class="message-body">
              Por favor autorize su transacción, su voto será enviado junto con esa transacción.
            </div>
          </article>
        </div>

        <div class="column is-12"></div>

        <div v-if="!txHash" class="column is-12-tablet is-6-desktop mx-auto">
          <article class="message is-warning">
            <div class="message-header">
              <p>Atención</p>
            </div>
            <div class="message-body">
              Por favor sea cuidadoso por que esta operacion solo se puede realizar una <i><strong><abbr title="No se puede deshacer">ÚNICA</abbr></strong></i> vez.
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
      confirmTransaction: false,
      winners: [],
      txHash: null
    }
  },
  computed: {
    txUrl () {
      return `${process.env.ETHERSCAN_URL}/${this.txHash}`
    }
  },
  methods: {
    vote (veredict) {
      this.confirmTransaction = true
      woonklySmartContract.vote(veredict, { value: 0, to: process.env.CONTRACT_ADDRESS, gasPrice: 10 * 1E9 }, (err, res) => {
        if (err !== null) {
          console.error(err)
          return false
        }
        this.confirmTransaction = false
        this.txHash = res
      })
    },
    requestWinner (contractInstance) {
      woonklySmartContract = contractInstance

      woonklySmartContract.winnersLength((err, res) => {
        if (err !== null) {
          console.error(err)
          return false
        }
        for (let i = 0; i < res.c[0]; i++) {
          woonklySmartContract.winners(i, (err2, res2) => {
            woonklySmartContract.users(res2, (err3, res3) => {
              // Finally, the "users" function return the data asociated with that player
              this.winners.push({
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

      console.log(woonklySmartContract)
    }
  },
  mounted () {
    verifyWeb3AndInstantiateContract(this.requestWinner, process.env.CONTRACT_ADDRESS)
  }
}
</script>

<style lang="scss">
</style>
