<template lang="html">
  <section id="register-new-user" class="section">
    <div class="container">
      <div class="columns">
        <form @submit.prevent="registerYoutuber()" class="column column is-one-third-tablet is-8-desktop mx-auto">

          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input v-model="form.name" class="input" type="text" placeholder="Juan Peréz">
            </div>
          </div>
          <!-- User name -->

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="form.email" class="input" type="email" placeholder="juanperez@email.com">
            </div>
          </div>
          <!-- Password -->

          <div v-show="!woonklyUrl" id="generate-link" class="field">
            <div class="control">
              <button type="submit" class="button is-primary w-100">Generar link</button>
            </div>
          </div>
          <!-- Generate button -->

          <div v-show="woonklyUrl" id="copy-link-controls" class="field has-addons">
            <div class="control">
              <input :value="woonklyUrl" class="input" type="text" placeholder="http://alksjdlaksjxlkasdlkad.com/128730123ey7rtwqiasdyuxghcvasiudgha" readonly>
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
// const WNK_URL = 'https://woonkly.com/mundial-quiniela-blockchain/'
const WNK_URL = process.env.COUNTRIES_URL

export default {
  name: 'RegisterNewUser',
  data () {
    return {
      form: {
        name: null,
        email: null
      },
      userGeneratedID: null
    }
  },
  computed: {
    woonklyUrl () {
      if (this.userGeneratedID) return `${WNK_URL}/${this.userGeneratedID}`
      return null
    }
  },
  methods: {
    registerYoutuber () {
      fetch(`${process.env.BASE_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(this.form)
      }).then(res => res.json())
        .then(json => {
          this.userGeneratedID = json['_id']
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss">
#register-new-user {
  #generate-link {
    margin-top: 2em;
  }

  #copy-link-controls {
    margin-top: 2em;
    display: flex;
    flex-direction: row;
    & .control:nth-child(1) { flex: 1 }
    & .control:nth-child(2) { flex: 0 }
  }
}
</style>
