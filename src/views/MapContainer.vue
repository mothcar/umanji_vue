<template>


    <my-map :markers='[
            {"lat":35.6432027,"lng":139.6729435},
            {"lat":35.5279833,"lng":139.6989209},
            {"lat":35.6563623,"lng":139.7215211},
            {"lat":35.6167531,"lng":139.5469376},
            {"lat":35.6950961,"lng":139.5037899}
          ]'>
          <button class="position" @click="autodetect"> Check Props List </button>
          </my-map>

</template>

<style scoped>
/* .position {
  width: 300px;
  height: 400px;
  display: table-cell;
  vertical-align: middle;
} */
</style>

<script>
import myMap from './MyMap.vue'
export default {

  props: {
    postLists: Array
  },

  created: function () {


  },

  methods: {
    autodetect() {
      console.log("postLists from Map : " + postLists)
      // return this.content = area
    }
  },

  components: {
    myMap
  }
}
</script>
