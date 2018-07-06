<template>
  <!-- <div id="app"> -->
  <div>
    <router-view></router-view>
  </div>
<!-- </div> -->
</template>

<script>

export default {

  data () {
    return {

    }
  },

  name: 'App',

  methods: {

  }, // method

  computed: {

  }, // computed

  created: function () {

  }
}
</script>

<style>
  /* @import "./assets/css/custom.css";
  @import "./assets/css/combined.min.css"; */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
  color: #888
}

.fab-container {
  /* position: fixed; */
  margin-bottom: 40px;
  margin-right: 7px;
  bottom: 0;
  right: 0;
}
</style>
