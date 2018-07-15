import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    init: true,
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
    currentId: '',
    currentName: '',
    latitude: '',
    longitude: '',
    world: '세계',
    country: '대한민국',
    city_do: '',
    gu_gun: '',
    adminDong: '',
    legalDong: '',
    eup_myun: '',
    ri: '',
    bunji: '',
    tabState: 'adminDong',
    markers: []
  },

  getters: {
    changeDong: state => {
      console.log("Here is store.........")
      return state.tabState
    },

    getN: state => () => state.tabState,

    // firstCheck: state => () => state.adminDong

    firstCheck: state => {
      return () => {
        // console.log("THE STRE......., : ", state)
        return state.adminDong
      }
    },
    //
    markerCheck: state => {
      return () => {
        // console.log("THE STORE......., : ", state)
        return state.markers
      }
    },

    watchZoom: state => {
      return () => {
        console.log("THE STORE.......Zoom, : ", state.zoom_level)
        return state.zoom_level
      }
    }


  },

  mutations: {
    // saveToken (state, payload) {
    //   state.token = payload
    // },

    setInit(state, payload) {
      state.init = payload
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
    },

    changeTabState(state, payload) {
      state.tabState = payload
    },

    setCurrentId(state, payload) {
      state.currentId = payload.id
      state.currentName = payload.name
    },

    setMarkers(state, payload) {

      for(var i=0; payload.length > i; i++) {
        state.markers[i] = payload[i]
        // console.log('Store markers save: ',state.markers)
      }
      // this.getters.markerCheck()
      // state.makers
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
