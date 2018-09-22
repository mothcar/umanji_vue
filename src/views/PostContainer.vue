<template>
  <!-- <div class="home" > -->

    <v-content>

    <v-layout class="p_margin_top" row justify-center>
      <v-flex xs12 sm12 offset-lg3 >

    <!-- create Post Button ******************************************************************************** -->
      <v-btn color="success" @click="createPost">Write Post</v-btn>
    <!-- create Post Button ******************************************************************************** -->

    <!-- content ******************************************************************************** -->
            <v-card class="p_card" v-for="(item, index) in postLists"
              :key="index"
              avatar
              @click="">
              <!-- :key="item.id" -->

                <v-card-title primary-title>
                  <v-list-tile-avatar>
                    <img :src="item.photos[0]" @click="showProfile(index)">
                  </v-list-tile-avatar>
                  <div>
                    <div ><strong @click="showProfile(index)">{{ item.creator_name}}</strong>님이  <strong @click="spaceRouter(index)">{{ item.place_name}}</strong>에서   <span>{{ item.createdAt }}</span></div>
                    <!--    items.photos
                    v-if(place_type == 'infocenter')  -->


                    <div v-html="item.content"  @click="spaceRouter(index)"></div>

                  </div>
                </v-card-title>
                <div>
                  <link-prevue v-show="hasUrl" :url="item.link_url">
                    <template slot-scope="props">
                      <!-- <div class="card" style="width: 20rem;"> -->
                      <v-card class="card">

                        <div class="card-block">
                          <h4 class="card-title">{{props.title}}</h4>
                          <p class="card-text">{{props.description}}</p>
                          <a v-bind:href="props.url" class="btn btn-primary">More</a>
                          <!-- <img class="card-img-top" :src="props.img" :alt="props.title"> -->
                          <v-card-media
                            :src="props.img"
                            height="300px"
                          ></v-card-media>
                        </div>
                      </v-card>
                    </template>
                  </link-prevue>
                </br>
                </div>

                <div >
                  <v-flex xs12 sm6>
                    <v-text-field class="p_text_field" @click="create_reply(index)"
                      v-model="message[index]"
                      box
                      label=""
                      :clearable="repley_clear"
                    ></v-text-field>

                    <v-btn color="success" @click="createReply(index)">제출</v-btn>

                  </v-flex>

                  <v-expansion-panel >
                    <v-expansion-panel-content>
                      <div slot="header" @click="getReplys(index)">
                      <v-badge right>
                        <span slot="badge" >{{ item.replys }}</span>
                        <span>댓글</span>
                      </v-badge>
                      </div>
                      <v-card
                          v-for="(reply,i) in replyLists"
                          :key="i"
                      >
                        <v-card-text class="grey lighten-3">{{ reply.content }}</v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </div>

                <!-- <v-card-media
                    :src="item.photos"
                    height="200px"
                  ></v-card-media> -->

            </v-card>

      <!-- content ******************************************************************************** -->


            </v-flex>
          </v-layout>



<!-- Dialog ******************************************************************************** -->
<dialog-post ref="dialogPost"></dialog-post>
<!-- Dialog ******************************************************************************** -->

<!-- Dialog ******************************************************************************** -->
<v-layout row justify-center>
  <v-dialog
    v-model="dialog_login"
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
          @click="dialog_login = false"
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
</v-content>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import LinkPrevue from 'link-prevue'
var anchorme = require("anchorme").default
import { mapGetters } from 'vuex'
import DialogPost from '../components/dialog_post.vue'


