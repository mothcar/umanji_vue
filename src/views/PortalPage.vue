<template>
  <v-app>
    <div>
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          >
          <div class="p_portal_container">
            <h1>{{ title }} {{ $t("portal_page.title") }}</h1>
          </div>

        </v-carousel-item>
      </v-carousel>
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

export default {
    props: {

    }
    ,

    data () {
      return {
        title: this.$route.params.id,
        item_name: ['Post', 'Person', 'Some'],
        model: {
          lists: [],
          id: 'tab-2'
        },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        items: [
          {
            src: require('../assets/images/default_info_center.jpg')
          },
          {
            src: require('../assets/images/default_info_center2.jpg')
          },
          {
            src: require('../assets/images/default_info_center3.jpg')
          },
          {
            src: require('../assets/images/default_info_center4.jpg')
          }
        ],
        dialog: false

      } // return
    }, // data

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
      axios.get(p_env.BASE_URL+'/main/posts?portalType=sublocality2&portalName=신길6동')
      .then(res => {
        this.model.lists = res.data.data
        // console.log('MainContainer : ',res.data.data)

      })

      console.log('PortalPage - params : ', this.$route.params.id)
    } // created
  } // export

</script>

<style>
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
