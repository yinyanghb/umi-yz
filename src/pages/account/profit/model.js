import store from 'store'
import { getHistoryInfo, getUserInfo } from 'api'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, {
  namespace: 'profit',
  state: {
    HistoryInfoData: [],
    trderInfo: [],
    selectedKeys: 'days',
    realAmount: 0.0,
    realNetValue: 0.0,
    realAmountDiffer: 0.0,
    initInvestAmount: 0.0,
    realNetValueDiffer: 0.0,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/account/profit', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          dispatch({ type: 'history' })
          dispatch({ type: 'userInfo' })
        }
      })
    },
  },
  effects: {
    *history(payload, { put, call,select }) {
      const {selectedKeys} = yield  select(_=>_.profit)
      
      const { code, data } = yield call(getHistoryInfo,{key:selectedKeys})
      if (code === '1' && data) {
        yield put({
          type: 'updateState',
          payload: {
            HistoryInfoData: data.listData
          },
        })
      }
    },
    *userInfo(payload,{put,call}){
      const {code,data,msg} = yield call(getUserInfo)
      if(code === '1' && data){
        yield put({
          type:'updateState',
          payload:data
        })
      }
    }
  },
})
