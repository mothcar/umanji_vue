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

    <!-- create Post v-dialog ******************************************************************************* -->
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


          <!-- <v-card-text>
            <v-list three-line subheader>
              <v-subheader>Create Post</v-subheader>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>Write</v-subheader>
              <v-list-tile avatar>

                  <span>Content:</span>
                  <br>
                  <textarea class="p_textarea" v-model="content" placeholder="add multiple lines"></textarea>
              </v-list-tile>

            </v-list>
          </v-card-text> -->
          <div>
            <VuePellEditor
                :actions="editorOptions"
                :content="editorContent"
                :placeholder="editorPlaceholder"
                v-model="editorContent"
                :style-with-css="false"
                :classes="editorClasses"
                default-paragraph-separator="p"
                @change="doSomething"
                @mounted="doSomethingAfterMounted"
            />
          </div>





          <div style="flex: 1 1 auto;"></div>
        </v-card>

      </v-dialog>
      <!-- create Post v-dialog ******************************************************************************* -->

      <!-- content ******************************************************************************** -->
              <v-card v-for="item in postLists"
                :key="item.content"
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
                    <link-prevue url="https://vuejs.org/">
                      <template slot-scope="props">
                        <div class="card" style="width: 2rem;">
                          <img class="card-img-top" :src="props.img" :alt="props.title">
                          <div class="card-block">
                            <h4 class="card-title">{{props.title}}</h4>
                            <p class="card-text">{{props.description}}</p>
                            <a v-bind:href="props.url" class="btn btn-primary">More</a>
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
import dong from '@/components/dong.vue'
import gugun from '@/components/gugun.vue'
import sido from '@/components/sido.vue'
import country from '@/components/country.vue'
import world from '@/components/world.vue'
import LinkPrevue from 'link-prevue'
import VuePellEditor from 'vue-pell-editor'


export default {

  name: 'home',
  props: {
    postLists: Array
  },

  data: () => ({
    clipped: true,
    dialog: false,
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
      editorContent: '',
      editorOptions: [
        'bold',
        'underline',
        {
          name: 'italic',
          result: () => window.pell.exec('italic')
        },
        {
          name: 'custom',
          icon: '<b><u><i>C</i></u></b>',
          title: 'Custom Action',
          result: () => console.log('YOLO')
        },
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) window.pell.exec('insertImage', ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) window.pell.exec('createLink', ensureHTTP(url))
          }
        }
      ],
      editorPlaceholder: 'Write something amazing...',
      editorContent: '<div>Predefined Content</div>',
      editorClasses: {
        actionbar: 'pell-actionbar-custom-name',
        button: 'pell-button-custom-name',
        content: 'pell-content-custom-name'
      }



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


    }, //submitPost

    doSomething() {
      console.log('Hello')
    },
    doSomethingAfterMounted() {
      console.log('Editor mounted')
    }

  }, // methods

  created: function () {
    console.log('Props in Post Containser ', this.props)
  }, //created

  components: {
    dong, gugun, sido, country, world, LinkPrevue, VuePellEditor
  },

  mounted() {
    console.log('this is current quill instance object', this.myQuillEditor)
  }
}
</script>

<style scoped>
@import '~vue-pell-editor/dist/vue-pell-editor.css';

.p_margin_top {
  margin-top: 150px;
}

.titlebar {
  background-color: blue;
  height: 200px;
  flex-shrink: 0;
}

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
