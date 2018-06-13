<template lang="html">
  <section id="register-new-user" class="section">
    <div class="container">
      <div class="columns">
        <form class="column">

          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" placeholder="Juan Peréz">
            </div>
          </div>
          <!-- User name -->

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="ContraseñaSegura123">
            </div>
          </div>
          <!-- Password -->

          <div id="generate-link" class="field">
            <div class="control">
              <button class="button is-primary w-100">Generar link</button>
            </div>
          </div>
          <!-- Generate button -->

          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="http://alksjdlaksjxlkasdlkad.com/128730123ey7rtwqiasdyuxghcvasiudgha" readonly>
            </div>
            <div class="control">
              <button class="button is-info">Copiar</button>
            </div>
          </div>
          <!-- Generated Link -->

        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterNewUser'
}
</script>

<style lang="scss">
#register-new-user {
  #generate-link {
    margin-top: 2em;
  }
}
</style>
