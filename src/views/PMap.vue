<template>

  <div app-data>



  <GmapMap id="map"
    :center="centerMarker"
    :zoom="zoom_level"
    map-type-id="roadmap"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @idle="onIdle"
    ref="mapRef"
    @click="createPlace"
  >

  <!-- style="width: 500px; height: 300px" -->
  <!--
  @idle="onIdle"

  @zoom_changed="zoomChanged"
  https://developers.google.com/maps/documentation/javascript/maptypes
  map-type-id="terrain" /roadmap / satellite / hybrid
-->


      <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :opacity="p_opacity" >

        <GmapInfoWindow
        :clickable="true" >
        <!--
        <gmap-info-window
          :options="{maxWidth: 300}"
          :position="infoWindow.position"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open=false">
          <div v-html="infoWindow.template"></div>
        </gmap-info-window>
        -->
          <!-- <div>
            <img src="../assets/default_avatar.jpg" />
            {{ m.info.s_rid }}
          </div> -->
          <v-flex xs12 sm12 md12>
          <v-avatar
              slot="activator"
              size="36px"
            >
              <img :src="m.info.photos[0]" @click="showProfile(index)">
            </v-avatar>

            <div @click="linkToPage(index)">
              {{ m.info.s_rid }}  {{ m.info.content }}
            </div>

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
                @click="enterPlace"
              >
                예
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- Dialog ******************************************************************************** -->




  </GmapMap>


  <div class="image-overlay">
    <!-- ads ******************************************************************************** -->
    <img class="ads" src="../assets/images/ads_default.jpg" @click="linkToHomePage"/>
    <!-- ads ******************************************************************************** -->
  </div>
</div>

</template>

<style>
.gm-style .gm-style-iw {
  background: #fff;
  top: 10px;
}

.image-overlay {
  height: 1px;
}

