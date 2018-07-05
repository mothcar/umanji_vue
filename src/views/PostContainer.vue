<template>
  <div class="home">
    <v-card>
      <v-card-media
        :src="imageUrl"
        height="50px"
      >
      <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{ center_name }}</span>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card-media>
    </v-card>

    <div>
      <v-btn color="success" @click="createPost">Write Post</v-btn>
      <!-- @click.stop="dialog = true" -->
    </div>

    <v-layout row class="mt-5">
      <v-flex xs12 sm6 offset-sm3 >
      <!-- </v-flex> -->


      <!-- v-dialog ******************************************************************************* -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
      <!-- slide-x-transition -->
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Post</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="submitPost">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <!-- <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile> -->
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <v-list three-line subheader>
              <v-subheader>Create Post</v-subheader>
              <!-- <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile> -->
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>Write</v-subheader>
              <v-list-tile avatar>

                <!-- <v-list-tile-content> -->
                  <span>Content:</span>
                  <!-- <p style="white-space: pre-line;">{{ content }}</p> -->
                  <br>
                  <textarea class="p_textarea" v-model="content" placeholder="add multiple lines"></textarea>
                <!-- </v-list-tile-content> -->
              </v-list-tile>


            </v-list>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      <!-- </v-layout> -->
      <!-- v-dialog ******************************************************************************* -->
      <!-- <template> -->

          <!-- <v-layout row> -->
            <!-- <v-flex xs12 sm6 offset-sm3> -->
              <v-card>

                <v-list two-line>
                  <template v-for="(item, index) in items">

                    <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

                    <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                    <v-list-tile v-else :key="item.title" avatar @click="">
                      <v-list-tile-avatar>
                        <img :src="item.avatar" >
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-avatar>
                        <img src="../assets/avatar.png" >
                      </v-list-tile-avatar>

                    </v-list-tile>

                  </template>
                </v-list>

              </v-card>
            </v-flex>
          </v-layout>

      <!-- </template> -->

  </div>
</template>

<script>
// @ is an alias to /src
import dong from '@/components/dong.vue'
import gugun from '@/components/gugun.vue'
import sido from '@/components/sido.vue'
import country from '@/components/country.vue'
import world from '@/components/world.vue'

export default {

  name: 'home',
  props: {
    test: Array
  },

  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    content: '',

    show: false,
    center_name: "신대방동정보센터",
    imageUrl: "https://mblogthumb-phinf.pstatic.net/20160119_176/wnswo2015_1453161466962bNYC0_JPEG/DSC02491.JPG?type=w2",
    items: [
        { header: 'Today' },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/4.jpg', title: 'Birthday gift', subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?" },
        { divider: true, inset: true },
        { avatar: 'https://s3.amazonaws.com/vuetify-docs/images/lists/5.jpg', title: 'Recipe to try', subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
      ]



  }),

  methods: {
    getdata: function() {
      console.log(this.passtest)
    },
    createPost: function() {
      // @click.stop="dialog = true"
      if(this.$store.state.authenticated == true) {
        this.dialog = true
        console.log("dialog is true")
      } else {
        alert(" Please Sign in ")
      }
      console.log("Write post clicked...")
    },
    submitPost: function() {
      // @click.native="dialog = false"

      /*
      content : "이것만 있으면 되나요?"
      owner_id : %2322%3A0
      latitude : 37.4995519
      longitude : 126.9185359
      country_code : KR
      location : {\"@class\":\"OPoint\",\"coordinates\":[126.9194521,37.4997197]}
      */


      this.dialog = false;

      // axios.post('http://119.205.233.249:3000/v1/auth/signin', { email:this.input.username, password:this.input.password })
      //     .then(res => {
      //         this.$store.commit('saveToken', res.data.data.token)
      //         this.$store.commit('auth', true)
      //         console.log(res.data.data.token)
      //         this.$router.push({name: 'home'})
      //     }).catch(error => {
      //         this.input.username = ''
      //         this.input.password = ''
      //       console.log(error.message);
      //     }) // axios


    } //submitPost

  }, // methods

  created: function () {
    console.log('Props in Post Containser ', this.props)
  }, //created

  components: {
    dong, gugun, sido, country, world
  }
}
</script>

<style scoped>
.p_textarea {
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: auto;
  border: 1px solid #333;

}

.headline {
  color: white;
}

</style>
