<template>
  <section id="woonkly-country-selection" class="section">
    <div class="container">
      <div class="level">
        <div class="columns">
          <form class="column" @submit.prevent="submitForm">
            <div class="field">
              <label class="label">Bienvenido!</label>
              <div class="control">
                <input class="input" type="text" placeholder="Text input" :value="userName" disabled>
              </div>
            </div>

            <div class="field">
              <label class="label">País #1</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[0]">
                    <option value="null" disabled selected>Seleccione...</option>
                    <option v-for="c in countriesArray" :disabled="selectedCountries.includes(c)">{{c}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">País #2</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[1]">
                    <option value="null" disabled selected>Seleccione...</option>
                    <option v-for="c in countriesArray" :disabled="selectedCountries.includes(c)">{{c}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">País #3</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[2]">
                    <option value="null" disabled selected>Seleccione...</option>
                    <option v-for="c in countriesArray" :disabled="selectedCountries.includes(c)">{{c}}</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- <div class="field">
              <label class="label">Message</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea"></textarea>
              </div>
            </div> -->

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="termsAndConditions">
                  Acepto los <a href="#">términos y condiciones.</a>
                </label>
              </div>
            </div>

            <div class="buttons">
              <button class="button w-100 is-link is-marginless is-block">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CountrySelection',
  data () {
    return {
      userName: 'Juan Peréz',
      termsAndConditions: false,
      selectedCountries: [
        null, null, null
      ],
      countriesArray: 'ALEMANIA,ARABIA SAUDÍ,ARGENTINA,AUSTRALIA,BÉLGICA,BRASIL,COLOMBIA,COSTA RICA,CROACIA,DINAMARCA,EGIPTO,ESPAÑA,FRANCIA,INGLATERRA,ISLANDIA,JAPÓN,MARRUECOS,MÉXICO,NIGERIA,PANAMÁ,PERÚ,POLONIA,PORTUGAL,REPÚBLICA DE COREA,RI DE IRÁN,RUSIA,SENEGAL,SERBIA,SUECIA,SUIZA,TÚNEZ,URUGUAY'.split(',')
    }
  },
  methods: {
    submitForm () {
      if ( !this.selectedCountries.includes(null) && this.termsAndConditions) {
        let { userName: name, selectedCountries: contries } = this
        console.log(`name: ${name}, countries: ${contries}`)
      } else {
        console.log('Something is missing in the form')
        // TODO: Notify the user that something is incomplete
      }
    }
  }
}
</script>

<style lang="scss">
#woonkly-country-selection {
  .control {
    .select, .select > select {
      width: 100%;
    }
  }
}

// Desktop styles
@media only screen and (max-width: 1024px) {
  #woonkly-country-selection {
    height: calc(100vh - 52px);
    box-sizing: border-box;
  }
}
</style>
