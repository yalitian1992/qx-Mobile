webpackJsonp([15],{"6Odt":function(t,i){},CiZr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={name:"Robbing",mixins:[e("rxR/").a],data:function(){return{timeList:[],windWidth:window.innerHeight,robbingList:[],goodsId:0,timeDay:"",indexs:0,timeListStatus:[],isPromise:!1,currentTime:""}},methods:{goDetails:function(t){this.$router.push({path:"/goods/details/"+t})},handleChangeTime:function(t){this.currentTime=t;var i=this.activeLi(0);i&&i.then(this.handleDataTip)},changeTime:function(t){return parseInt(t.substring(8,10))+"日"+t.substring(11,16)},upDate:function(){var t=this;return this.post("/goods/get/rob/time/list").then(function(i){for(var e=Date.parse(new Date),s=0;s<i.length;s++)e<Date.parse(new Date(i[s]))?t.timeListStatus.push("未开始"):e<Date.parse(new Date(i[s]))+36e5?t.timeListStatus.push("已开抢"):t.timeListStatus.push("已结束");if(t.timeList=i,t.currentTime=i[0],i.length>0){var n=t.activeLi(0,0,i[0]);console.log(n),n&&n.then(t.handleDataTip),t.$nextTick(function(){t.$refs.timeScroll.refresh()})}})},activeLi:function(t){var i=this;if(this.isPromise)return 0===t&&(this.robbingList=[]),this.post("/goods/get/rob/list",{saleType:5,robType:0,startPage:t,time:this.currentTime}).then(function(t){return i.robbingList=(i.robbingList||[]).concat(t.items),!(t.length<=0)&&t})},handleDataTip:function(t){var i=this;"boolean"==typeof t?this.$refs.robbingScroll.notData():t.hasNextPage?this.$refs.robbingScroll.success(1):this.$refs.robbingScroll.notData("没有更多数据了"),this.$nextTick(function(){i.$refs.robbingScroll.refresh()})}},mounted:function(){var t=new Date;console.log(t),this.isPromise=this.upDate()}},n={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"Robbing-content"},[e("V-Scroll",{ref:"robbingScroll",attrs:{"scroll-height":t.mainHeight+"px",pulldown:t.activeLi,autoLoad:!1,"on-scroll-bottom":t.activeLi}},[e("div",{staticClass:"topList"},[e("V-Scroll",{ref:"timeScroll",staticClass:"filters-scroll",attrs:{"scroll-height":"1.65rem",hideXBar:!0,"scroll-direction":"X",isList:!1}},[e("ul",t._l(t.timeList,function(i,s){return e("li",{key:s,class:{clickStyle:t.currentTime===i},on:{click:function(e){t.handleChangeTime(i)}}},[e("p",[t._v(t._s(t.changeTime(i)))]),t._v(" "),e("p",[t._v(t._s(t.timeListStatus[s]))]),t._v(" "),e("div",{staticClass:"border"}),t._v(" "),e("span")])}))])],1),t._v(" "),e("div",{staticClass:"centerList"},[e("ul",t._l(t.robbingList,function(i,s){return e("router-link",{key:s,attrs:{tag:"li",to:"/goods/details/"+i.id}},[e("img",{attrs:{src:i.cover,alt:""}}),t._v(" "),e("div",{staticClass:"right"},[e("p",[t._v(t._s(t._f("filterSubStrName")(i.name,18)))]),t._v(" "),e("div",{staticClass:"rightNum"},[e("p",[e("span"),t._v(t._s(i.integral))]),t._v(" "),e("p",[t._v("0元抢兑")])])])])}))])])],1)},staticRenderFns:[]};var r=e("VU/8")(s,n,!1,function(t){e("6Odt")},"data-v-891e5cba",null);i.default=r.exports}});
//# sourceMappingURL=15.85c4b1836d5db3123884.js.map