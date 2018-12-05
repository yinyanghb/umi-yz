import {router} from 'utils'
import store from 'store'
import { loginRequest } from 'api'
import { pathMatchRegexp } from 'utils'
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {},
  subscriptions:{
    
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      const {data,code,msg} = yield call(loginRequest, payload)
      const { locationQuery ,locationState} = yield select(_ => _.app)
      if (code==='1'&&data) {
        const { from } = locationQuery
        store.set('user', data)
        const {uid,token} = data
        yield put({ type: 'app/query',payload:{uid,token} })
        if (!pathMatchRegexp('/sign/login', from)) {
          if (from === '/') router.push({
            pathname:'/account/profit',
            state:1
          })
          else router.push({
            pathname:from,
            state:locationState
          })
        } else {
          router.push({
            pathname:'/account/profit',
            state:1
          })
        }
      } else {
        message.error(msg)
      }
    },
  },
}
