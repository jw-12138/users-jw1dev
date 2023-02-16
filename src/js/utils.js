import { useRouter } from 'vue-router'
import {store} from './store.js'
import {router} from './router.js'

export function goToRoute(route) {
  return router.push(route)
}

export function notify(message) {
  let _msg = {
    text: '',
    duration: 3900,
    type: 'info',
    shouldLeave: false,
    shouldEnter: true,
    shouldCollapse: false
  }

  if(typeof message === 'string'){
    _msg.text = message
  }

  if(typeof message === 'object'){
    message.duration ? message.duration += 900 : 3900
    _msg = {
      ..._msg,
      ...message
    }
  }

  store.commit('pushNotification', _msg)
}