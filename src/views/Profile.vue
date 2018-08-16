<template>
  <div class="p_container">

    <div class="p_box p_header">
      <h1> My Home - {{ user_name }}</h1>

    </div>
    <div class="p_box p_side">
      <h2> menu </h2>
      <!-- <input v-model="test_url" placeholder="url"/><span><v-btn @click="getMetaMyData">OK</v-btn></span> -->
      <P>
        {{ news_result }}
      </P>
      <!-- <v-btn @click="pdfParser">Election Area Parser</v-btn> -->
      <!-- <input type='file' accept='text/plain' onchange='openFile(event)'> -->
      <br>
      <div id='output'>...</div>
      <!-- <v-btn @click="routeToAnalytics"> Analytics </v-btn> -->
    </div>
    <div class="p_box p_main">
      <div class="p_main_container">
        <h2 class="p_p" v-show="isName"> 이름 :{{ user_name }} <v-btn @click="showInput">수정</v-btn></h2>
        <h2 class="p_p" v-show="isName == false "> 이름 : <span> <input v-model="new_name" placeholder="이름입력"/><v-btn @click="update_name">수정</v-btn></span></h2>
        <h2 class="p_p" v-show="isPhone"> 휴대폰번호 :{{ phone_number }} <v-btn @click="showPhoneInput">수정</v-btn></h2>
        <h2 class="p_p" v-show="isPhone == false "> 휴대폰번호 : <span> <input v-model="phone_number" placeholder="전화번호"/><v-btn @click="update_phone">수정</v-btn></span></h2>
        <h3 class="p_p">admin Level : 5</h3>
        <h3 class="p_p">Money : {{ money }}</h3>
        <h3 class="p_p">Wallet <span> <v-btn color="success" @click="routeWallet" >Wallet</v-btn> </span> </h3>
        <h3 class="p_p">회원관리 <span> <v-btn v-if="isAdmin" color="info" @click="adminMember" >회원관리</v-btn> </span> </h3>
        <h3 class="p_p">Building : 5</h3>
        <h3 class="p_p">Blogs : 15</h3>
        <h3 class="p_p">My Photo :</h3>
        <v-list-tile-avatar>
          <img :src="photo">
        </v-list-tile-avatar>
        <v-btn v-show="readyToUpload" color="success" @click="uploadPhoto" > Update Photo </v-btn>
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
import LinkPrevue from 'link-prevue'

export default {
  data() {
    return {
      image: require('../assets/images/profile_sample.jpg'),
      user_data: '',
      user_name: '등록안됨',
      isAdmin: false,
      money: 0,
      readyToUpload: false,
      photo: '',
      imageData: '',
      isName: true,
      new_name: '',
      test_url: '',
      news_result: '',
      isPhone: true,
      phone_number: ''
    } // return
  },

  mounted() {
    // console.log('20180724 - GET ID :', this.$store.state.userId)
    let userId = this.$store.state.id
      for(var i=0; this.$store.state.roles.length>i; i++){
        if(this.$store.state.roles[i] == 'politician') this.isAdmin = true
      }


    axios.get(p_env.BASE_URL+'/vue/getUserData', {
      params: {id: userId}
    })
    .then(res=>{
      console.log('20180724 - GET profile data :', res.data.data)
      if(res.data.data.photos ==''){
        console.log('20180805 - no image ............')
        this.photo = require('../assets/images/default_user_image.png')
      } else {
        this.photo = res.data.data.photos
      }

      if(res.data.data.user_name == ''){
        this.isName = false
      }
      if(res.data.data.phone == ''){
        this.isPhone = false
      }

      this.user_data = res.data.data
      this.user_name = res.data.data.user_name
      this.phone_number = res.data.data.phone
      this.money = this.thousandComma(res.data.data.money)
    }) // axios then
  }, // mounted

  methods: {
    getMetaMyData(prevue) {

      axios.post(p_env.BASE_URL+'/vue/htmlParsing')
      .then(res=>{
        console.log('20180805 - parsing result : ', res.data.data['article:section'] )
      })

    },

    pdfParser() {

      axios.get(p_env.BASE_URL+'/vue/readText')
      .then(res=>{
        console.log(res.data.data)
      })

  }, // parsing

  routeToAnalytics() {
    this.$router.push({name: 'googleAnalytics'})
  },

  openFile(event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var node = document.getElementById('output');
        node.innerText = text;
    };
    reader.readAsText(input.files[0]);

  },

    routeWallet: function() {
      this.$router.push({name: 'wallet'})
    },

    adminMember () {
      console.log('ROUTE TO ADMIN PAGE ')
      this.$router.push({name:'managerMap'})
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

    thousandComma(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

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
          user_id: _this.$store.state.user_junk.user.id,
          image : result.url
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

    update_name() {
      let newName = this.new_name
      console.log('20180805 - user id from junk DATA  : ', this.$store.state.user_junk.user.id)
      axios.post(p_env.BASE_URL+'/vue/updateName', {
        user_id: this.$store.state.user_junk.user.id,
        user_name: newName
      })
      .then(res=>{
        this.user_name = res.data.data.user_name
        this.isName = true

        console.log('20180805 - update name ', res)
      })

    },

    showInput() {
      this.isName = false
    },

    showPhoneInput() {
      this.isPhone = false
    },

    update_phone() {
      let newPhone = this.phone_number
      // console.log('20180805 - user id from junk DATA  : ', this.$store.state.user_junk.user.id)
      axios.post(p_env.BASE_URL+'/vue/updatePhone', {
        user_id: this.$store.state.user_junk.user.id,
        phone: newPhone
      })
      .then(res=>{
        this.user_name = res.data.data.user_name
        this.isName = true

        console.log('20180805 - update name ', res)
      })
    }

  }, // methods

  components: {
    LinkPrevue

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
