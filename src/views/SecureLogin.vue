<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {

                // http://119.205.233.249:3000/v1/auth/signin?email=mo@naver.com&password=111111
                axios.post('http://119.205.233.249:3000/v1/auth/signin', { email:this.input.username, password:this.input.password })
                // axios.post('http://119.205.233.249:3000/v1/auth/signin?email=mo@naver.com&password=111111')
                    .then(res => {
                        this.$store.commit('saveToken', res.data.data.token)
                        this.$store.commit('auth', true)
                        console.log(res.data.data.token)
                        this.$router.push({name: 'home'})
                    }).catch(error => {
                        this.input.username = ''
                        this.input.password = ''
                      console.log(error.message);
                    })


                  //   axios({
                  //     url: 'http://119.205.233.249:3000/v1/auth/signin',
                  //     method: 'post',
                  //     data: {
                  //       email: this.input.username,
                  //       password : this.input.password
                  //     }
                  // })
                  // .then(res => {
                  //     console.log(res.data)
                  // })

                // if(this.input.username != "" && this.input.password != "") {
                //     if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                //         this.$emit("authenticated", true);
                //         this.$router.replace({ name: "secure" });
                //     } else {
                //         console.log("The username and / or password is incorrect");
                //     }
                // } else {
                //     console.log("A username and password must be present");
                // }

            } //login
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
