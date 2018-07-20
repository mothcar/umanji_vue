import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from './views/MainContainer.vue'
import PostContainer from './views/PostContainer.vue'
import Login from './components/Login.vue'
import About from './views/About.vue'
import GMap from './views/MapContainer.vue'
import MainLogin from './components/MainLogin.vue'
import SecureLogin from './views/SecureLogin.vue'
import SpacePage from './views/SpacePage.vue'
import PostEditor from './views/PostEditor.vue'
import Profile from './views/Profile.vue'

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
      path: '/secureLogin',
      name: 'secureLogin',
      component: SecureLogin
    },
    {
      path: '/spacePage/:id',
      name: 'spacePage',
      component: SpacePage
    },
    {
      path: '/postEditor',
      name: 'postEditor',
      component: PostEditor
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }

  ]
})
