<template>
  <div data-app class="managerApp_back">


    <v-layout row justify-center >
      <v-dialog v-model="dialog" persistent max-width="500px">

        <!-- <v-container>
            <v-layout row class="text-xs-center"> -->
              <!-- <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
                <v-card height="500px"></v-card>
              </v-flex> -->
              <v-flex xs12 class="grey lighten-4">
                <v-container style="position: relative;top: 13%;" class="text-xs-center">
                  <v-card flat>
                    <v-card-title primary-title>
                      <h4>Login</h4>
                    </v-card-title>
                    <v-form>
                    <v-text-field prepend-icon="person" name="Username" label="Username" v-model="Username"> </v-text-field>
                    <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="Password"></v-text-field>
                    <v-card-actions>
                      <v-btn primary large block @click="loginSubmit">Login</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                      <v-btn primary large block @click="closeDialog">Close</v-btn>
                    </v-card-actions>
                    </v-form>
                  </v-card>
                </v-container>
              </v-flex>
            <!-- </v-layout>
          </v-container> -->


        </v-dialog>
      </v-layout>
    </div>



</template>


<script>
import eventHub from '../plugins/event-hub'
// import {JustDigits} from '../plugins/filters'
// JustDigits()

export default {
  name: 'setSuper',
  props: {
    // infocenterData:{
    //   type: Object
    // }
  },

  data() {
    return {
      dialog: false,
      Username: '',
      Password: ''

    }
  },

  watch: {
    // phone_number: {
    //
    // }
  },

  mounted() {
    // console.log('20180802 - Get from parent infocenter data :')
  }, // mounted

  methods: {
    loginSubmit() {
      let userId = this.Username
      let pw = this.Password
      let queryParams = {
        user_id: userId,
        password: pw
      }

      axios.get(p_env.BASE_URL+'/vue/checkSuper', {
        params: queryParams
      })
      .then(res => {
        console.log('20180818 - check server RES OK!! ', res.data.data) // pass or denied
        this.$emit('eee', res.data.data)
        this.dialog = false
      })

    }, // loginSubmit
    closeDialog() {
      this.dialog = false
    }


  }, // methods

  components: {

  }

} // export default

</script>

<style>
.managerApp_back{
  background-color: #fff;
}
</style>
