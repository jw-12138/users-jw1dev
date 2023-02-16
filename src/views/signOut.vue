<template>
  <h2 class="text-center" aria-busy="true">Signing Out ...</h2>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {notify} from '../js/utils.js'
import {Auth} from '../js/auth.js'

import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
let router = useRouter()
let route = useRoute()

let busBaseApi = location.hostname === 'localhost'? 'http://localhost:3000' : 'https://api.jw1.dev'

let redirectURL = ref('')

onMounted(() => {
  let id = route.query.id
  let from = route.query.from

  console.log(id)
  console.log(from)
  if (!id || !from ){
    router.push('/')
    notify({
      text: 'Invalid sign out request',
      type: 'error'
    })
    return false
  }

  switch (from) {
    case 'chat':
      redirectURL.value = location.hostname === 'localhost' ? 'http://localhost:5072' : 'https://chat.jw1.dev'
      break
  }

  axios({
    url: busBaseApi + '/davinci/logout',
    method: 'POST',
    data: {
      id
    }
  }).then(() => {
    return Auth.signOut()
  }).then(() => {
    notify({
      text: 'You\'ve been signed out.'
    })
    setTimeout(function () {
      location.href = redirectURL.value
    }, 1300)
  }).catch(err => {
    console.log(err)
    notify('Error signing out')
  })

})


</script>