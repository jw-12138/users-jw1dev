import { createApp } from 'vue'
import App from './views/View.vue'
import {router} from './js/router.js'
import {store} from './js/store.js'

router.beforeEach((to, from, next) => {
  next()
})

let app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
