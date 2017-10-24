import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      redirect: '/tiresias-cli'
    },
    {
      path: '*',
      name: 'TiresiasCli',
      component: () => import('./components/TiresiasCli')
    }
  ]
})
