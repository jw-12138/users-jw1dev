import {useRouter} from 'vue-router'
import {store} from './store.js'

let router = useRouter()

export function goToRoute(route) {
  return router.push(route)
}

export function notify(message) {
  let _msg = {
    text: '',
    duration: 3900,
    type: 'info',
    focus: false,
    shouldLeave: false,
    shouldEnter: true,
    shouldCollapse: false
  }

  if (typeof message === 'string') {
    _msg.text = message
  }

  if (typeof message === 'object') {
    message.duration ? message.duration += 900 : 3900
    _msg = {
      ..._msg,
      ...message
    }
  }

  store.commit('pushNotification', _msg)

  let notifications = store.state.notifications
  let keys = Object.keys(notifications)
  let id = keys[keys.length - 1]

  // initiate enter animation
  setTimeout(() => {
    store.state.notifications[id].shouldEnter = false
  }, 300)

  _leave()

  function _leave() {
    let _step = 300
    // remove notification after duration
    setTimeout(() => {
      if (store.state.notifications[id].focus) {

        setTimeout(() => {
          _leave()
        }, 1000)

        return false
      }
      // initiate leave animation
      setTimeout(() => {
        store.state.notifications[id].shouldLeave = true
      }, _step)

      // initiate collapse animation
      setTimeout(() => {
        store.state.notifications[id].shouldCollapse = true
      }, _step * 2)

      setTimeout(() => {
        delete store.state.notifications[id]
      }, _step * 3)

    }, store.state.notifications[id].duration - _step * 3)
  }
}