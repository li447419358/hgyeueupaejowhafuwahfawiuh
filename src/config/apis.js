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
//获取用户信息
export const getUserInfo = () => {
  return get(`${baseUrl}/api/app/userInfo`, {})
};
//查询首页基金列表信息
export const getOverView = params => {
  return get(`${baseUrl}/api/app/list`, params)
};

