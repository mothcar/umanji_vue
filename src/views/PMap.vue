<template>
  <GmapMap id="map"
    :center="markers[0].position"
    :zoom="18"
    map-type-id="roadmap"
  >
  <!-- style="width: 500px; height: 300px" -->
  <!--
  https://developers.google.com/maps/documentation/javascript/maptypes
  map-type-id="terrain" /roadmap / satellite / hybrid
  -->
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>
<script>
export default {
  name: "PMap",

  props: {
    markers: Object
  },

  data() {
    return{
      // markers : []
    }
  },

  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 1.38, lng: 103.80})
    // })

    // this.markers = this.$store.state.markers
    // this.markets = this.$store.state.markers
    console.log("Map markers  : ", this.markers)

    // this.$store.watch(this.$store.getters.markerCheck, markers => {
    //   console.log('watched: ddddddd', this.markers)
    //   this.markers = this.$store.state.markers
    // }) // this.$store.watch

    // console.log("Map ref : ", this.$refs)

  }
}
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
