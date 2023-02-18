import { createApp } from 'vue'
import App from './views/View.vue'
import {router} from './js/router.js'
import {store} from './js/store.js'

let goingRoute = false

router.beforeEach((to, from, next) => {
  goingRoute = true
  store.commit('changeProgress', 33)
  addProgress()
  function addProgress(){
    setTimeout(function () {
      if(!goingRoute){
        return
      }
      let progress = store.state.progress + 1 >= 95 ? 95 : store.state.progress + 1
      store.commit('changeProgress', progress)
      addProgress()
    }, 100)
  }
  next()
})

router.afterEach( () => {
  goingRoute = false
  store.commit('changeProgress', 99.9)
  setTimeout(function () {
    store.commit('changeProgress', 100)
  }, 150)
  setTimeout(function () {
    store.commit('changeProgress', 0)
  }, 300)
})

let app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
