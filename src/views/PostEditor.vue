<template>
  <div>
      <v-app>
      <!-- slide-x-transition -->
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Post</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="submitPost">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-menu>
          </v-toolbar>


          <!-- <div> -->
            <v-list three-line subheader>
              <v-subheader>Create Post</v-subheader>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>Write</v-subheader>

              <v-list-tile avatar>

                  <span>Content:</span>
                  <br>
                    <textarea class="p_textarea" v-model="content" placeholder="add multiple lines"></textarea>
                    <p >
                      {{ result }}
                    </p>

              </v-list-tile>
            </v-list>
          <!-- </div> -->

          <div style="flex: 1 1 auto;"></div>
        </v-card>

  </v-app>

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
</template>

<script>
export default {
  data () {
    return {
      country_code : 'KR',
      latitude: this.$store.state.latitude,
      longitude: this.$store.state.longitude,
      location: '',
      content: '',
      result: '',
      imageData: ''

    }

  }, //data

  methods: {
    close: function() {
      window.history.back()
    },

    submitPost: function() {

      var checkNull = this.content.replace(/\s|\r?\n|\r/g, '')

      if(checkNull.length < 1) {
        alert("내용을 입력해 주세요")
      } else {
        var location = '{"@class":"OPoint","coordinates":['+this.longitude+','+this.latitude+']}'

        var regContent = this.content
        regContent = regContent.replace(/\r?\n/g, '<br />');
        console.log("save to server")

        axios.post(p_env.BASE_URL+'/geo/createPost', {
          create_type: 'exist',
          // portalRid: '',
          content: regContent,
          latitude: this.latitude,
          longitude: this.longitude,
          country_code: this.country_code,
          location: location })
          .then(res => {
              window.history.back()
          }).catch(error => {
            console.log(error.message);
        }) // axios
      } // end of if

      // var location = '{\"@class\":\"OPoint\",\"coordinates\":[126.9194521,37.4997197]}'

      // image upload
      // axios.post(p_env.BASE_URL+'/geo/createPost', this.selectedFile)

    }, //submitPost

    previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
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
        }


  } // methods
} // export

</script>

<style>
.file-upload-form, .image-preview {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 20px;
}
img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
}
</style>
