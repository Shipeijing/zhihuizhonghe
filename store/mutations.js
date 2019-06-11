import axios from 'axios'
export default {
  SET_NAVNAME: (state, navName) => {
    state.navName = navName
  },
  // 用户登录成功，存储 token 并设置 header 头
  logined: (state, data) => {
    state.user = true
    state.access_token = data.access_token
    state.refresh_token = data.refresh_token
    state.tokenTime = data.tokenTime
    localStorage.setItem('user', true)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('tokenTime', data.tokenTime)
  },
  shoppingCarNum: (state, data) => {
    state.shoppingCarNum = data
    localStorage.setItem('shoppingCarNum', data)
  },
  // 用户刷新 token 成功，使用新的 token 替换掉本地的token
  refreshToken: (state, data) => {
    state.user = true
    state.access_token = data.access_token
    state.refresh_token = data.refresh_token
    state.tokenTime = data.tokenTime
    localStorage.setItem('user', true)
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('tokenTime', data.tokenTime)
  },
  // 登录成功后拉取用户的信息存储到本地
  profile: (state, data) => {
    state.username = data.username
    state.roles = data.roles
    localStorage.setItem('username', data.username)
    localStorage.setItem('roles', JSON.stringify(data.roles))
  },
  // 用户登出，清除本地数据
  logout(state){
    state.user = false
    state.access_token = null
    state.refresh_token = null
    state.tokenTime = null
    state.shoppingCarNum = ''
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('tokenTime')
    localStorage.removeItem('roles')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.removeItem('shoppingCarNum')
  },


  SET_USER: (state, user) => {
    state.user = user
  },
  SET_IMDb: (state, data) => {
    state.IMDb = data
  },
  UPDATA_IMDB: (state, { character, i }) => {
    state.IMDb[i] = character
  },
  REMOVE_IMDBCHARACTER: (state, i) => {
    state.IMDb.splice(i, 1)
  }
}
