<template>
  <div>

    This is Other Profile Page
    <h3>user id : {{ creator_id }}</h3>
    <h3>user name : {{ user_name }}</h3>
    <h3>money : {{ money }}</h3>
    <v-list-tile-avatar>
      <img :src="photo">
    </v-list-tile-avatar>
    <h3>{{ user_data }}</h3>
  </div>

</template>

<script>
export default {
  data() {
    return {
      creator_id: '',
      user_name: '',
      money: 0,
      photo: '',
      user_data: ''


    }
  },

  mounted() {
    this.creator_id = this.$store.state.p_creator_id
    console.log('20180726 - get user id : ', this.creator_id)

    let userId = this.creator_id
    axios.get(p_env.BASE_URL+'/vue/getUserData', {
      params: {id: userId}
    })
    .then(res=>{
      console.log('20180724 - GET profile data :', res.data.data)
      this.photo = res.data.data.photos
      this.user_data = res.data.data
      this.user_name = res.data.data.user_name
      this.money = res.data.data.money
    }) // axios then
  }, // mounted

  methods: {

  },

  components: {

  }

} // export default

</script>

<style>
</style>
