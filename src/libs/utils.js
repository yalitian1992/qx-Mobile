/* eslint-disable */

/**
 * 继承
 * inherits
 * @param {Object} superClass 父类
 * @param {Object} subClass 子类
 */
export function inherits(superClass, subClass) {
  let newClass = function() {};
  newClass.prototype = subClass.prototype;
  superClass.prototype = new newClass();
  return superClass;
}

export function deepCopy(obj) {
  if (!obj || typeof obj !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  let targetObj = obj.constructor === Array ? [] : {};
  for (let keys in obj) {
    if (obj.hasOwnProperty(keys)) {
      if (obj[keys] && typeof obj[keys] === "object") {
        targetObj[keys] = obj[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepCopy(obj[keys]);
      } else {
        targetObj[keys] = obj[keys];
      }
    }
  }
  return targetObj;
}

/**
 * ArrayBuffer转图片
 * arrayBufferToImage
 * @param {ArrayBuffer} arrayBuffer 图片的ArrayBuffer
 * @param {String} type 图片类型
 */
export function arrayBufferToImage(arrayBuffer, type) {
  type = type || "image/jpg";
  const blob = toBlob(arrayBuffer, type);
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}
function toBlob(arrayBuffer, type) {
  type = type || "image/jpg";
  const _arrayBuffer = new Uint8Array(arrayBuffer);
  return new Blob([_arrayBuffer], { type });
}

// 判断当前环境是否支持sessionStorage
const isPrivate = "sessionStorage" in window && window.sessionStorage !== null;

/**
 * 获取token
 */
export function getToken() {
  /* eslint-disable */
  let _token;
  const re = /\?newToken=(.*)/;
  const { search } = window.location;
  const tokenSearch = re.exec(search);
  if (tokenSearch) {
    _token = tokenSearch[1];
  } else {
    _token = session.getItem("token") || false;
  }
  return _token;
}

/**
 * session操作
 */
export const session = {
  /* eslint-disable */
  /**
   * 设置一个session
   * @param {String} name session名称
   * @param {String|Object} value session值
   */
  setItem: (() => {
    if (isPrivate) {
      return (name, value) => {
        if (typeof value !== "string") {
          value = JSON.stringify(value);
        }
        sessionStorage.setItem(name, value);
      };
    }
    if (!("_sessions" in window)) {
      window["_sessions"] = {};
    }
    return (name, value) => {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      window._sessions[name] = value;
    };
  })(),
  /**
   * 获取指定的session
   * @param {String} name session名称
   * @returns {String}
   */
  getItem: (() => {
    if (isPrivate) {
      return name => {
        return sessionStorage.getItem(name);
      };
    }
    if (!("_sessions" in window)) {
      window["_sessions"] = {};
    }
    return name => {
      return window._sessions[name];
    };
  })(),
  /**
   * 删除指定session
   * @param {String} name session名称
   */
  removeItem: (() => {
    if (isPrivate) {
      return name => {
        sessionStorage.removeItem(name);
      };
    }
    if (!("_sessions" in window)) {
      window["_sessions"] = {};
    }
    return (name, value) => {
      delete window._sessions[name];
    };
  })()
};

export default {
  inherits,
  arrayBufferToImage,
  session,
  getToken
};
