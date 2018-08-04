<template>
  <v-app app-data>

    <!-- toolbar *******************************************************************************  -->
    <!-- <v-toolbar color="cyan" light prominent fixed extended> -->
    <v-toolbar color="cyan" light fixed >
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <v-toolbar-title> Messages </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- toolbar *******************************************************************************  -->
    <v-flex  class="p_message_tab_breaker">
      tab breaker
    </v-flex>
    <v-layout row justify-center>
        <!-- content ******************************************************************** -->
        <v-card class="p_card" v-for="(item, user_index) in messageData"
          :key="user_index"
          avatar
          @click="">

            <v-card-title primary-title>
              <v-flex xs12 class="p_message_box">
                <div  class="p_message_box">{{ item.createdAt }}</div>
              </v-flex>
              <v-list-tile-avatar>
                  <img :src="item.photos[0]" @click="">
              </v-list-tile-avatar>
              <v-flex xs12 class="p_message_box">
                <div  class="p_message_box">이름 : {{ item.user_name }}</div>
              </v-flex>
              <v-flex xs12 class="p_message_box">
                <div >현주소 : {{ item.address }}</div>
              </v-flex>
              <v-flex xs12 class="p_message_box">
                <div >휴대폰 번호 : {{ item.phone_number }}</div>
              </v-flex>
              <v-flex xs12 class="p_message_box">
                <div >E-Mail : {{ item.email }}</div>
              </v-flex>
              <v-flex xs12 class="p_message_box">
                <div >직업 : {{ item.job }}</div>
              </v-flex>
              <v-flex xs12 class="p_message_box">
                <div >맡고싶은 관리자 지역 : {{ item.wanted_area }}</div>
              </v-flex>
            </v-card-title>

        </v-card>
      </v-layout>
        <!-- content ******************************************************************** -->

    <!-- tab and contents ***************************************************************************  -->

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

      <!-- <v-list-tile v-show="authenticated === true" @click="rightDrawer = !rightDrawer" :to="{ name: 'wallet', params: {} }" >
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
      </v-list-tile> -->

      <v-list-tile v-show="authenticated === true" @click="logout" :to="{ name: '', params: {} }" >
        <v-list-tile-action>
          <v-icon>voice_over_off</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Log out</v-list-tile-title>
      </v-list-tile>

      <v-list-tile class="text-md-center" @click="">
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

  </v-app>


</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      rightDrawer: false,
      left: true,
      messageData: []
    }
  },

  created() {

  },

  mounted() {
    axios.get(p_env.BASE_URL+'/vue/getMessages', {
      params: {user_id: this.$store.state.id}
    })
    .then(res => {
      let getRawData = res.data.data
      let m_data = []
      var j = 0
      for(var i=0; getRawData.length>i; i++){
        // if(getData[i].wanted_area != undefined){
        if(getRawData[i]['@class'] == "Apply"){
          m_data[j]= getRawData[i]
          j++
        }
      }
      this.messageData = m_data

      console.log('20180727 - MainContainer First res.data.data : ',this.messageData)

    })

  }, // mounted

  methods: {
    login: function() {
      this.dialog = false
    },

    logout: function () {
      this.$store.commit('auth', false)
      this.rightDrawer = !this.rightDrawer
    },

  },

  computed: {
    authenticated () {
      return this.$store.state.authenticated
    },
  },

  components: {

  }

} // export default

</script>

<style>
.p_message_tab_breaker {
  /* display: block; */
  color: #111;
}

.p_message_box {
  display: block;
  white-space: pre;
  font-size: 16px;
  text-align: left;
}
</style>
