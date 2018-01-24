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

//获取信息
export const getData = params => {
  return post(`${baseUrl}/supformobileport.asp`, params)
};

