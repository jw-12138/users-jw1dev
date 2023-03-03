<template>
  <div aria-busy="true" class="p-8" v-show="!userSignedIn">
  </div>
  <div v-show="userSignedIn">
    <p>
      Welcome, {{ username }}!
    </p>
    <div>
      <div>
        <button @click="signOut" :aria-busy="signingOut">Sign Out</button>
      </div>
      <div>
        <button class="outline" @click="router.push('/change-password')">Change Your Password</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Auth} from '../js/auth.js'
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import md5 from 'md5'
import {notify} from '../js/utils.js'

let router = useRouter()

let gettingUserInfo = ref(true)

let username = ref('')
let unverified = ref(false)
let userSignedIn = ref(false)
onMounted(() => {
  Auth.currentAuthenticatedUser().then(user => {
    console.log(user)
    console.log(user.signInUserSession.accessToken.payload['cognito:groups'])
    if (!user.username) {
      throw new Error('oops')
    }

    getUserInfo(user)
    userSignedIn.value = true
    Auth.verifiedContact(user).then(contact => {
      if (!contact.verified.email) {
        router.push('/verify-email?username=' + user.username)
      }
    })
  }).catch(err => {
    console.log(err)
    localStorage.clear()
    router.push('/sign-in')
    gettingUserInfo.value = false
  })
})

let avatar = ref('')
let getUserInfo = function (res) {
  username.value = res.username
  let email = res.attributes.email
  let hash = md5(email)
  avatar.value = `https://www.gravatar.com/avatar/${hash}?s=120&d=identicon`
  gettingUserInfo.value = false
}

let signingOut = ref(false)
let signOut = function () {
  let c = confirm('Are you sure you want to sign out?')
  if (!c) {
    return
  }
  signingOut.value = true
  Auth.signOut().then(res => {
    signingOut.value = false
    router.push('/sign-in')
    notify({
      text: 'You\'ve been signed out.'
    })
  }).catch(err => {
    console.log(err)
    signingOut.value = false
  })
}
</script>
