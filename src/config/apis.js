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
//登录
export const requestLogin = params => {
  return get(`${baseUrl}/api/app/login`, params);
};
//退出登录
export const logout = () => {
  return get(`${baseUrl}/api/app/logout`, {})
};
//获取信息
export const getData = params => {
  return post(`${baseUrl}/supformobileport.asp`, params)
};

