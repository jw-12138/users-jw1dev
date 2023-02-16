<template>
  <h1 class="text-center">
    🙌 {{pageName ? ' - ' + pageName : ''}}
  </h1>
</template>

<script setup>
import {defineProps} from 'vue'


defineProps({
  pageName: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>

</style>