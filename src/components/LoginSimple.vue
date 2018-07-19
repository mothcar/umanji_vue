<template>
  <!-- Dialog ******************************************************************************** -->
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">로그인 하시겠습니까?</v-card-title>

        <v-card-text class="p_portal_page">
          동네사람들에게 좋은 정보를 제공하시면 계급이 승급됩니다.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            아니오
          </v-btn>

          <router-link :to="{ name: 'secureLogin', params: {} }">
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="login"
            >
              예
            </v-btn>
          </router-link>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  <!-- Dialog ******************************************************************************** -->


</template>

<script>
export default {

  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    login: function() {
      
    }
  }

} // export default
</script>
