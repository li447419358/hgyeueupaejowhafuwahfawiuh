/**
 * Created by Arker on 2017-04-13.
 */
import {setStore} from '../../config/util'
import {updateUrl} from '../../config/env'

let wgtVer = null;
const checkUrl = updateUrl + "/version.json";
const wgtUrl = updateUrl + "/update.wgt";
const apkUrl = updateUrl + "/uploadfiles/files/app.apk";

// 更新应用资源
function installWgt(path) {
  window.plus.nativeUI.showWaiting("安装更新...");
  window.plus.runtime.install(path, {}, function () {
    window.plus.nativeUI.closeWaiting();
    window.plus.nativeUI.alert("应用更新完成！", function () {
      window.plus.runtime.restart();
    });
  }, function (e) {
    window.plus.nativeUI.closeWaiting();
    //  window.plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    window.plus.nativeUI.confirm("发现新版本是否立即更新？", function (event) {
      if (0 == event.index) {
        window.plus.runtime.openURL(apkUrl);
      }
    });
  })
}

// 下载wgt文件
function downWgt() {
  window.plus.nativeUI.showWaiting("下载更新文件...");
  window.plus.downloader.createDownload(wgtUrl, {filename: "_doc/update/"}, function (d, status) {
    if (status == 200) {
      installWgt(d.filename); // 安装wgt包
    } else {
      window.plus.nativeUI.alert("下载更新文件失败！");
    }
    window.plus.nativeUI.closeWaiting();
  }).start();
}

// 检测更新
function checkAndUpdate() {
  //    window.plus.nativeUI.showWaiting("检测更新...");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 4:
        //              window.plus.nativeUI.closeWaiting();
        if (xhr.status == 200) {
          // var data = eval(xhr.responseText) ;
          var dataObj = eval("(" + xhr.responseText + ")");//转换为json对象;

          var newVer = dataObj.version;
          var content = dataObj.content;

          // console.log(dataObj, newVer, wgtVer);
          if (wgtVer && newVer && (wgtVer != newVer)) {
            window.plus.nativeUI.confirm(content, function (event) {
              if (0 == event.index) {
                downWgt();
              }
            }, "发现新版本", ["立即更新", "取　　消"]);
          } else {
            // window.plus.nativeUI.toast("已是最新版本");
          }
          setStore('wms_wgtVer', wgtVer);
          setStore('wms_newVer', newVer);
        } else {
          //    window.plus.nativeUI.alert("检测更新失败！");
        }
        break;
      default:
        break;
    }
  }
  xhr.open('GET', checkUrl + "?" + new Date().getTime());
  xhr.send();
}


export const checkUpdate = () => {
  window.plus.runtime.getProperty(plus.runtime.appid, function (inf) {
    wgtVer = inf.version;
    checkAndUpdate();

  });
}
