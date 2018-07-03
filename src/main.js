import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

// axios NOT Going *************************************************************
// import axios from 'axios'
// Vue.use(axios)
// axios NOT Going *************************************************************


// axios Going *****************************************************************
window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Vue.prototype.$http = window.axios
// axios Going *****************************************************************


// axios Deep Learn  ***********************************************************
// axios.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//   console.log("my axios Error meaasge : ", error.response.status)
//     // Do something with response error
//     if (error.response.status === 401) {
//         console.log('unauthorized, logging out ...');
//         // auth.logout();
//         // router.replace('/auth/login');
//     }
//     return Promise.reject(error.response);
// });
// axios Deep Learn  ***********************************************************

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
