webpackJsonp([38],{"5yL7":function(t,s){},"9oUs":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("rxR/"),o=i("7QTg"),n=i("xNyN"),a=(i("v2ns"),{pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"fraction"},autoplay:!0}),c={name:"goodsDetails",mixins:[e.a],data:function(){return{swiperOptions:a,id:this.$route.params.id,banners:[],describe:"",BiddersList:{},commenList:[],priceList:[],newTime:0,goodsList:[],goodsdetails:{},goodsType:1,nameDive:!1,commentGive:!1,commentstartPage:0,goodsListEntity:{},commenListNext:!1,rulsShow:!1,pricerulsShow:!1,commentIndex:-1}},components:{swiper:o.swiper,swiperSlide:o.swiperSlide,GoodsList:n.a},methods:{changeTime:function(t){if(t){var s=Date.parse(new Date),i=new Date(t).getTime();return this.newTime=Math.floor((s-i)/1e3/60),this.newTime<60?this.newTime+"分钟前":this.newTime<1440?Math.floor(this.newTime/60)+"小时前":this.newTime<43200?Math.floor(this.newTime/60/24)+"天前":t.substring(0,10)}},getGoodsList:function(t){var s=this;return 1===t&&(this.goodsList=[]),this.get("/goods/list/more",{startPage:t}).then(function(t){return s.goodsList=(s.goodsList||[]).concat(t.items),!(t.items.length<=0)&&t})},goHome:function(){this.$router.push({path:"/home"})},goTop:function(){this.$refs.scrollTop.scrollTo(0,0)},guide:function(){this.$router.push({path:"/guide/page"})},commentClick:function(t){this.commentIndex=t,this.commentGive=!this.commentGive},nameClick:function(){this.nameDive=!this.nameDive},comment:function(){var t=this;this.get("/comment/get/page",{goodsId:this.id,startPage:this.commentstartPage,pageSize:3}).then(function(s){t.commenListNext=s.hasNextPage,t.commenList=(t.commenList||[]).concat(s.items)})},commentMore:function(){this.commentstartPage++,this.comment(),console.log(this.commenList)}},mounted:function(){var t=this;this.post("/story/get/story/detail",{storyId:"998503770083442688"}).then(function(s){t.goodsdetails=s,t.goodsType=t.goodsdetails.goodsListEntity.saleTypeId,t.banners=t.goodsdetails.urls,t.goodsListEntity=s.goodsListEntity}),this.post("/auction/get/auction/detail",{goodsId:this.id}).then(function(s){t.BiddersList=s}),this.get("/goods/list/more",{startPage:0,userId:null}).then(function(s){t.goodsList=s})}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"warpdiv"},[e("V-Scroll",{ref:"scrollTop",attrs:{"scroll-height":t.mainHeight+"px"}},[e("div",{staticClass:"warp"},[e("div",{staticClass:"banner_img"},[e("swiper",{staticClass:"slide-box",attrs:{options:t.swiperOptions}},[t._l(t.banners,function(t,s){return e("swiper-slide",{key:s},[e("img",{staticStyle:{overflow:"hidden","max-height":"10.5rem"},attrs:{src:t.img,width:"100%",alt:t}})])}),t._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1),t._v(" "),e("div",{staticClass:"describe"},[e("p",{staticClass:"describe_title"},[t._v("\n          "+t._s(t.goodsdetails.storyTitle)+"\n        ")]),t._v(" "),e("div",{staticClass:"describeText"},[t._v("\n          "+t._s(t.goodsdetails.content)+"\n        ")])]),t._v(" "),e("div",{staticClass:"seller"},[e("img",{attrs:{src:t.goodsdetails.fromUrl,alt:""}}),t._v(" "),e("div",{staticClass:"seller_center"},[e("p",[t._v(t._s(t.goodsdetails.fromName))]),t._v(" "),e("p",[t._v(t._s(t.goodsListEntity.city))])]),t._v(" "),e("div",{staticClass:"guanzhu",on:{click:t.guide}},[t._v("\n          关注\n        ")])]),t._v(" "),e("div",{staticClass:"dianzan"},[e("p",{on:{click:t.guide}},[t._v("赞赏1个果冻")]),t._v(" "),e("p",[t._v("当前已收到 "),e("span",[t._v("15")]),t._v("个果冻")]),t._v(" "),e("div",{staticClass:"dianzanList"})]),t._v(" "),e("div",{staticClass:"priceList"},[e("div",{staticClass:"price_top"},[e("p",[t._v("随机减果冻，最高0果冻白拿")]),t._v(" "),e("p",[t._v("邀请好友，随机立减")]),t._v(" "),e("p",{on:{click:t.guide}},[t._v("立即邀请好友砍价")]),t._v(" "),e("p",[e("span",[t._v("砍价记录")]),e("span",{on:{click:function(s){t.pricerulsShow=!0}}},[t._v("砍价规则"),e("i")])])]),t._v(" "),t._e()]),t._v(" "),t._e(),t._v(" "),e("div",{staticClass:"pingLun"},[e("p",{staticClass:"Modular_title"},[t._v("评论")]),t._v(" "),e("div",{staticClass:"input_top"},[e("img",{attrs:{src:i("NJ86"),alt:""}}),t._v(" "),e("p",[e("input",{attrs:{type:"text",placeholder:"说点什么"}})]),t._v(" "),e("p",{on:{click:t.guide}},[t._v("发布")])]),t._v(" "),""!=t.commenList?e("ul",{staticClass:"pingList"},t._l(t.commenList,function(s,i){return e("li",{key:i},[e("img",{attrs:{src:s.userAvatar,alt:""}}),t._v(" "),e("div",{staticClass:"pingRight"},[e("p",[e("span",[t._v(t._s(s.userName))]),e("span",[t._v(t._s(t.changeTime(s.time)))]),e("span",{class:{nozan:!0,give:t.commentGive},on:{click:t.guide}})]),t._v(" "),e("p",[t._v(t._s(s.content))])])])})):t._e(),t._v(" "),t.commenListNext?e("div",{staticClass:"getMore"},[e("p",{on:{click:t.commentMore}},[t._v("加载更多"),e("span")])]):t._e()]),t._v(" "),e("div",{staticClass:"other"},[e("p",{staticClass:"other_title"},[t._v("随便看看")]),t._v(" "),e("goods-list",{attrs:{dataSource:t.goodsList}})],1)])]),t._v(" "),e("div",{staticClass:"bottom"},[e("p",{on:{click:t.guide}},[t._v("一键分享")]),t._v(" "),e("p",{on:{click:t.guide}},[t._v("赞赏一颗糖")])]),t._v(" "),e("div",{staticClass:"rightBox"},[e("p",{on:{click:t.goTop}}),t._v(" "),e("p",{on:{click:t.goHome}})]),t._v(" "),t.rulsShow?e("div",{staticClass:"ruls",on:{click:function(s){t.rulsShow=!1}}},[t._m(0)]):t._e(),t._v(" "),t.pricerulsShow?e("div",{staticClass:" priceruls",on:{click:function(s){t.pricerulsShow=!1}}},[e("div",[t._v("\n      砍价规则\n    ")])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"introduce"},[s("h1",[this._v("娶闲介绍")]),this._v(" "),s("div",[this._v("描述")])])}]};var l=i("VU/8")(c,r,!1,function(t){i("5yL7")},"data-v-013017f3",null);s.default=l.exports}});
//# sourceMappingURL=38.78e38f6169d65d31161d.js.map