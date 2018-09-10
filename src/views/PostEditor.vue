<template>
  <v-app id="inspire">
      <v-container>
      <!-- slide-x-transition -->
        <v-card tile class="pa-3">
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
            <!-- <v-list three-line subheader>
              <v-subheader>Create Post</v-subheader>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>Write</v-subheader>
            </v-list> -->
          <!-- </div> -->

          <!-- <div style="flex: 1 1 auto;"></div> -->
          <v-textarea
            v-model="content"
            name=""
            label="게시물 작성"
            value="우리지역에는..."
            hint="우리지역에 도움이 되는 정보를 입력해주세요"
          ></v-textarea>

          <!-- select area *********************************************************************** -->
          <v-card-text>
            <v-checkbox
              v-model="poll"
              value="1"
              label="투표"
              type="checkbox"
              required
            ></v-checkbox>
            <!-- <poll v-show="pollShow"></poll> -->
            <vue-poll v-show="pollShow" v-bind="options" @addvote="addVote"
            />
            <!--
            :showResults="true"  //투표 완료되었을때 결과 보여주기
            :finalResults="true" //투표 완료되었을때 결과 보여주기, 이긴자 hightlighted
            :multiple="true"    // 중복체크일때 아래 option에서 selected 값 false로 줘야 함
            -->
          </v-card-text>
          <!-- select area *********************************************************************** -->

          <!-- select area *********************************************************************** -->
          <v-card-text>
            <v-checkbox
              v-model="checkbox"
              value="1"
              label="이지역에 전체에 알림"
              type="checkbox"
              required
            ></v-checkbox>
          </v-card-text>
          <!-- select area *********************************************************************** -->

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
        </v-card>

  </v-container>




</v-app>
</template>

<script>
var anchorme = require("anchorme").default
import poll from '../components/poll.vue'
import VuePoll from 'vue-poll'

