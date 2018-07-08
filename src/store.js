import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visible: true,
    zoom_level: 18,
    emailentry:'',
    token:'',
    authenticated: false,
    country: '',
    city_do: '',
    gu_gun: '',
    legalDong: '',
    eup_myun: '',
    ri: '',
    bunji: ''
  },

  mutations: {
    saveToken (state, payload) {
      state.token = payload
    },

    auth (state, payload) {
      state.authenticated = payload
    },

    // toMap: state => state.list_mode = 'map',
    toMap (state, payload) {
      state.visible = payload
    },

    toPost (state, payload) {
      state.visible = payload
    },

    changeZoomLevel (state, payload) {
      state.zoom_level = payload
    },

    setCurrentPosition (state, payload) {
      state.city_do = payload.city_do
      state.gu_gun = payload.gu_gun
      state.legalDong = payload.legalDong
      state.eup_myun = payload.eup_myun
      state.ri = payload.ri
      // console.log("Store.js : " , payload.legalDong)
    }

  },  // mutations

  /*
  city_do
  gu_gun
  legalDong
  eup_myun
  ri
  bunji
  */

  actions: {
    setCurrentPosition (context) {
      context.commit('setCurrentPosition')
    }
  } //action

})
