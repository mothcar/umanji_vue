<template>
    <div>


        <div class="login_box">
            <h1>See what’s happening in the world right now</h1>
        </div>
        <div class="login_box">
            <h1>Log in</h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login">Login</button>
        </div>
        <div class="login_box">
            <h1>password</h1>
        </div>
        <div class="login_box">
            <h1>forget password</h1>
        </div>
        <div class="login_box">
            <button @click="">submit button</button>
        </div>
        <div class="login_box">
            <h3>create accoutn</h3>
        </div>
        <div class="login_box">
            <h1>Sign Up</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    // username: p_env.login_id,
                    // password: p_env.login_pw,
                    username: '',
                    password: '111111',
                    // down below Data from Server DB
                    id: '',
                    email: '',
                    phone: '',
                    user_name: '',
                    photos: '',
                    money: 0
                },
                a: 1
            }
        },

        computed: {

        },
        methods: {

            login() {

                axios.post(p_env.BASE_URL+'/auth/signin', { email:this.input.username, password:this.input.password })
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

            } //login
        }
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
