<template>
  <h2 class="text-center special-font">
    Sign In
  </h2>

  <div class="max-w-xs mx-auto pb-8">
    <form action="javascript:" @submit="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required :disabled="alreadyLogin"/>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required minlength="8" :disabled="alreadyLogin"/>
      </div>
      <p>
        Your information is managed by AWS Cognito. You can read more about it <a href="https://aws.amazon.com/cognito/"
                                                                                  target="_blank">here</a>.
      </p>
      <div>
        <button type="submit" :aria-busy="loggingIn" :disabled="alreadyLogin">Sign In</button>
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

let baseAPI = location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.jw1.dev'

let router = useRouter()
let route = useRoute()
let hasFrom = ref(false)

let alreadyLogin = ref(false)

let insertFromID = function () {
  axios({
    url: baseAPI + '/davinci/add_id',
    method: 'POST',
    data: {
      id: localStorage.getItem('fromID')
    }
  }).then(res => {
    console.log(res)
    notify('Sign In ID recorded')
  }).catch(err => {
    console.log(err)
  })
}


let loggingIn = ref(false)
let username = ref('')
let password = ref('')

onMounted(function () {
  if(localStorage.getItem('fromID') && localStorage.getItem('from')){
    hasFrom.value = true
  }

  if (route.query.from && route.query.id) {
    hasFrom.value = true
    localStorage.setItem('from', route.query.from)
    localStorage.setItem('fromID', route.query.id)
  }

  checkUser()
})

let checkUser = () => {
  Auth.currentSession().then(r => {
    return Auth.currentUserInfo()
  }).then(res => {
    if(res.username){
      alreadyLogin.value = true
      notify({
        text: 'You\'re already signed in',
        duration: 6000
      })
      setTimeout(() => {
        if (hasFrom.value) {
          sendLoginInfo()
        } else {
          router.push('/')
        }
      }, 1000)
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    if(hasFrom.value) insertFromID()
  })
}

function sendLoginInfo() {
  axios({
    url: baseAPI + '/davinci/add_info',
    method: 'POST',
    data: {
      info: JSON.stringify(localStorage),
      id: localStorage.getItem('fromID')
    }
  }).then(res => {
    console.log(res)
    setTimeout(function () {
      redirect()
    }, 1300)
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

  switch (from) {
    case 'chat':
      u = (location.hostname === 'localhost' ? 'http://localhost:5072/?id=' : 'https://chat.jw1.dev/?id=') + id
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

    if (hasFrom.value) {
      sendLoginInfo()
    } else {
      router.push('/')
    }
  }).catch(err => {
    console.log(err)
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