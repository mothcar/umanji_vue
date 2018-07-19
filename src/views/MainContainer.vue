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
        <v-icon>search</v-icon>
      </v-btn>

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
                      <router-link :to="{ name: 'portalPage', params: params }" >
                        <!-- id: participantUser.user_id / target= '_blank' -->
                        <span class="headline">{{ center_name }} 정보센터</span>
                      </router-link>
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

      <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: '', params: {} }" >
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


      <v-list-tile class="text-md-center" @click="rightDrawer = !rightDrawer">
        <v-list-tile-action>
          <v-icon>clear</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>CLOSE</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
  <!-- RIGHT MENU ********************************** -->



  <!-- FOOTER ************************************** -->
  <v-footer class="px-2" app>
    <span>&copy; 2018 copyright umanji</span>
  </v-footer>
  <!-- FOOTER ************************************** -->

</v-app>
</template>

<script>
import Home from './PostContainer.vue'
import MapContainer from './MapContainer.vue'
import PMap from './PMap.vue'



export default {

  components: {
    Home,
    MapContainer,
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '+
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      postLists: [],
      params: {
        id: 'init'
      },
      markers: []

    } // end of return
  }, // data

  updated: function() {
    if(this.$store.state.adminDong.length > 1){
      // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong.length)
      // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong)
    } else {
      console.log("MainContainer : updated............")
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
    toMap: function(){
      this.$store.commit('toMap', false)
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

    changeTab (current) {
      this.autoDetectArea(current)
      this.$store.commit('changeZoomLevel', current)
      console.log("on Tab clicked....")
      console.log("MainContainer - Stored Data : ", this.$store.state)

    },

    autoDetectArea (area) {
      // console.log("MainContainer : autoDetectArea : " + area)
      switch(area) {
        case 'world':
          this.$store.commit('changeTabState','world')
          // this.$store.commit('setViewLevel',)
          this.center_name = '세계'
          this.getPortalData('세계', 'world')
          break;
        case 'country':
          this.$store.commit('changeTabState','country')
          this.center_name = '대한민국'
          this.getPortalData('대한민국', 'country')
          break;
        case 'city_do':
          this.$store.commit('changeTabState','city_do')
          this.center_name = this.$store.state.city_do
          this.params.id = this.$store.state.city_do
          this.getPortalData(this.$store.state.city_do, 'city_do')
          break;
        case 'gu_gun':
          this.$store.commit('changeTabState','gu_gun')
          this.center_name = this.$store.state.gu_gun
          this.params.id = this.$store.state.gu_gun
          this.getPortalData(this.$store.state.gu_gun, 'gu_gun')
          break;
        case 'adminDong':
          this.$store.commit('changeTabState','adminDong')
          this.center_name = this.$store.state.adminDong
          this.params.id = this.$store.state.adminDong
          this.getPortalData(this.$store.state.adminDong, 'adminDong')
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
        // currentId
        console.log('20180718 - get from Server tab info center : ',res.data.data)
        _this.center_name = areaName
        _this.params.id = res.data.data.id
        _this.$store.commit('setCurrentId', {id:res.data.data.id, name:res.data.data.portal_name})
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
          _this.postLists = res.data.data
          // _this.markers = res.data.Data
          _this.markers = []
          for (var i = 0, len = res.data.data.length; i < len; i++) {

            let obj = { position:{}, info:{}}
            // obj.position.lat = parseFloat(res.data.data[i].location.coordinates[1])
            // obj.position.lng = parseFloat(res.data.data[i].location.coordinates[0])
            obj.position.lat = res.data.data[i].location.coordinates[1]
            obj.position.lng = res.data.data[i].location.coordinates[0]
            obj.info.portal_rid = res.data.data[i].portal_rid
            obj.info.position_name = res.data.data[i].place_name
            obj.info.zoom_level = _this.$store.state.zoom_level
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
        _this.$store.commit('setCoords', location.coords)
        console.log("20180716 - MainContainer : location. ", location)

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
            testCoords.latitude = 37.1714823
            testCoords.longitude = 128.4834568

            //*** Reversegeocoding from SKTelecom
            // axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+location.coords.longitude+"&lat=" +location.coords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
            // Test
            axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+testCoords.longitude+"&lat=" +testCoords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
            .then(res => {
              _this.center_name = res.data.addressInfo.adminDong
              _this.params.id = res.data.addressInfo.adminDong
              _this.$store.commit('setCurrentPosition', res.data.addressInfo)
              console.log('20180716 - MainContainer SKT DATA : ',res.data.addressInfo)

              let st_country_code = payloadCountry
              let sk_city_do = res.data.addressInfo.city_do
              let sk_gu_gun = res.data.addressInfo.gu_gun
              let sk_adminDong = res.data.addressInfo.adminDong
              let sk_eup_myun = res.data.addressInfo.eup_myun
              let sk_ri = res.data.addressInfo.ri
              let sk_building_name = res.data.addressInfo.buildingName

              // Get Postal Basic Info
              axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
                params: {
                  latitude: _this.$store.state.latitude,
                  longitude: _this.$store.state.longitude,
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
                // timeout: 10 * 1000 // 10 Sec : 60 * 4 * 1000, // Let's say you want to wait at least 4 mins
              })
              .then(res => {
                let currentInfo = {}
                currentInfo.id = res.data.data.id
                currentInfo.name = res.data.data.portal_name
                _this.$store.commit('setCurrentId', currentInfo)
                console.log ('Skt send request and get data below ************************************************')
                console.log('MainContainer 2, Get info center : ', res.data.data)
                console.log('MainContainer 2, Get info center : ', res.data.data.id)
                console.log('MainContainer 2, Get info center : ', _this.$store.state.currentName)
                // console.log('MainContainer 2, Get info center : ', res.data.data.id)
              }) // end of axios vue/getInfoCenter
              .then(res => {


                // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

                // created
                axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
                  portalType: 'sublocality2', //sublocality2
                  portalName: _this.$store.state.adminDong, // 대방동
                  view_level: _this.$store.state.zoom_level
                  }
                })
                .then(res => {
                  _this.postLists = res.data.data
                  // console.log('MainContainer 4 :: Continue Post Lists : ',res.data.data)


                  _this.markers = []

                  // {"@class":"OPoint","coordinates":[126.92354549999997,37.4917879]}

                  console.log('20180718 - position type : ', res.data.data)
                  // console.log('20180718 - position type : ', res.data.data[0].location.coordinates[1])


                  for (var i = 0, len = res.data.data.length; i < len; i++) {

                    // data 없을때 이 error : Uncaught (in promise) TypeError: Cannot read property 'location' of undefined

                    let obj = { position:{}, info:{}}
                    obj.position.lat = res.data.data[i].location.coordinates[1]
                    obj.position.lng = res.data.data[i].location.coordinates[0]
                    obj.info.portal_rid = res.data.data[i].portal_rid
                    obj.info.position_name = res.data.data[i].place_name
                    obj.info.zoom_level = _this.$store.state.zoom_level
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

        }) // get Country Code

      }) //google
    } else {
      // init : false middle of Service
      console.log('20180718 - CHECK ME .... WHEN I CALLED WHEN??? MAY BE RETURN FROM MAP???')

      this.center_name = this.$store.state.adminDong

      let portal_type = this.$store.state.tabState
      let portal_name = this.$store.state.adminDong

      switch(portal_type){
        case 'country':
          portal_type = 'country'
          portal_name = this.$store.state.country
        break;
        case 'city_do':
          portal_type = 'locality'
          portal_name = this.$store.state.city_do
        break;
        case 'gu_gun':
          portal_type = 'sublocality1'
          portal_name = this.$store.state.gu_gun
        break;
        case 'adminDong':
          portal_type = 'sublocality2'
          portal_name = this.$store.state.adminDong
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

        this.markers = this.$store.state.markers


      }) // axios then
    }

    this.selec = "city_do"

  }, // created

  mounted: function(){



  } // monunted


} // export default
</script>

<style scoped>
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
