import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/CountrySelection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    }
  ]
})