export default {

  name: 'home',
  props: {
    postLists: {
    type: Array,
    default: () => {}
  }
  },

  data: () => ({
    clipped: true,
    dialog2: false,
    hasUrl: true,
    notifications: false,
    sound: true,
    widgets: false,
    divider: true, inset: true,
    show: false,
    items: [
        // { header: 'Today' },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        // { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        // { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
        // { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/4.jpg', title: 'Birthday gift', subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?" },
        // { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/5.jpg', title: 'Recipe to try', subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
      ],
      content: '',
      dialog_login: false,
      default_user: require('../assets/images/default_user.jpg'),
      busData: '',
      link_url: '',
      message: [],
      repley_clear: true,
      replyLists: [],


  }),

  created: function () {
  }, //created


  methods: {
    spaceRouter: function(idx) {

      let info = this.postLists[idx]
      if(info.place_type == 'infocenter'){
          info.from_type = 'postContainer'
          // info.place_name = info.place_name
      } else {

      }

      console.log('20180922 PostContainer Post properties 222 : ', info )

      this.$router.push({ name: 'spacePage', params:{id: info}})
      // console.log('20180727 - ROUTE DATA FROM POSTContainer PLACE TYPE  ....', info)

    },

    createPost: function() {
      // if(this.$store.state.authenticated == true) {
      let userData = JSON.parse(localStorage.getItem('user'))
      // console.log('user localStorage contents check : ', userData ) // type object and content is null
      if(userData){
          let userToken = userData.token
          if(userToken != null) {
            // let political_type = this.$store.state.tabState // political_type = sublocality2
            // let portal_name = this.$store.state.currentTabName
            // let queryParams = {
            //   portal_name: portal_name+' 정보센터',
            //   political_type: political_type
            // }
            //
            // console.log('20180817 - POSTCONTAINER BTN - get info center param : ', queryParams )
            //
            // axios.get(p_env.BASE_URL+'/vue/findOndInfoCenter', {
            //   params: queryParams
            // })
            // .then(res => {
            //   // upper routed data is not yet complete , right bottom data is this space data
            //   console.log('20180812 - get data : ', res.data.data )
            //
            //   let info = res.data.data
            //   info.s_rid = res.data.data.id
            //   // info.place_type = 'infocenter'
            //   info.photos = this.$store.state.photos
            //   info.id = this.$store.state.id
            //   info.user_name = this.$store.state.user_name
            //   info.place_name = info.portal_name
            //
            //   this.$router.push({name: 'postEditor', params: {data: info}})
            // }) // axios then

            let info = JSON.parse(localStorage.getItem('currentPlace'))
            info.from_type = 'mainInfoTab'
            info.place_name = info.portal_name
            // console.log('20180921 -  PostContainer INFO CENTER Params.........111:', info)
            this.$router.push({name: 'postEditor', params: {data: info}})

          } else {
            this.dialog_login = true
          }
          // console.log("PostContainer : Write post clicked...")
      } else {
          this.dialog_login = true
      }



    },

    login: function() {
      this.dialog_login = false
    },

    showProfile(idx){
      let info = this.postLists[idx]
      let r_params = {}
      // console.log("20180724 - Store DATA .....", info )
      r_params.creator_id = info.creator_id

      this.$store.commit('setCreatorId', r_params)

      // send creator_id to Profile
      this.$router.push({name: 'otherprofile'})
    },

    create_reply(index) {
      this.message[index]= ''
      // console.log('create reply index : ', index)
      // console.log('create userdata : ', this.$store.state.user_junk.user)
    },

    createReply(index){

      let reply_data = this.postLists[index]
      let creator_data = this.$store.state.user_junk.user
      axios.post(p_env.BASE_URL+'/vue/reply/create', {
    		content                 : this.message[index],
    		link_url                : '',
    		photos                  : '',
    		properties              : '',
    		country                 : reply_data.country,
    		locality                : reply_data.locality,
    		sublocality_level_1     : reply_data.sublocality_level_1,
    		sublocality_level_2     : reply_data.sublocality_level_2,
    		sublocality_level_3     : reply_data.sublocality_level_3,
    		creator_name            : creator_data.user_name,
    		creator_id              : creator_data.id,
    		creator_photo           : creator_data.photo,
    		s_rid                   : reply_data.id
      }) // axios /v1/auth/signup
      .then(res=>{
          this.repley_clear = true
          // console.log('REPLY retuen data  : ', res.data.data)


          // this.$store.commit('setUserInfo', res.data.data)
          // window.history.back()
      })

      // console.log('create reply parent : ', this.postLists[index])

    },

    getReplys(index) {
        let rid = this.postLists[index].id
        let queryParams = {
            id: rid
        }

        axios.get(p_env.BASE_URL+'/vue/reply/getReplys', {
          params: queryParams
        })
        .then(res => {

            let newarr=[]
            for(var i=0; res.data.data.length>i; i++){
                if(res.data.data[i]['@class']=='Reply'){
                    var readyObj = res.data.data[i]
                    newarr.push(readyObj)
                }
                // console.log('GET REPLY new DATA : ', newarr)
            }
            this.replyLists = newarr
            // console.log('GET REPLY new DATA : ', newarr)


        })
        // console.log("GET REPLY DATA ")
    }



  }, // methods

  computed: {

    result:  function() {
      var my_result = anchorme(this.content,{
        	attributes:[
        		{
        			name:"target",
        			value:"_blank"
        		},
        		function(urlObj){
              // console.log("PostContainer : url : ", urlObj.encoded)
        			// document.getElementById("urlobj").innerText = JSON.stringify(urlObj,null,4);
        			// if(urlObj.raw === "mylink.com") {
        			// 	return {
        			// 		name:"class",
        			// 		value:"mylink"
        			// 	}
        			// } // if
        		}
        	]
        });
      return my_result
    }
  },

  watch: {

  },

  updated: function() {
    console.log("PostContainer : updated............")
  },

  components: {
    LinkPrevue,
    DialogPost
  },

  mounted() {
    console.log('20180809 - HERE IS PostContainer MOUNTED')
    console.log('20180922 - HERE IS PostContainer message length : ', this.postLists.length)
    for(var i=0; this.postLists.length>i; i++){
      this.message[i] = '댓글을 입력하세요'
      // this.reply_number[i] = this.postLists[i].replys
    }
    //'댓글을 입력하세요'
    console.log('20180922 - HERE IS PostContainer place_name of CREATED', this.postLists)

    this.$store.watch(this.$store.getters.getN, aaa => {

      // console.log("PostContainer .........When this triggered.........aaa: ", aaa)


    }) // this.$store.watch

  } // mount
}
</script>

<style >

.p_card {
  margin-bottom: 5px;
  padding: 10px;
}

.p_margin_top {
  margin-top: 150px;
}

.titlebar {
  background-color: blue;
  height: 200px;
  flex-shrink: 0;
}


.p_textarea {
  align-self: baseline;
  width: 100%;
  height: 250px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #333;

}

.headline {
  color: white;
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

.p_text_field {
  font-size: 12px;
  color: gray;
}

</style>
