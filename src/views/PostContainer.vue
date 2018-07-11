<template>
  <div class="home">


    <v-content>

    <v-layout class="p_margin_top">
      <v-flex xs12 sm6 offset-lg3 >



    <!-- create Post Button ******************************************************************************** -->
    <div>
      <v-btn color="success" @click="createPost">Write Post</v-btn>
      <!-- @click.stop="dialog = true" -->
    </div>
    <!-- create Post Button ******************************************************************************** -->

    <!-- content ******************************************************************************** -->
            <v-card class="p_card" v-for="item in postLists"
              :key="item.id"
              avatar
              @click="">

                <v-card-title primary-title>
                  <v-list-tile-avatar>
                    <img :src="item.photos">
                  </v-list-tile-avatar>
                  <div>


                    <div v-html="item.content"></div>
                  </div>
                </v-card-title>
                <div>
                  <link-prevue v-show="hasUrl" url="https://naver.com/">
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

                <!-- <v-card-media
                    :src="item.photos"
                    height="200px"
                  ></v-card-media> -->

            </v-card>
      <!-- content ******************************************************************************** -->


            </v-flex>
          </v-layout>
</v-content>

  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import LinkPrevue from 'link-prevue'
var anchorme = require("anchorme").default
import { mapGetters } from 'vuex'


export default {

  name: 'home',
  // props: {
  //   postLists: Array
  // },

  data: () => ({
    clipped: true,
    hasUrl: false,
    notifications: false,
    sound: true,
    widgets: false,
    postLists: [],
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
      content: ''


  }),

  methods: {
    createPost: function() {
      // @click.stop="dialog = true"
      if(this.$store.state.authenticated == true) {
        // this.dialog = true
        this.$router.push({name:'postEditor'})
      } else {
        alert(" Please Sign in ")
      }
      console.log("PostContainer : Write post clicked...")
    },

    doSomething() {
      console.log('PostContainer : Hello')
    },
    doSomethingAfterMounted() {
      console.log('PostContainer : Editor mounted')
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

  created: function () {

    // console.log('PostContainer : Props in Post Containser ', this.props)
  }, //created

  updated: function() {
    console.log("PostContainer : updated............")
  },

  components: {
    LinkPrevue
  },

  mounted() {

    // setInterval(() => { this.$store.state.n++ }, 1000)

    this.$store.watch(this.$store.getters.firstCheck, admindong => {
      console.log('watched: ddddddd', admindong)
      let portal_name = this.$store.state.adminDong

      axios.get(p_env.BASE_URL+'/main/posts', { params: {
        portalType: 'sublocality2', //sublocality2
        portalName: portal_name // 대방동
        }
      })
      .then(res => {
        this.postLists = res.data.data
        console.log('PostContainer -First  Post Lists : ',res.data.data)

      })
    })

    this.$store.watch(this.$store.getters.getN, tabState => {
      // console.log('watched: ddddddd', tabState)
      // console.log('Order CHECK : PostContainer created .............')
      // let portal_name = this.$store.state.adminDong

      this.postLists = []

      let portal_type = this.$store.state.tabState
      let portal_name = this.$store.state.adminDong

      // world|country|locality|sublocality1|sublocality2

      switch(portal_type){
        case 'country':
          portal_type = 'country'
          portal_name = this.$store.state.country
        break;
        case 'city_do':
          portal_type = 'locality'
          portal_name = this.$store.state.city_do
        break;
        case 'gu_gun':
          portal_type = 'sublocality1'
          portal_name = this.$store.state.gu_gun
        break;
        case 'adminDong':
          portal_type = 'sublocality2'
          portal_name = this.$store.state.adminDong
        break;

      }
      
      console.log("Query Params Check : portal type is : ", portal_type +' and Portal Name  : '+ portal_name)

      axios.get(p_env.BASE_URL+'/main/posts', { params: {
        portalType: portal_type, //sublocality2
        portalName: portal_name // 대방동
        }
      })
      .then(res => {
        this.postLists = res.data.data
        console.log('PostContainer - Continue Post Lists : ',res.data.data)

      })
    })

  }
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

</style>
