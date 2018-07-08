import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from './views/MainContainer.vue'
import PostContainer from './views/PostContainer.vue'
import Login from './components/Login.vue'
import About from './views/About.vue'
import GMap from './views/MapContainer.vue'
import Dong from './components/dong.vue'
import Sido from './components/sido.vue'
import Gugun from './components/gugun.vue'
import Country from './components/country.vue'
import World from './components/world.vue'
import MainLogin from './components/MainLogin.vue'
import Secure from './views/Secure.vue'
import SecureLogin from './views/SecureLogin.vue'
import PortalPage from './views/PortalPage.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainContainer
    },
    {
      path: '/login',
      name: 'login',
      component: MainLogin
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/map',
      name: 'map',
      component: GMap
    },
    {
      path: '/gugun',
      name: 'gugun',
      component: Gugun
    },
    {
      path: '/sido',
      name: 'sido',
      component: Sido
    },
    {
      path: '/dong',
      name: 'dong',
      component: Dong
    },
    {
      path: '/country',
      name: 'country',
      component: Country
    },
    {
      path: '/world',
      name: 'world',
      component: World
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure
    },
    {
      path: '/secureLogin',
      name: 'secureLogin',
      component: SecureLogin
    },
    {
      path: '/portalPage/:id',
      name: 'portalPage',
      component: PortalPage
    }

  ]
})
