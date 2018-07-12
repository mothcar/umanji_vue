<template>
<div >
  <div class="p_container">
    <h1> This is profile</h1>
  </div>

  <div class="p_container">

    <div class="p_box">
      header box
    </div>
    <div class="p_box">
      left box
    </div>
    <div class="p_box">
      main box
    </div>

    <div class="p_box">
      <img :src="image" />
    </div>

  </div>



</div>
</template>

<style scoped>
.p_container {
  background: #777;
  display: flex;
  margin: 5px;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1 100px;
}
.p_box {
  width: 100%;

  background: red;
  margin:10px;
  padding: 10px;
}

.p_box img {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      image: require('../assets/images/profile_sample.jpg')
    }


  },

  methods: {

  },

  components: {

  }
} // export

</script>
