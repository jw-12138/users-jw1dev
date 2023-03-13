<template>
  <h2 class="text-center special-font">
    Sign In
  </h2>

  <div class="max-w-xs mx-auto pb-8">
    <form action="javascript:" @submit="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required :disabled="!loginStatusIsConfirmed && alreadyLogin"/>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required minlength="8"
               :disabled="!loginStatusIsConfirmed && alreadyLogin"/>
      </div>
      <p>
        Your information is managed by AWS Cognito. You can read more about it <a href="https://aws.amazon.com/cognito/"
                                                                                  target="_blank">here</a>.
      </p>
      <div>
        <button type="submit" :aria-busy="loggingIn" :disabled="!loginStatusIsConfirmed && alreadyLogin">Sign In</button>
      </div>
      <p>
        Don't have an account?
        <router-link to="/sign-up">Create one</router-link>
        .
      </p>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {notify} from '../js/utils.js'
import {Auth} from '../js/auth.js'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
import {useStore} from 'vuex'

let store = useStore()

let router = useRouter()
let route = useRoute()
let hasFrom = ref(false)

let alreadyLogin = ref(false)
let loginStatusIsConfirmed = ref(false)

let loggingIn = ref(false)
let username = ref('')
let password = ref('')

let userObject = ''

onMounted(function () {
  if (localStorage.getItem('fromID') && localStorage.getItem('from') && localStorage.getItem('fromClientID')) {
    hasFrom.value = true
  }

  if (route.query.from && route.query.id) {
    hasFrom.value = true
    localStorage.setItem('from', route.query.from)
    localStorage.setItem('fromID', route.query.id)
    localStorage.setItem('fromClientID', route.query.client_id)
  }

  if(route.query.client_id || localStorage.getItem('fromClientID')){
    Auth.configure({
      userPoolId: 'ap-northeast-2_mFkRRvlLv',
      userPoolWebClientId: route.query.client_id || localStorage.getItem('fromClientID')
    })
  }

  checkUser()
})

let checkUser = () => {
  Auth.currentUserInfo().then(res => {
    if(!res || !res.username){
      alreadyLogin.value = false
      return
    }
    return Auth.currentUserPoolUser()
  }).then(res => {
    console.log(res)
    userObject = res
    if (res.username) {
      alreadyLogin.value = true
      if (!hasFrom.value) {
        notify({
          text: 'You\'re already signed in'
        })
        router.push('/')
      } else {
        sendLoginInfo()
      }
    } else {
      alreadyLogin.value = false
    }
  }).catch(err => {
    console.log(err)
    alreadyLogin.value = false
  }).finally(() => {
    loginStatusIsConfirmed.value = true
  })
}

function sendLoginInfo() {
  axios({
    url: 'https://api.jw1.dev/cognito/add_login_info',
    method: 'POST',
    data: {
      info: JSON.stringify({
        refreshToken: localStorage.getItem(userObject.keyPrefix + '.'+ userObject.username +'.refreshToken'),
        username: userObject.username
      }),
      id: localStorage.getItem('fromID')
    }
  }).then(res => {
    console.log('redirect')
    redirect()
  }).catch(err => {
    console.log(err)
  })
}

function redirect() {
  let id = localStorage.getItem('fromID')
  let from = localStorage.getItem('from')
  let u = null
  localStorage.removeItem('from')
  localStorage.removeItem('fromID')
  localStorage.removeItem('fromClientID')

  switch (from) {
    case 'chat':
      u = 'https://chat.jw1.dev/?id=' + id
      break
    case 'chat_local':
      u = 'http://localhost:5072/?id=' + id
      break
    case 'photo':
      u = 'https://photo.jw1.dev/admin/?id=' + id
      break
    case 'photo_local':
      u = 'http://localhost:5999/admin/?id=' + id
      break
  }

  if (u) {
    location.href = u
  }
}

let login = () => {
  loggingIn.value = true
  Auth.signIn(username.value, password.value).then(res => {
    notify({
      type: 'success',
      text: 'You have successfully signed in.'
    })

    if(res.challengeName === 'NEW_PASSWORD_REQUIRED'){
      router.push('/new-password')
      store.commit('updateNewUser', res)
      return
    }

    if (hasFrom.value) {
      userObject = res
      sendLoginInfo()
    } else {
      router.push('/')
    }
  }).catch(err => {
    console.log('Sign In Error: ', err)

    notify({
      type: 'error',
      text: err.message
    })

    if (err.code === 'UserNotConfirmedException') {
      router.push('/confirm-sign-up?username=' + username.value)
    }
  }).finally(() => {
    loggingIn.value = false
  })
}
</script>

<style scoped>

</style>