<template>
  <my-map :markers='[
          {"lat":35.6432027,"lng":139.6729435},
          {"lat":35.5279833,"lng":139.6989209},
          {"lat":35.6563623,"lng":139.7215211},
          {"lat":35.6167531,"lng":139.5469376},
          {"lat":35.6950961,"lng":139.5037899}
        ]'>
        </my-map>
</template>

<script>
import myMap from './MyMap.vue'
export default {

  components: {
    myMap
  }
}
</script>
