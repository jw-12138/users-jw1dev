import {createStore} from 'vuex'

const store = createStore({
  state() {
    return {
      notifications: {},
      progress: 0
    }
  },
  mutations: {
    changeProgress(state, progress){
      state.progress = progress
    },
    pushNotification(state, notification) {
      let id = Date.now()
      state.notifications[id] = notification
    }
  }
})

export {
  store
}