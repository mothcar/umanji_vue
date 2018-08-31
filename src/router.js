import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from './views/MainContainer.vue'
import PostContainer from './views/PostContainer.vue'
import Login from './components/Login.vue'
// import About from './views/About.vue'
// import GMap from './views/MapContainer.vue'
import MainLogin from './components/MainLogin.vue'
import SecureLogin from './views/SecureLogin.vue'
import SpacePage from './views/SpacePage.vue'
import PostEditor from './views/PostEditor.vue'
import Profile from './views/Profile.vue'
import Wallet from './views/Wallet.vue'
import OtherProfile from './views/OtherProfile.vue'
import SpaceSetting from './views/SpaceSetting.vue'
import ManagerMap from './views/management/ManagerMap.vue'
import ManageHome from './views/management/ManageHome.vue'
import Message from './views/Message.vue'
import GoogleAnalytics from './views/GoogleAnalytics.vue'
import TestLab from './GARAGE/test_main.vue'

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
      path: '/testLab',
      name: 'testLab',
      component: TestLab
    },
    {
      path: '/login',
      name: 'login',
      component: MainLogin
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
      path: '/postEditor/:data',
      name: 'postEditor',
      component: PostEditor
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/otherprofile',
      name: 'otherprofile',
      component: OtherProfile
    },
    {
      path: '/spaceSetting/:data',
      name: 'spaceSetting',
      component: SpaceSetting
    },
    {
      path: '/managerMap',
      name: 'managerMap',
      component: ManagerMap
    },
    {
      path: '/manageHome',
      name: 'manageHome',
      component: ManageHome
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/googleAnalytics',
      name: 'googleAnalytics',
      component: GoogleAnalytics,
      meta: {
        title: 'Hello Analytics Reporting API V4',
        metaTags: [
          {
            name: 'google-signin-client_id',
            content: '263376258632-vnl8i3q9mqo4eavmssv0hrqqhilrvpu1.apps.googleusercontent.com'
          },
          {
            name: 'google-signin-scope',
            content: 'https://www.googleapis.com/auth/analytics.readonly'
          }
        ]
      },
    }



  ]
})
