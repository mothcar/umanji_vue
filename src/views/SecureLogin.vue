<template>
    <!-- <v-form> -->
    <v-container>

        <v-layout style="min-height: 100vh" justify-center align-center class="pause_flex">
          <v-flex xs12 sm12 lg6 xl4 >
            <v-card class="mt-5 mb-5 ">
              <v-card-text class="pr-5 pl-5 pause_card">
              <h1>Log in</h1>
              <h5>테스트 버전입니다. 보상은 그대로 이루워집니다.</h5>
              <br/>
                <v-form @submit.prevent="login">
                  <v-text-field solo label="Email" name="Email" v-model="input.username" ></v-text-field>
                  <v-text-field solo type="password" name="Password" label="Password" v-model="input.password" ></v-text-field>
                  <!-- <v-btn block color="gray" type="submit">Let's Go!</v-btn> -->
                  <v-btn block color="blue-grey" type="submit">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>

            <v-card class="mt-5 mb-5">
              <v-card-text class="pr-5 pl-5 pause_card">
                  <h1>회원가입</h1>
                    <v-form @submit.prevent="signup">
                        <v-text-field :rules="emailRules"  v-model="email"
                          label="회원가입"
                          hint="mo@naver.com"
                          persistent-hint
                          solo
                        ></v-text-field>

                        <v-text-field   v-model="input.password"
                          type="password"
                          label="password"
                          solo
                        ></v-text-field>
                        <v-btn block color="error" type="submit">회원가입</v-btn>
                    </v-form>
                  </v-card-text>
          </v-card>

          <div class="login_box mb-5">
              <h3>forget password</h3>
              <button type="button" v-on:click="forgetPsaaword">비번찾기</button>
          </div>

          </v-flex>
        </v-layout>

    </v-container>
<!-- </v-form> -->
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
              valid: true,
              name: '',
              nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
              ],
              email: '',
              emailRules: [
                v => !!v || 'E-mail 를 넣어주세요',
                v => /.+@.+/.test(v) || '정확한 이메일을 입력해 주세요'
              ],
              input: {
                  username: '',
                  // password: p_env.login_pw,
                  // username: '',
                  password: '',
                  // down below Data from Server DB
                  id: '',
                  email: '',
                  phone: '',
                  user_name: '등록되지않은이름',
                  photos: 'https://res.cloudinary.com/mothcar/image/upload/v1534492757/default_user_image_yz6zdk.png',
                  money: 0
              },
              clicked: false,
            } // return
        }, // data

        computed: {

        },
        methods: {

          signup() {
            if(this.clicked == false){
              this.clicked = true
              // console.log('20180730 - REF : ', this.$refs.div)
              // Native form submission is not yet supported
              axios.post(p_env.BASE_URL+'/vue/auth/signup', {
                email: this.email,
                password: this.input.password,
                user_name: this.input.user_name,
                photos: this.input.photos
              }) // axios /v1/auth/signup
              .then(res=>{
                  this.clicked == false
                  console.log('SecureLogin - login : ', res.data.data)
                  this.$store.commit('setUserInfo', res.data.data)
                  let userData_ori = res.data.data.token
                  localStorage.setItem('userToken', userData_ori)
                  window.history.back()
              })
            } else {
              alert('제출되었습니다')
            }

          },

          login() {
            if(this.clicked == false){
              this.clicked = true
              axios.post(p_env.BASE_URL+'/vue/auth/signin', { email:this.input.username, password:this.input.password })
                  .then(res => {
                      this.clicked = false
                      this.$store.commit('setUserInfo', res.data.data)
                      this.$store.commit('auth', true)
                      let userData_ori = res.data.data.token
                      localStorage.setItem('userToken', userData_ori)
                      var userToken = localStorage.getItem('userToken')
                      // console.log('User Data 22: ', userToken)

                      console.log('SecureLogin - login : ', res.data.data)
                      console.log('SecureLogin - login : ', this.$store.state)
                      // this.$router.push({name: 'home'})
                      window.history.back()
                  }).catch(error => {
                      this.input.username = ''
                      this.input.password = ''
                    console.log('SecureLogin - login : ', error.message);
                  })
            } else {
              alert('제출되었습니다')
            }



          }, //login

          submit () {
            if (this.$refs.form.validate()) {
              // Native form submission is not yet supported
              axios.post('/api/submit', {
                name: this.name,
                email: this.email
              })
            }
          },

          clear () {
            this.$refs.form.reset()
        },

        forgetPsaaword() {
          alert('준비중입니다.')
            console.log('비번찾기 준비중입니다.당분간 비번 잊어버리지 말도록 주의해 주세요.')
        }


      } // methods
    }
</script>

<style scoped>
    .pause_flex {
        background-color: #aaa;
    }
    .pause_card {
        background-color: #fff;
    }
    .login_box {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }
</style>
