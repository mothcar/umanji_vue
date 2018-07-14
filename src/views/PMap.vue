<template>
  <GmapMap id="map"
    :center="centerMarker"
    :zoom="zoom_level"
    map-type-id="roadmap"
    @zoom_changed="someFunc"
    ref="mapRef"
    @click="my_click"
  >
  <!-- style="width: 500px; height: 300px" -->
  <!--
  https://developers.google.com/maps/documentation/javascript/maptypes
  map-type-id="terrain" /roadmap / satellite / hybrid
  -->
    <GmapMarker ref="myMarker"
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      @click="test(index)"
    >
    <GmapInfoWindow>(Your content here)</GmapInfoWindow>
  </GmapMarker>
    <!-- @click="center=m.position" -->

    <!-- Dialog ******************************************************************************** -->
    <v-layout row justify-center>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">로그인 하시겠습니까?</v-card-title>

          <v-card-text class="p_portal_page">
            동네사람들에게 좋은 정보를 제공하시면 계급이 승급됩니다.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              아니오
            </v-btn>

            <router-link :to="{ name: 'secureLogin', params: {} }">
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="login"
              >
                예
              </v-btn>
            </router-link>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- Dialog ******************************************************************************** -->

  </GmapMap>
</template>
<script>
// import mapSettings from '../plugins/mapSettings';

export default {
  name: "PMap",

  inject: ['changeTab'],

  props: {
    markers: Array
  },

  data() {
    return{
      // markers : []
      // mapSettings,
      centerMarker: {},
      zoom_level: 18,
      dialog: false
    }
  },

  methods: {
    test: function(index) {
      let info = this.markers[index]
      console.log("Marker Clicked .....", info)
    },

    someFunc: function(){
      console.log("zoom changed..........")

    },

    my_click: function(e) {
      console.log("Map clicked.........: ", e.latLng.lat())
      this.createPost()
    },

    createPost: function() {
      // @click.stop="dialog = true"
      if(this.$store.state.authenticated == true) {
        this.$router.push({name: 'postEditor'})
        // console.log("PostContainer : dialog is true")
      } else {
        this.dialog = true
      }
      // console.log("PostContainer : Write post clicked...")
    },

    login: function() {
      this.dialog = false
    },

    myMarker: function() {
      console.log("My marker")
    }


  }, // methods

  computed: {



  },

  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)

    // this.$refs.mapRef.$mapPromise.then((map) => {
    //   map.panTo({lat: 1.38, lng: 103.80})
    // })

   //  this.$refs.mapRef.$mapPromise.then((map) => {
   //    console.log("Map ref : ", map)
   // })





    this.$store.watch(this.$store.getters.watchZoom, zoom_level => {
      // console.log('watched: ddddddd : ' , zoom_level)

      let e = zoom_level
      switch(e){
        case 'adminDong':
          this.zoom_level = 20
        break;
        case 'gu_gun':
          this.zoom_level = 15
        break;
        case 'city_do':
          this.zoom_level = 12
        break;
        case 'country':
          this.zoom_level = 6
        break;
        case 'world':
          this.zoom_level = 2
        break;
      }
      // this.markers = this.$store.state.markers
      // return this.$store.state.visible
    }) // this.$store.watch



    this.centerMarker.lat = this.markers[0].position.lat
    this.centerMarker.lng = this.markers[0].position.lng
    // console.log("PMAP...... data type : ", this.centerMarker)

    // this.markers = this.$store.state.markers
    // this.markets = this.$store.state.markers
    // console.log("Map markers  : ", this.markers)



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
