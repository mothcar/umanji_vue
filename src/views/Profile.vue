<template>
  <div class="p_container">

    <div class="p_box p_header">
      <h1> Profile - {{ user_name }}</h1>
    </div>
    <div class="p_box p_side">
      <h2> menu </h2>
    </div>
    <div class="p_box p_main">
      <div class="p_main_container">
        <h2 class="p_p">main - Possess</h2>
        <h3 class="p_p">admin Level : 5</h3>
        <h3 class="p_p">Money : {{ money }}</h3>
        Wallet <v-btn color="success" @click="routeWallet" >Wallet</v-btn>
        <h3 class="p_p">Building : 5</h3>
        <h3 class="p_p">Blogs : 15</h3>
        <h3 class="p_p">My Photo :</h3>
        <v-list-tile-avatar>
          <img :src="photo">
        </v-list-tile-avatar>
        <v-btn v-if="readyToUpload" color="success" @click="uploadPhoto" >send Photo </v-btn>
        <!-- file select *********************************************************************** -->
        <div>
            <div class="file-upload-form">
                Upload an image file:
                <input type="file" @change="previewImage" accept="image/*">
            </div>
            <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src="imageData">
            </div>
        </div>
        <!-- file select *********************************************************************** -->

      </div>
    </div>

    <div class="p_box">
      <img :src="image" />
    </div>

  </div>



</template>



<script>
export default {
  data() {
    return {
      image: require('../assets/images/profile_sample.jpg'),
      user_data: '',
      user_name: '',
      money: 0,
      readyToUpload: false,
      photo: '',
      imageData: ''
    } // return
  },

  mounted() {
    // console.log('20180724 - GET ID :', this.$store.state.userId)
    let userId = this.$store.state.id
    axios.get(p_env.BASE_URL+'/vue/getUserData', {
      params: {id: userId}
    })
    .then(res=>{
      console.log('20180724 - GET profile data :', res.data.data)
      this.photo = res.data.data.photos
      this.user_data = res.data.data
      this.user_name = res.data.data.user_name
      this.money = res.data.data.money
    }) // axios then
  }, // mounted

  methods: {
    routeWallet: function() {
      this.$router.push({name: 'wallet'})
    },

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

    uploadPhoto: function() {
      let _this = this
      var cloudinary = require('cloudinary')
      cloudinary.config({
        cloud_name: 'mothcar',
        api_key: '671637223366122',
        api_secret: 'VeSYGpbLNeEOIfwUGf1Qvn5nwuo'
      })

      // cloudinary.uploader.upload("my_picture.jpg", function(result) {
      cloudinary.uploader.upload(this.imageData, function(result) {
        console.log('20180726 - cloudinary result : ', result.url)

        axios.post(p_env.BASE_URL+'/vue/sendProfilePhoto', {
          user_id: _this.$store.state.id,
          image : result.url
        })
        .then(res=>{
          _this.readyToUpload = false
          console.log('20180726 - send image and get result : ', res )
        })
      });


    } // uploadPhoto

  },

  components: {

  }
} // export

</script>

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
