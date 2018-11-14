import router from 'umi/router'
import store from 'store'
import { loginRequest } from 'api'
import { pathMatchRegexp } from 'utils'

export default {
  namespace: 'login',

  state: {},
  subscriptions:{
    setup({dispatch}){
      store.remove('user')
    }
  },
  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginRequest, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        store.set('user', data.data)
        const {uid,token} = data.data
        yield put({ type: 'app/query',payload:{uid,token} })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/account/profit')
          else router.push(from)
        } else {
          router.push('/account/profit')
        }
      } else {
        throw data
      }
    },
  },
}
