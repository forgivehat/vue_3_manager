import request from './request'

export const getUsers = (params) => {
  return request({
    url: '/users',
    params
  })
}
