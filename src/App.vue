<template>
  <div id="app">
    <wnk-header />
    <router-view/>
  </div>
</template>

<script>
import wnkHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    wnkHeader
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

// Helper classes
.c-pointer {
  cursor: pointer !important;
}

.d-inline-block {
  display: inline-block !important;
}

.w-100 {
  width: 100% !important;
}
</style>
