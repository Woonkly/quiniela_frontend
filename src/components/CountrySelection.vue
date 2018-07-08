<template>
  <section id="woonkly-country-selection" class="section">
    <div class="container">

      <transition name="shrink">
        <div v-show="!showForm" class="level" style="transition-delay: 600ms">
          <div class="columns">
            <div id="terms-and-conditions" class="column column is-one-third-tablet is-8-desktop mx-auto">
              <h1 class="title is-3">Términos y condiciones</h1>
              <div class="wrapper">
                <h5 class="title is-5 has-text-centered">---- Woonkly WC 2018 ----</h5>
                <ul>
                  <li>
                    <strong>Puede existir más de un ganador.</strong>
                  </li>
                  <li>
                    <strong>El premio se reparte cuando más del 50% de los participantes esté de acuerdo</strong>
                  </li>
                  <li>
                    <strong>La cantidad a apostar se fijó anteriormente por los que los montos para los posibles ganadores ya fueron acordados.</strong>
                  </li>
                </ul>
              </div>
              <w-checkbox class="woonkly-checkbox" v-model="termsAndConditions" label="Acepto los términos y condiciones"/>
            </div>
          </div>
        </div>
      </transition>

      <transition name="shrink">
        <div v-show="showForm && !isFormCompleted" class="columns" style="transition-delay: 1420ms">
          <form class="column is-one-third-tablet is-8-desktop" @submit.prevent="submitForm">

            <div class="field">
              <label class="label">Bienvenido!</label>
              <div class="control">
                <span>{{user.name}}</span>
              </div>
            </div>

            <div id="smartcontract-password" class="field">
              <label class="label">Clave de acceso</label>
              <div class="control">
                <input class="input" type="password" placeholder="ContraseñaSegura123" v-model="password" >
              </div>
            </div>

            <div class="field">
              <label class="label">Paises ganadores</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[0]">
                    <option value="null" disabled selected>Primer lugar</option>
                    <option v-for="c in contriesCodes" :key="c.country" :disabled="selectedCountries.includes(c.number)" :value="c.number">{{mappedCountries[c.country]}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[1]">
                    <option value="null" disabled selected>Segundo lugar</option>
                    <option v-for="c in contriesCodes" :key="c.country" :disabled="selectedCountries.includes(c.number)" :value="c.number">{{mappedCountries[c.country]}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="selectedCountries[2]">
                    <option value="null" disabled selected>Tercer lugar</option>
                    <option v-for="c in contriesCodes" :key="c.country" :disabled="selectedCountries.includes(c.number)" :value="c.number">{{mappedCountries[c.country]}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="buttons">
              <button class="button w-100 is-link is-marginless is-block">Enviar</button>
            </div>

            <div class="columns is-mobile">
              <div class="column is-4">
                <woonkzalo-flag v-if="selectedCountries[0]" :country="selectedCountries[0]-1" :position="1" />
              </div>
              <div class="column is-4">
                <woonkzalo-flag v-if="selectedCountries[1]" :country="selectedCountries[1]-1" :position="2" />
              </div>
              <div class="column is-4">
                <woonkzalo-flag v-if="selectedCountries[2]" :country="selectedCountries[2]-1" :position="3" />
              </div>
            </div>
          </form>
        </div>
      </transition>

      <div v-show="errorMsg" class="columns">
        <div class="column column is-6-tablet mx-auto">
          <div class="notification is-danger">
            <button @click="errorMsg = null" class="delete"></button>
            {{errorMsg}}
          </div>
        </div>
      </div>

      <article v-if="txHash" class="message is-info">
        <div class="message-header">
          <p>Información de tu transacción</p>
          <button @click="txHash = null" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          Su transacción fue enviada, puede revisar su estado en el siguiente link: <br>
          <a :href="txUrl" target="_blank">{{txUrl}}</a>
        </div>
      </article>

      <div v-show="successMessage" class="columns">
        <div class="column column is-6-tablet mx-auto">
          <div v-show="successMessage" class="notification is-success">
            <button @click="successMessage = null" class="delete"></button>
            {{successMessage}}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { verifyWeb3AndInstantiateContract } from '@/utils/smartContractUtils'
import woonkzaloFlag from '@/components/unit/WoonkzaloFlag'
import wCheckbox from '@/components/unit/WoonklyCheckbox'
import countriesTable from '@/assets/countriesTable'
import temporalCountriesArray from '@/assets/temporalResponse'
import contractABI from '@/assets/contractAbi'
import md5 from 'blueimp-md5/js/md5'

let woonklyContract

export default {
  name: 'CountrySelection',
  data () {
    return {
      user: {
        name: null,
        account: null
      },
      txHash: null,
      web3Validated: true,
      password: null,
      termsAndConditions: false,
      isUserAuth: false,
      successMessage: null,
      errorMsg: null,
      isFormCompleted: false,
      selectedCountries: [
        null, null, null
      ],
      contriesCodes: temporalCountriesArray,
      mappedCountries: countriesTable,
      countriesArray: 'ALEMANIA,ARABIA SAUDÍ,ARGENTINA,AUSTRALIA,BÉLGICA,BRASIL,COLOMBIA,COSTA RICA,CROACIA,DINAMARCA,EGIPTO,ESPAÑA,FRANCIA,INGLATERRA,ISLANDIA,JAPÓN,MARRUECOS,MÉXICO,NIGERIA,PANAMÁ,PERÚ,POLONIA,PORTUGAL,REPÚBLICA DE COREA,RI DE IRÁN,RUSIA,SENEGAL,SERBIA,SUECIA,SUIZA,TÚNEZ,URUGUAY'.split(',')
    }
  },
  computed: {
    showForm () {
      return this.isUserAuth && this.termsAndConditions
    },
    txUrl () {
      return `${process.env.ETHERSCAN_URL}/${this.txHash}`
    }
  },
  methods: {
    saveContractInstance (contractInstance) {
      woonklyContract = contractInstance
      console.log(contractInstance)
    },
    fetchUser () {
      fetch(`${process.env.BASE_URL}/api/user/${this.$route.params.hash}`, {
        method: 'GET'
      }).then(res => {
        if (res.ok) {
          this.isUserAuth = true
          return res.json()
        } else {
          this.errorMsg = 'Usted no está autorizado para acceder a este sitio.'
        }
      })
        .then(json => {
          this.user = json
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchCountries () {
      fetch(`${process.env.BASE_URL}/api/equipos`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(json => {
          this.contriesCodes = json
        })
    },
    submitForm (e) {
      if (!this.selectedCountries.includes(null) && this.termsAndConditions) {
        let {
          user,
          selectedCountries: countries,
          password
        } = this

        let passwordHash = md5(password)

        // TODO: See why process is undefined
        woonklyContract.addUser(countries[0], countries[1], countries[2], user.name, passwordHash, { gasPrice: 10 * 1E9 }, (err, res) => {
          if (err !== null) {
            console.error(err)
            return false
          }
          this.txHash = res
        })

        let requestBody = {
          countries: [{
            team: countries[0],
            place: 1
          },
          {
            team: countries[1],
            place: 2
          },
          {
            team: countries[2],
            place: 3
          }]
        }

        fetch(`${process.env.BASE_URL}/api/user/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
          .then(res => {
            if (res.ok) {
              this.successMessage = 'Por favor revise que su transaccion se haya enviado. Sus equipos seleccionados se han guardado correctamente en nuestra base de datos.'
              this.isFormCompleted = true
            } else {
              this.errorMsg = 'Ha ocurrido un error a la hora de guardar sus equipos, por favor intentelo más tarde.'
            }
          })
          .catch(err => {
            this.errorMsg = 'Ha ocurrido un error a la hora de guardar sus equipos, por favor intentelo más tarde.'
            console.error(err)
          })
      } else {
        window.alert('Debe seleccionar tres paises e ingresar la contraseña súper secreta.')
      }
    }
  },
  components: {
    wCheckbox,
    woonkzaloFlag
  },
  mounted () {
    this.fetchUser()
    verifyWeb3AndInstantiateContract(this.saveContractInstance, process.env.CONTRACT_ADDRESS)
    // web3PresentAndValidated((res) => {
    //   if (!res) { this.web3Validated = false }
    //   else {
    //     this.createContractInstance()
    //   }
    // },
    // (acc) => {
    //   this.user.account = acc
    // })
  }
}
</script>

<style lang="scss">
#woonkly-country-selection {

  #terms-and-conditions {
    .wrapper {
      padding: 1em 0.5em;
      border: 1.5px solid #000;
      border-radius: 0.4em;
      & > p {
        padding: 0.5em;
        overflow: auto;
        max-height: 250px;
        text-align: justify;
      }

      ul > li {
        margin: 1em 0;
        &::before {
          content: "° ";
          font-weight: bolder;
        }
      }
    }
    .woonkly-checkbox {
      margin-top: 1.5em;
    }
  }

  #smartcontract-password {
    margin-bottom: 2em;
  }

  .columns > form {
    margin: auto;
  }
  .control {
    .select, .select > select {
      width: 100%;
    }
  }
}

.shrink-enter-active, .shrink-leave-active {
  transition: transform 800ms ease;
  transform-origin: top center;
}

.shrink-enter, .shrink-leave-to {
  transform: scaleY(0);
}

.shrink-enter-to, .shrink-leave {
  transform: scaleY(1);
}

// mobile-only styles
@media only screen and (max-width: 1024px) {
  #woonkly-country-selection {
    min-height: calc(100vh - 52px);
    box-sizing: border-box;
  }
}
</style>
