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
        <v-tab name="adminDong" @click="changeLevel('adminDong')">
          {{ $t("area_name.adminDong") }}
        </v-tab>
        <v-tab name="gu_gun" @click="changeLevel('gu_gun')">
          {{ $t("area_name.gu_gun") }}
        </v-tab>
        <v-tab name="city_do" @click="changeLevel('city_do')">
          {{ $t("area_name.city_do") }}
        </v-tab>
        <v-tab name="country" @click="changeLevel('country')">
          {{ $t("area_name.country") }}
        </v-tab>
        <v-tab name="world" @click="changeLevel('world')">
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

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </div>

  </v-layout>

    <!-- CONTENT ********************************** -->
    <div>
      <Home v-show="visible === true" v-bind:postLists="postLists"></Home>
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
// import MyMap from './views/MyMap.vue'
// import MapProvider from './views/MapProvider.vue'
// import MapLoader from './views/MapLoader.vue'
// import ChildMarker from './views/ChildMarker.vue'
import MapContainer from './MapContainer.vue'


export default {

  components: {
    Home,
    MapContainer
  },

  data () {
    return {
      tab: null,
      tab_items: [
        'web', 'shopping', 'videos', 'images', 'news'
      ],

      model: 'tab-2',
      imageUrl: "https://mblogthumb-phinf.pstatic.net/20160119_176/wnswo2015_1453161466962bNYC0_JPEG/DSC02491.JPG?type=w2",
      center_name: '',
      selec: 'gugun',
      selected_tab: '',
      content: 'default',
      clipped: true,
      drawer: false,
      fixed: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      left: true,
      rightDrawer: false,
      model: 'tab-2',
      // title: 'umanji',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '+
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      // visible: true
      postLists: [],
      passtest: 'Passing String data',
      mockAccount: {
        username: 'mo',
        password: '111111'
      },
      address: {},
      adminDong: '',
      params: {
        id: 'init'
      }

    }
  },

  updated: function() {
    console.log("MainContainer : updated............")
  },

  watch: {
    adminDong: function (some) {
      console.log("MainContainer : watch -Triggered ........")

    }
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

    changeLevel (current) {
      this.autoDetectArea(current)
      this.$store.commit('changeZoomLevel', current)
      console.log("MainContainer - current : ", current)

    },

    autoDetectArea (area) {
      console.log("MainContainer : autoDetectArea : " + area)
      switch(area) {
        case 'world':
          this.center_name = '세계'
          break;
        case 'country':
          this.center_name = '대한민국'
          break;
        case 'city_do':
          this.center_name = this.$store.state.city_do
          this.params.id = this.$store.state.city_do
          break;
        case 'gu_gun':
          this.center_name = this.$store.state.gu_gun
          this.params.id = this.$store.state.gu_gun
          break;
        case 'adminDong':
          this.center_name = this.$store.state.adminDong
          this.params.id = this.$store.state.adminDong
          break;
        case 'eup_myun':
          this.center_name = this.$store.state.eup_myun
          break;
        case 'ri':
          this.center_name = this.$store.state.ri
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
    },

    setAddress () {
      return this.$store.commit('setCurrentPosition', this.address)
    }
  }, // computed

  created: function () {

    var _this = this

    // console.log("MainContainer : AUth : ", this.$store.state.authenticated)
    // console.log("MainContainer : My Env : ", p_env.production)  // ENV

    //*** Get Coords from Google
    navigator.geolocation.getCurrentPosition(function(location) {
      _this.$store.commit('setCoords', location.coords)
      console.log("MainContainer : lacation. ", location)
      // console.log('MainContainer : ',location.coords.latitude);
      // console.log('MainContainer : ',location.coords.longitude);
      // console.log('MainContainer : ',location.coords.accuracy);
      var coords = {}
      coords.lat = location.coords.latitude
      coords.lng = location.coords.longitude

      //***  Get Address from Google : return only ENGLISH
      // var google_maps_geocoder = new google.maps.Geocoder();
      //   google_maps_geocoder.geocode(
      //       { 'latLng': coords, "language": "ko" },
      //       function( results, status ) {
      //           console.log( results[0] );
      //       }
      //   );

      //*** Reversegeocoding from SKTelecom
      axios.get('http://api2.sktelecom.com/tmap/geo/reversegeocoding?lon='+location.coords.longitude+"&lat=" +location.coords.latitude+'&version=1&appKey=c296f457-55ef-40a6-8a48-e1dab29fd9b3&coordType=WGS84GEO&addressType=A10')
      .then(res => {
        _this.center_name = res.data.addressInfo.adminDong
        _this.params.id = res.data.addressInfo.adminDong
        _this.$store.commit('setCurrentPosition', res.data.addressInfo)
        console.log('MainContainer : ',res.data.addressInfo)

        console.log('MainContainer - store info : ', _this.$store.state)
      })
      .then(
        // axios.get('http://119.205.233.249:3000/v1/geo/getPortalInfo?latitude=37.4918325&longitude=126.9233221')
        axios.get(p_env.BASE_URL+'/main/posts?portalType=sublocality2&portalName=신길6동')
        .then(res => {
          _this.postLists = res.data.data
          // console.log('MainContainer : ',res.data.data)

        })
      )
      // res.data.addressInfo.fullAddress
      // res.data.addressInfo.city_do 서울특별시


    }) //google





    // console.log('MainContainer : Select is: ' + this.selec)
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
