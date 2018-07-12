<template>
  <div class="p_container">

    <div class="p_box p_header">
      <h1> Profile - Paul Hwang</h1>
    </div>
    <div class="p_box p_side">
      <h2> menu </h2>
    </div>
    <div class="p_box p_main">
      <div class="p_main_container">
        <h2 class="p_p">main - Possess</h2>
        <h3 class="p_p">admin Level : 5</h3>
        <h3 class="p_p">Money : 34,000</h3>
        <h3 class="p_p">Building : 5</h3>
        <h3 class="p_p">Blogs : 15</h3>

      </div>
    </div>

    <div class="p_box">
      <img :src="image" />
    </div>

  </div>



</template>

<style scoped>
.p_p {
  padding: 3px;

}

.p_container {
  background: #777;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.p_box {
  padding: 10px;
}

.p_header {
  width : 100%;
  background: #ccc;
  flex-grow: 1;
}

.p_side {
  min-width : 20%;
  flex-grow: 1;
  flex-shirk: 2;
  background: #eee;
}

.p_main {
  /* width : 70%; */
  min-width: 380px;
  flex-grow: 2;
  flex-shirk: 1;
  background: #ddd;
}

.p_main_container {
  margin: 10px;
  padding: 10px;
  background: #fff;
}

img {
  width: 100%;
  height: 100%;
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
