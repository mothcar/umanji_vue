<template>
  <v-app>

    <!-- toolbar *******************************************************************************  -->
    <v-toolbar color="cyan" dark  tabs  fixed >
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ routed_data.place_name }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- toolbar *******************************************************************************  -->

    <!-- info top image box *******************************************************************************  -->
    <div class="p_title_div" :style="{ backgroundImage: 'url(' + data_image + ')' }">
      <!-- <img src="../assets/images/default_info_center.jpg" class="p_title" /> -->
          <!-- <div class="p_portal_container"> -->
          <!-- $t("portal_page.title")  -->
            <h1 class="p_title" :key="suffix">{{ routed_data.place_name }} {{ suffix }}</h1>
            <h3>{{ routed_data.place_name}}</h3>

            <div v-if="place_type == 'infocenter' ">
              <v-list-tile-avatar>
                  <img :src="admin_photo" @click="showProfile(user_index)">
              </v-list-tile-avatar>
              <v-btn v-show="isOfficer" @click="setAdmin"> 임명 </v-btn>
              <h3>{{ admin_name }}</h3>
            </div>

            <div v-if="place_type == 'place' ">
              <v-list-tile-avatar>
                  <img :src="owner_photo" @click="showProfile(user_index)">
              </v-list-tile-avatar>
              <h3>{{ owner_name }}</h3>
            </div>

    </div>
    <!-- info top image box *******************************************************************************  -->

    <!-- tab and contents ***************************************************************************  -->
    <div>
      <!-- before was fixed-tabs -->
      <v-tabs
        slot="extension"
        v-model="model.id"
        centered
        color="blue"
        slider-color="red"
        fixed-tabs
      >
        <v-tab v-for="name in item_name" :key="name" :href="`#tab-${name}`" >
           {{ name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="model.id">
        <v-tab-item v-for="(name, index) in item_name" :id="`tab-${name}`" :key="name" >
        <!-- create Post Button ********************************************************* -->
        <div>
          <v-btn color="success" @click="changeTab" >{{ button_title[index] }}</v-btn>
          <!--  -->
          <!-- @click.stop="dialog = true" -->
        </div>
        <!-- create Post Button ********************************************************* -->

        <!-- content ******************************************************************** -->
        <v-card class="p_card" v-for="(item, user_index) in model.lists"
          :key="user_index"
          avatar
          @click="">

            <v-card-title primary-title>
              <v-list-tile-avatar>
                  <img :src="item.photos[0]" @click="showProfile(user_index)">

              </v-list-tile-avatar>
              <div>
                <div v-html="item.content">{{  }}</div>
              </div>
            </v-card-title>
            <div>
              <link-prevue :url="item.link_url">
                <template slot-scope="props">
                  <div class="card" style="width: 20rem;">

                    <div class="card-block">
                      <h4 class="card-title" >{{props.title}}</h4>
                      <p class="card-text">{{props.description}}</p>
                      <a v-bind:href="props.url" class="btn btn-primary">More</a>
                      <img class="card-img-top" :src="props.img" :alt="props.title">
                    </div>
                  </div>
                </template>
              </link-prevue>
            </div>

        </v-card>
        <!-- content ******************************************************************** -->

        </v-tab-item>
      </v-tabs-items>

    </div>
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

      <v-list-tile v-show="authenticated === true" @click="space_setting" >
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Space Setting</v-list-tile-title>
      </v-list-tile>

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
  <dialogSetAdmin ref="dialog_set_admin"></dialogSetAdmin>

  </v-app>



</template>

<script>
import LinkPrevue from 'link-prevue'
import util from '@/plugins/filters'
import dialogSetAdmin from '../components/dialog_setAdmin.vue'
// import  i18n  from 'vue-i18n'

export default {
    props: {

    },

    data () {
      return {
        // title: this.$route.params.id,
        rightDrawer: false,
        left: true,
        place_type: 'infocenter',
        place_title: 'PlacePage',
        item_name: ['Post', 'Person', '커뮤니티'],
        model: {
          id: 'tab-1',
          lists: []
        },
        button_title: ['Write post', 'Add Person', 'Add Community'],
        function_name: ['createPost', 'addPerson', 'createCommunity'],
        name: 'aaa',
        text: 'Lorem ipsum ut labore et dolore mag nisi ut aliquip ex ea commodo consequat.',
        src: require('../assets/images/default_info_center.jpg'),
        items: [
          {
            src: require('../assets/images/default_info_center.jpg')
          }
        ],
        dialog: false,
        getData: 'Some Data..',
        suffix: '',
        rid: '',
        routed_data: '',
        selectval: '',
        admin_photo: require('../assets/images/default_user.jpg'),
        admin_name: '관리자 없음',
        owner_photo: require('../assets/images/default_user.jpg'),
        owner_name: '소유자 없음',
        isOfficer: false,
        data_image: 'https://unsplash.imgix.net/uploads%2F14115409319165441c030%2Fa1d0230a?q=75&fm=jpg&auto=format&s=b6975e3020e4ec063ec03250904506e0'


      } // return
    }, // data

    mounted: function() {
      // let someData
      // this.$bus.$emit('bus-data', someData)

      let getData
      let infoName = ''
      let politicalType = ''
      let politicalLevel = 5

      console.log('20180728 - NOT REVERSE CHECK : ', typeof this.$route.params.id)

      if(typeof this.$route.params.id == 'object'){
        console.log('20180728 - NOT REVERSE')
        console.log('20180802 - ROUTE PARAMS DATA : ', this.$route.params.id)
        getData = this.$route.params.id
        console.log('20180727 - GET ROUTER DATA ON SPACEPACE : ', getData )
      } else {
        console.log('20180728 - REVERSE')
        getData = this.$store.state.reverse_route_data
      }

      this.routed_data = getData
      console.log('20180803 - getData : ', getData)

      // INFOCENTER **********************************************************************
      if(getData.place_type == 'infocenter') {
        // this.suffix = this.$i18n._vm.messages.kr.portal_page.title // '정보센터' FOR LANG TEST

        this.place_type = 'infocenter'

        if(getData.sublocality_level_1 == undefined){
          getData.sublocality_level_1 = getData.sublocality_level_1
          getData.sublocality_level_2 = getData.sublocality_level_2
        }
        // console.log('20180802 - OUT OF SWITCH : ', getData.political_type )

        switch(getData.political_type){ //'city_do'

          case 'world':
            this.place_title = this.$store.state.world
            infoName = '세계'
            politicalType = 'world'
            politicalLevel = 5
          break

          case 'country':
            this.place_title = this.$store.state.country
            infoName = '대한민국'
            politicalType = 'country'
            politicalLevel = 4
          break

          case 'locality':
            this.place_title = getData.locality
            infoName = getData.locality
            politicalType = 'locality'
            politicalLevel = 3
          break

          case 'sublocality1':
            this.place_title = getData.sublocality1
            infoName = getData.sublocality1
            politicalType = 'sublocality1'
            politicalLevel = 2
          break

          case 'sublocality2':
            this.place_title = getData.sublocality2
            infoName = getData.sublocality2
            politicalType = 'sublocality2'
            politicalLevel = 1
          break
          // default:
          //   this.place_title = getData.sublocality2
          //   infoName = getData.sublocality2
          //   politicalType = 'sublocality2'
          //   politicalLevel = 1

        } // switch

        let params = {
          // portal_name: infoName+' 정보센터',
          // political_type: politicalType
          id: getData.s_rid
        }
        console.log('CHECK PRE PARAMS : ', params)

        let spaceParams = {}
        spaceParams.place_type = 'infocenter'
        spaceParams.id = getData.s_rid
        spaceParams.political_type = politicalType

        axios.get(p_env.BASE_URL+'/vue/findOndInfoCenter', {
          params: params
        })
        .then(res => {
          console.log('20180802 - Find INFO CENTER result :', res.data.data)
          let coords = {}
          // For Top Info Center Button
          this.$store.commit('setNewPlaceInfo', res.data.data)
          var location = res.data.data.location
          this.routed_data.location = location
          console.log('20180802 - IMAGE CHECK : ', res.data.data.admin_photo)
          this.data_image = res.data.data.photos


          // Is there a Admin?
          if(res.data.data.admin_id != ''){
            this.admin_name = res.data.data.admin_name
            if(res.data.data.admin_photo != undefined){
              this.admin_photo = res.data.data.admin_photo
            }
            this.isOfficer = false
          } else {
            // Are you Admin level to appoint
            console.log('20180801 - CHECK USER DATA ', this.$store.state.user_junk)
            if(this.$store.state.user_junk != '' ){
              let o = this.$store.state.user_junk.user.roles
              let oSize = Object.keys(o).length

              console.log('20180802 - SUBTRACT SIZE : ', oSize)

              // for(var prop in o) {
              //   console.log('20180802 - KEY VALUE : ', prop,o[prop]);
              // }

              if(oSize > 1) {
                var key = "politician";
                var value = util.getMapValue(o,key);      // value 2
                console.log('20180802 - CHECK GET LEVEL FROM POLITICIAN TYPE', value)
                // politicalLevel = 5
                if(value != '') {
                  switch(value){
                    case 'world':
                    console.log('20180802 - POLITICAL LEVEL  :', politicalLevel)
                    console.log('20180802 - CASE :', value)
                      if(politicalLevel <= 5){
                        this.isOfficer = true
                      }
                    break;
                    case 'country':
                    console.log('20180802 - CASE :', value)
                      if(politicalLevel <= 4){
                        this.isOfficer = true
                      }
                    break;
                    case 'locality':
                      if(politicalLevel <= 3){
                        this.isOfficer = true
                      }
                    break;
                    case 'sublocality1':
                      if(politicalLevel <= 2){
                        this.isOfficer = true
                      }
                    break;
                    case 'sublocality2':
                      if(politicalLevel <= 1){
                        this.isOfficer = true
                      }
                    break;
                  } //switch
                }

                this.isCitizen = false
              }
            }
          }


          axios.get(p_env.BASE_URL+'/vue/findSpacePosts', {
            params: {s_rid: getData.s_rid}
          })
          .then(res =>{
            console.log('20180721 - returned data : ', res.data.data)
            this.model.lists = res.data.data
            this.getData = this.$store.state.building_name
            this.place_title = this.$store.state.p_place_name

          }) // inner then
        }) // axios then

      } else {
        // place ********************************************************************************************************************
        console.log('20180727 - BUILDING ')

        this.place_type = 'place'
        this.item_name = ['Post', 'Person', '시설정보']

        // this.place_name = this.$store.state.p_place_name
        let placeType = getData.place_type
        this.place_title = getData.place_name

        if(getData.s_rid == undefined){
          getData.s_rid = getData.id
        }

        let spaceParams = {}
        // spaceParams.place_type = placeType
        spaceParams.s_rid = getData.s_rid
        // spaceParams.user_name = getData.creator_name
        // this.rid = ''
        axios.get(p_env.BASE_URL+'/vue/findSpacePosts', {
          params: spaceParams
        })
        .then(res =>{
          console.log('20180721 - returned data : ', res.data.data)
          this.model.lists = res.data.data
          this.getData = this.$store.state.building_name

        }) // inner then

      } // Big if else **********************************************************************

      // infowindow_rid


    }, // mounted

    watch: {
      model: {
         handler(val){
           // do stuff
           switch(val.id){
             case 'tab-Post':
             this.selectval = 'createPost'
              // console.log("switch Post")
             break;
             case 'tab-Person':
             console.log('20180730 - WATCH HANDLER : ', val.id )
             this.selectval = 'addPerson'
              // console.log("switch Person")
             break;
             case 'tab-커뮤니티':
             this.selectval = 'createCommunity'
              // console.log("switch Some")
             break;
           }
         },
         deep: true
       }, // model

       'this.$route' (to, from){
         console.log('20170728 - to.params.id on SPCE : ', to.params.id)
       }

    },

    components: {
      LinkPrevue,
      dialogSetAdmin
    },

    methods: {
      logout: function () {
        this.$store.commit('auth', false)
        this.rightDrawer = !this.rightDrawer
      },

      changeTab: function() {
        let idx = this.selectval
        switch(idx){
          case 'createPost':
            this.createPost()
          break
          case 'addPerson':
            this.addPerson()
          break
          case 'createCommunity':
            this.createCommunity()
          break

        }
      },

      createPost: function() {
        // @click.stop="dialog = true"
        let info = this.routed_data
        this.$store.commit('setReverseRouteData', info)
        if(this.$store.state.authenticated == true) {
          this.$router.push({name: 'postEditor', params: {data: info}})
          // console.log("PostContainer : dialog is true")
        } else {
          this.dialog = true
        }
        // console.log("PostContainer : Write post clicked...")
      },

      addPerson: function() {
        console.log('ADD PERSON........')
      },

      createCommunity: function() {
        console.log('CREATE COMMUNITY........')
      },

      showProfile(idx){
        let info = this.model.lists[idx]
        let r_params = {}
        console.log("20180724 - Store DATA .....", info )
        r_params.creator_id = info.creator_id

        this.$store.commit('setCreatorId', r_params)

        // send Profile id to Store
        this.$router.push({name: 'profile'})
      },

      space_setting: function() {
        let info = this.routed_data
        this.$store.commit('setReverseRouteData', info)

        this.$router.push({ name: 'spaceSetting', params:{data: info}})

        this.rightDrawer = !this.rightDrawer
      },

      login: function() {
        this.dialog = false
      },

      setAdmin () {
        this.$refs.dialog_set_admin.dialog = true
      }

    }, //methods

    computed: {
      authenticated () {
        return this.$store.state.authenticated
      },
    },

    created: function () {

    } // created
  } // export

</script>

<style scoped>
/* @charset "utf-8";
.card-block .card-title .card-text{

} */
.p_title_div {
  width: 100%;
  height: 100%;
  /* background: url(../assets/images/default_info_center.jpg) center center no-repeat; */
  /* background:url("https://unsplash.imgix.net/uploads%2F14115409319165441c030%2Fa1d0230a?q=75&fm=jpg&auto=format&s=b6975e3020e4ec063ec03250904506e0") no-repeat; */

  /* background-position: center center; */
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
  background-size: cover;
  background-color: #464646;

  &:before {
    content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /* background-image: linear-gradient(to bottom right,#002f4b,#dc4225); */
        background-image: linear-gradient(to bottom right,#555,#555);
        opacity: .9;
  }
}

.p_title {
  margin: 5% 0 5% 0;
  color: #fff;
  text-shadow: 0 0 3px #111111;

}

.p_portal_container {
  vertical-align: center;
  margin-top: 20%;
  text-align: center;
  color: white;
  text-shadow: 0 0 3px #111111;
}

.headline{
  color: #333;
}


</style>
