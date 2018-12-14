# 趣闲html(手机版)

> vueJs 项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
> eslint 遵循了airbnb规则  如果不合适在项目根目录修改.eslintrc.js文件即可

## describe

``` description

> vue-waterfall-easy  此插件是瀑布流插件支持移动端和PC端
> img-vuer 此插件是图片浏览组组件（在PC端只能看单个图片，在移动端可以滑动看图片）
> vue-awesome-swiper 此插件是幻灯片(slide)组件
> better-scroll 此插件是一个列表加载插件支持移动端和PC端
> jroll 此插件可以实现滚动嵌套
> jroll-pulldown 此插件可以实现下拉刷新
> jroll-vue-infinite2 此插件可以实现无限滚动
> vue-resource 此插件是HTTP请求插件遵循Ajax
> vue-router  此插件是路由插件控制页面跳转
> vue-switch 开关触发器组件

```

## Components 全局组件
- V-Scroll ：滚动组件，可以实现上拉加载，下拉刷新
  参数：
      - scroll-height  滚动容器的高度，一个滚动容器必须要有高度.必填
      - scroll-direction 要滚动的方向， 默认Y, 选填
      - scroll-momentum 是否开启弹动动画，默认开启，选填
      - scroll-width 滚动容器的宽度，默认整个宽度，选填
      - scroll-options: jroll-options
      - on-scroll-bottom  滚动到底部的回调函数，要返回一个promise，如果isList为true时必填
      - pulldown 下拉刷新回调函数， 要返回一个promise，isList为true时必填
      - hideYBar 是否隐藏Y轴滚动条Bar 选填
      - hideXBar 是否隐藏X轴滚动条Bar 选填
      - isList 是否是个数据列表，默认true, 选填
- CountDown  ： 倒计时组件



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
