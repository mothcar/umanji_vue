<template>
  <v-app>

    <h1>This is Post Editor</h1>



    <!-- create Post v-dialog ******************************************************************************* -->

      <!-- slide-x-transition -->
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="close">
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


          <div>
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
                    <p >
                      {{ result }}
                    </p>

              </v-list-tile>

            </v-list>
          </div>






          <div style="flex: 1 1 auto;"></div>
        </v-card>

      <!-- create Post v-dialog ******************************************************************************* -->

  </v-app>


</template>

<script>
export default {
  data () {
    return {
      content: '',
      result: ''

    }

  }, //data

  methods: {
    close: function() {
      window.history.back()
    },
    submitPost: function() {
      window.history.back()

      /*
      content : "이것만 있으면 되나요?"
      owner_id : %2322%3A0
      latitude : 37.4995519
      longitude : 126.9185359
      country_code : KR
      location : {\"@class\":\"OPoint\",\"coordinates\":[126.9194521,37.4997197]}
      */


      // this.dialog = false;

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
  } // methods
} // export

</script>

<style>
</style>
