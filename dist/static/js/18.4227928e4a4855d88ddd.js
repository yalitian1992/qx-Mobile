webpackJsonp([18],{MPTp:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"orderList",data:function(){return{Info:{userId:"",name:"",addressId:"",phone:"",region:"",address:"",zipCode:""}}},mixins:[o("rxR/").a],components:{},mounted:function(){},methods:{saveFun:function(){var e=this.Info,t=/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;return e.name?t.test(e.sname)?(this.toast("姓名格式错误"),!1):e.phone?t.test(e.phone)?(this.toast("姓名格式错误"),!1):e.region&&e.address?t.test(e.address)?(this.toast("姓名格式错误"),!1):e.zipCode?/^\d{6}$/.test(e.zipCode)?void this.post("/tuser/put/insertAddress".this.Info).then(function(e){console.log(e)}):(this.toast("姓名格式错误"),!1):(this.toast("姓名不能为空"),!1):(this.toast("姓名不能为空"),!1):(this.toast("姓名不能为空"),!1):(this.toast("姓名不能为空"),!1)}}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("V-Scroll",{attrs:{isList:!1,"scroll-height":e.mainHeight+"px"}},[o("div",{staticClass:"address-form"},[o("div",[o("label",[e._v("联络人")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.Info.name,expression:"Info.name"}],attrs:{type:"text",placeholder:"名字"},domProps:{value:e.Info.name},on:{input:function(t){t.target.composing||e.$set(e.Info,"name",t.target.value)}}})]),e._v(" "),o("div",[o("label",[e._v("手机号码")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.Info.phone,expression:"Info.phone"}],attrs:{type:"tel",placeholder:"11位电话号码"},domProps:{value:e.Info.phone},on:{input:function(t){t.target.composing||e.$set(e.Info,"phone",t.target.value)}}})]),e._v(" "),o("div",{staticClass:"adderss-city"},[o("label",[e._v("选择地区")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.Info.region,expression:"Info.region"}],attrs:{type:"text",placeholder:"地区信息"},domProps:{value:e.Info.region},on:{input:function(t){t.target.composing||e.$set(e.Info,"region",t.target.value)}}})]),e._v(" "),o("div",{staticClass:"address-textarea"},[o("label",[e._v("详细地址")]),e._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.Info.address,expression:"Info.address"}],attrs:{placeholder:"街道门牌"},domProps:{value:e.Info.address},on:{input:function(t){t.target.composing||e.$set(e.Info,"address",t.target.value)}}})]),e._v(" "),o("div",[o("label",[e._v("邮政编码")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.Info.zipCode,expression:"Info.zipCode"}],attrs:{type:"tel",placeholder:"邮政编码"},domProps:{value:e.Info.zipCode},on:{input:function(t){t.target.composing||e.$set(e.Info,"zipCode",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"address-save",on:{click:e.saveFun}},[e._v("保存")])])],1)},staticRenderFns:[]};var a=o("VU/8")(s,n,!1,function(e){o("SHaW")},"data-v-76ecea47",null);t.default=a.exports},SHaW:function(e,t){}});
//# sourceMappingURL=18.4227928e4a4855d88ddd.js.map