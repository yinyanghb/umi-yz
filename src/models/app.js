import router from 'umi/router'
import { stringify } from 'qs'
import store from 'store'

export default {
    namespace : 'app',
    state:{
        user:{},
        routeList:[
            {
                id:'1',
                name:'账户',
                router: '/account/'
            }
        ],
        locationPathname: '',
        locationQuery: {},
    },
    subscriptions:{

    },
    effects:{

    },
    reducers:{
        
    }
}