import { router } from 'utils'
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
        children:[
          {
            id:'11',
            name:'资金收益',
            icon:'Profit',
            router: '/account/profit',
            state:1,
          },
          {
            id:'12',
            name:'交易品种',
            icon:'Assortment',
            router: '/account/assortment',
            state:1,
          },
          {
            id:'13',
            name:'交易量',
            icon:'Amount',
            router: '/account/amount',
            state:1,
          },
          {
            id:'14',
            name:'导出',
            icon:'Exports',
            router: '/account/exports',
            state:1,
          },
        ]
      },
      {
        id: 2,
        name: 'OURTEAM',
        zhName :'团队',
        router: '/team/achievement',
        children:[
          {
            id:'21',
            name:'团队成就',
            icon:'Achievement',
            router: '/team/achievement',
            state:2,
          },
          {
            id:'22',
            name:'卓越时刻',
            icon:'Outstanding',
            router: '/team/outstanding',
            state:2,
          }
        ]
      },
      {
        id:3,
        name:'QUOTATIONS',
        zhName:'行情',
        router:'/quotations/stockindex',
        children:[
          {
            id:'31',
            name:'股指',
            icon:'Stockindex',
            router: '/quotations/stockindex',
            state:3,
          },
          {
            id:'32',
            name:'外汇',
            icon:'Exchange',
            router: '/quotations/exchange',
            state:3,
          },
          {
            id:'33',
            name:'经济日历',
            icon:'Calendar',
            router: '/quotations/calendar',
            state:3,
          }
        ]
      },
      {
        id:4,
        name:'NEWS',
        zhName:'新闻',
        router:'/news/newslist',
        children:[
          {
            id:'41',
            name:'全球快讯',
            icon:'Newslist',
            router: '/news/newslist',
            state:4,
          }

        ]
      },
      {
        id:5,
        name:'REPORT',
        zhName:'研报',
        router:'/report/reportlist',
        children:[
          {
            id:'51',
            name:'研报列表',
            icon:'Report',
            router: '/report/reportlist',
            state:5,
          }
        ]
      }
    ],
    locationPathname: '',
    locationQuery: {},
    locationState:1
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
            locationState:location.state 
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
      const { code, data } = yield call(refreshToken, payload||{uid,token})
      const { locationPathname,locationState } = yield select(_ => _.app)
        
        if (code==="1"&&data) {
          const  user  = data

          yield put({
            type: 'updateState',
            payload: {
              user,
            },
          })
          if (pathMatchRegexp('/sign/login', window.location.pathname)||pathMatchRegexp('/', window.location.pathname)) {
            router.push({
              pathname: '/account/profit',
            })
          }
        } else {
          
          store.remove('user')
          router.push({
            pathname: '/sign/login',
            search: stringify({
              from: locationPathname,
            }),
            state:locationState
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
