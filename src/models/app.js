import router from 'umi/router'
import { stringify } from 'qs'
import store from 'store'
import { refreshToken } from 'api'
import { pathMatchRegexp } from 'utils'
export default {
  namespace: 'app',
  state: {
    user: {},
    routeList: [
      {
        id: 1,
        name: 'ACCOUNT',
        zhName :'账户',
        router: '/account/profit',
      },
      {
        id: 2,
        name: 'OURTEAM',
        zhName :'团队',
        router: '/ourteam',
      },
      {
        id:3,
        name:'QUOTATIONS',
        zhName:'行情',
        router:'/quotations/stockindex'
      },
      {
        id:4,
        name:'NEWS',
        zhName:'新闻',
        router:'/news'
      },
      {
        id:5,
        name:'REPORT',
        zhName:'研报',
        router:'/report/reportlist'
      }
    ],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setup({ dispatch }) {
        
      dispatch({ type: 'query', })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { uid , token } = store.get('user') || {}
      const { success, data } = yield call(refreshToken, payload||{uid,token})
      const { locationPathname } = yield select(_ => _.app)
        
        if (success&&data) {
          const  user  = data

          yield put({
            type: 'updateState',
            payload: {
              user,
            },
          })
          if (pathMatchRegexp('/login', window.location.pathname)) {
            router.push({
              pathname: '/account/profit',
            })
          }
        } else {
          
          store.remove('user')
          router.push({
            pathname: '/login',
            search: stringify({
              from: locationPathname,
            }),
          })
        }
    },
    *signOut({ payload }, { call, put }) {
        store.remove('user')
      if (!store.get('user')) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            routeList: [],
          },
        })
        yield put({ type: 'query' })
      } 
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
