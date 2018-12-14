import EventEmitter from "../eventEmitter";
import utils, { deepCopy } from "../utils";
/* eslint-disable */

// FileView 继承 EventEmitter
utils.inherits(FileView, EventEmitter);

/**
 * 浏览上传的文件
 * FileView
 * @param {Array} files 文件列表
 */
function FileView(files) {
  if (!(this instanceof FileView)) {
    return new FileView(files);
  }
  this.files = files || [];
}
// 初始化的files对象， 暂时没用到
FileView.prototype.files = null;
// 上传过的记录
FileView.prototype.parsingArray = null;
// image索引
FileView.prototype.imageIndex = 0;
// video索引
FileView.prototype.videoIndex = 0;
/**
 * 加载上传文件
 * fileReader
 * @param {Array} files file对象数组
 * @description 解析完文件之后此方法会执行loadend事件函数
 */
FileView.prototype.fileReader = function(files) {
  // 保存当前实例
  const self = this;
  if (files instanceof FileList) {
    files = Array.prototype.slice.apply(files);
  } else if (files && !(files instanceof Array)) {
    files = [].concat(files);
  }
  files = files || this.files || [];
  let parsingArray;
  files.forEach(function(file, index) {
    let type;
    // 判断当前文件类型是什么
    if (file.type.indexOf("image") >= 0) {
      type = "image";
      self.imageIndex += 1;
    } else if (file.type.indexOf("video") >= 0) {
      type = "video";
      self.videoIndex += 1;
    } else {
      type = null;
      return;
    }
    (function(i, typeIndex) {
      // 创建FileReader对象
      const fileReader = new FileReader();
      // 注册加载结束事件
      fileReader.onloadend = function(e) {
        let src;
        if (type === "image") {
          src = utils.arrayBufferToImage(e.target.result, "image/jpg");
        } else {
          src = utils.arrayBufferToImage(e.target.result, "video/mp4");
        }
        const source = {
          // file源数据
          result: e.target.result,
          // 转换过的Src
          src: src,
          // 当前File对象
          file: file,
          // 当前加载的File索引
          index: i,
          // 当前file类型
          type: type,
          // 类型索引， 递增的
          typeIndex: typeIndex
        };
        parsingArray = (parsingArray || []).concat(source);
        if (i === files.length - 1) {
          self.emit("loadend", parsingArray);
          self.parsingArray = (self.parsingArray || []).concat(parsingArray);
          self.index = i;
        }
      };
      // 使用ArrayBuffer加载文件
      fileReader.readAsArrayBuffer(file);
    })(index, type === "image" ? self.imageIndex : self.videoIndex);
  });
  return this;
};
/**
 * 设置类型索引值
 * setTypeIndex
 * @param {Number} index 当前索引值
 * @param {String} type 索引的类型, 默认: image
 */
FileView.prototype.setTypeIndex = function(index, type) {
  type = type || "image";
  if (type === "image") {
    this.imageIndex = index;
  } else {
    this.videoIndex = index;
  }
  return index;
};
/**
 * 获取类型索引值
 * getTypeIndex
 * @param {String} type 索引的类型, 默认: image
 */
FileView.prototype.getTypeIndex = function(type) {
  type = type || "image";
  if (type === "image") {
    return this.imageIndex;
  }
  return this.videoIndex;
};
/**
 * 删除指定资源
 * deleteIdSource
 * @param {Number} typeIndex 资源索引值
 */
FileView.prototype.deleteIdSource = function (id, selfType) {
  let type, i;
  const parsingArray = deepCopy(this.parsingArray);
  parsingArray.forEach((item, index) => {
    if(item.type === type) {
      this.parsingArray[index - 1].typeIndex = ++i;
    }
    // id相同， 类型相同
    if(item.typeIndex === id && item.type === selfType && !type) {
      this.parsingArray.splice(index, 1);
      type = item.type;
      i = index;
      item.type === "image" ? this.imageIndex -= 1 : this.videoIndex -= 1;
    }
  });
  this.emit("loadend", this.parsingArray, "resource");
  return this;
}

export default FileView;
