import store from 'store'
import { getHistoryInfo, getUserInfo} from 'api'
import { message } from 'antd';

export default {
  namespace : 'profit',
  state:{
    HistoryInfoData:[],
    trderInfo : [],
    selectedKeys:'days',
    realAmount:0.00,
    realNetValue:0.00,
    realAmountDiffer:0.00,
    initInvestAmount:0.00,
    realNetValueDiffer:0.00
  },
  subscriptions:{
    setup({ dispatch }) {
      dispatch({ type: 'history',key:'days'})
    },
  },
  effects:{
    *history(payload,{put,call}){
      const { code ,data } =yield call(getHistoryInfo,payload)
      if(code==='1'&&data){
        yield put({
          type:'updateState',
          payload:{
            HistoryInfoData : data.listData
          }
        })
      }
    }
  }
}