.image-overlay .ads{
  position: absolute;
  max-width: 50%;
  max-height: 50%;
  bottom: 40px;
  left: 0px;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.vue-map-container {
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
    // markers: Array
  },

  // watch: {
  //   $route (to, from){
  //     console.log('20170728 - to.params.id ON MAP : ', to.params.id)
  //   }
  // },

  data() {
    return{
      // mapSettings,
      centerMarker: {lat:37.4989034, lng:126.9258932},
      zoom_level: 18,
      zindex: -1,
      p_position: {},
      msg: '',
      p_opacity: .4,
      // after_init_markers:[],
      // dialog Data
      dialog: false,
      dialog_title: '',
      dialog_content: '',
      params: {
        id: ''
      },
      markers: [],
      infoWindow: { position: {
          lat: 0,
          lng: 0
        }
      },
      mapInit: false,
      default_user: require('../assets/images/default_user.jpg'),
      ads: true
    }
  },

  create: function() {

  },

  updated: function() {

  },

  methods: {
    moveCurrentLocation : function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.centerMarker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    showProfile(idx){
      let info = this.markers[idx].info
      let r_params = {}
      console.log("20180724 - Store DATA .....", info )
      r_params.creator_id = info.creator_id

      this.$store.commit('setCreatorId', r_params)

      // send Profile id to Store
      this.$router.push({name: 'profile'})
    },

    linkToPage: function(index) {
      let info = this.markers[index].info
      console.log("20180727 - Marker Clicked .....", info)
      let r_params = {}
      // r_params.s_rid = info.s_rid
      // r_params.place_type = info.place_type
      // r_params.place_name = info.position_name
      //
      // this.$store.commit('setRouterParams', r_params)
      // let placeType = this.$store.state.markers[index].place_type
      // send place type to spacepage
      // console.log("20180722 - Store DATA .....", this.$store.state )
      this.$router.push({ name: 'spacePage', params:{id: info}})

    },

    zoomChanged: function(){
      console.log("zoom changed..........")
      // this.subSetCoords()

      this.$refs.mapRef.$mapPromise.then((map) => {
        this.$store.commit('setZoomLevel', map.zoom)
        // console.log('This Store zoom level is : ', this.$store.state.zoom_level)
      })
    },

    dragStart: function (){
      console.log("dragStart ..........")
    },

    dragEnd: function() {
      console.log("drag End ..........")
      // this.subSetCoords()
    },

    // EVENT MOVE ZOOM CHANGE ***************************************************************************************
    onIdle: function() {
      this.subSetCoords()
      console.log("on Idle ..........")
    },
    // EVENT MOVE ZOOM CHANGE ***************************************************************************************

    subSetCoords: function() {
      // let _this = this

      this.$refs.mapRef.$mapPromise.then((map) => {
        console.log("20180723 - setCurrentLocation MAP REF  : ", map )
          // console.log("20180723 - MAP CENTER : ",map.center.lat() )
          let map_coords = {}
          map_coords.latitude = map.center.lat()
          map_coords.longitude = map.center.lng()
          this.$store.commit('setCurrentLocation', map_coords)
          // console.log("Map ref : ", map)
          // console.log('get CENTER : ',  JSON.stringify(map_coords))
          // console.log('get CENTER : ',  map)

          //****************************************************************************************
          axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+map.center.lng()+"&lat=" +map.center.lat()+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
          .then(res => {

            let buildingName = res.data.addressInfo.buildingName

            console.log('Lottelia  Data from skt : ',res.data.addressInfo)
            this.$store.commit('setCurrentPlace', res.data.addressInfo)

          }) // then
          //****************************************************************************************

          // console.log('get marker params adminDong : ', this.$store.state.adminDong+' & zoom level is : '+this.$store.state.zoom_level)

          let placeParams = {}
          placeParams.latitude = map.center.lat()
          placeParams.longitude = map.center.lng()
          placeParams.zoom = this.$store.state.zoom_level

          this.findPostMarkers(placeParams)


      }) // $refs
     },

     findPostMarkers: function(placeParams){

       axios.get(p_env.BASE_URL+'/vue/findMapPostMarkers', {
         params: placeParams
       })
       .then(res => {
         this.markers = []

         console.log('20180723 - get Markers DATA : ', res.data.data)
         let old_arr = res.data.data
         // console.log('20180718 - position type : ', res.data.data[0].location.coordinates[1])
         const uniqList = old_arr.filter((s1, pos, arr) => arr.findIndex((s2)=>s2.s_rid === s1.s_rid) === pos)
         console.log('20180727 - uniqList: ', uniqList)

         for (var i = 0, len = uniqList.length; i < len; i++) {
           // data 없을때 이 error : Uncaught (in promise) TypeError: Cannot read property 'location' of undefined
           let obj = { position:{}, info:{}}
           obj.position.lat = uniqList[i].location.coordinates[1]
           obj.position.lng = uniqList[i].location.coordinates[0]
           obj.info.s_rid = uniqList[i].s_rid
           obj.info.place_name = uniqList[i].place_name
           obj.info.zoom_level = this.$store.state.zoom_level
           obj.info.creator_id = uniqList[i].creator_id
           obj.info.creator_name = this.$store.state.user_name,
           obj.info.photos = uniqList[i].photos
           obj.info.place_type = uniqList[i].place_type
           obj.info.country = uniqList[i].country
           obj.info.locality = uniqList[i].locality
           obj.info.sublocality1 = uniqList[i].sublocality_level_1
           obj.info.sublocality2 = uniqList[i].sublocality_level_2
           obj.info.location = uniqList[i].location
           obj.info.link_url = uniqList[i].link_url
           obj.info.content = uniqList[i].content
           obj.info.index = uniqList[i].i
           // shrink marker number when it's parent id is equal
           this.markers[i] = obj
           // console.log("content lat lng : ", _this.markers)
         } // for
         this.$store.commit('setMarkers', this.markers)

       }) // axios


     }, //findPostMarkers

     createPlace: function(e) {
       let isKoreaAddress = false
       let _this = this

       var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
       let coords = {}
       coords.latitude = e.latLng.lat()
       coords.longitude = e.latLng.lng()

       console.log('20180721 - latlng : ', latlng)
       this.$store.commit('setCurrentLocation', coords)
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
                 _this.sub_createPlace(e)
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
     }, // createPlace

    sub_createPlace: function(e) {
      let _this = this
      let clickedZoom = this.$store.state.zoom_level

      //if KOREA service only abable
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+e.latLng.lng()+"&lat=" +e.latLng.lat()+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        let buildingName = res.data.addressInfo.buildingName

        console.log('P Map Data from skt : ',res.data.addressInfo)
        console.log('P Map Data from skt BUILDING NAME  : ',buildingName)

        let st_country_code = 'KR'
        let sk_city_do = res.data.addressInfo.city_do
        let sk_gu_gun = res.data.addressInfo.gu_gun
        let sk_adminDong = res.data.addressInfo.adminDong
        let sk_eup_myun = res.data.addressInfo.eup_myun
        let sk_ri = res.data.addressInfo.ri
        let sk_building_name = res.data.addressInfo.buildingName

        let placeParams = {
          latitude:e.latLng.lat(),
          longitude: e.latLng.lng(),
          country: st_country_code,
          locality: sk_city_do,
          sublocality_level_1: sk_gu_gun,
          sublocality_level_2: sk_adminDong,
          sublocality_level_3: sk_ri,
          place_name: sk_building_name,
          admin_dong_code: res.data.addressInfo.adminDongCode,
          building_index: res.data.addressInfo.buildingIndex
          // portal_name: res.data.addressInfo.adminDong +' 정보센터',
          // countryCode: 'KR',
          // political_type: 'adminDong'
        }

        let location = {}
        location['@class'] = 'OPoint'
        location.coordinates = [e.latLng.lng(), e.latLng.lat()]

        if(clickedZoom >= 12){
          // Place or Info center
          if(isPlace.getPlace(clickedZoom, buildingName)) {

            // big Place
            console.log('This is BUILDING  .........................')

            // find Place create Place New API
            axios.get(p_env.BASE_URL+'/vue/getPlace', {
              params: placeParams
            })
            .then(res => {
              let placeInfo = {}
              placeInfo.place_type = 'place'
              placeInfo.id = res.data.data.id
              placeInfo.place_name = res.data.data.place_name
              placeInfo.about_info = res.data.data.about_info
              placeInfo.admin_dong_code = res.data.data.admin_dong_code
              placeInfo.admin_id = res.data.data.admin_id
              placeInfo.location = location
              placeInfo.building_index = res.data.data.building_index
              placeInfo.country = res.data.data.country
              placeInfo.locality = res.data.data.locality
              placeInfo.sublocality1 = res.data.data.sublocality_level_1
              placeInfo.sublocality2 = res.data.data.sublocality_level_2
              placeInfo.sublocality3 = res.data.data.sublocality_level_3
              placeInfo.creator_id = res.data.data.creator_id
              placeInfo.valuation = res.data.data.valuation
              _this.$store.commit('setReverseRouteData', placeInfo)

              console.log ('get Place  data below ************************************************')
              console.log('PMap Place  : ', res.data.data)
              // Dialog on
              _this.dialog_title = res.data.data.place_name
              _this.dialog_content = '부동산을 소유해 보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
              _this.dialog = true
            }) // end of axios vue/getInfoCenter
          } else {
            // info center END DIVIDE PLACE TYPE infocenter / place
            console.log('This is INFO CENTER .........................')
            switch(clickedZoom){
              case 12, 13, 14, 15: // gu_gun
              break

              case 16, 17, 18, 19, 20: // adminDong
              break

            } // switch

            let infoParams = {}
            infoParams.country_code = 'KR',
            infoParams.city_do = sk_city_do,
            infoParams.gu_gun = sk_gu_gun,
            infoParams.adminDong = sk_adminDong,
            infoParams.eup_myun = sk_eup_myun,
            infoParams.latitude = e.latLng.lat(),
            infoParams.longitude = e.latLng.lng()

            // Get Postal Basic Info
            axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
              // same params up above
              params: infoParams
            })
            .then(res => {
              let infoCenterInfo = {}
              infoCenterInfo.place_type = 'infocenter'
              infoCenterInfo.id = res.data.data.id
              infoCenterInfo.place_name = res.data.data.portal_name
              infoCenterInfo.about_info = res.data.data.about_info
              infoCenterInfo.admin_id = res.data.data.admin_id
              infoCenterInfo.location = location
              infoCenterInfo.country = res.data.data.country
              infoCenterInfo.locality = res.data.data.locality
              infoCenterInfo.sublocality1 = res.data.data.sublocality_level_1
              infoCenterInfo.sublocality2 = res.data.data.sublocality_level_2
              infoCenterInfo.sublocality3 = res.data.data.sublocality_level_3
              infoCenterInfo.admin_id = res.data.data.admin_id
              _this.$store.commit('setReverseRouteData', infoCenterInfo)


              console.log ('Skt send request and get data below ************************************************')
              console.log('PMap 1, Get info center : ', res.data.data)
              console.log('PMap 1, Get info center : ', res.data.data.id)
              console.log('PMap 1, Get info center : ', _this.$store.state.place_name)
              // Dialog on
              _this.dialog_title = res.data.data.portal_name
              _this.dialog_content = '직접민주주의를 할 수 있습니다. 동네분들과 의견을 나눠보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
              _this.dialog = true
            }) // end of axios vue/getInfoCenter
          }
        } else {
          // info Center
          // NOT YET
          // Get Postal Basic Info
          let infoParams = {}
          infoParams.country_code = 'KR'
          infoParams.city_do = sk_city_do
          infoParams.gu_gun = sk_gu_gun
          infoParams.adminDong = sk_adminDong
          infoParams.eup_myun = sk_eup_myun
          infoParams.latitude = e.latLng.lat()
          infoParams.longitude = e.latLng.lng()

          // let location = {}
          // location['@class'] = 'OPoint'
          // location.coordinates = [e.latLng.lng(), e.latLng.lat()]

          console.log('This is OUtter INFO CENTER .........................')
          axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
            params: infoParams
          })
          .then(res => {
            let infoCenterInfo = {}
            infoCenterInfo.place_type = 'infocenter'
            infoCenterInfo.id = res.data.data.id
            infoCenterInfo.place_name = res.data.data.portal_name
            infoCenterInfo.about_info = res.data.data.about_info
            infoCenterInfo.admin_id = res.data.data.admin_id
            infoCenterInfo.location = location
            infoCenterInfo.country = res.data.data.country
            infoCenterInfo.locality = res.data.data.locality
            infoCenterInfo.sublocality1 = res.data.data.sublocality_level_1
            infoCenterInfo.sublocality2 = res.data.data.sublocality_level_2
            infoCenterInfo.sublocality3 = res.data.data.sublocality_level_3
            infoCenterInfo.admin_id = res.data.data.admin_id
            _this.$store.commit('setReverseRouteData', infoCenterInfo)

            console.log ('Skt send request and get data below ************************************************')
            console.log('PMap 2, Get info center : ', res.data.data)
            console.log('PMap 2, Get info center : ', res.data.data.id)
            console.log('PMap 2, Get info center : ', _this.$store.state.place_name)

            _this.dialog_title = res.data.data.portal_name
            _this.dialog_content = '직접민주주의를 할 수 있습니다. 동네분들과 의견을 나눠보세요. 장소로 들어가셔서 정보를 보시겠습니까?'
            _this.dialog = true
          }) // end of axios vue/getInfoCenter

        } // Outter if

      }) // SKT then
    }, // sub_createPlace

    enterPlace: function() {
      let info = this.$store.state.reverse_route_data
      console.log('20180729 - ROUTER PARAMS : ', info )
      this.$router.push({ name: 'spacePage', params:{id: info}})
    }, // enterPlace

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

    linkToHomePage: function(){
      let adsUrl = 'https://www.hyundai.co.kr/Index.hub'
      // window.location.href = adsUrl
      window.open(adsUrl , '_blank' )
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

   // console.log('20180721 - mapref before : ', this.$refs.mapref)

   this.$refs.mapRef.$mapPromise.then((map) => {
     console.log('20180721 - mapref after : ', map)
     this.$refs.mapRef.$on('zoom_changed', this.zoomChanged)

     let init=this.$store.state.init

     this.zoom_level = this.$store.state.zoom_level

     console.log('20180723 - NOT LITERAL  : ', this.$store.state.latitude)
     console.log('20180723 - NOT LITERAL TYPE : ', typeof this.$store.state.latitude)
     console.log('20180723 - LATITUDE : ', this.$store.state.latitude)
     console.log('20180723 - LONGITUDE : ', this.$store.state.longitude)

     this.centerMarker.lat = this.$store.state.latitude
     this.centerMarker.lng = this.$store.state.longitude

     let placeParams = {}
     placeParams.latitude = this.$store.state.latitude
     placeParams.longitude = this.$store.state.longitude
     placeParams.zoom = this.$store.state.zoom_level

     this.findPostMarkers(placeParams)

   }) // map ref

   this.$store.watch(this.$store.getters.watchZoom, zoom_level => {
      console.log('watched: ddddddd : ' , zoom_level)

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


    }) // this.$store.watch

  } // mounted
} // export default
</script>
