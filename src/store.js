import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visible: true,
    zoom_level: 18,
    emailentry:'',
    authenticated: false,
    // user Data
    id: '',
    token:'',
    email: '',
    phone: '',
    user_name: '',
    photos: '',
    money: 0,
    // Current position Data
    latitude: '',
    longitude: '',
    country: '',
    city_do: '',
    gu_gun: '',
    adminDong: '',
    legalDong: '',
    eup_myun: '',
    ri: '',
    bunji: ''
  },

  mutations: {
    // saveToken (state, payload) {
    //   state.token = payload
    // },

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
      state.adminDong = payload.adminDong
      state.eup_myun = payload.eup_myun
      state.ri = payload.ri
      // console.log("Store.js : " , payload.legalDong)
    },

    setCoords (state, payload) {
      state.latitude = payload.latitude
      state.longitude = payload.longitude
    },

    setUserInfo (state, payload) {
      state.id = payload.user.id
      state.email = payload.user.email
      state.phone = payload.user.phone
      state.user_name = payload.user.user_name
      state.photos = payload.user.photos
      state.money = payload.user.money
      state.token = payload.token
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
