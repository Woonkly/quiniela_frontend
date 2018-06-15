<template lang="html">
  <div class="woonkly-q-checkbox c-pointer" @click="$emit('input', !value)">
    <div class="d-inline-block input-box">
      <img src="/static/woonkzalo.png" alt="Woonkzalo invisible" class="is-invisible">
      <transition name="fade">
        <img v-if="value" src="/static/woonkzalo.png" alt="Woonkzalo">
      </transition>
    </div>
    <span>{{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'WoonklyCheckbox',
  props: ['value', 'label']
}
</script>

<style lang="scss">
.woonkly-q-checkbox {
  .input-box {
    border: 0.7px solid #000;
    padding: 0.4em 0.3em;
    padding-bottom: 0;
    position: relative;
    & > img {
      width: 1em;
      height: auto;
      &[alt="Woonkzalo"] {
        position: absolute;
        left: 0.3em;
        top: 0.4em;
      }
    }
  }
}
</style>
