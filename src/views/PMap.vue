<template>
  <GmapMap id="map"
    :center="centerMarker"
    :zoom="zoom_level"
    map-type-id="roadmap"
    @dragstart="dragStart"
    @dragend="dragEnd"
    ref="mapRef"
    @click="createSpace"
  >
  <!-- style="width: 500px; height: 300px" -->
  <!--
  @idle="onIdle"
  @zoom_changed="zoomChanged"
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
          <v-card-title class="headline">{{ dialog_title }}</v-card-title>

          <v-card-text class="p_portal_page">
            {{ dialog_content }}
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

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="enterSpace"
              >
                예
              </v-btn>

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
import isPlace from '../plugins/placeDictionary'
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
      zindex: -1,
      p_position: {},
      msg: '',
      p_opacity: 0,
      after_init_markers:[],
      // dialog Data
      dialog: false,
      dialog_title: '',
      dialog_content: '',
      params: {
        id: ''
      }
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
      this.subSetCoords()

      this.$refs.mapRef.$mapPromise.then((map) => {
        this.$store.commit('setZoomLevel', map.zoom)
        console.log('This Store zoom level is : ', this.$store.state.zoom_level)
      })
    },

    dragStart: function (){
      console.log("dragStart ..........")
    },

    dragEnd: function() {
      console.log("drag End ..........")
      this.subSetCoords()
    },

    subSetCoords: function() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        let map_coords = {}
        map_coords.latitude = map.center.lat()
        map_coords.longitue = map.center.lng()
        this.$store.commit('setCoords', map_coords)
        // console.log("Map ref : ", map)
        // console.log('get CENTER : ',  JSON.stringify(map_coords))
        console.log('get CENTER : ',  map)
      })
     },

     createSpace: function(e) {
       let isKoreaAddress = false
       let _this = this

       var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
       // This is making the Geocode request
       var geocoder = new google.maps.Geocoder();
       geocoder.geocode({ 'latLng': latlng }, function (results, status) {
           if (status !== google.maps.GeocoderStatus.OK) {
               alert(' 바다 ');
           }
           // This is checking to see if the Geoeode Status is OK before proceeding
           if (status == google.maps.GeocoderStatus.OK) {
               // console.log(results);
               var address = (results[0].formatted_address);
               // console.log('COUNTRY ADDRESS IS :: ', address);
               let isKorea = ''
               isKorea = address.search("South Korea")
               // console.log('isKorea IS in function isKorea :: ', isKorea);
               // console.log('isKorea IS in function Address :: ', address);
               if(isKorea >= 0){
                 _this.p_promise(e)
               } else {
                 if (address.search("China") >= 0){
                   alert('중국서비스 준비중')
                 } else if(address.search("Japan") >= 0){
                   alert('일본서비스 준비중')
                 } else {
                   alert('해외서비스 준비중')
                 }

               }
           } // status
       }) // Geocoder
     }, // createSpace

    p_promise: function(e) {
      let _this = this
      let clickedZoom = this.$store.state.zoom_level

      //if KOREA service only abable
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+e.latLng.lng()+"&lat=" +e.latLng.lat()+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        // _this.center_name = res.data.addressInfo.adminDong
        // _this.params.id = res.data.addressInfo.adminDong
        // _this.$store.commit('setCurrentPosition', res.data.addressInfo)
        let buildingName = res.data.addressInfo.buildingName

        console.log('P Map Data from skt : ',res.data.addressInfo)
        console.log('P Map Data from skt : ',res.data.addressInfo.buildingName)

        let st_country_code = 'KR'
        let sk_city_do = res.data.addressInfo.city_do
        let sk_gu_gun = res.data.addressInfo.gu_gun
        let sk_adminDong = res.data.addressInfo.adminDong
        let sk_eup_myun = res.data.addressInfo.eup_myun
        let sk_ri = res.data.addressInfo.ri
        let sk_building_name = res.data.addressInfo.buildingName

        let params = {
          latitude:e.latLng.lat(),
          longitude: e.latLng.lng(),
          country_code: st_country_code,
          city_do: sk_city_do,
          gu_gun: sk_gu_gun,
          adminDong: sk_adminDong,
          eup_myun: sk_eup_myun,
          ri: sk_ri,
          building_name: sk_building_name
          // portal_name: res.data.addressInfo.adminDong +' 정보센터',
          // countryCode: 'KR',
          // political_type: 'adminDong'
        }

        if(clickedZoom >= 12){
          // Space or Info center
          if(isPlace.getPlace(clickedZoom, buildingName)) {
            // big Place
            console.log('This is BUILDING  .........................')
            // find space New API
            axios.get(p_env.BASE_URL+'/vue/getSpace', {
              params: params
            })
            .then(res => {
              let currentInfo = {}
              currentInfo.id = res.data.data.id
              currentInfo.name = res.data.data.portal_name
              _this.$store.commit('setCurrentId', currentInfo)
              console.log ('Skt send request and get data below ************************************************')
              console.log('PMap Space : ', res.data.data)
              // console.log('PMap Space : ', res.data.data.id)
              // console.log('PMap Space : ', _this.$store.state.currentName)
              // Dialog on
              _this.dialog_title = res.data.data.portal_name
              _this.dialog_content = '부동산을 소유해 보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
              _this.dialog = true
            }) // end of axios vue/getInfoCenter
          } else {
            // info center
            console.log('This is INFO CENTER .........................')
            // Get Postal Basic Info
            axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
              params: params
            })
            .then(res => {
              let currentInfo = {}
              currentInfo.id = res.data.data.id
              currentInfo.name = res.data.data.portal_name
              _this.$store.commit('setCurrentId', currentInfo)
              console.log ('Skt send request and get data below ************************************************')
              console.log('PMap 1, Get info center : ', res.data.data)
              console.log('PMap 1, Get info center : ', res.data.data.id)
              console.log('PMap 1, Get info center : ', _this.$store.state.currentName)
              // Dialog on
              _this.dialog_title = res.data.data.portal_name
              _this.dialog_content = '직접민주주의를 할 수 있습니다. 동네분들과 의견을 나눠보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
              _this.dialog = true
            }) // end of axios vue/getInfoCenter
          }
        } else {
          // info Center
          // Get Postal Basic Info
          axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
            params: params
          })
          .then(res => {
            let currentInfo = {}
            currentInfo.id = res.data.data.id
            currentInfo.name = res.data.data.portal_name
            _this.$store.commit('setCurrentId', currentInfo)
            console.log ('Skt send request and get data below ************************************************')
            console.log('PMap 2, Get info center : ', res.data.data)
            console.log('PMap 2, Get info center : ', res.data.data.id)
            console.log('PMap 2, Get info center : ', _this.$store.state.currentName)

            _this.dialog_title = res.data.data.portal_name
            _this.dialog_content = '직접민주주의를 할 수 있습니다. 동네분들과 의견을 나눠보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
            _this.dialog = true
          }) // end of axios vue/getInfoCenter

        } // Outter if

      }) // SKT then
    }, // p_promise

    enterSpace: function() {
      this.$router.push({name: 'portalPage', params:{id: 'test'}})

    }, // enterSpace

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

   console.log('20180718 - mapref : ', this.$refs.mapRef)

   this.$refs.mapRef.$on('zoom_changed', this.zoomChanged)

   let init=this.$store.state.init

   if(init){
     this.centerMarker.lat = this.markers[0].position.lat
     this.centerMarker.lng = this.markers[0].position.lng

   } else {
     this.zoom_level = this.$store.state.zoom_level
     this.after_init_markers = this.$store.state.markers

     this.centerMarker.lat = this.after_init_markers[0].position.lat
     this.centerMarker.lng = this.after_init_markers[0].position.lng
   }

    this.$store.watch(this.$store.getters.watchZoom, zoom_level => {
      // console.log('watched: ddddddd : ' , zoom_level)

      this.zoom_level = zoom_level

      // let e = zoom_level
      // switch(e){
      //   case 'adminDong':
      //     this.zoom_level = 16
      //   break;
      //   case 'gu_gun':
      //     this.zoom_level = 14
      //   break;
      //   case 'city_do':
      //     this.zoom_level = 11
      //   break;
      //   case 'country':
      //     this.zoom_level = 7
      //   break;
      //   case 'world':
      //     this.zoom_level = 3
      //   break;
      // }

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
} // export default
</script>
