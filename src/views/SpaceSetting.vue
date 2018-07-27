<template>
  <div>

    This is Sample Page
  </div>

</template>

<script>
export default {
  data() {
    return {
      routed_data: ''
    }
  },

  created () {
    document.addEventListener("backbutton", this.sendBackData, false);
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.sendBackData);
  },

  mounted() {
    console.log('20180728 - GET DATA : ', this.$route.params.data.content)
    this.routed_data = this.$route.params.data
  }, // mounted

  methods: {
    sendBackData: function() {
      console.log('20180728 - BACK BUTOTN')
      let info = this.routed_data

      this.$router.push({ name: 'spacePage', params:{id: info}})
    }

  },

  components: {

  }

} // export default

</script>

<style>
</style>
