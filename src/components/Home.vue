<template lang="html">
  <section id="woonkly-home" class="section text-center">
    <span class="title is-2">Gracias por interesarte en la Woonkly Quiniela, pronto se anunciarán a los ganadores.</span>
    <hr>
    <div class="players has-text-left" v-if="players.length !== 0">
      <h4 class="title is-4">Jugadores actuales</h4>
      <div class="colums">
        <div class="column mx-auto has-text-centered">
          <table class="table is-hoverable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Primer lugar</th>
                <th>Segundo lugar</th>
                <th>Tercer lugar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in players">
                <td>{{p.name}}</td>
                <td>{{p.firstPlace}}</td>
                <td>{{p.secondPlace}}</td>
                <td>{{p.thirdPlace}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <img style="margin-top:-20%;margin-bottom:-25%" @click="toggleClass" :class="{'spinning': woonklySpinning}" src="/static/woonkzalo-big.png" alt="Woonkzalo">
  </section>
</template>

<script>
import { requestPoolPlayers } from '@/utils/smartContractUtils'

export default {
  name: 'WoonklyHome',
  data () {
    return {
      woonklySpinning: false,
      players: []
    }
  },
  methods: {
    toggleClass () {
      if (!this.woonklySpinning) {
        this.woonklySpinning = true
        setTimeout(() => this.woonklySpinning = false, 650)
      }
    }
  },
  mounted () {
    requestPoolPlayers(process.env.CONTRACT_ADDRESS, this.players)
  }
}
</script>

<style lang="scss">
#woonkly-home {
  overflow: hidden;
}

.spinning {
  display: inline-block;
  animation: spin360 600ms ease-out 0s;
}

@keyframes spin360 {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
