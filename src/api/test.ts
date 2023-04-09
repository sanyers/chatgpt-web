import { axios } from './http'

// test get
export const testGet = (params?: any) => {
  return axios.request({
    method: 'get',
    url: '/api/test/a',
    params,
  })
}

// test post
export const testPost = (data?: any) => {
  return axios.request({
    method: 'post',
    url: '/api/user/quit',
    data,
  })
}