<template lang="html">
  <section id="woonkly-home" class="section text-center">
    <span class="title is-2">Gracias por interesarte en la Woonkly Quiniela, pronto se anunciarán a los ganadores.</span>
    <hr>
    <img @click="toggleClass" :class="{'spinning': woonklySpinning}" src="/static/woonkzalo-big.png" alt="Woonkzalo">
  </section>
</template>

<script>
export default {
  name: 'WoonklyHome',
  data () {
    return {
      woonklySpinning: false
    }
  },
  methods: {
    toggleClass () {
      if (!this.woonklySpinning) {
        this.woonklySpinning = true
        setTimeout(() => this.woonklySpinning = false, 650)
      }
    }
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
