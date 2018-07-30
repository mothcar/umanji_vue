<template>
  <v-app>
  <v-layout>

    <div>
    <v-toolbar color="white" tabs :clipped-left="clipped" fixed>
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>

      <router-link to="/">
        <v-toolbar-title>Tojinara</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="">search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon @click="openManageDialog">verified_user</v-icon>
      </v-btn>
      <!-- searchLocation -->
      <!-- verified_user -->

      <v-icon v-if="visible===true" @click='toMap'>map</v-icon>
      <v-icon v-if="visible===false" @click='toPost'>list_alt</v-icon>

      <v-tabs
        slot="extension"
        color="white"
        v-model="selec"
        centered
        grow
      >
        <v-tabs-slider color="red"></v-tabs-slider>

        <!-- <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab> -->
        <v-tab name="adminDong" @click="changeTab('adminDong')">
          {{ $t("area_name.adminDong") }}
        </v-tab>
        <v-tab name="gu_gun" @click="changeTab('gu_gun')">
          {{ $t("area_name.gu_gun") }}
        </v-tab>
        <v-tab name="city_do" @click="changeTab('city_do')">
          {{ $t("area_name.city_do") }}
        </v-tab>
        <v-tab name="country" @click="changeTab('country')">
          {{ $t("area_name.country") }}
        </v-tab>
        <v-tab name="world" @click="changeTab('world')">
          {{ $t("area_name.world") }}
        </v-tab>



        <!-- upper info center ******************************************************************************** -->
        <v-tabs-items v-show="visible === true" v-model="model">
        <v-tab-item v-for="i in 5"
          :id="`tab-${i}`"
          :key="i">
          <v-card >
            <v-card-media
              :src="imageUrl"
              height="50px"
            >
            <v-container fill-height fluid>
                  <!-- <v-layout fill-height> -->
                    <v-flex xs12 align-end flexbox>
                      <!-- <router-link :to="{ name: 'spacePage', params: params }" > -->
                        <!-- id: participantUser.user_id / target= '_blank' -->
                        <span class="headline" @click="infocenterRouter">{{ center_name }} 정보센터</span>
                      <!-- </router-link> -->
                    </v-flex>
                  <!-- </v-layout> -->
                </v-container>
            </v-card-media>
          </v-card>
        </v-tab-item>
        </v-tabs-items>
        <!-- upper info center ******************************************************************************** -->

      </v-tabs>
    </v-toolbar>

  </div>

  </v-layout>

    <!-- CONTENT ********************************** -->
    <div>
      <Home v-if="visible === true" v-bind:postLists="postLists"></Home>
      <!-- <MapContainer v-show="visible === false" ></MapContainer> -->
      <PMap v-if="visible === false" v-bind:markers="markers"></PMap>

    </div>
    <!-- CONTENT ********************************** -->

    <!-- RIGHT MENU ********************************** -->
    <v-navigation-drawer
    temporary
    :left="left"
    v-model="rightDrawer"
    fixed
    app
    >
    <v-list>

      <v-list-tile @click="rightDrawer = !rightDrawer" :to="{ name: 'home', params: {} }" >
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === false" @click="rightDrawer = !rightDrawer" :to="{ name: 'secureLogin', params: {} }" >
        <v-list-tile-action>
          <v-icon>perm_identity</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>로그인</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: 'wallet', params: {} }" >
        <v-list-tile-action>
          <v-icon>account_balance_wallet</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Wallet</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: 'profile', params: {} }" >
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Setting</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === true" @click="logout" :to="{ name: '', params: {} }" >
        <v-list-tile-action>
          <v-icon>voice_over_off</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Log out</v-list-tile-title>
      </v-list-tile>

      <v-list-tile class="text-md-center" @click="goToCurrentPosition">
        <v-list-tile-action>
          <v-icon>place</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Current Location</v-list-tile-title>
      </v-list-tile>


      <v-list-tile class="text-md-center" @click="rightDrawer = !rightDrawer">
        <v-list-tile-action>
          <v-icon>clear</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>CLOSE</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
  <!-- RIGHT MENU ********************************** -->

  <!-- DIALOG MANAGEMENT ********************************** -->
  <v-layout row justify-center>
    <v-dialog v-model="manageDialog" persistent max-width="290">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card>
        <v-card-title class="main_headline">관리자 페이지로 이동하시겠습니까?</v-card-title>
        <v-card-text>이곳은 관리자 홈입니다. 여러분들께 좋은 서비스를 해드리기위해 이곳에서 운영에 대한 토론을 합니다. 아쉽게도 각 지역의 관리자들만 들어올 수 있습니다. 지역 발전을 위해 바라는 내용은 각 지역 관리자들께 말씀해 주십시오.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="manageDialog = false">나가기</v-btn>
          <v-btn color="green darken-1" flat @click.native="routerToManagement">들어가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  <!-- DIALOG MANAGEMENT ********************************** -->



  <!-- FOOTER ************************************** -->
  <v-footer class="px-2" app>
    <span>&copy; 2018 copyright umanji</span>
  </v-footer>
  <!-- FOOTER ************************************** -->

