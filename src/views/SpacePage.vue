<template>
    <div  data-app class="pause_container">



    <div id="header" :style="{ backgroundImage: 'url(' + data_image + ')' }">
      <!-- toolbar *******************************************************************************  -->
      {{ routed_data.place_name }}
      <span><v-btn v-show="authenticated === true" @click="space_setting"> 편집 </v-btn></span>
      <p>
          가치 5,000
      </p>

      <div v-if="place_type == 'infocenter' ">
        <v-chip :close="chip_close">
            <v-avatar>
              <img :src="owner_photo" @click="showProfile(user_index)" >
            </v-avatar>
            {{ owner_name }}
        </v-chip>
        <v-btn v-show="isOfficer" @click="setAdmin"> 임명 </v-btn>
      </div>

      <div v-if="place_type == 'place' ">
        <v-chip :close="chip_close">
            <v-avatar>
              <img :src="owner_photo" @click="showProfile(user_index)" alt="trevor">
            </v-avatar>
            {{ owner_name }}
        </v-chip>
      </div>

      <v-tabs
        slot="extension"
        v-model="model.id"
        centered
        color="white"
        slider-color="red"
        fixed-tabs
      >
        <v-tab class="v_tab_color" v-for="name in item_name" :key="name" :href="`#tab-${name}`" >
           {{ name }}
        </v-tab>
      </v-tabs>

    </div>
    <!-- toolbar *******************************************************************************  -->

    <!-- <div class="pause_item" id="pause_content"> -->
        <!-- info top image box *******************************************************************************  -->
        <!-- $t("portal_page.title")  -->
        <!-- <h1 class="p_title" :key="suffix">{{ routed_data.place_name }} {{ suffix }}</h1> -->
        <!-- info top image box *******************************************************************************  -->

        <!-- tab and contents ***************************************************************************  -->
        <v-flex class="pause_item pause_content" xs12 sm6 offset-lg3>
        <!-- before was fixed-tabs -->
          <v-tabs-items v-model="model.id">
            <v-tab-item v-for="(name, index) in item_name" :id="`tab-${name}`" :key="name" >
            <!-- create Post Button ********************************************************* -->
              <v-btn color="success" @click="excuteTab" >{{ button_title[index] }}</v-btn>
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

        <!-- </div> -->
    </v-flex>
        <!-- tab and contents ***************************************************************************  -->

    <!-- </div> -->




    <!-- Dialog ******************************************************************************** -->
    <v-container >
    <v-layout row justify-center>
      <v-dialog v-model="loginShow" max-width="290" >
        <v-card class="pause_bg">
          <v-card-title class="headline">로그인 하시겠습니까?</v-card-title>
          <v-card-text class="p_portal_page">동네사람들에게 좋은 정보를 제공하시면 계급이 승급됩니다.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="loginShow = false" >아니오</v-btn>

            <router-link :to="{ name: 'secureLogin', params: {} }">
              <v-btn color="green darken-1" flat="flat" @click="login" >예</v-btn>
            </router-link>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    </v-container>
    <!-- Dialog ******************************************************************************** -->

  <dialogSetAdmin ref="dialog_set_admin"></dialogSetAdmin>

  <!-- </v-app> -->
</div>



</template>

<style >
/* @charset "utf-8";
.card-block .card-title .card-text{

} */
#header {
  background-color: #f1f1f1;
  padding: 100px 10px 10px 10px;
  color: white;
  text-shadow: 0 0 3px #111111;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  position: fixed;
  top: 0;
  width: 100%;
  transition: 0.3s;
  z-index:99;

  background-position: center;
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
  background-size: cover;
  background-color: #464646;
}

#header p {
    font-size: 20px;
    color: white;
    text-shadow: 0 0 3px #111111;
}

.v_tab_color {
    color: #333;
    text-shadow: none;
}

.pause_content {
    /* margin: auto;
    width: 60%; */
}
.pause_content .pause_content_button {
    /* margin: auto;
    width: 30%; */
}

/* .pause_content div{
    margin: auto;
    width: 60%;
} */

.pause_container{
      display:flex;
      flex-direction: column;
      /* flex-wrap : wrap; */
      /* position: relative; */
}

