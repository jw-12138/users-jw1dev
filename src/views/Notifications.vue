<template>
  <div class="notifications">
    <div class="item" v-for="item in _n" :class="{
      'in': item.shouldEnter,
      'out': item.shouldLeave,
      'flat': item.shouldCollapse,
      'info': item.type === 'info',
      'success': item.type === 'success',
      'error': item.type === 'error'
    }">

      <div class="flex items-center">
        <div class="mr-2">
          <i v-if="item.type === 'info'" class="iconfont icon-prompt" style="font-size: 1.5rem"></i>
          <i v-if="item.type === 'success'" class="iconfont icon-success text-green-500" style="font-size: 1.5rem"></i>
          <i v-if="item.type === 'error'" class="iconfont icon-error text-red-500" style="font-size: 1.5rem"></i>
        </div>
        <div class="text-xs" v-html="item.text">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {store} from '../js/store.js'

let _n = computed(() => {
  let keys = Object.keys(store.state.notifications)
  let arr = []
  keys.forEach(k => {
    let obj = store.state.notifications[k]
    arr.push(obj)
  })
  return arr
})
</script>

<style scoped>

</style>