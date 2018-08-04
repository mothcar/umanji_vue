<template >
<div class="managerApp_back">


  <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card class="p_dialog">
        <v-card-title>
          <span class="headline">Set Admin</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <!-- <v-flex xs12>
                <v-text-field label="휴대폰번호" v-model="phone_number" hint="- 빼고 ex) 01012345678" persistent-hint required ></v-text-field>
              </v-flex> -->
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>* 둘 중 하나만 넣어 주세요.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click.native="appoint">임명</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
// import {JustDigits} from '../plugins/filters'
// JustDigits()

export default {
  name: 'setAdmin',
  props: {
    // infocenterData:{
    //   type: Object
    // }
  },

  data() {
    return {
      dialog: false,
      // phone_number: '',
      email: '',
      infoData: ''

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

    appoint() {
      this.infoData = this.$store.state.placeInfo
      console.log('20180802 - get data from space INFO : ', this.infoData)
      let submitParams = {
        // phone_number: this.phone_number,
        email: this.email,
        s_rid: this.infoData.id
      }
      console.log('20180802 - submitParams : ', submitParams)
      axios.post(p_env.BASE_URL+'/vue/setAdmin', submitParams)
      .then(res=>{
        console.log('20180731 - SUBMIT Done ........', res.data.data )
      })
      this.dialog = false
    } // appoint

  },

  components: {

  }

} // export default

</script>

<style>
.managerApp_back{
  background-color: #fff;
}
</style>
