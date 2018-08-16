import Vue from 'vue'
import Vuex from 'vuex'
import util from './plugins/levels'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    init: true,
    visible: true,
    country_code: '',
    zoom_level: 17,
    emailentry:'',
    authenticated: false,
    // user Data
    user_junk: '',  // object DATA
    id: '',
    token:'',
    email: '',
    phone: '',
    user_name: '손님',
    roles: '',
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

    //Marker Info
    content: '',

    // route Data
    route_id: '',
    reverse_route_data: '',

    // Etc
    tabState: 'sublocality1',
    markers: [],
    infowindow_rid: '',
    map_ref:{},

    // new Current Place (address)
    current_place: {},
    // infocenter_data: '',
    placeInfo: '',
    currentTabName: '',
    currentTabType: ''
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

    setCurrentPlace (state, payload) {
      state.current_place = payload
    },

    setCurrentLocation (state, payload) {
      state.latitude = payload.latitude
      state.longitude = payload.longitude
    },

    setUserInfo (state, payload) {
      state.id = payload.user.id
      state.email = payload.user.email
      state.phone = payload.user.phone
      state.user_name = payload.user.user_name
      state.roles = payload.user.roles
      state.photos = payload.user.photos
      state.money = payload.user.money
      state.token = payload.token
      state.user_junk =payload
    },

    changeTabState(state, payload) {
      state.currentTabName = payload.portal_name
      state.currentTabType = payload.political_type
      state.tabState = payload.political_type
    },

    setReverseRouteData(state, payload) {
      state.reverse_route_data = payload
    },

    // setCenterData(state, payload) {
    //   state.infocenter_data = payload
    // },

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
      state.p_creator_id  = payload.creator_id
      state.p_creator_name  = payload.creator_name
      state.p_valuation = payload.valuation
    },

    setRouterParams(state, payload) {
      state.p_id = payload.s_rid
      state.p_place_type = payload.place_type
      state.p_place_name = payload.place_name
    },

    setMapRef(state, payload){
      state.map_ref = payload
    },

    setCreatorId(state, payload){
      state.p_creator_id = payload.creator_id
    },

    setNewPlaceInfo(state, payload){
      state.placeInfo = payload
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
    setCurrentPlace (context) {
      context.commit('setCurrentPlace')
    }
  } //action

})
