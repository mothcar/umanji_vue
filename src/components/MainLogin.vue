<template>
  <div class="my_flex-container">
    <div >
      {{ title }} <i class="material-icons font-size-36-i" v-html="materialIconCode"></i>
    </div>

    <div >
      <div >
        <div>&nbsp</div>
        <component v-bind:is="currentForm" v-bind:emailentry="email" v-on:switchcomponent="switchComponent"></component>
      </div>
    </div>

    <div class="flex-container">
      <h1 >Log in Template</h1>
      <div class="box one">one</div>
      <div class="box two">two</div>
      <div class="box three">three</div>
    </div>


  </div>



  <!-- <div>
    <v-container fill-height>
      <v-layout row align-center justify-center>
        <v-flex class="text-xs-center">
          <div >
            <h1 >Log in Template</h1>
            <div class="box one">one</div>
            <div class="box two">two</div>
            <div class="box three">three</div>
            <v-btn>test</v-btn>
          </div>

        </v-flex>
      </v-layout>

    </v-container>

      </div> -->
</template>

<style >
@import '../assets/css/p_style.css';

body {
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.paul-t {
  margin: 0px;
}

</style>

<script>
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import Signup from '@/components/Signup'
import CheckEmail from '@/components/CheckEmail'
export default {
  name: 'Parent',
  components: {
    login: Login,
    forgotpassword: ForgotPassword,
    resetpassword: {},    // requires email confirmation link
    changepassword: {},   // requires current password NOT sure this is required here seems like a profile feature
    signup: Signup,
    checkemail: CheckEmail,
    confirmemail: {},     // Requires a separate page.
    signupsuccess: {}
  },
  data () {
    return {
      title: 'Login or Sign Up',
      email: '',
      currentForm: 'login',
      nameIndex: 0,
      titleIndex: 1,
      emailIndex: 2,
      exactLength: 3
    }
  },
  methods: {
    // https://forum.vuejs.org/t/vue2-0-parent-component-cannot-listen-to-emit-event-in-child-component-by-on/2336/3
    switchComponent: function (componentArgs) {
      // componentArgs format: [name, title, email (Use empty string if N/A.)]
      console.log('component: ' + componentArgs)
      if (this.isValidComponentArgs(componentArgs)) {
        this.currentForm = componentArgs[this.nameIndex]
        this.title = componentArgs[this.titleIndex]
        this.email = componentArgs[this.emailIndex]
      }
    },
    validation: function (componentArgs) {
      // http://stackoverflow.com/a/43011710/1783439
      return {
        argslength: componentArgs.length === this.exactLength,
        ischildcomponent: !!this.$options.components[componentArgs[this.nameIndex]]
      }
    },
    isValidComponentArgs: function (componentArgs) {
      let validation = this.validation(componentArgs)
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  computed: {
    materialIconCode: function () {
      // Change material icon dynamically based on selected component.
      switch (this.currentForm) {
        case 'login':
          return '&#xE85E'
        case 'forgotpassword':
          return '&#xE32A'
        case 'signup':
          return '&#xE22B'
        case 'checkemail':
          return '&#xE0E1'
        default:
          return '&#xE85E'
      }
    }
  }
}
</script>
