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

.w-100 {
  width: 100% !important;
}
</style>
