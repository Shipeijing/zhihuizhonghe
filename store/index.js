import Vuex from 'vuex'
import axios from 'axios' //引用axios
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
const createStore = () => {
  return new Vuex.Store({
    state: {
      navName: '商品分类',
      user: false,
      username: null,
      roles: null,
      access_token: null,
      refresh_token: null,
      tokenTime: null,
      baseImgUrl: 'http://api.zhihuizhonghe.com',
      //baseImgUrl: 'http://192.168.0.122:9001',
      // baseImgUrl: 'http://127.0.0.1:9001',
      serviceMallBanner: [],
      shoppingCarNum: ''
    },
    getters,
    actions,
    mutations,
  })
}
export default createStore