</v-app>
</template>

<script>
import Home from './PostContainer.vue'
// import MapContainer from './MapContainer.vue'
import PMap from './PMap.vue'

export default {

  components: {
    Home,
    // MapContainer,
    PMap
  },

  provide: function () {
    return {
      changeTab: this.changeTab
    }
  },

  data () {
    return {
      tab: null,
      imageUrl: "https://mblogthumb-phinf.pstatic.net/20160119_176/wnswo2015_1453161466962bNYC0_JPEG/DSC02491.JPG?type=w2",
      center_name: '',
      selec: 'gugun',
      content: 'default',
      clipped: true,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      left: true,
      rightDrawer: false,
      model: 'tab-2',
      text: 'Lorem ipsum dolor sit amet',
      searchAddressInput: '',
      postLists: [],
      params: {
        id: 'adminDong'
      },
      markers: [],
      manageDialog: false

    } // end of return
  }, // data

  updated: function() {
    if(this.$store.state.adminDong.length > 1){
      // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong.length)
      // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong)
    } else {
      console.log("MainContainer : updated............", this.$store.state.infocenter_data.location)
    }

    // passingData
  },

  watch: {

  },

  beforecreated() {
    // axios.get('/getContacts/')
    //   .then(response => {
    //     this.organisation = response.data;
    //   })
  },

  name: 'App',

  methods: {
    searchLocation: function() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': this.searchAddressInput}, (results, status) => {
        if (status === 'OK') {
          // this.currentLocation.lat = results[0].geometry.location.lat();
          // this.currentLocation.lng = results[0].geometry.location.lng();
          console.log('20180728 - search Location : ',result[0])
        }
      });
    },

    openManageDialog() {
      this.manageDialog = true
    },

    routerToManagement () {
      this.manageDialog = false
      this.$router.push({name:'manageHome'})
      console.log('20180730 - Management OFFICE : ')
    },

    toMap: function(){
      let toMapParams = {}
      toMapParams.isInfo = false
      toMapParams.placeType = 'place'

      this.$store.commit('toMap', toMapParams)
      console.log("MainContainer : toMap Clicked ")
    },

    toPost: function () {
      this.$store.commit('toPost', true)
      // console.log("MainContainer : toPost", this.$store.state.visible)
    },

    logout: function () {
      this.$store.commit('auth', false)
      this.rightDrawer = !this.rightDrawer
    },

    goToCurrentPosition: function() {
      this.rightDrawer = !this.rightDrawer
      alert('준비중입니다')
    },

    infocenterRouter: function() {
      // let info = {
      //   place_type: this.$store.state.p_place_type,
      //   s_rid: this.$store.state.p_id,
      //   place_name: this.$store.state.p_place_name,
      //   about_info: this.$store.state.p_about_info,
      //   admin_id: this.$store.state.p_admin_id,
      //   country: this.$store.state.p_country,
      //   locality: this.$store.state.p_locality,
      //   sublocality1: this.$store.state.p_sublocality1,
      //   sublocality2: this.$store.state.p_sublocality2,
      //   sublocality3: this.$store.state.p_sublocality3,
      //   political_type: this.$store.state.p_political_type,
      //   latitude: this.$store.state.latitude,
      //   longitude: this.$store.state.longitude
      //
      // }
      let info = this.$store.state.infocenter_data
      info.place_type = 'infocenter'
      // info.place_name = this.$store.state.infocenter_data.place_name
      // info.photos = this.$store.state.photos
      // info.id = this.$store.state.id
      // info.user_name = this.$store.state.user_name
      info.place_name = this.$store.state.infocenter_data.portal_name

      this.$router.push({ name: 'spacePage', params:{id: info}})
      console.log('20180727 - PASSING DATA ....check s_rid = id ')
      console.log('20180728 - INFO CENTER CLICKED.........')
    },

    changeTab (current) {
      this.autoDetectArea(current)
      this.$store.commit('changeZoomLevel', current)
      console.log("on Tab clicked....")
      // console.log("MainContainer - Stored Data : ", this.$store.state)

    },

    autoDetectArea (area) {
      // console.log("MainContainer : autoDetectArea : " + area)
      switch(area) {
        case 'world':
          this.$store.commit('changeTabState','world')
          // this.$store.commit('setViewLevel',)
          this.center_name = '세계'
          this.getPortalData('세계', 'world')
          this.params.id = 'world'
          break;
        case 'country':
          this.$store.commit('changeTabState','country')
          this.center_name = '대한민국'
          this.getPortalData('대한민국', 'country')
          this.params.id = 'country'
          break;
        case 'city_do':
          this.$store.commit('changeTabState','city_do')
          this.center_name = this.$store.state.current_place.city_do
          this.params.id = this.$store.state.current_place.city_do
          this.getPortalData(this.$store.state.current_place.city_do, 'city_do')
          break;
        case 'gu_gun':
          this.$store.commit('changeTabState','gu_gun')
          this.center_name = this.$store.state.current_place.gu_gun
          this.params.id = this.$store.state.current_place.gu_gun
          this.getPortalData(this.$store.state.current_place.gu_gun, 'gu_gun')
          break;
        case 'adminDong':
          this.$store.commit('changeTabState','adminDong')
          this.center_name = this.$store.state.current_place.adminDong
          this.params.id = this.$store.state.current_place.adminDong
          this.getPortalData(this.$store.state.current_place.adminDong, 'adminDong')
          break;

      }
    }, // autoDetectArea

    getPortalData: function(areaName, areaType) {
      console.log('20180718 - Check area type : ', areaName)
      var _this = this

      // New api
      axios.get(p_env.BASE_URL+'/vue/getTabInfoCenter', { params: {
        // latitude: this.$store.state.latitude,
        // longitude: this.$store.state.longitude
        // areaType Later query for detail ............
        portal_name: areaName
        // countryCode: 'KR'
        // political_type: area
        }
      })
      .then(res => {
        // Tab select Info Center Level and Find info Center data
        console.log('20180728 - Tab selected INFOCENTER DATA : ',res.data.data)  // GOOOOOOOOOOD lat lng
        let currentInfo = res.data.data
        currentInfo.placeType = 'infocenter'
        currentInfo.s_rid = res.data.data.id
        _this.$store.commit('setCenterData', currentInfo)


        _this.center_name = areaName
        _this.params.id = res.data.data.id
        _this.params.id = areaType


        let portal_type = areaType
        let portal_name = areaName

        switch(portal_type){
          case 'country':
            portal_type = 'country'
            // portal_name = _this.$store.state.country
          break;
          case 'city_do':
            portal_type = 'locality'
            // portal_name = _this.$store.state.city_do
          break;
          case 'gu_gun':
            portal_type = 'sublocality1'
            // portal_name = _this.$store.state.gu_gun
          break;
          case 'adminDong':
            portal_type = 'sublocality2'
            // portal_name = _this.$store.state.adminDong
          break;

        }

        // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

        //getInfodata
        axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
          portalType: portal_type, //sublocality2
          portalName: portal_name, // 대방동
          view_level: this.$store.state.zoom_level
          }
        })
        .then(res => {
          let moment = require('moment')

          for(var i=0; res.data.data.length> i; i++){
            let old_date = res.data.data[i].createdAt
            let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
            res.data.data[i].createdAt = new_date
          }

          _this.postLists = res.data.data
          // _this.markers = res.data.Data
          _this.markers = []
          console.log('20180728 - MainContainer params s-rid : ', res.data.data )
          for (var i = 0, len = res.data.data.length; i < len; i++) {

            let obj = { position:{}, info:{}}
            // obj.position.lat = parseFloat(res.data.data[i].location.coordinates[1])
            // obj.position.lng = parseFloat(res.data.data[i].location.coordinates[0])
            obj.position.lat = this.$store.state.latitude
            obj.position.lng = this.$store.state.longitude
            obj.info.s_rid = res.data.data[i].s_rid
            obj.info.place_name = res.data.data[i].place_name
            obj.info.zoom_level = _this.$store.state.zoom_level

            obj.info.creator_id = res.data.data[i].creator_id
            obj.info.creator_name = this.$store.state.user_name,
            obj.info.photos = res.data.data[i].photos
            obj.info.place_type = res.data.data[i].place_type
            obj.info.sublocality1 = res.data.data[i].sublocality_level_1
            obj.info.sublocality2 = res.data.data[i].sublocality_level_2
            obj.info.location = res.data.data[i].location
            obj.info.link_url = res.data.data[i].link_url

            obj.info.content = res.data.data[i].content

            _this.markers[i] = obj
            // console.log("content lat lng : ", _this.markers)
             _this.params.id = areaType
          } // for
          _this.$store.commit('setMarkers', _this.markers)

          // console.log('PostContainer 4 :: Continue Post Lists : ',res.data.data.length)

        }) // axios then
      }) // end of axios
    }


  }, // method

  computed: {
    visible () {
      return this.$store.state.visible
    },

    isPost() {
      return this.$store.state.isPost
    },

    authenticated () {
      return this.$store.state.authenticated
    },

    zoom_level () {
      return this.$store.state.zoom_level
    }


  }, // computed

  created: function () {

    let init = this.$store.state.init
    console.log("20180716 - MainController - init : ", this.$store.state.init )

    if(init) {
      this.$store.commit('setInit', false)

      var _this = this

      // console.log("MainContainer : AUth : ", this.$store.state.authenticated)
      // console.log("MainContainer : My Env : ", p_env.production)  // ENV

      // *** First API call
      //*** Get Coords from Google
      navigator.geolocation.getCurrentPosition(function(location) {
        _this.$store.commit('setCurrentLocation', location.coords)
        console.log("20180716 - MainContainer : Current Location. ", location)

        // ***  Get Address from Google : return only ENGLISH
        // *** Needs : rc="https://maps.googleapis.com/maps/api/js?sensor=false" async defer
        // *** API KEY
        // var google_maps_geocoder = new google.maps.Geocoder();
        //   google_maps_geocoder.geocode(
        //       { 'latLng': coords},
        //       function( results, status ) {
        //           console.log('20180716- Address from Google : ', results[0] );
        //       }
        //   );

        axios.get('https://ipinfo.io')
        .then(resCountry=> {
          console.log('20180716 - Country Code compare : ', resCountry.data)

          let payloadCountry = resCountry.data.country
          _this.$store.commit('setCountryCode', payloadCountry)

          if(payloadCountry == 'KR'){

            // For Test Coords
            let testCoords = {}
            // testCoords.latitude = 37.3927368
            // testCoords.longitude = 126.9523922
            // testCoords.latitude = 37.4996798
            // testCoords.longitude = 126.9192621
            //
            // _this.$store.commit('setCurrentLocation', testCoords)

            //*** Reversegeocoding from SKTelecom
            axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+location.coords.longitude+"&lat=" +location.coords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
            // Test
            // axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+testCoords.longitude+"&lat=" +testCoords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
            .then(res => {
              _this.center_name = res.data.addressInfo.adminDong
              // _this.params.id = res.data.addressInfo.adminDong
              _this.$store.commit('setCurrentPlace', res.data.addressInfo)

              let placeInfo = {}
              placeInfo.place_type = 'infocenter'
              placeInfo.place_name = res.data.addressInfo.adminDong
              placeInfo.country = payloadCountry
              placeInfo.locality = res.data.addressInfo.city_do
              placeInfo.sublocality1 = res.data.addressInfo.gu_gun
              placeInfo.sublocality2 = res.data.addressInfo.adminDong
              placeInfo.sublocality3 = res.data.addressInfo.ri
              _this.$store.commit('setPlaceInfo', placeInfo)

              console.log('20180716 - MainContainer SKT DATA : ',res.data.addressInfo)

              let st_country_code = payloadCountry
              let sk_city_do = res.data.addressInfo.city_do
              let sk_gu_gun = res.data.addressInfo.gu_gun
              let sk_adminDong = res.data.addressInfo.adminDong
              let sk_eup_myun = res.data.addressInfo.eup_myun
              let sk_ri = res.data.addressInfo.ri
              let sk_building_name = res.data.addressInfo.buildingName

              let infoParams = {}
              infoParams.country_code = 'KR',
              infoParams.city_do = sk_city_do,
              infoParams.gu_gun = sk_gu_gun,
              infoParams.adminDong = sk_adminDong,
              infoParams.eup_myun = sk_eup_myun,
              infoParams.latitude = _this.$store.state.latitude,
              infoParams.longitude = _this.$store.state.longitude

              // Get Postal Basic Info : findOne
              axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
                params: infoParams
                // timeout: 10 * 1000 // 10 Sec : 60 * 4 * 1000, // Let's say you want to wait at least 4 mins
              })
              .then(res => {
                let currentInfo = res.data.data
                currentInfo.placeType = 'infocenter'
                currentInfo.s_rid = res.data.data.id
                _this.$store.commit('setCenterData', currentInfo)

                console.log ('Skt send request and get data below ************************************************')
                console.log('20180727 - MainContainer First setForPostData: ',_this.$store.state)
                console.log('20180727 - MainContainer First res.data.data : ',res.data.data)
                console.log('MainContainer 20180722 - , Get info center : ', _this.$store.state.current_place.adminDong)

                let currentLatLng = {}
                // currentLatLng.latitude = res.data.data.location.coordinates[1].toString()
                // currentLatLng.longitude = res.data.data.location.coordinates[0].toString()
                currentLatLng.latitude = res.data.data.location.coordinates[1]
                currentLatLng.longitude = res.data.data.location.coordinates[0]
                console.log('20180723 - TYPE OF LAT: ', typeof currentLatLng.latitude)
                _this.$store.commit('setCurrentLocation', currentLatLng)
                // console.log('MainContainer 2, Get info center : ', res.data.data.id)
              }) // end of axios vue/getInfoCenter
              .then(res => {


                // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

                // created
                axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
                  portalType: 'sublocality2', //sublocality2
                  portalName: _this.$store.state.current_place.adminDong, // 대방동
                  view_level: _this.$store.state.zoom_level
                  }
                })
                .then(res => {
                  let moment = require('moment')

                  for(var i=0; res.data.data.length> i; i++){
                    let old_date = res.data.data[i].createdAt
                    let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
                    res.data.data[i].createdAt = new_date
                  }

                  _this.postLists = res.data.data

                  _this.markers = []
                  // {"@class":"OPoint","coordinates":[126.92354549999997,37.4917879]}

                  console.log('20180728 - MainContainer CHEKC S-RID : ', res.data.data)
                  // console.log('20180718 - position type : ', res.data.data[0].location.coordinates[1])


                  for (var i = 0, len = res.data.data.length; i < len; i++) {

                    // data 없을때 이 error : Uncaught (in promise) TypeError: Cannot read property 'location' of undefined

                    let obj = { position:{}, info:{}}
                    obj.position.lat = res.data.data[i].location.coordinates[1]
                    obj.position.lng = res.data.data[i].location.coordinates[0]
                    obj.info.s_rid = res.data.data[i].s_rid
                    obj.info.place_name = res.data.data[i].place_name
                    obj.info.zoom_level = _this.$store.state.zoom_level

                    obj.info.creator_id = res.data.data[i].creator_id
                    obj.info.creator_name = _this.$store.state.user_name,
                    obj.info.photos = res.data.data[i].photos
                    obj.info.place_type = res.data.data[i].place_type
                    obj.info.sublocality1 = res.data.data[i].sublocality_level_1
                    obj.info.sublocality2 = res.data.data[i].sublocality_level_2
                    obj.info.location = res.data.data[i].location
                    obj.info.link_url = res.data.data[i].link_url
                    _this.markers[i] = obj
                    // console.log("content lat lng : ", _this.markers)
                  } // for
                  _this.$store.commit('setMarkers', _this.markers)

                }) // axios then

              }) // second then

              // console.log('MainContainer 5 :: store info : ', _this.$store.state)
            }) // axios SKT


          } else {
            console.log( ' Sorry Coming Soon ...............')
          }

        }) // get Country by googel

      }) //google
    } else {
      // init : false middle of Service
      // when back to Home
      console.log('20180718 - MIDDLE OF SERVICE : WHEN I CALLED WHEN??? MAY BE RETURN FROM MAP???')

      this.center_name = this.$store.state.current_place.adminDong

      let portal_type = this.$store.state.tabState
      let portal_name = this.$store.state.current_place.adminDong

      switch(portal_type){
        case 'country':
          portal_type = 'country'
          portal_name = this.$store.state.country
        break;
        case 'city_do':
          portal_type = 'locality'
          portal_name = this.$store.state.current_place.city_do
        break;
        case 'gu_gun':
          portal_type = 'sublocality1'
          portal_name = this.$store.state.current_place.gu_gun
        break;
        case 'adminDong':
          portal_type = 'sublocality2'
          portal_name = this.$store.state.current_place.adminDong
        break;

      }

      // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

      // middle of Service
      axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
        portalType: portal_type, //sublocality2
        portalName: portal_name, // 대방동
        view_level: this.$store.state.zoom_level
        }
      })
      .then(res => {
        this.postLists = res.data.data
        console.log('S-RID : ', res.data.data)

        this.markers = this.$store.state.markers


      }) // axios then
    }

    this.selec = "adminDong"

  }, // created

  mounted: function(){



  } // monunted


} // export default
</script>

<style scoped>
div.main_headline{
  font-size: 17px;
  color: #333;
}
.layout {
  flex:none;
}

.v-tabs {
  padding: 0;
  margin-top: 10px;
}

.headline {
  color: #fff;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
  color: #888
}

.fab-container {
  /* position: fixed; */
  margin-bottom: 40px;
  margin-right: 7px;
  bottom: 0;
  right: 0;
}
</style>
