<template>
  <h2 class="text-center">
    Create New Password
  </h2>
  <form action="javascript:" @submit="changePassword">
    <div>
      <label for="newPassword">New Password</label>
      <input type="password" id="newPassword" v-model="newPassword" minlength="8" required/>
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
import {useStore} from 'vuex'
import {Auth} from '../js/auth.js'

let router = useRouter()
let store = useStore()

let username = ref('')
let newPassword = ref('')
let changingPassword = ref(false)
let changePassword = () => {
  changingPassword.value = true
  let user = store.state.newUserObj
  if (!user) {
    router.push('/sign-in')
    return false
  }
  Auth.completeNewPassword(user, newPassword.value).then(res => {
    console.log(res)
    notify({
      text: 'Password changed',
      type: 'success'
    })
    store.commit('updateNewUser', null)
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