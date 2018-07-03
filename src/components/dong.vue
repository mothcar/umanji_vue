<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
</span>
          </div>
        </v-card-title>
        <v-card-media
          :src="imageUrl"
          height="200px"
        >
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

  data: () => ({
    show: false,
    imageUrl: "https://mblogthumb-phinf.pstatic.net/20130218_187/mh130mmg_136118303558282gIR_JPEG/2013-02-18_16.32.43.jpg?type=w2"

  }),

  created:function() {

    axios.get('http://119.205.233.249:3000/v1/geo/getPortalInfo?latitude=37.4918325&longitude=126.9233221')
    .then(res => {
      // console.log(res.data.data)
      // console.log(res.data.data.portal_name)
      // this.news = res.data
      console.log(res)
    })

    // this.$http.get('http://119.205.233.249:3000/v1/geo/getPortalInfo?latitude=37.4918325&longitude=126.9233221')
    // .then(res => {
    //   console.log(res.data.data)
    //   console.log(res.data.data.portal_name)
    //   // this.news = res.data
    // })
    // .catch()

  }, // fn create
}


</script>

<style>

</style>
