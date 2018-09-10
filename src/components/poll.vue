<template>
  <v-app id="inspire">
    <v-container>
      <v-layout>
        <v-flex>
          <v-text-field
            v-model="textField"
            :counter="30"
            label="Title"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    This is Sample Page
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      textField: 'ipsum blablas..............'
    }
  },

  mounted() {
  }, // mounted

  methods: {

  },

  components: {

  }

} // export default

</script>

<style>
</style>
