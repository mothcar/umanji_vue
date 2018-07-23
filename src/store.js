import Vue from 'vue'
import Vuex from 'vuex'
import util from './plugins/levels'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    init: true,
    visible: true,
    country_code: '',
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
    place_type: '',
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
    building_name: 'some name',
    // Map Plcae Info
    p_place_type: '',
    p_id: '',
    p_place_name: '',
    p_about_info: {},
    p_admin_dong_code: '',
    p_admin_id: '',
    p_building_index: '',
    p_country: '',
    p_locality : '',
    p_sublocality1 : '',
    p_sublocality2: '',
    p_sublocality3 : '',
    p_owner_id : '',
    p_valuation: '',

    //Marker Info
    content: '',

    // Etc
    tabState: 'adminDong',
    markers: [],
    infowindow_rid: '',
    map_ref:{}
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
      state.visible = payload.isInfo
      state.p_place_type = payload.placeType
    },

    toPost (state, payload) {
      state.visible = payload
    },

    changeZoomLevel (state, payload) {
      state.zoom_level = util.areaToLevel(payload)
    },

    setZoomLevel (state, payload) {
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
      state.p_id = payload.id
      state.currentName = payload.name
      state.p_place_type = payload.placeType
    },

    setMarkers(state, payload) {

      for(var i=0; payload.length > i; i++) {
        state.markers[i] = payload[i]
        // console.log('Store markers save: ',state.markers)
      }
      // this.getters.markerCheck()
      // state.makers
    },

    setCountryCode(state, payload) {
      state.country_code = payload
    },

    setPlaceInfo(state, payload) {
      state.p_place_type = payload.place_type
      state.p_id = payload.id
      state.p_place_name = payload.place_name
      state.p_about_info = payload.about_info
      state.p_admin_dong_code = payload.admin_dong_code
      state.p_admin_id  = payload.admin_id
      state.p_building_index = payload.building_index
      state.p_country = payload.country
      state.p_locality = payload.locality
      state.p_sublocality1  = payload.sublocality1
      state.p_sublocality2 = payload.sublocality2
      state.p_sublocality3  = payload.sublocality3
      state.p_owner_id  = payload.owner_id
      state.p_valuation = payload.valuation
    },

    setRouterParams(state, payload) {
      state.p_id = payload.s_rid
      state.p_place_type = payload.place_type
    },

    setMapRef(state, payload){
      state.map_ref = payload
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
