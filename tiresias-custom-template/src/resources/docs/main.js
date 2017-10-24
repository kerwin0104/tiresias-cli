import Vue from 'vue'
import App from './spa/App'
import router from './spa/router'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
