<template>
  <div data-app>

    MANAGE HOME
    <v-toolbar color="cyan" dark  tabs  fixed >
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ manage_title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="manage_top">

      <h3>{{ description_text }}</h3>
    </div>
    <br />
    <h3 v-if="isCitizen == false"> 관리영역 :   {{ title_roles }}</h3>
    <v-btn color="success" @click="showManager" >지역관리자 보기</v-btn>
    <v-btn color="warning" @click="routeToWiki" >사용설명서 만들기</v-btn>
    <v-btn v-if="isCitizen" color="success" @click="joinManager" >지역관리자 신청</v-btn>
    <br />
    <hr />

    <!-- MANAGER TABLE *********************************************************************************** -->
    <v-layout>
    <v-data-table
        :headers="headers"
        :items="managerList"
        class="elevation-1"
        default-sort="user_name:desc"
      >
        <template slot="headerCell" slot-scope="props"  v-model="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="p_tabel_text">{{  }}
            <v-list-tile-avatar>
                <img :src="props.item.photos[0]" @click="">
            </v-list-tile-avatar>
          </td>
          <td class="p_tabel_text">{{ props.item.user_name }}</td>
          <td class="p_tabel_text">{{ props.item.email }}</td>
          <td class="p_tabel_text">{{ props.item.manage_area }}</td>
          <td class="p_tabel_text">{{ props.item.roles }}</td>
          <td class="p_tabel_text">{{ props.item.about_info }}</td>
        </template>
      </v-data-table>
      </v-layout>
    <!-- MANAGER TABLE *********************************************************************************** -->
    <ManagerApply ref="manaApply" ></ManagerApply>



  </div>
</template>

<script>
import ManagerApply from '@/components/ManagerApply.vue'
import util from '@/plugins/filters'

export default {
  data() {
    return {
      rightDrawer: false,
      manage_title: 'MANAGEMENT HOME',
      description_text: '지역을위해 활동하고 싶으신 분들은 가입하십시오.',
      auth: false,
      apply_dialog: false,
      isCitizen: true,
      title_roles: '',
      // table DATA
      headers: [
          {
            text: '사진',
            align: 'right',
            sortable: true,
            value: 'photos'
          },
          { text: '이름', value: 'user_name' },
          { text: 'E-Mail', value: 'email' },
          { text: '관리지역', value: 'manage_area' },
          { text: '직업(역할)', value: 'roles' },
          { text: '비고', value: 'about_info' }
        ],
        managerList: [
          {
            photos: [],
            user_name: '문재인',
            email: 'eaa@naver.com',
            manage_area: '미국',
            roles: ['banker', 'politician'],
            about_info: ''
          },
          {
            photos: [],
            user_name: '노무현',
            email: 'eaa@naver.com',
            manage_area: '미국',
            roles: ['banker', 'politician'],
            about_info: ''
          }
        ]
    }
  },

  mounted() {
    // let authenticated = this.$store.state.authenticated
    let userToken = localStorage.getItem('userToken')
    if(userToken != null) {
      this.auth = true
    }
    // if(authenticated) this.auth = true
    let refData = this.$refs.manaApply.dialog
    // this.apply_dialog = refData
    console.log('role check this.$store.state.user_junk.user.roles.politician typeof : ', typeof this.$store.state.user_junk.user.roles.politician)
    console.log('role check this.$store.state.user_junk.user.roles.politician : ', this.$store.state.user_junk.user.roles.politician)
    if(this.$store.state.user_junk.user.roles.politician != undefined){
      this.title_roles = this.$store.state.user_junk.user.roles
      let o = {}
      o = this.title_roles
      // var match = "politician"
      // var val = o.find( function(item) { return item.key == match } );

      for(var prop in o) {
        console.log('20180802 - KEY VALUE : ', prop,o[prop]);
      }



      let oSize = Object.keys(o).length
      // console.log(val);
      console.log('20180802 - SUBTRACT ROLES : ', value)
      console.log('20180802 - SUBTRACT SIZE : ', oSize)
      console.log('20180801 - CHECK USER DATA ', this.$store.state.user_junk)
      if(this.$store.state.user_junk != '' ){
        if(oSize > 1) {
          var key = "politician";
          var value = util.getMapValue(o,key);      // value 2

          this.isCitizen = false
        }
      }
    } // if

    console.log('20180731 - managemanet ref : ', refData)

    axios.get(p_env.BASE_URL+'/vue/getManagerList')
    .then(result=>{
      this.managerList = result.data.data
      console.log('20180805 - get manager list : ', result)
    })


  }, // mounted

  methods: {
    showManager() {
      if(this.auth) {
        this.$router.push({name:'managerMap'})
      } else {
        alert('log in please')
      }

    },

    joinManager() {
      if(this.auth) {
        this.$refs.manaApply.dialog = true
      } else {
        alert('log in please')
      }
    },

    routeToWiki() {
      let adsUrl = 'https://namu.wiki/w/%EC%9A%B0%EB%A7%8C%EC%A7%80'
      // window.location.href = adsUrl
      window.open(adsUrl , '_blank' )
    }



  },

  components: {
    ManagerApply

  }

} // export default

</script>

<style>
.manage_top {
  margin-top: 60px;
}
.p_tabel_text{
  text-align: right;

}
</style>
