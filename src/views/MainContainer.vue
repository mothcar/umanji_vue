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
        <v-icon @click="findSomething">search</v-icon>
      </v-btn>

      <!-- <v-btn icon>
        <v-icon @click="openManual">priority_high</v-icon>
      </v-btn> -->
      <button>
          <img @click="openManual" src="../assets/images/wiki_icon.png" alt="Close Icon" height="24" width="24"/>
          <span> &nbsp; </span>
      </button>

      <!-- <v-btn icon>
        <v-icon @click="openManageDialog">gavel</v-icon>
      </v-btn> -->
      <button>
          <img @click="openManageDialog" src="../assets/images/election_icon.png" alt="Close Icon" height="24" width="24"/>
      </button>
      <!-- searchLocation -->
      <!-- verified_user -->
      <v-btn icon v-if="visible===true">
        <v-icon  @click='toMap'>map</v-icon>
      </v-btn>
      <v-btn icon v-if="visible===false">
        <v-icon @click='toPost'>list_alt</v-icon>
      </v-btn>

      <!-- <v-icon v-if="visible===true" @click='toMap'>map</v-icon>
      <v-icon v-if="visible===false" @click='toPost'>list_alt</v-icon> -->

      <v-tabs
        slot="extension"
        color="white"
        v-model="current_key"
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
        <v-tab name="adminDong" @click="changeTab('adminDong')" :href="'#tab-1'">
          {{ $t("area_name.adminDong") }}
        </v-tab>
        <v-tab name="gu_gun" @click="changeTab('gu_gun')" :href="'#tab-2'">
          {{ $t("area_name.gu_gun") }}
        </v-tab>
        <v-tab name="city_do" @click="changeTab('city_do')" :href="'#tab-3'">
          {{ $t("area_name.city_do") }}
        </v-tab>
        <v-tab name="country" @click="changeTab('country')" :href="'#tab-4'">
          {{ $t("area_name.country") }}
        </v-tab>
        <v-tab name="world" @click="changeTab('world')" :href="'#tab-5'">
          {{ $t("area_name.world") }}
        </v-tab>



        <!-- upper info center ******************************************************************************** -->
        <v-tabs-items v-show="visible === true" v-model="current_key">
        <v-tab-item v-for="i in 5"
          :id="`tab-${i}`"
          :key="i"
            >
            <!-- TAB 아래 현재지역 인포센터 large button -->
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
  <!-- <GmapMap
    :center="centerMarker"
    ref="mapRef"
  ></GmapMap> -->

  </v-layout>

    <!-- CONTENT ********************************** -->
    <div>
      <Home v-if="visible === true" v-bind:postLists="postLists"></Home>
      <!-- <MapContainer v-show="visible === false" ></MapContainer> -->
      <PMap v-if="visible === false" v-bind:markers="markers" @chageZoomTab="changTabByZoom"></PMap>

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
        <v-list-tile-title>전자지갑</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: 'message', params: {} }" >
        <v-list-tile-action>
          <v-icon>mail_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Messages</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: 'profile', params: {} }" >
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>개인정보관리</v-list-tile-title>
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


      <v-list-tile class="text-md-center" @click="testLab">
        <v-list-tile-action>
          <v-icon>android</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>TEST</v-list-tile-title>
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
        <v-card-title class="main_headline">지역관리자 페이지로 이동하시겠습니까?</v-card-title>
        <v-card-text>이곳은 각 지역관리자 홈입니다. 여러분들께 좋은 서비스를 해드리기위해 이곳에서 운영에 대한 토론을 합니다. 아쉽게도 각 지역의 관리자들만 들어올 수 있습니다. 지역 발전을 위해 바라는 내용은 각 지역 관리자들께 말씀해 주십시오.</v-card-text>
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
import Util from '../plugins/levels'

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
      // centerMarker:{lat:1.38, lng:103.8},
      tab: null,
      imageUrl: "https://mblogthumb-phinf.pstatic.net/20160119_176/wnswo2015_1453161466962bNYC0_JPEG/DSC02491.JPG?type=w2",
      center_name: '',
      // selec: 'tab-2',
      content: 'default',
      clipped: true,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      left: true,
      rightDrawer: false,
      current_key: 'tab-2',
      text: 'Lorem ipsum dolor sit amet',
      searchAddressInput: '',
      postLists: [],
      params: {
        id: 'adminDong'
      },
      markers: [],
      manageDialog: false,
      authFlag: true,

    } // end of return
  }, // data

  updated: function() {
    // if(this.$store.state.adminDong.length > 1){
    //   // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong.length)
    //   // console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong)
    //   console.log("MainContainer : updated............ but Nothing To do. ", )
    // } else {
    //   console.log("MainContainer : updated............and getInfoCenter ..", this.$store.state.current_place)
    //
    // }
    let init = this.$store.state.init
    if(init){
      console.log("MainContainer : updated......... FIRST INIT" )

    } else {
      console.log("MainContainer : updated......... INIT : FALSE" )
      // this.getInfoCenter()
      let getMainPostParams = {
        portalType: this.$store.state.current_place.political_type, //sublocality2
        portalName: this.$store.state.current_place.portal_name, // 대방동
        view_level: this.$store.state.zoom_level
      }

      // console.log('20180815 - STORE DATA : ', this.$store.state.tabState)

      // this.getMainPosts(getMainPostParams)
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
    changTabByZoom(value) {
      console.log('20180920 ... tab change value .... : ', value)
      switch(value){
        default:
          this.current_key = "tab-5"
          this.changeTab('world')
          localStorage.setItem('currentPosition', 'world')
        break;

        case 8: case 9: case 10:
          this.current_key = "tab-4"
          this.changeTab('country')
          localStorage.setItem('currentPosition', 'country')
        break;

        case 11: case 12: case 13:
          this.current_key = "tab-3"
          this.changeTab('city_do')
          localStorage.setItem('currentPosition', 'city_do')
        break;

        case 14: case 15: case 16:
          this.current_key = "tab-2"
          this.changeTab('gu_gun')
          localStorage.setItem('currentPosition', 'gu_gun')
        break;

        case 17: case 18: case 19: case 20:  case 21: case 22:
          this.current_key = "tab-1"
          this.changeTab('adminDong')
          localStorage.setItem('currentPosition', 'adminDong')
        break;
        /*
        case 'world':
          return 5
        break
        case 'country':
          return 8
        break
        case 'city_do':
          return 11
        break
        case 'gu_gun':
          return 14
        break
        case 'adminDong':
          return 17
        break
        */

      }

    },

    searchLocation: function() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': this.searchAddressInput}, (results, status) => {
        if (status === 'OK') {
          // this.currentLocation.lat = results[0].geometry.location.lat();
          // this.currentLocation.lng = results[0].geometry.location.lng();
          // console.log('20180728 - search Location : ',result[0])
        }
      });
    },

    openManageDialog() {
      this.manageDialog = true
    },

    openManual() {
      let adsUrl = 'https://namu.wiki/w/%EC%9A%B0%EB%A7%8C%EC%A7%80'
      // window.location.href = adsUrl
      window.open(adsUrl , '_blank' )
    },

    findSomething() {
      alert('검색서비스 준비중입니다')
    },

    routerToManagement () {
      this.manageDialog = false
      this.$router.push({name:'manageHome'})
      // console.log('20180730 - Management OFFICE : ')
    },

    toMap: function(){
      let toMapParams = {}
      toMapParams.isInfo = false
      toMapParams.placeType = 'place'

      this.$store.commit('toMap', toMapParams)
      // console.log("MainContainer : toMap Clicked ")
    },

    toPost: function () {
      this.$store.commit('toPost', true)
      this.getInfocenterByMap()

      // console.log("MainContainer : toPost", this.$store.state.visible)
    },

    // Google search word : vue logout update
    logout: function () {
      this.$store.commit('auth', false)
      localStorage.removeItem('user')
      // this.$router.push({name:'home'})
      // this.authenticated = false

      // console.log('LOG OUT : ', localStorage.getItem('userToken'))
      /*
      localStorage.removeItem('redirectUrl');
      this.authSource.next(false);
      this.snackBar.open("로그아웃하였습니다.", null, {duration: 2000});
      this.router.navigateByUrl('/');
      */
      // let resetData = {}
      // resetData.user.id = ''
      // this.$store.commit('setUserInfo', resetData)
      this.rightDrawer = !this.rightDrawer
      location.reload()
    },

    goToCurrentPosition: function() {
      this.rightDrawer = !this.rightDrawer
      alert('준비중입니다')
    },

    infocenterRouter: function() {
      let info = JSON.parse(localStorage.getItem('currentPlace'))
      // let info = this.$store.state.current_place
      // console.log('20180914 - STANDARD ADDRESS: ', info)
      // info.place_name = this.$store.state.current_place.place_name
      // info.photos = this.$store.state.photos
      // info.id = this.$store.state.id
      // info.user_name = this.$store.state.user_name
      // info.place_name = this.$store.state.current_place.portal_name
      info.from_type = 'mainInfoTab'

      this.$router.push({ name: 'spacePage', params:{id: info}})
      // console.log('20180728 - INFO CENTER CLICKED.........')
    },

    changeTab (current) {
      this.$store.commit('changeZoomLevel', current)
      localStorage.setItem('currentPosition', current)
      console.log("MainContainer : on Tab clicked....", current)
      // console.log("MainContainer - Stored Data : ", this.$store.state)
      let portal_type = ''
      let portal_name = ''
      let tabObject = {}

      switch(current) {
        case 'world':
          portal_name = '세계'
          portal_type = 'world'
          tabObject.portal_name = portal_name
          tabObject.political_type = portal_type
          this.$store.commit('changeTabState',tabObject)
          this.center_name = '세계'
          this.params.id = 'world'
          localStorage.setItem('currentKey', 'tab-5')
          break;
        case 'country':
          portal_name = '대한민국'
          portal_type = 'country'
          tabObject.portal_name = portal_name
          tabObject.political_type = portal_type
          this.$store.commit('changeTabState',tabObject)
          this.center_name = '대한민국'
          this.params.id = 'country'
          localStorage.setItem('currentKey', 'tab-4')
          break;
        case 'city_do':
          portal_name = this.$store.state.current_place.locality
          portal_type = 'locality'
          tabObject.portal_name = portal_name
          tabObject.political_type = portal_type
          this.$store.commit('changeTabState',tabObject)
          this.center_name = JSON.parse(localStorage.getItem('currentPlace')).locality
          this.params.id = this.$store.state.current_place.locality
          localStorage.setItem('currentKey', 'tab-3')
          break;
        case 'gu_gun':
          portal_name = this.$store.state.current_place.sublocality_level_1
          portal_type = 'sublocality1'
          tabObject.portal_name = portal_name
          tabObject.political_type = portal_type
          this.$store.commit('changeTabState',tabObject)
          this.center_name = JSON.parse(localStorage.getItem('currentPlace')).sublocality_level_1
          this.params.id = this.$store.state.current_place.sublocality_level_1
          localStorage.setItem('currentKey', 'tab-2')
          break;
        case 'adminDong':
          portal_name = this.$store.state.current_place.sublocality_level_2
          portal_type = 'sublocality2'
          tabObject.portal_name = portal_name
          tabObject.political_type = portal_type
          this.$store.commit('changeTabState',tabObject)
          this.center_name = JSON.parse(localStorage.getItem('currentPlace')).sublocality_level_2
          this.params.id = this.$store.state.current_place.sublocality_level_2
          localStorage.setItem('currentKey', 'tab-1')
          break;
      }

      let getMainPostParams = {
        portalType: portal_type, //sublocality2
        portalName: portal_name, // 대방동
        view_level: this.$store.state.zoom_level
      }

      // console.log('20180815 - STORE DATA : ', this.$store.state.tabState)

      this.getInfoCenterByTab(getMainPostParams) // gu_gun
      this.getMainPosts(getMainPostParams)
    }, // changeTab()

    // getPortalData: function(areaName, areaType) {
    //   var _this = this
    //
    //   // New api
    //   axios.get(p_env.BASE_URL+'/vue/getTabInfoCenter', { params: {
    //     // latitude: this.$store.state.latitude,
    //     // longitude: this.$store.state.longitude
    //     // areaType Later query for detail ............
    //     portal_name: areaName
    //     // countryCode: 'KR'
    //     // political_type: area
    //     }
    //   })
    //   .then(res => {
    //     // Tab select Info Center Level and Find info Center data
    //     let currentInfo = res.data.data
    //     currentInfo.s_rid = res.data.data.id
    //     // _this.$store.commit('setCurrentPlace', currentInfo)
    //
    //
    //     let portal_type = areaType
    //     let portal_name = areaName
    //
    //     switch(portal_type){
    //       case 'country':
    //         portal_type = 'country'
    //         // portal_name = _this.$store.state.country
    //       break;
    //       case 'locality':
    //         portal_type = 'locality'
    //         // portal_name = _this.$store.state.city_do
    //       break;
    //       case 'sublocality_level_1':
    //         portal_type = 'sublocality_level_1'
    //         // portal_name = _this.$store.state.gu_gun
    //       break;
    //       case 'sublocality_level_2':
    //         portal_type = 'sublocality_level_2'
    //         // portal_name = _this.$store.state.adminDong
    //       break;
    //     }
    //
    //
    //   }) // end of axios
    // }, // getPortalData()

    getMainPosts(getMainPostParams) {
      //getInfodata
      axios.get(p_env.BASE_URL+'/vue/main/posts', { params: getMainPostParams})
      .then(res => {
        let moment = require('moment')

        for(var i=0; res.data.data.length> i; i++){
          let old_date = res.data.data[i].createdAt
          let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
          res.data.data[i].createdAt = new_date
        }

        this.postLists = res.data.data
        // _this.markers = res.data.Data
        this.markers = []
        for (var i = 0, len = res.data.data.length; i < len; i++) {

          let obj = { position:{}, info:{}}
          // obj.position.lat = parseFloat(res.data.data[i].location.coordinates[1])
          // obj.position.lng = parseFloat(res.data.data[i].location.coordinates[0])
          obj.position.lat = this.$store.state.latitude
          obj.position.lng = this.$store.state.longitude
          obj.info.s_rid = res.data.data[i].s_rid
          obj.info.place_name = res.data.data[i].place_name
          obj.info.zoom_level = this.$store.state.zoom_level

          obj.info.creator_id = res.data.data[i].creator_id
          obj.info.creator_name = this.$store.state.user_name,
          obj.info.photos = res.data.data[i].photos
          obj.info.place_type = res.data.data[i].place_type
          obj.info.sublocality_level_1 = res.data.data[i].sublocality_level_1
          obj.info.sublocality_level_2 = res.data.data[i].sublocality_level_2
          obj.info.location = res.data.data[i].location
          obj.info.link_url = res.data.data[i].link_url

          obj.info.content = res.data.data[i].content

          this.markers[i] = obj
           // this.params.id = areaType
        } // for
        this.$store.commit('setMarkers', this.markers)


      }) // axios then
    }, // getMainPosts()

    getInfoCenterByTab(params){
      // let getInfocenterParams = this.$store.state.current_place
      console.log('get info center  by tab clicked  ')

      let getInfocenterParams = {}
      getInfocenterParams.political_type = params.portalType
      getInfocenterParams.portal_name = params.portalName + ' 정보센터'
      axios.get(p_env.BASE_URL+'/vue/getInfoCenterByTab', {
        params: getInfocenterParams
        // timeout: 10 * 1000 // 10 Sec : 60 * 4 * 1000, // Let's say you want to wait at least 4 mins
      })
      .then(res => {
        console.log('get info center data : ', res.data.data )
        let currentInfo = res.data.data
        // currentInfo.placeType = 'infocenter'
        currentInfo.s_rid = res.data.data.id
        // this.$store.commit('setCurrentPlace', currentInfo)
        localStorage.setItem('currentPlace', JSON.stringify(currentInfo))
        // console.log('20180809 - STANDARD ADDRESS MAINCONTAINER  : ',currentInfo)

        // console.log('20180727 - MainContainer First res.data.data : ',res.data.data)
        // console.log('MainContainer 20180815 - , Get info center FROM GETINFOCENTER : ', this.$store.state.current_place.sublocality_level_2)

        // let currentLatLng = {}
        // currentLatLng.latitude = res.data.data.location.coordinates[1].toString()
        // currentLatLng.longitude = res.data.data.location.coordinates[0].toString()
        // currentLatLng.latitude = res.data.data.location.coordinates[1]
        // currentLatLng.longitude = res.data.data.location.coordinates[0]
        // console.log('20180723 - TYPE OF LAT: ', typeof currentLatLng.latitude)
        // this.$store.commit('setCurrentLocation', currentLatLng)


      })

    }, // getInfoCenter()

    getInfocenterByMap() {
      let _this = this
      console.log('get from Map center coords', JSON.parse(localStorage.getItem('location')))
      let location = JSON.parse(localStorage.getItem('location'))
      //*** Reversegeocoding from SKTelecom
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+location.coords.longitude+"&lat=" +location.coords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      // Test
      // axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+testCoords.longitude+"&lat=" +testCoords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        // this.center_name = res.data.addressInfo.adminDong

        // _this.params.id = res.data.addressInfo.adminDong
        // let currentStAddress = Util.setToStandardAddress(res.data.addressInfo)


        // let getInfocenterParams = {}
        Util.setToStandardAddress(res.data.addressInfo).then(function (currentStAddress) {
          let getInfocenterParams = currentStAddress
          // console.log('20180809 - STANDARD ADDRESS : ',currentStAddress)
          // console.log('20180809 - STANDARD ADDRESS params : ',getInfocenterParams)
          // console.log('20180809 - STANDARD ADDRESS locality : ',currentStAddress.locality)
          getInfocenterParams.latitude = _this.$store.state.latitude,
          getInfocenterParams.longitude = _this.$store.state.longitude

          // Get Postal Basic Info : findOne
          // console.log('20180816 - getInfocenterParams: ',getInfocenterParams)

          axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
            params: getInfocenterParams
            // timeout: 10 * 1000 // 10 Sec : 60 * 4 * 1000, // Let's say you want to wait at least 4 mins
          })
          .then(res => {
            // console.log('20180816 - get infocenter after axios : ', res.data.data)
            //set current place
            localStorage.setItem('currentPlace', JSON.stringify(res.data.data))
            let currentInfo = res.data.data
            // currentInfo.placeType = 'infocenter'
            currentInfo.s_rid = res.data.data.id
            _this.$store.commit('setCurrentPlace', currentInfo)
            // console.log('20180809 - STANDARD ADDRESS MAINCONTAINER  : ',currentInfo)



            // let tabObject = {}
            // tabObject.portal_name = res.data.data.sublocality_level_2
            // tabObject.political_type = 'sublocality2'
            // _this.$store.commit('changeTabState',tabObject)

            let currentLatLng = {}
            // currentLatLng.latitude = res.data.data.location.coordinates[1].toString()
            // currentLatLng.longitude = res.data.data.location.coordinates[0].toString()
            currentLatLng.latitude = res.data.data.location.coordinates[1]
            currentLatLng.longitude = res.data.data.location.coordinates[0]
            // console.log('20180723 - TYPE OF LAT: ', typeof currentLatLng.latitude)
            _this.$store.commit('setCurrentLocation', currentLatLng)
            // console.log('MainContainer 2, Get info center : ', res.data.data.id)
          }) // end of axios vue/getInfoCenter
          .then(res => {
            // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)
            let currentPosition = localStorage.getItem('currentPosition')
            console.log("MainContainer : currentPosition :", localStorage.getItem('currentPosition'))
            _this.changeTab(currentPosition)

            // created
            axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
              portalType: 'sublocality2', //sublocality2
              portalName: _this.$store.state.current_place.sublocality_level_2, // 대방동
              view_level: _this.$store.state.zoom_level
              }
            })
            .then(res => {
              // console.log('20180815- post result :  ', res.data.data)
              let moment = require('moment')

              for(var i=0; res.data.data.length> i; i++){
                let old_date = res.data.data[i].createdAt
                let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
                res.data.data[i].createdAt = new_date
              }

              _this.postLists = res.data.data

              _this.markers = []
              // {"@class":"OPoint","coordinates":[126.92354549999997,37.4917879]}

              // console.log('20180728 - MainContainer CHEKC S-RID : ', res.data.data)
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
                obj.info.sublocality_level_1 = res.data.data[i].sublocality_level_1
                obj.info.sublocality_level_2 = res.data.data[i].sublocality_level_2
                obj.info.location = res.data.data[i].location
                obj.info.link_url = res.data.data[i].link_url
                _this.markers[i] = obj
                // console.log("content lat lng : ", _this.markers)
              } // for
              _this.$store.commit('setMarkers', _this.markers)

            }) // axios then

          }) // second then
        }) // promise then

      }) // axios SKT

    }, // getInfocenterByMap

    testLab() {
      this.$router.push({ name: 'testLab'})
      this.rightDrawer = !this.rightDrawer
    }


  }, // method

  computed: {
    visible () {
      return this.$store.state.visible
    },

    isPost() {
      return this.$store.state.isPost
    },

    authenticated : {
        get: function () {
          let userData = JSON.parse(localStorage.getItem('user'))
          // console.log('CKECK TYPE ', typeof userData )
          // console.log('CKECK TYPE ', userData )
          if(userData) {

            let userToken = userData.token
            console.log('USER TOKEN : ', userToken)
               if(userToken != null) {
                 return true
               } else {
                 return false
               }
          } else {
            return false
          }

        },

        set: function (newValue) {
          return false
        }



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

      // console.log("MainContainer : My Env : ", p_env.production)  // ENV

          // *** First API call
          //*** Get Coords from Google
          // navigator.geolocation.getCurrentPosition(function(location) {
          //   _this.$store.commit('setCurrentLocation', location.coords)

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

            axios.get('https://ipinfo.io/geo')
            .then(resCountry=> {
              // console.log('20180716 - Country Code compare : ', resCountry.data)

              var loc = resCountry.data.loc.split(',');
              var location = { coords: {
                  latitude: loc[0],
                  longitude: loc[1]
                  }
              };
              // console.log('ipinfo : ', location)
              _this.$store.commit('setCurrentLocation', location.coords)
              // set Location
              localStorage.setItem('location', JSON.stringify(location.coords))

              let payloadCountry = resCountry.data.country
              _this.$store.commit('setCountryCode', payloadCountry)

              if(payloadCountry == 'KR'){
                // else #702

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
                  // _this.center_name = res.data.addressInfo.adminDong
                  // let currentStAddress = Util.setToStandardAddress(res.data.addressInfo)


                  // let getInfocenterParams = {}
                  Util.setToStandardAddress(res.data.addressInfo).then(function (currentStAddress) {
                    let getInfocenterParams = currentStAddress
                    // console.log('20180809 - STANDARD ADDRESS : ',currentStAddress)
                    // console.log('20180809 - STANDARD ADDRESS params : ',getInfocenterParams)
                    // console.log('20180809 - STANDARD ADDRESS locality : ',currentStAddress.locality)
                    getInfocenterParams.latitude = _this.$store.state.latitude,
                    getInfocenterParams.longitude = _this.$store.state.longitude

                    // Get Postal Basic Info : findOne
                    // console.log('20180816 - getInfocenterParams: ',getInfocenterParams)

                    axios.get(p_env.BASE_URL+'/vue/getInfoCenter', {
                      params: getInfocenterParams
                      // timeout: 10 * 1000 // 10 Sec : 60 * 4 * 1000, // Let's say you want to wait at least 4 mins
                    })
                    .then(res => {
                      // console.log('20180816 - get infocenter after axios : ', res.data.data)
                      //set current place
                      localStorage.setItem('currentPlace', JSON.stringify(res.data.data))
                      let currentInfo = res.data.data
                      // currentInfo.placeType = 'infocenter'
                      currentInfo.s_rid = res.data.data.id
                      _this.$store.commit('setCurrentPlace', currentInfo)
                      // console.log('20180809 - STANDARD ADDRESS MAINCONTAINER  : ',currentInfo)

                      let tabObject = {}
                      tabObject.portal_name = res.data.data.sublocality_level_2
                      tabObject.political_type = 'sublocality2'
                      _this.$store.commit('changeTabState',tabObject)

                      let currentLatLng = {}
                      // currentLatLng.latitude = res.data.data.location.coordinates[1].toString()
                      // currentLatLng.longitude = res.data.data.location.coordinates[0].toString()
                      currentLatLng.latitude = res.data.data.location.coordinates[1]
                      currentLatLng.longitude = res.data.data.location.coordinates[0]
                      // console.log('20180723 - TYPE OF LAT: ', typeof currentLatLng.latitude)
                      _this.$store.commit('setCurrentLocation', currentLatLng)
                      // console.log('MainContainer 2, Get info center : ', res.data.data.id)
                    }) // end of axios vue/getInfoCenter
                    .then(res => {
                      // console.log("MainContainer 3 :: Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

                      // created
                      axios.get(p_env.BASE_URL+'/vue/main/posts', { params: {
                        portalType: 'sublocality2', //sublocality2
                        portalName: _this.$store.state.current_place.sublocality_level_2, // 대방동
                        view_level: _this.$store.state.zoom_level
                        }
                      })
                      .then(res => {
                        // console.log('20180815- post result :  ', res.data.data)
                        let moment = require('moment')

                        for(var i=0; res.data.data.length> i; i++){
                          let old_date = res.data.data[i].createdAt
                          let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
                          res.data.data[i].createdAt = new_date
                        }

                        _this.postLists = res.data.data

                        _this.markers = []
                        // {"@class":"OPoint","coordinates":[126.92354549999997,37.4917879]}

                        // console.log('20180728 - MainContainer CHEKC S-RID : ', res.data.data)
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
                          obj.info.sublocality_level_1 = res.data.data[i].sublocality_level_1
                          obj.info.sublocality_level_2 = res.data.data[i].sublocality_level_2
                          obj.info.location = res.data.data[i].location
                          obj.info.link_url = res.data.data[i].link_url
                          _this.markers[i] = obj
                          // console.log("content lat lng : ", _this.markers)
                        } // for
                        _this.$store.commit('setMarkers', _this.markers)

                      }) // axios then

                    }) // second then
                  }) // promise then

                }) // axios SKT


              } else {
                // console.log( ' Sorry Coming Soon ...............')
              }

            }) // get Country by googel

          // }) //google

    } else {
      // when back to Home from Space Page    Not from Map
      console.log('20180916 - MIDDLE OF SERVICE : WHEN I CALLED ??? This should be False!!!!')

      // let resetData = this.$store.state.current_place
      let resetData = JSON.parse(localStorage.getItem('currentPlace'))
      console.log('20180916 - MIDDLE OF SERVICE : init false - get data from localStorage : ', resetData)

      this.center_name = resetData.sublocality_level_2

      let portal_type = this.$store.state.tabState
      let portal_name = resetData.sublocality_level_2

      switch(portal_type){
        case 'country':
          portal_type = 'country'
          portal_name = this.$store.state.country
        break;
        case 'city_do':
          portal_type = 'locality'
          portal_name = this.$store.state.current_place.locality
        break;
        case 'gu_gun':
          portal_type = 'sublocality_level_1'
          portal_name = this.$store.state.current_place.sublocality_level_1
        break;
        case 'adminDong':
          portal_type = 'sublocality_level_2'
          portal_name = this.$store.state.current_place.sublocality_level_2
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
        // console.log('S-RID : ', res.data.data)

        this.markers = this.$store.state.markers


      }) // axios then
    }
    let currentKey = localStorage.getItem('currentKey')
    let currentPosition = localStorage.getItem('currentPosition')

    this.current_key = currentKey //"tab-3"
    this.changeTab(currentPosition)  // 'city_do'
    //  now target

  }, // created

  mounted: function(){
    console.log('Am i Called .. iam mounted main')



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
