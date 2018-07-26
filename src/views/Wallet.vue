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
      <!-- <v-tabs
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
      </v-tabs> -->
    </v-toolbar>

    <!-- create Post Button ******************************************************************************** -->
    <div>
      <v-btn color="error" @click="openSender" >송금</v-btn>
      <v-btn color="info" @click="buyMoney" >구매</v-btn>
      <!--  -->
      <!-- @click.stop="dialog = true" -->
    </div>
    <!-- create Post Button ******************************************************************************** -->
    <v-layout>
    <v-data-table
    :headers="headers"
    :items="ledger_lists"
    class="elevation-1"
    default-sort="date:asc"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.createdAt }}</td>
      <td class="">
        <div>


        <v-list-tile-avatar>
            <img :src="props.item.withdrawal_photo" @click="showProfile(user_index)">
        </v-list-tile-avatar>
        {{ props.item.deposit_name }} {{ props.item.description }}
      </div></td>
      <td class="p_tabel_text">{{ props.item.amount }}</td>
      <td class="p_tabel_text">{{ props.item.deposits }}</td>
      <td class="p_tabel_text">{{ props.item.balance }}</td>
    </template>
  </v-data-table>
  </v-layout>

  <!--
  value: true,
  date: '20180724',
  description: '빵값',
  withdrawals: 3000,
  deposits: 0,
  balance: 45000
 -->

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
                <v-text-field v-model="get_user_phone"
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
      get_user_phone: '',
      get_money: 0,
      get_content: '',

      // table data ***********************************************************************
      headers: [
         {
           text: '날짜',
           align: 'right',
           // sortable: true,
           value: 'date',
           // isDescending: false,
          //  sort: (a,b) => {
          //  //replace with custom algoritm
          //   // if(a>b) return 0
          //   // if(a<b) return 1
          //   return 0
          // }
         },
         { text: '내 역', align: 'right', value: 'description' },
         { text: '출 금', align: 'right', value: 'withdrawals' },
         { text: '입 금', align: 'right', value: 'deposits' },
         { text: '잔 액', align: 'right', value: 'balance' }
       ],
       // currentOrder: 'order',
       ledger_lists: [],
       links: {text: 'teste'}  //  for refresh
      // table data ***********************************************************************

    }
  },

  mounted() {
    this.getLedgerData()
  }, // mounted

  methods: {
    orderedItems(items) {
            return items.filter(item => {
                if (item[this.currentOrder]) return item;
            });
        },

    openSender: function() {
      console.log('send Money')
      this.dialog = true
    },

    sendMoney: function() {
      this.dialog = false
      console.log('20180724 - GET PHONE NUMBER : ', this.get_user_phone)
      console.log('20180724 - GET PHONE NUMBER : ', this.get_money)
      console.log('20180724 - GET PHONE NUMBER : ', this.get_content)
      let sendParams = {
        user_id: this.$store.state.id,
        trans_type: 'withdrawals',
        amount: this.get_money,
        withd_user_phone: this.get_user_phone,
        description: this.get_content
      }
      axios.post(p_env.BASE_URL+'/vue/withdrawal', sendParams)
          .then(res => {
              console.log('SecureLogin - login : ', res.data.data)
              // window.history.back()
              this.get_user_phone = ''
              this.get_money = 0
              this.get_content = ''

              this.getLedgerData()

          }).catch(error => {
            console.log('SecureLogin - login : ', error.message);
          })
    }, // sendMoney

    buyMoney: function() {

    }, // buyMoney

    getLedgerData: function(){
      let moment = require('moment')
      let userId = this.$store.state.id
      axios.get(p_env.BASE_URL+'/vue/getUserData', {
        params: {id: userId}
      })
      .then(res=>{
        console.log('20180724 - GET profile data :', res.data.data)
        this.user_data = res.data.data
        this.money = res.data.data.money

        axios.get(p_env.BASE_URL+'/vue/getLedgerData', {
          params: {id: userId}
        })
        .then(results=>{
          console.log('20180725 - get LEDGER DATA : ', results.data.data  )
          for(var i=0; results.data.data.length> i; i++){
            let old_date = results.data.data[i].createdAt
            let new_date = moment(old_date).format('YYYY-MM-DD HH:mm:ss')
            results.data.data[i].createdAt = new_date
          }

          this.ledger_lists = results.data.data
          // this.sortedItems


        }) // second axios
      }) // axios then
    } //getLedgerData

  },

  computed: {
  sortedItems: function() {
    console.log('COMPUTED...............')
    // return this.ledger_lists.sort((a, b) => new Date(a.order) - new Date(b.order))

    // function compare(a, b) {
    //   console.log('20180725 - a is : ', a.order)
    //   console.log('20180725 - b is : ', b.order)
    //   if (a.order < b.order)
    //     return -1;
    //   if (a.order > b.order)
    //     return 1;
    //   return 0;
    // }
    //
    // return this.ledger_lists.sort(compare);
    return ledger_lists.sort(function(a, b) {
        return a.order - b.order;
      });

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
.p_tabel_text{
  text-align: right;

}
</style>
