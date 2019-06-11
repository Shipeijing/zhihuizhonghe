import axios from 'axios' //引用axios
import {
  Promise
} from 'es6-promise' //引入Promise
export default ({
  store
}) => {
  // axios 配置
  //axios.defaults.timeout = 5000;  //设置超时时间
  axios.defaults.baseURL = 'http://api.zhihuizhonghe.com'; //这是调用数据接口
  //axios.defaults.baseURL = 'http://192.168.0.122:9001';
  // axios.defaults.baseURL = 'http://127.0.0.1:9001';
  // http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台
  axios.interceptors.request.use(
    config => {
      const access_token = store.state.access_token
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type': 'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
      };
      if (!!access_token) {
        config.headers.Authorization = "Bearer " + access_token; //携带权限参数
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );


  // http response 拦截器（所有接收到的请求都要从这儿过一次）
  axios.interceptors.response.use(
    response => {
      //response.status===401是和后台约定的权限丢失或者权限不够返回的状态码，这个可以自己和后台约定，约定返回某个自定义字段也是可以的
      if (response.data.code && response.data.code == 401) {
        if (response.data.message == '无访问权限，请登陆后重试') {
          localStorage.setItem('redirectUrl', location.href)
          location.href = '/login'
          return
        } else {
          if (response.request.responseURL != axios.defaults.baseURL + '/auth/login') {
            store.dispatch('logout')
            localStorage.setItem('redirectUrl', location.href)
            location.href = '/login'
          } else {
            return response
          }
        }
      }
      if (response.request.responseURL != axios.defaults.baseURL + '/oauth/access_token') {
        if (store.state.access_token) {
          const access_token = store.state.access_token
          const tokenTime = store.state.tokenTime
          const refresh_token = store.state.refresh_token
          if (access_token && new Date().getTime() - tokenTime < 3600000 && new Date().getTime() - tokenTime > 1800000) {
            store.dispatch('refreshToken', refresh_token)
          }
        }
      }
      return response
    },
    error => {
      // if(error.response.status === 401) {
      //   // 401 说明 token 验证失败
      //   // 可以直接跳转到登录页面，重新登录获取 token
      //   localStorage.setItem('redirectUrl', location.href)
      //   location.href = '/login'
      // }
      return Promise.reject(error)
    });
}



/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url + '?_t=' + new Date().getTime(), {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
  })
}
