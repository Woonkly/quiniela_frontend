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
