import { axios } from './http'

// 获取模型列表
export const chatModels = (data?: any) => {
  return axios.request({
    method: 'post',
    url: '/api/v1/models',
    data,
  })
}

// 聊天发送
export const chatCompletions = (data?: any) => {
  return axios.request({
    method: 'post',
    url: '/api/v1/chat/completions',
    data,
  })
}
