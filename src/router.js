import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import selectMerchandises from './views/Select.vue'
import map from './views/Map.vue'
import Download from './views/Download.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/select/:group/:name',
      name: 'select',
      component: selectMerchandises
  },
    {
      path: '/map/:group/:name/route/:items',
      name: 'map',
      component: map
    }
  ]
})
