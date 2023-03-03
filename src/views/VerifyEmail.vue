<template>
  <h2 class="text-center special-font">
    Verify Your E-mail
  </h2>

  <form action="javascript:" @submit="confirm">
    <div class="flex">
      <div class="w-full">
        <label for="confirm_sign_up_username">Username</label>
        <input type="text" id="confirm_sign_up_username" v-model="username" required minlength="3">
      </div>
      <div class="w-2/5 ml-4">
        <label for="confirm_sign_up_code">Code</label>
        <input type="text" id="confirm_sign_up_code" v-model="code" required minlength="6">
      </div>
    </div>

    <div>
      <button type="submit" :aria-busy="confirming">Confirm</button>
      <button type="button" :aria-busy="resending" @click="resend" class="outline">Re-send Code</button>
    </div>
  </form>

  <div class="max-w-xs mx-auto pb-8">
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {notify} from '../js/utils.js'
import {useRoute, useRouter} from 'vue-router'
import {Auth} from '../js/auth.js'

let route = useRoute()
let router = useRouter()

let confirming = ref(false)
let code = ref('')
let username = ref('')

username.value = route.query.username

let confirm = () => {
  confirming.value = true
  Auth.verifyCurrentUserAttributeSubmit('email', code.value).then(res => {
    notify({
      text: 'Your E-mail has been confirmed, Thank you!',
      duration: 6000
    })
    setTimeout(()=> {
      router.push('/')
    }, 100)
  }).catch(err => {
    console.log(err)
    notify({
      text: err.message,
      duration: 6000
    })
    confirming.value = false

    if(err.code === 'NotAuthorizedException'){
      router.push('/sign-in')
    }
  })
}

let resending = ref(false)
let resend = function () {
  resending.value = true
  Auth.verifyCurrentUserAttribute('email').then(res => {
    notify({
      text: 'Code sent',
      duration: 6000
    })
  }).catch(err => {
    console.log(err)
    notify({
      text: err.message,
      duration: 6000
    })
  }).finally(() => {
    resending.value = false
  })
}
</script>