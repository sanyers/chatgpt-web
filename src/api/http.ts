import request from './request'
export const axios = request({ baseURL: import.meta.env.DEV ? '/dev' : '/' })
export default axios
