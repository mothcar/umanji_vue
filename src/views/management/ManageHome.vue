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
    <v-btn color="success" @click="showManager" >지역관리자 보기</v-btn>
    <v-btn color="success" @click="joinManager" >지역관리자 신청</v-btn>
    <ManagerApply ref="manaApply" ></ManagerApply>



  </div>
</template>

<script>
import ManagerApply from '@/components/ManagerApply.vue'

export default {
  data() {
    return {
      rightDrawer: false,
      manage_title: 'MANAGEMENT HOME',
      description_text: '지역을위해 활동하고 싶으신 분들은 가입하십시오.',
      auth: false,
      apply_dialog: false
    }
  },

  mounted() {
    let authenticated = this.$store.state.authenticated
    if(authenticated) this.auth = true
    let refData = this.$refs.manaApply.dialog
    // this.apply_dialog = refData
    console.log('20180731 - managemanet ref : ', refData)


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
</style>
