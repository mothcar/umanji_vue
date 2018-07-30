<template>
  <div>
    <v-toolbar color="cyan" dark  tabs  fixed >
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ map_title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <GmapMap id="map"
        :center="{lat:37.5879373, lng:127.0021053}"
        :zoom="7"
        map-type-id="roadmap"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
  </div>

</template>

<script>
export default {
  data() {
    return {
      // mapSettings,
      centerMarker: {lat:37.4989034, lng:126.9258932},
      zoom_level: 18,
      zindex: -1,
      p_position: {},
      msg: '',
      p_opacity: .4,
      markers: [],

      map_title: '회원관리',
      rightDrawer: false
    }
  },

  mounted() {
  }, // mounted

  methods: {

  },

  components: {

  }

} // export default

</script>

<style>
/* #map {
  height: 100vh;
  width: 100%;
} */
</style>
