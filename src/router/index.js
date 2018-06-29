import Vue from 'vue'
import Router from 'vue-router'
// App components
import Home from '@/components/Home'
import ContrySelection from '@/components/CountrySelection'
import RegisterUser from '@/components/RegisterNewUser'
import WinnerSelection from '@/components/WinnerSelection'
import VoteWinners from '@/components/VoteWinners'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/gamble/:hash',
      component: ContrySelection
    },
    {
      path: '/register',
      component: RegisterUser
    },
    {
      path: '/winners',
      component: WinnerSelection
    },
    {
      path: '/vote',
      component: VoteWinners
    }
  ]
})
