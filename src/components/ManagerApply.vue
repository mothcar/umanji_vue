<template >
<div class="managerApp_back">


  <v-layout row justify-center >
    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-card class="p_dialog">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field label="이름" v-model="user_name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="현주소" v-model="address" hint="지역 읍면동까지"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="휴대폰번호" v-model="phone_number" hint="- 빼고 ex) 01012345678" persistent-hint required ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="출생년도" v-model="birth_year" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="직업" v-model="job" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="관리하고 싶은 지역" v-model="wanted_area" required></v-text-field>
              </v-flex>

<!--
              <div>
                <form name="fwrite">
                지 역 :
                <select v-model="wr_sido" :OnChange="changeRegion(wr_sido)"></select>
                <select v-modle="wr_gugun"></select> * 지역을 선택하세요.<br>

                <input type="submit" value="ok">
                </form>
              </div>
              -->

            </v-layout>
          </v-container>
          <small>*모두 채워주세요</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submit">제출</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
// import {JustDigits} from '../plugins/filters'
// JustDigits()

export default {
  name: 'managerApply',
  props: {
    // dialog:{
    //     type: Boolean
    // }
  },

  data() {
    return {
      dialog: false,
      user_name: '',
      address: '',
      phone_number: '',
      email: '',
      birth_year: '',
      job: '',
      wanted_area: '',
      wr_sido: '',
      wr_gugun: '',
    }
  },

  watch: {
    // phone_number: {
    //
    // }
  },

  mounted() {
    // this.initRegion();
    // changeRegion(fwrite);
  }, // mounted

  methods: {

    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
    },

    submit() {
      this.dialog = false
      let userId = this.$store.state.user_junk.user.id
      let submitParams = {
        user_name: this.user_name,
        photos: '',
        address: this.address,
        phone_number: this.phone_number,
        email: this.email,
        birth_year: this.birth_year,
        job: this.job,
        wanted_area: this.wanted_area
      }
      console.log('20180802 - user_junk params : ', submitParams)
      axios.post(p_env.BASE_URL+'/vue/applyManager', submitParams)
      .then(res=>{
        console.log('20180731 - SUBMIT Done ........', res.data.data )
      })

    }, // submit


    // Select Area *************************************************************************************************
    deleteAll(f) {
      for (var i=0; i<f.length; i++) {
        f.options[i] = null;
      }
      f.length = 0;
    },

    changeRegion(selform) {
      var regionArray = Array();
      var regionNone = Array ( '시군구선택' );
      var regionSeoul = Array( '시군구선택', "강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구");
      var regionIncheon = Array ( '시군구선택', "계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군");
      var regionDaejeon = Array ( '시군구선택', "대덕구","동구","서구","유성구","중구");
      var regionGwangju = Array ( '시군구선택', "광산구","남구","동구","북구","서구");
      var regionDaegu = Array ( '시군구선택', "남구","달서구","동구","북구","서구","수성구","중구","달성군");
      var regionUlsan = Array ( '시군구선택', "남구","동구","북구","중구","울주군");
      var regionBusan = Array ( '시군구선택', "강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군");
      var regionGyeonggi = Array ('시군구선택', "고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군");
      var regionGangwon = Array ( '시군구선택', "강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군");
      var regionChungbuk = Array ('시군구선택', "제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군");
      var regionChungnam = Array ('시군구선택', "계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군");
      var regionJeonbuk = Array ( '시군구선택', "군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군");
      var regionJeonnam = Array ( '시군구선택', "광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군");
      var regionGyeongbuk = Array ('시군구선택', "경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군");
      var regionGyeongnam = Array ('시군구선택', "거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군");
      var regionJeju = Array ( '시군선택',  "서귀포시","제주시","남제주군","북제주군");

      regionArray[0] = regionNone;
      regionArray[1] = regionSeoul;
      regionArray[2] = regionIncheon;
      regionArray[3] = regionDaejeon;
      regionArray[4] = regionGwangju;
      regionArray[5] = regionDaegu;
      regionArray[6] = regionUlsan;
      regionArray[7] = regionBusan;
      regionArray[8] = regionGyeonggi;
      regionArray[9] = regionGangwon;
      regionArray[10] = regionChungbuk;
      regionArray[11] = regionChungnam;
      regionArray[12] = regionJeonbuk;
      regionArray[13] = regionJeonnam;
      regionArray[14] = regionGyeongbuk;
      regionArray[15] = regionGyeongnam;
      regionArray[16] = regionJeju;

      this.deleteAll(this.wr_gugun); // 지금 있는 목록 삭제하기.

      sidoindex = this.wr_sido.selectedIndex;
      gugunlen = regionArray[sidoindex].length;
      cur_sido = this.wr_sido.options[this.wr_sido.selectedIndex].value;

      this.wr_gugun.length=gugunlen;

      for (i=0; i<gugunlen; i++) {
        this.wr_gugun.options[i] = new Option(regionArray[sidoindex][i], regionArray[sidoindex][i]);
        if (cur_sido == wr_sido && swr_gugun == regionArray[sidoindex][i])
         this.wr_gugun.options[i].selected = true;
      }
    }, // changeRegion

    initRegion() {
      var sido = Array ( '시도선택', "서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도");
      let sidolen = sido.length;
      document.fwrite.wr_sido.options.length = sidolen;
      for(var i=0; i<sidolen; i++) {
        document.fwrite.wr_sido.options[i] = new Option(sido[i], sido[i]);
        if (swr_sido == sido[i])
      {
         document.fwrite.wr_sido.options[i].selected = true;
         document.fwrite.wr_sido.selectedIndex = i;
        }
      }
    } // initRegion
    // Select Area *************************************************************************************************








  },

  components: {

  }

} // export default

</script>

<style>
.managerApp_back{
  background-color: #fff;
}
</style>
