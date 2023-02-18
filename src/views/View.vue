<template>
  <ProgressBar></ProgressBar>
  <Header></Header>

  <Notifications></Notifications>

  <keep-alive>
    <router-view></router-view>
  </keep-alive>

  <footer class="text-center text-xs py-10">
    © {{year}} | <a href="https://jw1.dev">jw1.dev</a> | <a href="mailto:support@jw1.dev">Support</a> | Code with ❤️
  </footer>
</template>

<script setup>
import Header from './Header.vue'
import Notifications from './Notifications.vue'

import {ref} from 'vue'
import axios from 'axios'
import ProgressBar from './ProgressBar.vue'
let year = ref('')

axios({
  method: 'get',
  url: 'https://worldtimeapi.org/api/timezone/Asia/Shanghai'
}).then(res => {
  let timestamp = res.data.unixtime
  let date = new Date(timestamp * 1000)
  year.value = date.getFullYear()
})
</script>
