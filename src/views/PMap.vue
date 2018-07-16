<template>
  <GmapMap id="map"
    :center="centerMarker"
    :zoom="zoom_level"
    map-type-id="roadmap"
    @zoom_changed="zoomChanged"
    ref="mapRef"
    @click="createSpace"
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
      :opacity="p_opacity"

    >
    <GmapInfoWindow class="p_ifw" :zIndex="zindex" >
      <!-- <div>
        <img src="../assets/default_avatar.jpg" />
        {{ m.info.portal_rid }}
      </div> -->
      <v-flex xs4 sm2 md1>
      <v-avatar
          slot="activator"
          size="36px"
        >
          <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">


        </v-avatar>
        {{ m.info.portal_rid }}
      </v-flex>

      </GmapInfoWindow>
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

<style scoped>
.gm-style .gm-style-iw {
  background: #333;
}

#map {
  height: 100vh;
  width: 100%;
}
</style>

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
      dialog: false,
      zindex: -1,
      p_position: {},
      msg: '',
      p_opacity: 0,
      after_init_markers:[]
    }
  },

  create: function() {

  },

  updated: function() {

  },

  methods: {
    test: function(index) {
      let info = this.markers[index]
      // console.log("Marker Clicked .....", info)
    },

    zoomChanged: function(){
      console.log("zoom changed..........")

    },

    createSpace: function(e) {
      console.log("Map clicked.........: ", e.latLng.lat())

      // var coords = {}
      // coords.lat = e.latLng.lat()
      // coords.lng = e.latLng.lng()

      //*** Reversegeocoding from SKTelecom
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+e.latLng.lng()+"&lat=" +e.latLng.lat()+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        // _this.center_name = res.data.addressInfo.adminDong
        // _this.params.id = res.data.addressInfo.adminDong
        // _this.$store.commit('setCurrentPosition', res.data.addressInfo)

        console.log('P Map Data from skt : ',res.data.addressInfo)
        
        axios.post(p_env.BASE_URL+'/vue/createPost', {

        })
        .then(res=>{

        })
        .catch(error => {
          console.log(error.message);
        }) // axios

      }) // then

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
      // console.log("My marker")
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

   let init=this.$store.state.init

   if(init){
     this.centerMarker.lat = this.markers[0].position.lat
     this.centerMarker.lng = this.markers[0].position.lng

   } else {
     this.after_init_markers = this.$store.state.markers

     this.centerMarker.lat = this.after_init_markers[0].position.lat
     this.centerMarker.lng = this.after_init_markers[0].position.lng
   }







    this.$store.watch(this.$store.getters.watchZoom, zoom_level => {
      // console.log('watched: ddddddd : ' , zoom_level)

      let e = zoom_level
      switch(e){
        case 'adminDong':
          this.zoom_level = 16
        break;
        case 'gu_gun':
          this.zoom_level = 14
        break;
        case 'city_do':
          this.zoom_level = 11
        break;
        case 'country':
          this.zoom_level = 7
        break;
        case 'world':
          this.zoom_level = 3
        break;
      }
      // this.markers = this.$store.state.markers
      // return this.$store.state.visible
    }) // this.$store.watch





    // console.log("Check ..... markers : ", this.markers)
    // console.log("PMAP...... data type : ", this.centerMarker)

    // this.markers = this.$store.state.markers
    // this.markets = this.$store.state.markers
    // console.log("Map markers  : ", this.markers)



    // console.log("Map ref : ", this.$refs)

  }
}
</script>
