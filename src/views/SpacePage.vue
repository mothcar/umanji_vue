<template>
  <v-app>
    <div class="p_title_div">
      <!-- <img src="../assets/images/default_info_center.jpg" class="p_title" /> -->
          <!-- <div class="p_portal_container"> -->
          <!-- $t("portal_page.title")  -->
            <h1 class="p_title" :key="prefix">{{ title }} {{ prefix }}</h1>

    </div>
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
        <v-tab
          v-for="name in item_name"
          :key="name"
          :href="`#tab-${name}`"
        >
           {{ name }}
        </v-tab>
      </v-tabs>

      <!-- create Post Button ******************************************************************************** -->
      <div>
        <v-btn color="success" @click="createPost" >Write Post</v-btn>
        <!--  -->
        <!-- @click.stop="dialog = true" -->
      </div>
      <!-- create Post Button ******************************************************************************** -->

      <v-tabs-items v-model="model.id">
        <v-tab-item
          v-for="(name, index) in item_name"
          :id="`tab-${name}`"
          :key="name"
        >

        <!-- content ******************************************************************************** -->
        <v-card class="p_card" v-for="item in model.lists"
          :key="item.id"
          avatar
          @click="">

            <v-card-title primary-title>
              <v-list-tile-avatar>
                <img :src="item.photos">
              </v-list-tile-avatar>
              <div>
                <div>{{ item.content }}</div>
              </div>
            </v-card-title>
            <div>
              <link-prevue url="https://naver.com/">
                <template slot-scope="props">
                  <div class="card" style="width: 20rem;">

                    <div class="card-block">
                      <h4 class="card-title">{{props.title}}</h4>
                      <p class="card-text">{{props.description}}</p>
                      <a v-bind:href="props.url" class="btn btn-primary">More</a>
                      <img class="card-img-top" :src="props.img" :alt="props.title">
                    </div>
                  </div>
                </template>
              </link-prevue>
            </div>

        </v-card>
        <!-- content ******************************************************************************** -->

        </v-tab-item>
      </v-tabs-items>

    </div>

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

  </v-app>


</template>

<script>
import LinkPrevue from 'link-prevue'
// import  i18n  from 'vue-i18n'

export default {
    props: {

    }
    ,

    data () {
      return {
        // title: this.$route.params.id,
        title: 'SpacePage',
        item_name: ['Post', 'Person', 'Some'],
        model: {
          lists: [],
          id: 'tab-2'
        },
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
        prefix: 'lang',
        rid: ''

      } // return
    }, // data

    mounted: function() {
      this.prefix = this.$i18n._vm.messages.kr.portal_page.title // '정보센터'
      console.log('CHECK AREA ON SPACE STORE DATA : ', this.$store.state)

      let infoName = ''
      let politicalType = ''

      switch(this.$route.params.id){ //'city_do'
        case 'world':
          this.title = this.$store.state.world
          infoName = '세계'
          politicalType = 'world'
        break

        case 'country':
          this.title = this.$store.state.country
          infoName = '대한민국'
          politicalType = 'country'
        break

        case 'city_do':
          this.title = this.$store.state.city_do
          infoName = this.$store.state.city_do
          politicalType = 'locality'
        break

        case 'gu_gun':
          this.title = this.$store.state.gu_gun
          infoName = this.$store.state.gu_gun
          politicalType = 'sublocality1'
        break

        case 'adminDong':
          this.title = this.$store.state.adminDong
          infoName = this.$store.state.adminDong
          politicalType = 'sublocality2'
        break
      } // switch

      let params = {
        portal_name: infoName+' 정보센터',
        political_type: politicalType
      }
      console.log('CHECK PRE PARAMS : ', params)

      axios.get(p_env.BASE_URL+'/vue/findOndInfoCenter', {
        params: params
      })
      .then(res => {
        console.log('20180720 - returned result :', res.data.data)
        this.rid = ''
      }) // axios then

    },

    watch: {
      model: {
         handler(val){
           // do stuff
           switch(val.id){
             case 'tab-Post':
              // console.log("switch Post")
             break;
               case 'tab-Person':
              // console.log("switch Person")
             break;
             case 'tab-Some':
              // console.log("switch Some")
             break;
           }
           // console.log('watch - model check : ', val)
         },
         deep: true
        }

    },

    components: {
      LinkPrevue
    },

    methods: {
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
      }

    }, //methods

    created: function () {
      let params ={
        portalType: 'sublocality2',
        portalName: '신길6동'
      }
      axios.get(p_env.BASE_URL+'/vue/placePosts', {
        params: params
      })
      .then(res => {
        this.model.lists = res.data.data
        this.getData = this.$store.state.building_name
        /*
        import { i18n } from './i18n.js'
        i18n.t()
        */

        console.log('SpacePage - Get from server data : ',res.data.data)

      })

    } // created
  } // export

</script>

<style scoped>
.p_title_div {
  width: 100%;
  height: 100%;
  /* background: url(../assets/images/default_info_center.jpg) center center no-repeat; */
  background:url("https://unsplash.imgix.net/uploads%2F14115409319165441c030%2Fa1d0230a?q=75&fm=jpg&auto=format&s=b6975e3020e4ec063ec03250904506e0") no-repeat;

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
