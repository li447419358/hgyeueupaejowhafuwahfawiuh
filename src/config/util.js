import axios from 'axios';
import router from '../router/';
//import store from '../vuex/store';
/**
 * Created by Arker on 2017-03-23.
 * 工具类
 */

// http response 拦截器
axios.interceptors.response.use(
  response => {
    //  store.dispatch('setLoading', false);
    console.log()
    if (response.data && response.data.code == 301) {
      router.replace({
        path: '/login',
        //query: {redirect: router.currentRoute.fullPath}
      })
    } else {
      return response;
    }
  },
  error => {
    //   store.dispatch('setLoading', false);
    return error;
  });

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}
/**
 * sessionStorage
 */
export const setSessionStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}
/**
 * sessionStorage
 */
export const getSessionStorage = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}
export const getStore2JSON = name => {
  if (!name) return;
  let item = window.localStorage.getItem(name);
  if (!item || item == "undefined") {
    return;
  }
  return JSON.parse(item) || "";
}
export const getSessionStorage2JSON = name => {
  if (!name) return;
  let item = window.sessionStorage.getItem(name);
  if (!item || item == "undefined") {
    return;
  }
  return JSON.parse(item) || "";
}
export const formatDate = (cdate, format) => {
  if (format && format.toUpperCase() == 'YYYY-MM-DD') {
    cdate = cdate.getFullYear() + '-' + repairMonth(cdate.getMonth()) + '-' + repairDate(cdate.getDate())
  } else if (format && format.toUpperCase() == 'YYYY-MM') {
    cdate = cdate.getFullYear() + '-' + repairMonth(cdate.getMonth())
  } else if (format && format.toUpperCase() == 'YYYY/MM/DD') {
    cdate = cdate.getFullYear() + '/' + repairMonth(cdate.getMonth()) + '/' + repairDate(cdate.getDate())
  } else if (format && format.toUpperCase() == 'YYYY/MM') {
    cdate = cdate.getFullYear() + '/' + repairMonth(cdate.getMonth())
  }

  function repairMonth(month) {
    if (month < 9) {
      month = '0' + (month + 1);
    }
    return month
  }

  function repairDate(day) {
    if (day < 9) {
      day = '0' + day;
    }
    return day
  }

  return cdate
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const toUrlParams = data => {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}
export const get = (url, params) => {
  var urlParams = toUrlParams(params);
  return axios(url + (urlParams ? "?" + urlParams : ''), {
    withCredentials: true
  }).then(res => res.data);
}
export const del = (url, params) => {
  var urlParams = toUrlParams(params);
  return axios(url + (urlParams ? "?" + urlParams : ''), {
    withCredentials: true,
    method: 'delete'
  }).then(res => res);
}
export const post = (url, params) => {
  return axios({
    url: url,
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: params,
    transformRequest: [function (data) {
      return toUrlParams(data)
    }],
    withCredentials: true
  }).then(res => res.data);
}
//FORM提交
export const form = (url, params) => {
  return axios({
    url: url,
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      return toUrlParams(data)
    }],
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data);
}
//文件
export const filePost = (url, params) => {
  return axios.post(url, params, {
    method: 'post',
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data);
}
