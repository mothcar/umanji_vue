<template>
  <!-- <div class="home" > -->

    <v-content>

    <v-layout class="p_margin_top">
      <v-flex xs12 sm6 offset-lg3 >

    <!-- create Post Button ******************************************************************************** -->
    <!-- <div> -->
      <v-btn color="success" @click="createPost">Write Post</v-btn>
      <!-- @click.stop="dialog = true" -->
    <!-- </div> -->
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
</v-content>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import LinkPrevue from 'link-prevue'
var anchorme = require("anchorme").default
import { mapGetters } from 'vuex'


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
    hasUrl: true,
    notifications: false,
    sound: true,
    widgets: false,
    // postLists: [],
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
      dialog: false,
      default_user: require('../assets/images/default_user.jpg'),
      busData: '',
      link_url: ''


  }),

  created: function () {

    console.log('20180809 - HERE IS PostContainer CREATED')
  }, //created

  methods: {

    spaceRouter: function(idx) {

      let info = this.postLists[idx]
      info.from_type = 'postContainer'

      this.$router.push({ name: 'spacePage', params:{id: info}})
      console.log('20180727 - ROUTE DATA FROM POSTContainer PLACE TYPE  ....', info)

    },

    createPost: function() {
      // @click.stop="dialog = true"
      if(this.$store.state.authenticated == true) {
        console.log('20180912 - current place data : ', this.$store.state.current_place)
        let info = this.$store.state.current_place
        // info.place_type = 'infocenter'
        // info.place_name = this.$store.state.infocenter_data.place_name
        info.photos = this.$store.state.photos
        info.id = this.$store.state.id
        info.user_name = this.$store.state.user_name
        info.place_name = info.portal_name
        console.log("PostContainer : beforORE SEND PARAMS : ", info)
        this.$router.push({name: 'postEditor', params: {data: info}})
        // console.log("PostContainer : dialog is true")
      } else {
        this.dialog = true
      }
      // console.log("PostContainer : Write post clicked...")
    },

    login: function() {
      this.dialog = false
    },

    showProfile(idx){
      let info = this.postLists[idx]
      let r_params = {}
      console.log("20180724 - Store DATA .....", info )
      r_params.creator_id = info.creator_id

      this.$store.commit('setCreatorId', r_params)

      // send creator_id to Profile
      this.$router.push({name: 'otherprofile'})
    },


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
              console.log("PostContainer : url : ", urlObj.encoded)
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
    LinkPrevue
  },

  mounted() {
    console.log('20180809 - HERE IS PostContainer MOUNTED')

    this.$store.watch(this.$store.getters.getN, tabState => {

      console.log(".........When this triggered.........")


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


</style>
