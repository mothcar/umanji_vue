<template>
  <div data-app>
    <v-toolbar
      color="cyan"
      dark
      tabs
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Wallet</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

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
    </v-toolbar>

    <!-- create Post Button ******************************************************************************** -->
    <div>
      <v-btn color="success" @click="openSender" >송금</v-btn>
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
      <v-card class="p_card" v-for="(item, content_index) in model.lists"
        :key="content_index"
        avatar
        @click="">

          <v-card-title primary-title>
            <div>
              <div>{{ item.date }} : {{ item.amount}}</div>
            </div>
          </v-card-title>

      </v-card>
      <!-- content ******************************************************************************** -->

      </v-tab-item>
    </v-tabs-items>







    <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent max-width="500px">



      <!-- <v-btn  color="primary" dark>Open Dialog</v-btn> -->
      <div class="p_dialog">
      <v-card>
        <v-card-title>
          <span class="headline">송금</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field v-model="get_user_name"
                  label="받으실 분"
                  hint="전화번호를 입력해 주세요"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="get_money"
                label="보내실 금액"
                hint="실수 없이 정확하게 "
                required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="get_content"
                label="보내시는 내용"
                hint="통장에 기재될 내용을 입력해 주세요"
                required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*필수 입력란입니다</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="sendMoney">송금</v-btn>
        </v-card-actions>
      </v-card>
      </div>
    </v-dialog>

  </v-layout>







  </div>

</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      item_name: ['입금내역', '송금내역'],
      model: {
        lists: [{date : '2018.07.21', amount: 1000},{date : '2018.07.22', amount: 2000} ],
        id: 'tab-2'
      },
      user_data: '',
      money: 0,
      get_user_name: '',
      get_money: 0,
      get_content: ''

    }
  },

  mounted() {
    let creator_id = this.$store.state.p_creator_id
    axios.get(p_env.BASE_URL+'/vue/getUserData', {
      params: {id: creator_id}
    })
    .then(res=>{
      console.log('20180724 - GET profile data :', res.data.data)
      this.user_data = res.data.data
      this.money = res.data.data.money
    }) // axios then
  }, // mounted

  methods: {
    openSender: function() {
      console.log('send Money')
      this.dialog = true
    },

    sendMoney: function() {
      this.dialog = false
      console.log('20180724 - GET PHONE NUMBER : ', this.get_user_name)
      console.log('20180724 - GET PHONE NUMBER : ', this.get_money)
      console.log('20180724 - GET PHONE NUMBER : ', this.get_content)
      let sendParams = {
        get_user_name: this.get_user_name

      }
      axios.post(p_env.BASE_URL+'/auth/signin', sendParams)
          .then(res => {
              console.log('SecureLogin - login : ', res.data.data)
              // window.history.back()
          }).catch(error => {
            console.log('SecureLogin - login : ', error.message);
          })
    }

  },

  components: {

  }

} // export default

</script>

<style>
.p_dialog{
  width: 100%;
  height: auto;
  background-color: #fff;

}
</style>
