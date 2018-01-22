// 创建上传任务
function uploadImg(src, data, callback) {
  var wt = plus.nativeUI.showWaiting();
  var task = plus.uploader.createUpload(data, {method: "POST", timeout: 20, blocksize: 0},
    function (t, status) { //上传完成
      if (status == 200 && t.state == 4) {
        wt.close();
        var data = JSON.parse(t.responseText);
        callback(data);
      } else {
        plus.nativeUI.toast("选择图片失败，请稍候再试");
      }
    }
  );
  task.addFile(src, {"key": "file"});
  task.start();
}

//图片显示
export const showPics = function (url, name, callback) {
  var data = {
    code: 200,
    url: '',
    name: name
  }
  //根据路径读取到文件
  plus.io.resolveLocalFileSystemURL(url, function (entry) {
    entry.file(function (file) {
      var fileReader = new plus.io.FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function (e) {
        data.url = e.target.result.toString(); //图片的base64编码
        callback(data);
      }
    });
  });
}
//压缩图片
export const compressImage = function (url, filename, data, callback) {
  var name = "_doc/upload/" + filename;
  plus.zip.compressImage({
      src: url, //src: (String 类型 )压缩转换原始图片的路径
      dst: name, //压缩转换目标图片的路径
      width: '1000px',
      quality: 90, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
      overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
      format: "jpg"
    },
    function (zip) {
      if (zip.size <= (500 * 1024)) {
        //页面显示图片
        uploadImg(zip.target, data, callback)
      } else {
        compressImage(zip.target, filename, data, callback)
      }


    },
    function (error) {
      plus.nativeUI.toast("压缩图片失败，请稍候再试");
    });
}

//调用手机摄像头并拍照
export const getImage = function (data, callback) {
  if (!checkSupport(callback)) {
    return;
  }
  ;
  var cmr = plus.camera.getCamera();
  cmr.captureImage(function (p) {
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      compressImage(entry.toLocalURL(), entry.name, data, callback);
    }, function (e) {
      plus.nativeUI.toast("读取拍照文件错误：" + e.message);
    });
  }, function (e) {
  }, {
    filter: 'image'
  });
}
//从相册选择照片
export const galleryImgs = function (data, callback) {
  if (!checkSupport(callback)) {
    return;
  }
  ;
  plus.gallery.pick(function (e) {
    var name = e.substr(e.lastIndexOf('/') + 1);
    compressImage(e, name, data, callback);
  }, function (e) {
  }, {
    filter: "image"
  });
}

//点击事件，弹出选择摄像头和相册的选项
export const showActionSheet = function (data, callback) {
  if (!checkSupport(callback)) {
    return;
  }
  ;
  var bts = [{
    title: "拍照"
  }, {
    title: "从相册选择"
  }];

  plus.nativeUI.actionSheet({
      cancel: "取消",
      buttons: bts
    },
    function (e) {
      if (e.index == 1) {
        getImage(data, callback);
      } else if (e.index == 2) {
        galleryImgs(data, callback);
      }
    }
  );

}

function checkSupport(callback) {
  if (!window.plus) {
    var data = {
      code: 400,
      message: "没有可打开的相机！"
    }
    callback(data);
    return false;
  } else {
    return true;
  }
}
