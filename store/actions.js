import axios from 'axios'
import Services from './services'

export default {

  // 登录成功后保存用户信息
   logined({dispatch,commit}, data){
        commit('logined', data)
        axios.defaults.headers.common['Authorization'] = data.access_token
        dispatch('profile', data)
   },
   shoppingCarNum({commit}, data){
        commit('shoppingCarNum', data)
   },
   // 登录成功后使用 token 拉取用户的信息
   profile({commit}, data) {
        commit('profile', data)
   },
   // 用户登出，清除本地数据并重定向至登录页面
   logout({commit}) {
    //    return new Promise(function (resolve, reject) {
           commit('logout')
    //        axios.post('auth/logout', {}).then(respond => {
    //            Vue.$router.push({name:'login'})
    //        })
    //    })
   },
  // 将刷新的 token 保存至本地
  async refreshToken({commit}, refresh_token) {
      let params = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }
      let res = await Services.refreshToken(params)
      res.data.tokenTime = new Date().getTime()
      commit('refreshToken', res.data)
  },

  setNavName ({ commit }, navName) {
    commit('SET_NAVNAME', navName)
  },

  // async login ({ commit }, { email, password }) {
  //   try {
  //     let res = await axios.post('/api/login', {
  //       email,
  //       password
  //     })

  //     let { data } = res
  //     if (!data.ret) commit('SET_USER', data.user)

  //     return data
  //   } catch (e) {
  //     if (e.response.status === 401) {
  //       throw new Error('You can\'t do it')
  //     }
  //   }
  // }
}
