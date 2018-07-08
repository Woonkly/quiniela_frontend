<template lang="html">
  <section id="woonkly-home" class="section text-center">
    <span class="title is-2">Gracias por interesarte en la Woonkly Quiniela, pronto se anunciarán a los ganadores.</span>
    <hr>
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
