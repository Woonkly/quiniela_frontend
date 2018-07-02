<template>
  <div id="app">
    <wnk-header />

    <article v-if="!isMetamaskInstalled" style="max-width:500px;padding-top:1.5em" class="message is-danger mx-auto">
      <div class="message-header">
        <p>Atención</p>
        <!-- <button class="delete" aria-label="delete"></button> -->
      </div>
      <div class="message-body">
        <strong class="title is-2">Por favor instale Metamask. Una vez que lo haya instalado, inicie sesión y recargue el navegador.</strong>
      </div>
    </article>
    <!-- Metamask warning -->

    <router-view/>
  </div>
</template>

<script>
import { web3PresentAndValidated } from '@/utils/web3Validator'
import wnkHeader from '@/components/Header'

export default {
  name: 'App',
  data () {
    return {
      isMetamaskInstalled: false
    }
  },
  components: {
    wnkHeader
  },
  mounted () {
    web3PresentAndValidated((res) => {
      this.isMetamaskInstalled = res
    })
  }
}
</script>

<style lang="scss">
@import '~bulma/bulma';

// Transitions and animations
.fade-enter-active, .fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1;
}

// Fade in from bottom
.fade-bottom-enter-active, .fade-bottom-leave-active {
  transition: transform 300ms ease, opacity 400ms ease;
}
.fade-bottom-enter, .fade-bottom-leave-to {
  transform: translateY(2em);
  opacity: 0;
}
.fade-bottom-enter-to, .fade-bottom-leave {
  transform: translateY(0em);
  opacity: 1;
}

// Helper classes
.text-capitalize {
  text-transform: capitalize; 
}

.text-center {
  text-align: center;
}

.c-pointer {
  cursor: pointer !important;
}

.d-inline-block {
  display: inline-block !important;
}

.w-100 {
  width: 100% !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>
