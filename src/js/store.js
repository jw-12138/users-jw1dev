import {createStore} from 'vuex'

const store = createStore({
  state() {
    return {
      notifications: {}
    }
  },
  mutations: {
    pushNotification(state, notification) {
      let id = Date.now()
      state.notifications[id] = notification
    }
  }
})

export {
  store
}