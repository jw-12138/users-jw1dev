<template>
  <div class="progress-bar">
    <div class="bg" :style="{
      width: store.state.progress + '%',
      opacity: store.state.progress === 0 || store.state.progress === 100 ? 0 : 1
    }">
      <div class="light"></div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'

let store = useStore()
</script>

<style scoped>

</style>