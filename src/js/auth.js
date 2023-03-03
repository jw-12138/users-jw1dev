import {Auth} from 'aws-amplify'

Auth.configure({
  userPoolId: 'ap-northeast-2_mFkRRvlLv',
  userPoolWebClientId: '1b3drul4gs41eudnc2bmrri3as'
})

export {
  Auth
}