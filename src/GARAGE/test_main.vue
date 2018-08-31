<template>
  <v-app id="inspire" >


    <v-container fluid class="pa-0 test_main">
      <v-parallax
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      height="600"
      class="gradientBkg "
      jumbotro
    >
      <v-layout row align-center justify-center>
        <!-- align-center : 새로  justify-center : 가로  -->
        <v-flex xs10 sm8 md6>
          <!-- 작은 네모를 전체를 감쌈 -->

          <v-layout row wrap justify-center>
            <v-flex xs8 text-xs-center>
              <img src="https://island-web.ca/wp-content/uploads/2017/11/vuetify-logo-300.png" style="max-width:150px;"/>
            </v-flex>
            <v-flex xs10 text-xs-center>
              <h1 class="display-2"><strong>Vuetify</strong></h1>
            </v-flex>
            <v-flex xs10 text-xs-center class="mt-2">
              <p class="headline">Material Component Framework</p>
              <v-btn color="white" class="primary--text">Get Started</v-btn>
              <p class="caption">version 0.17.0</p>
            </v-flex>
          </v-layout>





          <v-layout row wrap justify-center class="mb-3 ">
            <!-- 아래 버튼들  -->
            <v-flex xs1 text-xs-center>
              <v-btn icon color="white">
                <v-icon class="primary--text">fa-github</v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs1 text-xs-center>
              <v-btn icon color="white">
                <v-icon class="primary--text">fa-twitter</v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs1 text-xs-center>
              <v-btn icon color="white">
                <v-icon class="primary--text">fa-facebook</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>





        </v-flex>
      </v-layout>


    </v-parallax>
    </v-container>




    <v-container  class="two">
      <v-layout row wrap justify-space-between text-xs-center class="mt-5">
        <v-flex xs10 sm3 text-xs-center>
          <img src="https://vuetifyjs.com/static/doc-images/feature1.svg" class="elevation-1" style="max-width:300px;"/>
          <p class="title mt-4">Vue-CLI Templates</p>
          <p>Vuetify comes ready to go with 8 pre-made vue-cli templates. From simple html to full-blown SSR, you are ready to go in minutes.</p>
        </v-flex>
        <v-flex xs10 sm3 text-xs-center>
          <img src="https://vuetifyjs.com/static/doc-images/feature2.svg" class="elevation-1" style="max-width:300px;"/>
          <p class="title mt-4">Vue-CLI Templates</p>
          <p>Vuetify comes ready to go with 8 pre-made vue-cli templates. From simple html to full-blown SSR, you are ready to go in minutes.</p>
        </v-flex>
        <v-flex xs10 sm3 text-xs-center>
          <img src="https://vuetifyjs.com/static/doc-images/feature3.svg" class="elevation-1" style="max-width:300px;"/>
          <p class="title mt-4">Vue-CLI Templates</p>
          <p>Vuetify comes ready to go with 8 pre-made vue-cli templates. From simple html to full-blown SSR, you are ready to go in minutes.</p>
        </v-flex>
      </v-layout>
    </v-container>


  </v-app>
</template>

<style>
.test_main{
  background-color: gray;
}
.one{
  background-color: blue;
}
.two{
  background-color: yellow;
}
.three{
  background-color: tomato;
}
</style>

<script>
// origin source : https://codepen.io/JamieCurnow/pen/QOqdzB?editors=1000
</script>
