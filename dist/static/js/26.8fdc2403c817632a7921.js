webpackJsonp([26],{dsU7:function(e,s){},xi7F:function(e,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=i("rxR/"),d=i("7QTg"),r=(i("v2ns"),{name:"orderList",data:function(){var e=this;return{menuCross:!1,swiperOption:{initialSlide:0,resistanceRatio:0,slidesPerView:"auto",slideToClickedSlide:!0,on:{touchMove:function(){e.$refs.swiper.forEach(function(e){e.swiper.slidePrev()})}}},addressLists:[{address:"朝阳北路与温榆河西路交叉口西150米新建村二期高层6号楼3单元1301",defaultFlag:0,id:"67",name:"发绝地反",phone:"13681182959",region:"北京市北京市通州区",userId:"",zipCode:101100},{address:"朝阳北路与温榆河西路交叉口西150米新建村二期高层6号楼3单元1301",defaultFlag:0,id:"67",name:"张松辉",phone:"13681182959",region:"北京市北京市通州区",userId:"",zipCode:101100},{address:"朝阳北路与温榆河西路交叉口西150米新建村二期高层6号楼3单元1301",defaultFlag:0,id:"67",name:"电风扇",phone:"13681182959",region:"北京市北京市通州区",userId:"",zipCode:101100},{address:"朝阳北路与温榆河西路交叉口西150米新建村二期高层6号楼3单元1301",defaultFlag:0,id:"67",name:"是防守打法",phone:"13681182959",region:"北京市北京市通州区",userId:"",zipCode:101100}],checksbg:null}},computed:{swiper:function(){return this.$refs.swiper.swiper}},mixins:[t.a],components:{swiper:d.swiper,swiperSlide:d.swiperSlide},methods:{deleteFun:function(e,s){var i=this;this.get("/tuser/del/deleteAddress",{addressId:s}).then(function(s){i.$refs.swiper[e]&&i.$refs.swiper[e].swiper.slidePrev(!1),i.addressLists.splice(e,1)})},checkFun:function(e,s){this.checksbg=e,this.post("/tuser/put/chooseAddress",{userId:"",addressId:s}).then(function(e){})},addressFun:function(){var e=this;this.post("/tuser/list/address",{userId:""}).then(function(s){e.addressLists=s})}},mounted:function(){this.addressFun()}}),n={render:function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",{staticClass:"address-content"},[i("V-Scroll",{attrs:{isList:!1,"scroll-height":e.mainHeight+"px"}},[i("div",{staticClass:"add-address"},[i("router-link",{attrs:{tag:"p",to:{path:"/myaccess/addressEdit"}}},[e._v("新增收货地址")])],1),e._v(" "),i("ul",{staticClass:"address-list"},e._l(e.addressLists,function(s,t){return i("li",{key:t},[i("swiper",{ref:"swiper",refInFor:!0,attrs:{options:e.swiperOption}},[i("swiper-slide",{staticClass:"content addressLefts"},[i("div",{class:{checkouteds:e.checksbg==t},on:{click:function(i){e.checkFun(t,s.id)}}},[i("p")]),e._v(" "),i("div",[i("p",[e._v(e._s(s.name))]),e._v(" "),i("p",[e._v(e._s(s.address))])]),e._v(" "),i("router-link",{attrs:{tag:"div",to:{path:"/myaccess/addressEdit",query:{id:s.id}}}},[i("p")])],1),e._v(" "),i("swiper-slide",{staticClass:"menu",nativeOn:{click:function(i){e.deleteFun(t,s.id)}}},[i("div",[e._v("\n              删除\n            ")])])],1)],1)}))])],1)},staticRenderFns:[]};var a=i("VU/8")(r,n,!1,function(e){i("dsU7")},"data-v-49e4ac76",null);s.default=a.exports}});
//# sourceMappingURL=26.8fdc2403c817632a7921.js.map