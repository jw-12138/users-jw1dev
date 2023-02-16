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

      // remove notification after duration
      setTimeout(() => {
        delete state.notifications[id]
      }, notification.duration)

      // initiate enter animation
      setTimeout(() => {
        state.notifications[id].shouldEnter = false
      }, 300)

      // initiate leave animation
      setTimeout(() => {
        state.notifications[id].shouldLeave = true
      }, notification.duration - 600)

      // initiate collapse animation
      setTimeout(() => {
        state.notifications[id].shouldCollapse = true
      }, notification.duration - 300)
    }
  }
})

export {
  store
}