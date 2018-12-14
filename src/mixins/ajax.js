import { getToken } from "../libs/utils";

const AjaxMixin = {
  data() {
    return {
      currentPageNo: 0,
      // 头部导航高度
      headerElHeight: 0,
      // 屏幕高度
      windowHeight: 0,
      // 主体高度
      mainHeight: 0,
      navigationHeight: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.headerElHeight = this.getElHeight(document.querySelector("#header"));
      const navigationEl = document.querySelector("#navigation");
      /* eslint-disable */
      navigationEl && (this.navigationHeight = this.getElHeight(navigationEl));
      // 计算主体高度
      this.mainHeight = this.windowHeight - this.headerElHeight;
    });
    this.windowHeight = this.getHeight();
    this.resetHeight();
  },
  methods: {
    /**
     * 重置高度
     */
    resetHeight() {
      const windowHeight = this.getHeight();
      document.body.style.height = `${windowHeight}px`;
    },
    setStyle() {},
    // 获取窗口暂时放这里
    getHeight() {
      if (window.innerHeight !== undefined) {
        return window.innerHeight;
      }
      const B = document.body;
      const D = document.documentElement;
      return Math.min(D.clientHeight, B.clientHeight);
    },
    /**
     * 获取单个元素高度
     * 包含padding，border
     * @param [Element] el html元素
     */
    getElHeight(el) {
      const height = parseFloat(this.getStyle(el, "height"), 10);
      const paddingTop = parseFloat(this.getStyle(el, "paddingTop"), 10);
      const paddingBottom = parseFloat(this.getStyle(el, "paddingBottom"), 10);
      const borderTop = parseFloat(this.getStyle(el, "borderTopWidth"), 10);
      const borderBottom = parseFloat(
        this.getStyle(el, "borderBottomWidth"),
        10
      );
      return height + paddingTop + paddingBottom + borderTop + borderBottom;
    },
    // 获取窗口暂时放这里
    getWidth() {
      if (window.innerWidth !== undefined) {
        return window.innerWidth;
      }
      const B = document.body;
      const D = document.documentElement;
      return Math.min(D.clientWidth, B.clientWidth);
    },
    // 获取当前样式
    getStyle(element, att) {
      if (window.getComputedStyle) {
        // 优先使用W3C规范
        return window.getComputedStyle(element)[att];
      }
      // 针对IE9以下兼容
      return element.currentStyle[att];
    },
    /**
     * Ajax Post请求
     * @param {String} url 请求地址
     * @param {Object} options 请求参数
     * @param {Object} headers 请求头
     */
    post(url, options, headers) {
      /* eslint-disable */
      this.$root.$emit("loading", {
        isMask: false,
        state: true
      });
      const token = this.getToken();
      return this.$http({
        method: "POST",
        url: url,
        body: options,
        headers: {
          token,
          ...headers
        }
      })
        .then(res => {
          this.$root.$emit("loading", {
            isMask: false,
            state: false
          });
          const status = res.body.execErrCode;
          if (status === "4003") {
            this.$router.replace(
              `/login?fullPath=${encodeURIComponent(this.$route.fullPath)}`
            );
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            // 登录失效弹框
            // this.$emit("onPrompt", loginFail);
            return res.body;
          }
          return res.body;
          // throw new Error(`请求错误，错误信息：${res.body.execMsg};错误代码为：${res.body.execErrCode}`);
        })
        .catch(err => {
          this.$root.$emit("loading", {
            isMask: false,
            state: false
          });
          this.$root.$emit("toast", {
            toastInfo: err.body.message || "服务器太忙了，请等会在试一试"
          });
        });
    },
    /**
     * Ajax Get请求
     * @param {String} url 请求地址
     * @param {Object} options 请求参数
     * @param {Object} headers 请求头
     */
    get(url, options, headers) {
      /* eslint-disable */
      this.$root.$emit("loading", {
        isMask: false,
        state: true
      });
      const token = this.getToken();
      return this.$http({
        method: "GET",
        url: url,
        params: options,
        headers: {
          token,
          ...headers
        }
      })
        .then(res => {
          this.$root.$emit("loading", {
            isMask: false,
            state: false
          });
          return res.body;
        })
        .catch(err => {
          this.$root.$emit("loading", {
            isMask: false,
            state: false
          });
          this.$root.$emit("toast", {
            toastInfo: err.body.message || "服务器太忙了，请等会在试一试"
          });
        });
    },
    getSlideList(type) {
      const url = "/setting/list/picSettings";
      return this.post(url, { type });
    },
    point(value) {
      let point = +value;
      point = point.toFixed(3);
      return +point.toString().substr(0, point.toString().length - 1);
    },
    /**
     * 获取token
     */
    getToken,
    upload(url, formData, headers = {}) {
      const token = this.getToken();
      return this.$http({
        url,
        body: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          token,
          ...headers
        }
      })
        .then(res => {
          return res.body;
        });
    },
    /**
     * 设置cookie
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String|Number} expiresDays 设置cookie的存活周期
     */
    setCookie(name, value, expiresDays) {
      expiresDays = expiresDays || 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + expiresDays * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    /**
     * 获取cookie
     * @param {String} name cookie名称
     */
    getCookie(name) {
      let arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return false;
    },
    toast: function(msg, time) {
      time = time ? time : 1500;
      let toast = document.getElementsByClassName("toast-alert")[0];
      let newToast = document.createElement("div");
      newToast.className = "toast-alert align-c";
      newToast.innerHTML = "<p class='con'>" + msg + "</p>";
      document.body.appendChild(newToast);
      this.timer = setTimeout(function() {
        document.body.removeChild(newToast);
      }, time);
    }
  }
};

export default AjaxMixin;
