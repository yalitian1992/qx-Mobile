<template>
    <router-view />
</template>

<script>
import "@/config/rem";

export default {
  name: "App"
};
</script>

<style>
@import "./style/icon.css";
@import "./style/order.css";
/* 这里写全局样式 */
body {
  overflow: hidden;
  font-family: STXihei;
  color: #000;
  background: #f5f5f4;
  position: relative;
}
#app {
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  -webkit-user-select: auto;
  -khtml-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  -webkit-touch-callout: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
ul, li {
  list-style: none;
}
img {
  border: none;
}
em {
  font-style: normal;
}
button {
  border: none;
}
.jroll-infinite-tip {
  width: 100%;
  text-align: center;
  padding-bottom: 0.3rem;
}
input:focus,
input:active {
  outline: none;
}
::placeholder {
  color: #d1d0d0;
}
div,ul,li,img,span,p{
  cursor:pointer;
}
</style>
