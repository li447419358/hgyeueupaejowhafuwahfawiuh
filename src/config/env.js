/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'http://wms.cld.net.cn';

if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://120.78.65.165/';
  // baseUrl = 'http://cld-109:8081';
  // baseUrl = 'http://cld-110:8090';
  //   baseUrl = 'http://wms.cld.net.cn';
  // baseUrl = 'http://192.168.1.224:8071';
  routerMode = 'hash'
} else {
  baseUrl = 'http://wms.cld.net.cn';
  // baseUrl = 'http://pc-leo:8071';
  // baseUrl = 'http://cld-csq:8066'
  routerMode = 'hash'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
