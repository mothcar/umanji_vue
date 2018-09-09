<template>
  <v-app id="inspire">
    <v-dialog v-model="showFlag" max-width="500px">
        <v-card  class="pa-3">
          <v-card-title>
            게시물 올리기
          </v-card-title>
          <v-textarea
            v-model="content"
            name=""
            label="게시물 작성"
            value="우리지역에는..."
            hint="우리지역에 도움이 되는 정보를 입력해주세요"
            @change="parseUrl"
          ></v-textarea>
          <v-card-text>
            <v-checkbox
              v-model="checkbox"
              value="1"
              label="이지역에 전체에 알림"
              type="checkbox"
              required
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="showFlag=false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="submit">제출</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-app>

</template>

<script>
var anchorme = require("anchorme").default;

export default {
  data() {
    return {
      showFlag: false,
      routed_data: '',
      content: '',
      link_url: '',
      checkbox: null,
    }
  },

  mounted() {

  }, // mounted

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
       }
     },

  methods: {
    parseUrl(){

    },

    submit() {
      console.log('ROUTED DATA : ', this.routed_data)
      var checkNull = this.content.replace(/\s|\r?\n|\r/g, '')


      if(checkNull.length < 1) {
        alert("내용을 입력해 주세요")
      } else {
            if(this.routed_data.s_rid != '' || this.routed_data.s_rid != undefined){

              var regContent = this.content
              regContent = regContent.replace(/\r?\n/g, '<br />');

              let portal_rid = ''
              let place_rid = ''
              let paramsData = this.routed_data

              if(paramsData.photos == undefined){
                paramsData.photos = this.$store.state.user_junk.user.photos
              }

              if(paramsData.sublocality1 == undefined){
                paramsData.sublocality1 = paramsData.sublocality_level_1
                paramsData.sublocality2 = paramsData.sublocality_level_2
              }

              let postParams = {
                view_level: this.$store.state.zoom_level,
                creator_id: this.$store.state.id,
                creator_name: this.$store.state.user_name,
                photos: this.$store.state.photos[0],
                content: regContent,
                link_url: this.link_url,
                country_code: 'KR',
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
                  console.log('20180809 - SERVER response then Parent value : ', this.$parent)
                  location.reload();

                  this.showFlag=false
                }).catch(error => {
                  console.log(error.message);
              }) // axios

            } else {
              alert("Check Login")
            }

      } //  check null of content end of if else


    }

  },

  components: {

  }

} // export default

</script>

<style>
.pause_padding{
  padding: 10px;
}
</style>
