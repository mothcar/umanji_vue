<template>
  <div class="p_container">

    <div class="p_box p_header">
      <h1> My Home - {{ user_name }}</h1>

    </div>
    <div class="p_box p_side">
      <h2> menu </h2>
      <input v-model="test_url" placeholder="url"/><span><v-btn @click="getMetaMyData">OK</v-btn></span>
      <!-- <LinkPrevue ref="preview" :url="test_url" :onButtonClick="getMetaMyData"></LinkPrevue> -->
      <P>
        {{ news_result }}
      </P>
      <v-btn @click="pdfParser">Parser</v-btn>
      <input type='file' accept='text/plain' onchange='openFile(event)'>
      <br>
      <div id='output'>...</div>
    </div>
    <div class="p_box p_main">
      <div class="p_main_container">
        <h2 class="p_p" v-show="isName"> 이름 :{{ user_name }} <v-btn @click="showInput">수정</v-btn></h2>
        <h2 class="p_p" v-show="isName == false "> 이름 : <span> <input v-model="new_name" placeholder="이름입력"/><v-btn @click="update_name">수정</v-btn></span></h2>
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
        <v-btn v-show="readyToUpload" color="success" @click="uploadPhoto" >send Photo </v-btn>
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
      news_result: ''
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

      this.user_data = res.data.data
      this.user_name = res.data.data.user_name
      this.money = this.thousandComma(res.data.data.money)
    }) // axios then
  }, // mounted

  methods: {
    getMetaMyData(prevue) {
      // const urlMetadata = require('url-metadata')
      // urlMetadata(this.test_url ).then(
      //   function (metadata) { // success handler
      //     this.news_result = metadata
      //     console.log('20180805 - result ',metadata)
      //   },
      //   function (error) { // failure handler
      //     console.log(error)
      //   })
      // const {getMetadata} = require('page-metadata-parser');
      // const url = this.test_url;
      // const response =  fetch(url);
      // const html =  response.text();
      // const doc = new JSDOM(html);
      // const metadata = getMetadata(doc, url);

      // axios.get(this.test_url, {'http://localhost:8080': true
      // })
      // .then(res=>{
      //   this.news_result = res
      //   console.log('20180805 - result ',res)
      // })
      // let preUrl = 'news.joins.com/article/22860744?cloc=joongang|home|newslist1big'
      // let url =  'https://opengraph.io/api/1.0/site/'+ preUrl
      // axios.get(url)
      // .then(res=>{
      //   this.news_result = res
      //   console.log('20180805 - result ',res)
      // })
      // https://news.joins.com/article/22860744?cloc=joongang|home|newslist1big

      // console.log('clicked', prevue.images, prevue.title, prevue.url, prevue.description)
      // console.log('clicked......', prevue)
      // console.log('clicked...ref...', this.$refs.preview)


      // var req = new XMLHttpRequest();
      // req.open("GET", this.test_url + "/api/data/v8.2/EntityDefinitions(LogicalName='contact')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$filter=LogicalName eq 'new_contactpriority'&$expand=OptionSet", true);
      // req.setRequestHeader("OData-MaxVersion", "4.0");
      // req.setRequestHeader("OData-Version", "4.0");
      // req.setRequestHeader("Accept", "application/json");
      // req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      // req.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
      // req.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
      // req.onreadystatechange = function () {
      //     if (this.readyState === 4) {
      //         req.onreadystatechange = null;
      //         if (this.status === 200) {
      //             var results = JSON.parse(this.response);
      //             for (var i = 0; i < results.value[0].OptionSet.Options.length; i++) {
      //                 var Label = results.value[0].OptionSet.Options[i].Label.UserLocalizedLabel.Label;
      //                 alert(Label);
      //             }
      //         } else {
      //             Xrm.Utility.alertDialog(this.statusText);
      //         }
      //     }
      // };
      // req.send();

      // const metascraper = require('metascraper')
      // const got = require('got')
      //
      // const targetUrl = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance'
      //
      // ;(async () => {
      //   const {body: html, url} = await got(targetUrl)
      //   const metadata = await metascraper({html, url})
      //   console.log(metadata)
      // })()

      // let url = 'https://news.joins.com/article/22860744?cloc=joongang|home|newslist1big'
      //
      // var ogs = require('open-graph-scraper');
      // var options = {'url': url};
      // ogs(options, function (error, results) {
      //   console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
      //   console.log('results:', results);
      // });

      axios.post(p_env.BASE_URL+'/vue/htmlParsing')
      .then(res=>{
        console.log('20180805 - parsing result : ', res.data.data )
      })


    },

    pdfParser() {
      // let fs = require('fs'),
      //   PDFParser = require("pdf2json");
      //
      // let pdfParser = new PDFParser();
      //
      // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
      // pdfParser.on("pdfParser_dataReady", pdfData => {
      //     // fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
      //     // fs.writeFile("./test/111.json", JSON.stringify(pdfData));
      //     console.log('20180805 - pdf parsing string : ', JSON.stringify(pdfData))
      //     console.log('20180805 - pdf parsing json : ', pdfData)
      // });
      //
      // pdfParser.loadPDF("../assets/elec.pdf");
      // const fs = require('fs');
      // const pdf = require('pdf-parse');
      // console.log("\n *STARTING* \n");
      // // var text = fs.readFileSync('/tmp/hey.txt', 'utf8');
      //
      // let dataBuffer = fs.readFileSync('../assets/elec.pdf', 'utf8');
      //
      // pdf(dataBuffer).then(function(data) {
      //
      //     // number of pages
      //     console.log(data.numpages);
      //     // number of rendered pages
      //     console.log(data.numrender);
      //     // PDF info
      //     console.log(data.info);
      //     // PDF metadata
      //     console.log(data.metadata);
      //     // PDF.js version
      //     // check https://mozilla.github.io/pdf.js/getting_started/
      //     console.log(data.version);
      //     // PDF text
      //     console.log(data.text);
      //
      // });

      // var pdfParser = require('pdf-parser');
      //
      // var PDF_PATH = '../assets/elec.pdf';
      //
      // pdfParser.pdf2json(PDF_PATH, function (error, pdf) {
      //     if(error != null){
      //         console.log(error);
      //     }else{
      //         console.log(JSON.stringify(pdf));
      //     }
      // });

      // this.pdfToText('../assets/elec.pdf').then(function(result) {
      // console.log("PDF done!", result);
      // let file =

      // let file = '../assets/20.txt';
      // var fs = require('fs');
      //
      // fs.readFile(file, 'utf8', function(err, data) {
      //     if (err) throw err;
      //     console.log(data);
      // });
      axios.get(p_env.BASE_URL+'/vue/readText')
      .then(res=>{
        console.log(res.data.data)
      })

  }, // parsing

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
          user_id: _this.$store.state.id,
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
    }

  },

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
