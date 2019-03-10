import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import SVG from 'svg.js/dist/svg'
import './theme.sass'
import Multiselect from 'vue-multiselect'

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')