<template lang="html">
  <transition name="fade-bottom">
    <div class="woonkzalo-flag">
      <span :class="`title is-6 position-${position}`"><b>{{position}}</b></span>
      <div class="img-wrapper">
        <img src="/static/woonkzalo.png" alt="Woonkzalo" class="is-invisible">
        <img src="/static/woonkzalo.png" alt="Woonkzalo" class="actual-woonkzalo">
        <img :src="`/static/flags/${country}.png`" alt="Country Flag" class="flag">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WoonkzaloFlag',
  props: ['country', 'position']
}
</script>

<style lang="scss">
.woonkzalo-flag {
  position: relative;
  padding: 0.4em;

  .position-1, .position-2, .position-3 {
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    transform: translate(-25%, -25%);
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    text-align: center;
    & > b {
      line-height: 1.5;
    }
  }

  .position-1 {
    color: white;
    background: gold
  }

  .position-2 {
    color: white;
    background: red;
  }

  .position-3 {
    color: white;
    background: purple;
  }

  .img-wrapper {
    position: relative;
    img {
      width: 100%;
      max-width: 100%;
      &.actual-woonkzalo {
        left: 0;
        top: 0;
        position: absolute;
      }
      &.flag {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70%;
      }
    }
  }
}
</style>
