import Vue from 'vue'
import Router from 'vue-router'
// App components
import ContrySelection from '@/components/CountrySelection'
import RegisterUser from '@/components/RegisterNewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ContrySelection
    },
    {
      path: '/register',
      component: RegisterUser
    }
  ]
})
