<template lang="html">
  <section id="vote-winners" class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <span class="title is-4">Indique si esta de acuerdo con la seleccion de los ganadores.</span>
        </div>
        <div class="column is-12">
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
              <tr v-for="(winner, idx) in winners">
              </tr>
            </tbody>
          </table>
          <div class="send-button-wrapper text-center">
            <button @click="vote(true)" class="button is-primary mx-auto" type="button">¡Sí, estoy de acuerdo!</button>
            <button @click="vote(false)" class="button is-danger mx-auto" type="button">¡No, no merecen crypto!</button>
          </div>
        </div>
        <div class="column is-12-tablet is-6-desktop mx-auto">
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
      winners: []
    }
  },
  methods: {
    vote (veredict) {
      if (veredict) console.log('Punto a favor')
      else console.log('Usuario berrinchudo')
    },
    requestWinner (contractInstance) {
      // TODO: Do something
    }
  },
  mounted () {
    // verifyWeb3AndInstantiateContract(this.requestWinner)
  }
}
</script>

<style lang="scss">
</style>
