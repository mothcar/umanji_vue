import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visible: true,
    zoom_level: 18

  },
  mutations: {
    // toMap: state => state.list_mode = 'map',
    toMap (state, payload) {
      state.visible = payload
    },

    toPost (state, payload) {
      state.visible = payload
    },

    changeZoomLevel (state, payload) {
      state.zoom_level = payload
    }

  },  // mutations

  actions: {

  }
})