export default {
  data () {
    return {
      country_code : 'KR',
      latitude: this.$store.state.latitude,
      longitude: this.$store.state.longitude,
      location: '',
      content: '',
      link_url: '',
      result: '',
      imageData: '',
      routed_data: '',
      checkbox: null,
      poll: null,
      pollShow: false,
      options: {
          question: '우리 동네 <strong>지역정보관리자 후보</strong> 로 어떤분이 좋습니까?',
          answers: [
              { value: 1, text: '이낙연', votes: 53 , selected: false },
              { value: 2, text: '김경수', votes: 35 , selected: false },
              { value: 3, text: '홍준표', votes: 30 , selected: false },
              { value: 4, text: '황교안', votes: 10 , selected: false }
          ]
      },

    }

  }, //data

  mounted: function() {
    this.routed_data = this.$route.params.data
    console.log('20180728 - GET ROUTER DATA : ', this.$route.params.data)


  },

  methods: {
    addVote(obj){
      this.options.answers[obj.value-1]['votes']+= 1
      console.log('After You voted ' + this.options.answers[obj.value-1]['votes'] + '!');
      // for(var i=0; this.options.answers.length> i; i++){
      //   if(i+1 == obj.value){
      //     console.log('Pre valuer You voted ' + this.options.answers[i]['votes'] + '!');
      //     this.options.answers[i]['votes']+= 1
      //     console.log('After You voted ' + this.options.answers[i]['votes'] + '!');
      //   }
      // }

    },
    close: function() {
      window.history.back()
    },

    submitPost: function() {
      console.log('20180813 - POST PARAMS : ', this.routed_data)

      var checkNull = this.content.replace(/\s|\r?\n|\r/g, '')

      if(checkNull.length < 1) {
        alert("내용을 입력해 주세요")
      } else {
            if(this.routed_data.s_rid != '' || this.routed_data.s_rid != undefined){
              // var location = '{"@class":"OPoint","coordinates":['+this.longitude+','+this.latitude+']}'
              // var location = '{\"@class\":\"OPoint\",\"coordinates\":['+this.longitude+','+this.latitude+']}'
              // var location = {}
              // location['@class'] = 'OPoint'
              // location.coordinates = [this.longitude, this.latitude]

              // console.log('20180718 - Opoint type : ', JSON.stringify(location))

              var regContent = this.content
              regContent = regContent.replace(/\r?\n/g, '<br />');

              let portal_rid = ''
              let place_rid = ''

              // portal check ; Info or Map -> visible
              // if place DO commit place to 'cuttentId' in store
              // console.log("visible : ", this.$store.state.visible)
              let paramsData = this.routed_data

              // if(this.$store.state.visible) {
              //   portal_rid = this.routed_data.s_rid
              //   console.log("LOGIC PASS HERE..........")
              // } else {
              //   place_rid = this.routed_data.s_rid
              // }

              // console.log('20180813 - PARAMS DATA = THIS.routec_data  : ', paramsData)

              if(paramsData.photos == undefined){
                paramsData.photos = this.$store.state.user_junk.user.photos
              }

              if(paramsData.sublocality1 == undefined){
                paramsData.sublocality1 = paramsData.sublocality_level_1
                paramsData.sublocality2 = paramsData.sublocality_level_2
              }

              let postParams = {
                // create_type: 'exist',
                // portalRid: '',
                view_level: this.$store.state.zoom_level,
                creator_id: this.$store.state.id,
                creator_name: this.$store.state.user_name,
                photos: this.$store.state.photos[0],
                content: regContent,
                link_url: this.link_url,
                // latitude: this.latitude,
                // longitude: this.longitude,
                country_code: this.country_code,
                location: paramsData.location,
                country: paramsData.country,
                locality: paramsData.locality,
                sublocality_level_1: paramsData.sublocality1,
                sublocality_level_2: paramsData.sublocality2,
                place_type: paramsData.place_type,
                place_name: paramsData.place_name,
                s_rid: paramsData.s_rid
              }

              console.log("20180809 - CREATE POST PARAMS : ", postParams)

              axios.post(p_env.BASE_URL+'/vue/createPost', postParams)
                .then(res => {
                  console.log('20180809 - SERVER RESPONSE : ', res)
                    window.history.back()
                }).catch(error => {
                  console.log(error.message);
              }) // axios

            } else {
              alert("Check Login")
            }

      } //  check null of content end of if else

      // var location = '{\"@class\":\"OPoint\",\"coordinates\":[126.9194521,37.4997197]}'
      // var location = '{"@class":"OPoint","coordinates":['+this.longitude+','+this.latitude+']}'

      // image upload
      // axios.post(p_env.BASE_URL+'/vue/createPost', this.selectedFile)

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
    } // previewImage


  }, // methods

  watch: {
      content: {
         handler(val){
           let _this = this
           if(val.length > 5){
             var getUrl = anchorme(val,{
                          	attributes:[
                          		{
                          			name:"target",
                          			value:"_blank"
                          		},
                          		function(urlObj){
                          			console.log("RAW PARSER : ", urlObj.raw)
                          			if(urlObj.raw) {
                          				_this.link_url = urlObj.raw
                          			}
                          		}
                          	]
                          });
             // console.log("URl parser : ", link_url)
             // console.log("URl parser : ", link_url)
           }
           // console.log('WATCHER : ', val)
         }
       },
       checkbox: {
         handler(val){
           console.log('CHECK BOX VAL ; ', val) // 1 or null
           if(val == 1){
             // check user level compare with this infocenter level
             // if user level is low pay money
           }
         }
       }, // checkbox
       poll: {
         handler(val) {
           console.log('POLL - VAL ; ', val) // 1 or null
           if(val == 1){
             this.pollShow = true
             // now origin
             // check user level compare with this infocenter level
             // if user level is low pay money
           } else {
             this.pollShow = false
           }
         }
       } // poll
     }, // watch

     components : {
       poll,
       VuePoll

     }


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
