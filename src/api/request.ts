import axios from 'axios'
import router from '../router'
import { LOGIN_CONF } from '@/config'

let lastTime: number
// 错误提示节流
function messageErrorTime(msg: string) {
  let nowTime = new Date().getTime()
  if (!lastTime || nowTime - lastTime > 3000) {
    window.$message?.error(msg)
    // alert(msg)
  }
  lastTime = new Date().getTime()
}

// 拦截请求和响应
function instances(instance: any) {
  // 请求拦截
  instance.interceptors.request.use(
    (config: any) => {
      const sn = localStorage.getItem(LOGIN_CONF.KEY)
      if (sn) {
        config.headers.authorization = sn
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    },
  )

  // 响应拦截
  instance.interceptors.response.use(
    (response: any) => {
      if (!response) {
        return {}
      }

      // 二进制数据直接返回
      if (response.config.responseType === 'blob') {
        return response
      }

      // 特殊操作直接返回
      if (response.config.cbInit) {
        return response
      }

      if (response.data) {
        if (response.data.code && response.data.code !== 200) {
          messageErrorTime(response.data.msg.error.message)
          return {}
        } else {
          return response.data
        }
      } else {
        messageErrorTime(JSON.stringify(response))
        return {}
      }
    },
    (error: any) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            localStorage.setItem(LOGIN_CONF.KEY, '')
            router.push({ path: '/login' })
          case 500:
            messageErrorTime(JSON.stringify(error.response.data.msg))
            return {}
          default:
            messageErrorTime(JSON.stringify(error.message))
            return {}
        }
      }
    },
  )
}

// 创建请求
const request = (config: any) => {
  const instance = axios.create(config)
  instances(instance)
  return instance
}

export default request
