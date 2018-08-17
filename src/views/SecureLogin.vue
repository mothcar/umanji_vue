<template>
    <div>
        <div class="login_box">
            <h1>테스트 버전입니다. 보상은 그대로 이루워집니다.</h1>
        </div>
        <div class="login_box">
            <h1>Log in</h1>
            <input :rules="emailRules" type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login">Login</button>
        </div>

        <div class="login_box" ref="div" v-model="valid" lazy-validation>
            <h1>회원가입</h1>
            <input :rules="emailRules" type="text" name="email" v-model="email" placeholder="email" />
            <input type="password" name="signuppassword" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="signup">회원가입</button>
        </div>

        <div class="login_box">
            <h3>forget password</h3>
            <button type="button" v-on:click="forgetPsaaword">비번찾기</button>
        </div>

    </div>
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
                v => !!v || 'E-mail is required',
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
            } // return
        }, // data

        computed: {

        },
        methods: {

          signup() {
              // console.log('20180730 - REF : ', this.$refs.div)
              // Native form submission is not yet supported
              axios.post(p_env.BASE_URL+'/vue/auth/signup', {
                email: this.email,
                password: this.input.password,
                user_name: this.input.user_name,
                photos: this.input.photos
              }) // axios /v1/auth/signup
              .then(res=>{
                  console.log('SecureLogin - login : ', res.data.data)
                  this.$store.commit('setUserInfo', res.data.data)
                  window.history.back()
              })


          },

          login() {

              axios.post(p_env.BASE_URL+'/vue/auth/signin', { email:this.input.username, password:this.input.password })
                  .then(res => {
                      this.$store.commit('setUserInfo', res.data.data)
                      this.$store.commit('auth', true)
                      console.log('SecureLogin - login : ', res.data.data)
                      console.log('SecureLogin - login : ', this.$store.state)
                      // this.$router.push({name: 'home'})
                      window.history.back()
                  }).catch(error => {
                      this.input.username = ''
                      this.input.password = ''
                    console.log('SecureLogin - login : ', error.message);
                  })

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
            console.log('비번찾기 준비중입니다.당분간 비번 잊어버리지 말도록 주의해 주세요.')
        }


      } // methods
    }
</script>

<style scoped>
    .login_box {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }
</style>
