<template>
  <div class="p_container">



    <!-- Check Super *********************************************************************** -->
    <!-- file select *********************************************************************** -->

    <!-- CSS tutorial *********************************************************************** -->
    <div class="p_item">
      <ul>
        <li><a @click="show_upload_image"> 장소이미지</a></li>
        <li><a @click="show_ads"> 광고</a></li>
      </ul>

    </div>
    <div class="p_item">
      <!-- file select *********************************************************************** -->
      <div v-show="v_upload_image">
          <div class="file-upload-form">
              Upload an image file:
              <input type="file" @change="previewImage" accept="image/*">
          </div>
          <v-btn v-show="readyToUpload" color="success" @click="uploadPhoto" > Update Photo </v-btn>
          <div class="image-preview" v-if="imageData.length > 0">
              <img class="preview" :src="imageData">
          </div>
      </div>
      <div v-show="v_ads">
        <v-btn color="warning" @click="setAds" > 업체 광고하기 </v-btn>
      </div>
      <div v-show="isWorld">
        <v-btn color="success" @click="setSuperRole" > 역할 Setting </v-btn>
      </div>


          <br/>

      <dialogSetCheckSuper ref="dialog_set_super" @eee="dataBackfromChild"></dialogSetCheckSuper>
      <!-- file select *********************************************************************** -->

      <!-- file select *********************************************************************** -->
      <div v-show="readyToUpdate">
        <v-flex xs6 class="grey lighten-4">
          <div>
            Roles : {{ roles }}
          </div>
          <v-text-field prepend-icon="email" name="Email" label="Email" v-model="email"> </v-text-field>
          <v-text-field prepend-icon="how_to_reg" name="RoleName" label="RoleName" v-model="role_name"> </v-text-field>
          <v-text-field prepend-icon="stars" name="RoleClass" label="RoleClass" v-model="role_class"> </v-text-field>
        </v-flex>
        <div>
          {{ result }}
        </div>
        <v-btn color="success" @click="updateRole" > update </v-btn>
      </div>
      <!-- file select *********************************************************************** -->
    </div>
    <!-- CSS tutorial *********************************************************************** -->



  </div>
</template>

<style>
li{
  margin: 10px 0;
}

.p_container{
  padding: 10px;
  background-color: powderblue;
  /* height:200px; */
  display:flex;
  flex-direction:row;
}
.p_item{
  padding: 10px;
  background-color: white;
  /* color:white; */
  border:1px solid gray;
  flex-grow: 1;
}
.p_item:nth-child(1){
    flex-basis: 150px;
    flex-grow: 1;
    flex-shrink: 1;
}
.p_item:nth-child(2){
    /* flex-basis: 150px; */
    flex-grow: 4;
    flex-shrink: 3;
}
</style>

<script>
import dialogSetCheckSuper from '../components/dialog_check_super.vue'

export default {
  data() {
    return {
      routed_data: '',
      imageData: '',
      readyToUpload: false,
      isWorld: false,
      email:'',
      role_name: '',
      role_class: '',
      readyToUpdate: false,
      result: '',
      roles:'',
      v_upload_image: true,
      v_ads: false,
    }
  },

  events: {


  },

  watch: {

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
    if(this.routed_data.political_type == 'world'){
      this.isWorld = true
    }
  }, // mounted

  methods: {

    dataBackfromChild: function (argument) {
      console.log('parent get msg : ', argument)
      if(argument != 'denied'){
        this.readyToUpdate = true
        this.roles = argument

      }
        // logic
    },

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

    setAds() {
      console.log('20180810 - set Ads ')
    }, // setAds

    setSuperRole() {
      this.$refs.dialog_set_super.dialog = true
      // console.log('20180818 - set Super Role  ')
    },

    updateRole() {
      let roleObj = {}
      let key1 = this.role_name
      roleObj[key1] = this.role_class

      let reqParams = {
        email: this.email,
        roles: roleObj
      }

      axios.post(p_env.BASE_URL+'/vue/updateSuperRole', reqParams)
      .then(res=>{
        this.result = res.data.data[0].roles
        console.log('20180819 - update role result  : ', res.data.data)
      })
    }, // updateRole()

    show_upload_image() {
      this.v_upload_image = true
      this.v_ads = false
    },

    show_ads() {
      this.v_upload_image = false
      this.v_ads = true
    },

  },  // methods

  components: {
    dialogSetCheckSuper

  }

} // export default

</script>
