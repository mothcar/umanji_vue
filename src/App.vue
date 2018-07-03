<template>
  <v-app>
  <div>
    <v-toolbar app color="gray"  tabs :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title>umanji</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->
        <router-link v-if="visible===true" @click.native='toMap' :to="{ name: 'map', params: {} }">
          <v-icon>map</v-icon>
        </router-link>

        <router-link v-if="visible===false" @click.native='toPost' :to="{ name: 'home', params: {} }">
          <v-icon>list_alt</v-icon>
        </router-link>



      <v-tabs
        slot="extension"
        v-model="selec"
        centered
        color="gray"
        slider-color="red"
      >


      <v-tab name="dong" @click="changeLevel('dong')">
        동네
      </v-tab>
      <v-tab name="gugun" @click="changeLevel('gugun')">
        구군
      </v-tab>

      <v-tab name="sido" @click="changeLevel('sido')">
        시도
      </v-tab>
      <v-tab name="country" @click="changeLevel('country')">
        국가
      </v-tab>
      <v-tab name="country" @click="changeLevel('country')">
        세계
      </v-tab>



      </v-tabs>
    </v-toolbar>

  </div>

    <!-- CONTENT ********************************** -->
    <v-content>
      <router-view/>


    </v-content>
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

      <v-list-tile @click="rightDrawer = !rightDrawer" :to="{ name: 'login', params: {} }" >
        <v-list-tile-action>
          <v-icon>perm_identity</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>로그인</v-list-tile-title>
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
export default {
  props: {
  },

  data () {
    return {
      selec: 'gugun',
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
      title: 'umanji',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '+
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
        ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      // visible: true
    }
  },

  name: 'App',

  methods: {
    toMap: function(){
      this.$store.commit('toMap', false)
    },

    toPost: function () {
      this.$store.commit('toPost', true)
    },

    changeLevel (current) {
      this.test(current)
      this.$store.commit('changeZoomLevel', current)

    },

    test (area) {
      console.log("test : " + area)
      return this.content = area
    }
  }, // method

  computed: {
    visible () {
      return this.$store.state.visible
    },

    zoom_level () {
      return this.$store.state.zoom_level
    }
  }, // computed

  created: function () {
    // `this` points to the vm instance
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
    })

    console.log('a is: ' + this.selec)
    return this.selec = "sido"
  }
}
</script>

<style>
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
