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
      <!-- <Home v-show="visible === true" v-bind:postLists="postLists"></Home> -->
      <Home v-show="visible === true"></Home>
      <MapContainer v-show="visible === false" ></MapContainer>

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


export default {

  components: {
    Home,
    MapContainer
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
      // postLists: [],
      params: {
        id: 'init'
      }
      // passingData: {
      //   political_type: '',
      //   portal_name: ''
      // }

    }
  },

  updated: function() {
    if(this.$store.state.adminDong.length > 1){
      console.log(" MainContainer - : Store data adminDong updated............")
      console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong.length)
      console.log(" MainContainer - : Store data adminDong updated.", this.$store.state.adminDong)
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
      // console.log("MainContainer : toMap", this.$store.state.visible)
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
      // console.log("MainContainer - current : ", current)

    },

    autoDetectArea (area) {
      // console.log("MainContainer : autoDetectArea : " + area)
      switch(area) {
        case 'world':
          this.$store.commit('changeTabState','world')
          this.center_name = '세계'
          this.getPortalData('world')
          break;
        case 'country':
          this.$store.commit('changeTabState','country')
          this.center_name = '대한민국'
          this.getPortalData('country')
          break;
        case 'city_do':
          this.$store.commit('changeTabState','city_do')
          this.center_name = this.$store.state.city_do
          this.params.id = this.$store.state.city_do
          this.getPortalData('city_do')
          break;
        case 'gu_gun':
          this.$store.commit('changeTabState','gu_gun')
          this.center_name = this.$store.state.gu_gun
          this.params.id = this.$store.state.gu_gun
          this.getPortalData('gu_gun')
          break;
        case 'adminDong':
          this.$store.commit('changeTabState','adminDong')
          this.center_name = this.$store.state.adminDong
          this.params.id = this.$store.state.adminDong
          this.getPortalData('adminDong')
          break;
        case 'eup_myun':
          this.$store.commit('changeTabState','eup_myun')
          this.center_name = this.$store.state.eup_myun
          this.getPortalData('eup_myun')
          break;
        case 'ri':
          this.$store.commit('changeTabState','ri')
          this.center_name = this.$store.state.ri
          this.getPortalData('ri')
          break;
        /*
        city_do
        gu_gun
        adminDong
        eup_myun
        ri
        bunji
        */

      }
    }, // autoDetectArea
    getPortalData: function(area) {
      // console.log('area : ', area)

      axios.get(p_env.BASE_URL+'/vue/getPortalInfo', { params: {
        latitude: this.$store.state.latitude,
        longitude: this.$store.state.longitude,
        portal_name: this.center_name+' 정보센터',
        political_type: area
        }
      })
      .then(res => {
        // currentId
        this.$store.commit('setCurrentId', res.data.data.id)
        console.log('MainContainer, getPortalData - Get info center ID : ', res.data.data.id)
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

    // setAddress () {
    //   return this.$store.commit('setCurrentPosition', this.address)
    // }

  }, // computed

  created: function () {

    var _this = this

    // console.log("MainContainer : AUth : ", this.$store.state.authenticated)
    // console.log("MainContainer : My Env : ", p_env.production)  // ENV

    //*** Get Coords from Google
    navigator.geolocation.getCurrentPosition(function(location) {
      _this.$store.commit('setCoords', location.coords)
      // console.log("MainContainer : lacation. ", location)

      //***  Get Address from Google : return only ENGLISH
      // var google_maps_geocoder = new google.maps.Geocoder();
      //   google_maps_geocoder.geocode(
      //       { 'latLng': coords, "language": "ko" },
      //       function( results, status ) {
      //           console.log( results[0] );
      //       }
      //   );

      var coords = {}
      coords.lat = location.coords.latitude
      coords.lng = location.coords.longitude

      //*** Reversegeocoding from SKTelecom
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+location.coords.longitude+"&lat=" +location.coords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        _this.center_name = res.data.addressInfo.adminDong
        _this.params.id = res.data.addressInfo.adminDong
        _this.$store.commit('setCurrentPosition', res.data.addressInfo)
        // console.log('MainContainer : ',res.data.addressInfo)

        axios.get(p_env.BASE_URL+'/vue/getPortalInfo', { params: {
          latitude: _this.$store.state.latitude,
          longitude: _this.$store.state.longitude,
          portal_name: res.data.addressInfo.adminDong +' 정보센터',
          political_type: 'adminDong'
          }
        })
        .then(res => {
          // _this.passingData = res.data.data.political_type
          // _this.portal_name = res.data.data.portal_name
          // console.log('MainContainer, Get info center : ', res.data.data)
        }) // end of axios

        console.log('MainContainer - store info : ', _this.$store.state)
      })


    }) //google

    this.selec = "city_do"
  }
}
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
