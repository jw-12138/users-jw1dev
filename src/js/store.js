import {createStore} from 'vuex'

const store = createStore({
  state() {
    return {
      notifications: {},
      progress: 0,
      newUserObj: null
    }
  },
  mutations: {
    updateNewUser(state, data){
      state.newUserObj = data
    },
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