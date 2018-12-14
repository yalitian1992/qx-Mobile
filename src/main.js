// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";
import VueAwesomeSwiper from "vue-awesome-swiper";
import Gallery from "img-vuer";

import App from "./App";
import router from "./router";
import Components from "./components";
import Filters from "./filters/filters";
import Directive from "./directive/directive";
import { HOST } from "./config/config";

Vue.config.productionTip = false;
// 注册查看大图插件
Vue.use(Gallery);
Vue.use(VueResource);
// 注册轮播插件
Vue.use(VueAwesomeSwiper);
// 注册全局组件
Object.keys(Components).forEach(key => {
  const name = key.charAt(0).toUpperCase() + key.slice(1);
  Vue.component(`V-${name}`, Components[key]);
});

// 注册全局过滤器
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});
// 注册全局自定义指令
Object.keys(Directive).forEach(key => {
  Vue.directive(key, Directive[key]);
});


Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((req, next) => {
  /* eslint-disable */
  // 拦截请求添加HOST
  const url = req.url;
  const flag = url.charAt(0).indexOf("/") >= 0;
  const http =
    flag || HOST.charAt(HOST.length - 1).indexOf("/") >= 0
      ? HOST + url
      : `${HOST}/${url}`;
  req.url = http;
  // 设置Header
  // console.log(req);
  // req.headers.set("Accept", "application/json;charset=UTF-8");
  // req.headers.set("Content-Type", "application/json;charset=UTF-8");

  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App />"
});
