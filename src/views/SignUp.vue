<template>
  <h2 class="text-center special-font">
    Sign Up
  </h2>

  <div class="max-w-xs mx-auto pb-8">
    <form action="javascript:" @submit="signUp">
      <div>
        <label for="sign_up_username">Username</label>
        <input type="text" id="sign_up_username" v-model="username" required minlength="3" disabled />
      </div>
      <div>
        <label for="sign_up_email">E-mail</label>
        <input type="text" id="sign_up_email" v-model="email" required disabled>
      </div>
      <div>
        <label for="sign_up_password">Password</label>
        <input type="password" id="sign_up_password" v-model="password" required minlength="8" disabled/>
      </div>
      <p style="display: none">
        Your information is managed by AWS Cognito. You can read more about it <a href="https://aws.amazon.com/cognito/" target="_blank">here</a>.
      </p>
      <p>
        <b>Note: </b> Signing up will be available when App development is finished.
      </p>
      <div>
        <button :aria-busy="signingUp" type="submit" disabled>SignUp</button>
      </div>
      <div>
        Back to <router-link to="sign-in">Sign In</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {notify} from '../js/utils.js'
import {Auth} from '../js/auth.js'

import {useRouter} from 'vue-router'
let router = useRouter()

let signingUp = ref(false)
let username = ref('')
let password = ref('')
let email = ref('')

onMounted(() => {
  checkUser()
})

let checkUser = () => {
  Auth.currentUserInfo().then(res => {
    console.log(res)
    notify({
      text: 'You\'re already signed in. If you want to create a new account, please <b>sign out first</b>.',
      duration: 6000
    })
    setTimeout(()=> {
      router.push('/')
    }, 100)
  }).catch(err => {
    console.log(err)
  })
}

let signUp = () => {
  signingUp.value = true
  Auth.signUp({
    username: username.value,
    password: password.value,
    attributes: {
      email: email.value
    }
  }).then(res => {
    router.push('/confirm-sign-up')
    notify({
      text: 'Your account has been created. Please check your e-mail to confirm your account.',
      duration: 5000,
      type: 'success'
    })
  }).catch(err => {
    console.log(err)
    notify({
      text: err.message,
      duration: 5000,
      type: 'error'
    })
  }).finally(() => {
    signingUp.value = false
  })
}
</script>

<style scoped>

</style>