<template >
<div class="managerApp_back">


  <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card class="p_dialog">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field label="이름" v-model="user_name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="현주소" v-model="address" hint="지역 읍면동까지"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="휴대폰번호" v-model="phone_number" hint="- 빼고 ex) 01012345678" persistent-hint required ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="출생년도" v-model="birth_year" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="직업" v-model="job" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="관리하고 싶은 지역" v-model="wanted_area" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*모두 채워주세요</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit">제출</v-btn>
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
  name: 'managerApply',
  props: {
    // dialog:{
    //     type: Boolean
    // }
  },

  data() {
    return {
      dialog: false,
      user_name: '',
      address: '',
      phone_number: '',
      email: '',
      birth_year: '',
      job: '',
      wanted_area: ''
    }
  },

  watch: {
    // phone_number: {
    //
    // }
  },

  mounted() {
  }, // mounted

  methods: {

    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
    },

    submit() {
      this.dialog = false
      console.log('20180731 - SUBMIT........')
    }

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
