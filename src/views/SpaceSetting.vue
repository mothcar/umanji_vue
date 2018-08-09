<template>
  <div>

    <!-- file select *********************************************************************** -->
    <div>
        <div class="file-upload-form">
            Upload an image file:
            <input type="file" @change="previewImage" accept="image/*">
        </div>
        <v-btn v-show="readyToUpload" color="success" @click="uploadPhoto" > Update Photo </v-btn>
        <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData">
        </div>
    </div>
    <!-- file select *********************************************************************** -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      routed_data: '',
      imageData: '',
      readyToUpload: false,
    }
  },

  created () {
    document.addEventListener("backbutton", this.sendBackData, false);
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.sendBackData);
  },

  mounted() {
    console.log('20180728 - GET DATA : ', this.$route.params.data)
    this.routed_data = this.$route.params.data
  }, // mounted

  methods: {
    sendBackData: function() {
      console.log('20180728 - BACK BUTOTN')
      let info = this.routed_data

      this.$router.push({ name: 'spacePage', params:{id: info}})
    },

    uploadPhoto: function() {
      let _this = this
      var cloudinary = require('cloudinary')
      cloudinary.config({
        cloud_name: 'mothcar',
        api_key: '671637223366122',
        api_secret: 'VeSYGpbLNeEOIfwUGf1Qvn5nwuo'
      })

      console.log('20180808 - this.routed_data : ', this.routed_data)

      // cloudinary.uploader.upload("my_picture.jpg", function(result) {
      cloudinary.uploader.upload(this.imageData, function(result) {
        console.log('20180726 - cloudinary result : ', result.url)

        axios.post(p_env.BASE_URL+'/vue/updateSpacePhotos', {
          place_type: _this.routed_data.place_type,
          id: _this.routed_data.s_rid,
          photos: result.url
        })
        .then(res=>{
          console.log('20180726 - send image and get result : ', res )
        })
        _this.readyToUpload = false
        _this.imageData = ''
        _this.photo = result.url
        console.log('20180726 - send image and get cloduinary result : ', result )
      });
    }, // uploadPhoto

    previewImage: function(event) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            this.readyToUpload = true
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                this.imageData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
    }, // previewImage

  },  // methods

  components: {

  }

} // export default

</script>

<style>
</style>
