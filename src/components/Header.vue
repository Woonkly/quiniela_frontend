<template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="//woonkly.com/privateico">
          <img src="@/assets/wnk_logo.png" alt="Woonkly" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
</nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.navbar {
    background-color: #08639f;
    .navbar-burger {
        span {
            background: white;
        }
    }
}
</style>
