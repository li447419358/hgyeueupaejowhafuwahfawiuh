import axios from 'axios';
import {
  baseUrl
} from './env'
import {
  get,
  del,
  post,
  form,
  filePost,
  toUrlParams

} from './util'

//获取基金列表
export const getData = params => {
  return post(`${baseUrl}/supformobileport.asp`, params)
};
//登录
export const doLogin = params => {
  return post(`${baseUrl}/mobilelogin.asp`, params)
};
//注册
export const doRegister = params => {
  return post(`${baseUrl}/mobilereg.asp`, params)
};


