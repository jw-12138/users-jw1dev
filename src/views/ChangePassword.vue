<template>
  <h2 class="text-center">
    Change Password
  </h2>
  <form action="javascript:" @submit="changePassword">
    <div>
      <label for="oldPassword">Old Password</label>
      <input type="password" id="oldPassword" v-model="oldPassword" minlength="8" required/>
    </div>
    <div>
      <label for="newPassword">New Password</label>
      <input type="password" id="newPassword" v-model="newPassword" minlength="8" required />
    </div>
    <div>
      <button type="submit" :aria-busy="changingPassword">Submit</button>
    </div>
    <div>
      <router-link to="/">Back to Home</router-link>
    </div>
  </form>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {notify} from '../js/utils.js'
import {useRoute, useRouter} from 'vue-router'
import {Auth} from '../js/auth.js'

let router = useRouter()

let oldPassword = ref('')
let newPassword = ref('')
let changingPassword = ref(false)
let changePassword = () => {
  changingPassword.value = true
  Auth.currentAuthenticatedUser().then(user => {
    console.log(user)
    return Auth.changePassword(user, oldPassword.value, newPassword.value)
  }).then(res => {
    notify({
      text: 'Password changed',
      type: 'success'
    })
    changingPassword.value = false
    router.push('/')
  }).catch(err => {
    console.log(err)
    changingPassword.value = false
    notify({
      text: err.message,
      type: 'error'
    })
  })
}
</script>

<style scoped>

</style>