.pause_bg {
    background-color: #fff;

}

.pause_item {
    /* position: absolute; */
    margin-top: 350px;
    flex-grow: 1;
}
.p_title_div {
  /* width: 100%;
  height: 100%; */
  /* background: url(../assets/images/default_info_center.jpg) center center no-repeat; */
  /* background:url("https://unsplash.imgix.net/uploads%2F14115409319165441c030%2Fa1d0230a?q=75&fm=jpg&auto=format&s=b6975e3020e4ec063ec03250904506e0") no-repeat; */

  background-position: center;
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
        // place_title: 'PlacePage',
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
        loginShow: false,
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
        data_image: 'https://unsplash.imgix.net/uploads%2F14115409319165441c030%2Fa1d0230a?q=75&fm=jpg&auto=format&s=b6975e3020e4ec063ec03250904506e0',
        // place_name: ''
        scrolled: false,
        chip_close: false,


      } // return
    }, // data

    mounted: function() {
        // 2 
        // 1
      // let someData
      // this.$bus.$emit('bus-data', someData)
      console.log('20180815 - RETURNED FROM POST EDITOR : MOUNTED ')

      // window.onscroll = function() {scrollFunction()};

      let getData

      console.log('20180728 - NOT REVERSE CHECK : ', typeof this.$route.params.id)
      console.log('20180811 - STORE currentTabName CHECK : ',  this.$store.state.currentTabName)
      console.log('20180811 - STORE currentTabType CHECK : ',  this.$store.state.currentTabType)

      if(typeof this.$route.params.id == 'object'){
        console.log('20180728 - NOT REVERSE')
        console.log('20180802 - ROUTE PARAMS DATA : ', this.$route.params.id)
        getData = this.$route.params.id
        console.log('20180727 - GET ROUTER DATA ON SPACEPACE from MAIN : ', getData )
      } else {
        console.log('20180728 - REVERSE')
        getData = this.$store.state.reverse_route_data
        this.routed_data = getData
      }

      // this.routed_data = getData
      console.log('20180803 - getData : ', getData)
      console.log('20180803 - getData.from_type : ', getData.from_type)

      if(getData.from_type == 'mainInfoTab') {
            let political_type = this.$store.state.tabState // political_type = sublocality2
            let portal_name = this.$store.state.currentTabName
            let queryParams = {
              portal_name: portal_name+' 정보센터',
              political_type: political_type
            }

            console.log('20180815 - mainInfoTab - get info center param : ', queryParams )

            axios.get(p_env.BASE_URL+'/vue/findOndInfoCenter', {
              params: queryParams
            })
            .then(res => {
              // upper routed data is not yet complete , right bottom data is this space data
              console.log('20180812 - get data : ', res.data.data )
              this.routed_data = res.data.data
              this.routed_data.s_rid = res.data.data.id
              this.routed_data.place_name = res.data.data.portal_name
              // this.place_name = res.data.data.portal_name
              this.completeInfoSpace(res.data.data)
            })


      } else {
        // from_type == 'postContainer' ==============================================================================
            // INFOCENTER **********************************************************************
            if(getData.place_type == 'infocenter') {
              // this.suffix = this.$i18n._vm.messages.kr.portal_page.title // '정보센터' FOR LANG TEST
              console.log('20180812 - Space page if else infocenter ')
              // this.place_name = getData.portal_name

              this.completeInfoSpace(getData)

            } else {
              // place ********************************************************************************************************************
              console.log('20180727 - BUILDING ')

              this.place_type = 'place'
              this.item_name = ['Post', 'Person', '시설정보']

              // this.place_name = this.$store.state.p_place_name
              let placeType = getData.place_type
              // this.place_name = getData.place_name

              if(getData.s_rid == undefined){
                getData.s_rid = getData.id
              }
              // this.routed_data = getData

              console.log('20180815 - PLACE GET DATA : ', getData )

              axios.get(p_env.BASE_URL+'/vue/findOnePlace',{
                params: {id: getData.s_rid}
              })
              .then(result=>{
                this.data_image = result.data.data.photos
                console.log('20180809 - get place data : ', result )
                this.routed_data = result.data.data
                this.routed_data.s_rid = result.data.data.id
                this.routed_data.place_name = result.data.data.place_name

              })

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

      }



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
      handleScroll () {
        this.scrolled = window.scrollY > 0;
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            document.getElementById("header").style.fontSize = "20px";
            document.getElementById("header").style.padding = "10px";
        } else {
            document.getElementById("header").style.fontSize = "50px";
            document.getElementById("header").style.paddingTop = "100px";
        }
      },

      logout: function () {
        this.$store.commit('auth', false)
        this.rightDrawer = !this.rightDrawer
      },

      excuteTab: function() {
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
        console.log('created param on spacepage : ', info)
        this.$store.commit('setReverseRouteData', info)
        // if(this.$store.state.authenticated == true) {
        if(localStorage.getItem('user') != null){
            console.log("PostContainer : user not NULL")
            let userData = JSON.parse(localStorage.getItem('user'))
            let userToken = userData.token
            if(userToken != null) {
              this.$router.push({name: 'postEditor', params: {data: info}})
              // console.log("PostContainer : dialog is true")
            } else {
              this.loginShow = true
            }
        } else {
            this.loginShow = true
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
        this.loginShow = false
      },

      setAdmin () {
        this.$refs.dialog_set_admin.dialog = true
      },

      completeInfoSpace(getParent){
        let getData = getParent
        if(getData.s_rid == undefined){
          getData.s_rid = getData.id
        }

        console.log('20180815 - complete info space get data : ', getData)
        let infoName = ''
        let politicalType = ''
        let politicalLevel = 5

        this.routed_data = getData
        this.routed_data.place_name = getData.portal_name
        // let resObj = res.data.data
        // this.routed_data.place_name = res.data.data.portal_name
        // this.routed_data = {...resObj}

        // this.place_type = 'infocenter'

        if(getData.sublocality_level_1 == undefined){
          getData.sublocality_level_1 = getData.sublocality_level_1
          getData.sublocality_level_2 = getData.sublocality_level_2
        }
        // console.log('20180802 - OUT OF SWITCH : ', getData.political_type )

        switch(getData.political_type){ //'city_do'

          case 'world':
            // this.place_name = this.$store.state.world
            infoName = '세계'
            politicalType = 'world'
            politicalLevel = 5
          break

          case 'country':
            // this.place_name = this.$store.state.country
            infoName = '대한민국'
            politicalType = 'country'
            politicalLevel = 4
          break

          case 'locality':
            // this.place_name = getData.locality
            infoName = getData.locality
            politicalType = 'locality'
            politicalLevel = 3
          break

          case 'sublocality1':
            // this.place_name = getData.sublocality1
            infoName = getData.sublocality1
            politicalType = 'sublocality1'
            politicalLevel = 2
          break

          case 'sublocality2':
            // this.place_name = getData.sublocality2
            infoName = getData.sublocality2
            politicalType = 'sublocality2'
            politicalLevel = 1
          break
          // default:
          //   this.place_name = getData.sublocality2
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
        if(getData.s_rid == undefined){
          spaceParams.id = getData.id
        } else {
          spaceParams.id = getData.s_rid
        }

        spaceParams.political_type = politicalType

        axios.get(p_env.BASE_URL+'/vue/findOndInfoCenter', {
          params: params
        })
        .then(res => {
          console.log('20180802 - Find INFO CENTER result :', res.data.data)
          // this.routed_data = res.data.data
          let coords = {}
          // For Top Info Center Button

          console.log('20180815 - ROUDTED DATA : ', this.routed_data)
          this.$store.commit('setNewPlaceInfo', res.data.data)
          // var location = res.data.data.location
          // this.routed_data.location = location
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

          }) // inner then
        }) // axios then

      } // completeInfoSpace()

    }, //methods

    computed: {
      authenticated () {
        let userToken = localStorage.getItem('userToken')
        if(userToken != null) {
          return true
        }
        // return this.$store.state.authenticated
      },
    },

    created: function () {
      window.addEventListener('scroll', this.handleScroll);

    }, // created

    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },

    updated () {
      console.log('20180815 - RETURNED FROM POST EDITOR ;UPDATED ')
    }
  } // export

</script>
