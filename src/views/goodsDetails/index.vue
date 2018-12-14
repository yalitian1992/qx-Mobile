<template>
  <!--eslint-disable -->
  <div class="warpdiv">
    <V-Scroll :scroll-height="`${mainHeight}px`" ref="scrollTop">
      <div class="warp">
        <div class="banner-top" v-if="goodsType === 3">
          <span>竞拍中</span>
          <i></i>
          <span> 05月06日  10:00结束</span>
        </div>
        <div class="banner_img">
          <!--<img :src="goodsList.goodsListEntity.cover" alt="">-->
          <swiper class="slide-box" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in banners" class="pic-box" :key="index">
              <video v-if="(/.+\.mp4$/).test(item)" :poster="item.replace(/(.*)\/(.*).mp4/, '$1/zoom/$2.jpg')" controls :src="item" style="height: 10.5rem;width: 100%"></video>
              <img v-else :src="item" class="pic" :alt="item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="Prompt" v-if="false">
            正在下单
          </div>
        </div>
        <div class="detaTitle">
          <div class="deta_top">
            <p><i></i><span>{{goodsListEntity.integral || ""}}</span></p>
            <p>共10件宝贝，还剩5件可抢</p>
            <p>您拥有：<i></i><span>258</span></p>
          </div>
          <div class="deta_center">
            <p>{{(goodsListEntity.name || "") | filterSubStrName()}}</p>
            <span :class="{'nozan':true, 'give':nameDive}" @click="nameClick"></span>
          </div>
          <div class="deta_bottom">
            <p><span>上海</span> <span>快递：{{Postage || ""}}元</span><span @click="rulsShow=true">送宝贝领果冻<i></i></span></p><!-- rulsShow=true-->
          </div>
        </div>
        <div class="describe">
          <p class="describe_title">
            {{(goodsListEntity.name || "") | filterSubStrName(25)}}
          </p>
          <div class="describeText">
            {{goodsdetails.description}}
          </div>
        </div>
        <div class="seller">
          <img :src="goodsdetails.userAvatar" alt=""/>
          <div class="seller_center">
            <p>{{goodsdetails.userName}}</p>
            <p>{{goodsListEntity.userCity}}</p>
          </div>
          <div class="guanzhu" @click="clickGuanzhu">
            {{guanzhuText}}
          </div>
        </div>
        <div class="dianzan">
          <p @click="rewardClick">赞赏1个果冻</p>
          <p>当前已收到 <span>{{rewardList.total}}</span>个果冻</p>
          <div class="dianzanList" >
             <img v-for="(item, index) in rewardList.tRewardListEntities" :key="index" :src="item.userAvatar" alt="" v-if="item.userAvatar!=''">
          </div>
        </div>
        <div class="priceList">
          <div class="price_top">
            <p>随机减果冻，最高0果冻白拿</p>
            <p>邀请好友，随机立减</p>
            <p >立即邀请好友砍价</p>
            <p><span>砍价记录</span><span @click="pricerulsShow=true">砍价规则<i></i></span></p>
          </div>
          <ul class="listStyle" v-if="false">
            <li v-for="(item, index) in priceList" :key="index">
              <img :src="item.avatar" alt="item.avatar"/>
              <p>{{item.nickName}}</p>
              <p>changeTime(item.createTime)出价</p>
              <p><span></span>{{item.number}}</p>
            </li>
          </ul>
        </div>
        <div class="Bidders" v-if="BiddersList!=''" >
          <p class="Modular_title">竞拍记录</p>
          <ul class="listStyle">
            <li>
              <img src="../../images/home/happy-currency.png" alt=""/>
              <p class="BiddersName">名字</p>
              <p class="Bidderstime">3分钟前出价</p>
              <p class="Biddersnumber"><span></span>800</p>
              <p class="Bidders_btn">+5个</p>
            </li>
            <li>
              <img src="../../images/home/happy-currency.png" alt=""/>
              <p class="BiddersName">名字</p>
              <p class="Bidderstime">3分钟前出价</p>
              <p class="Biddersnumber"><span></span>8</p>
              <p class="Bidders_btn">+5个</p>
            </li>
            <li>
              <img src="../../images/home/happy-currency.png" alt=""/>
              <p class="BiddersName">名字</p>
              <p class="Bidderstime">3分钟前出价</p>
              <p class="Biddersnumber"><span></span>8</p>
              <p class="Bidders_btn">+5个</p>
            </li>
          </ul>
        </div>
        <div class="pingLun">
          <p class="Modular_title">评论</p>
          <div class="input_top">
            <!--<img src="../../images/send.png" alt=""/>-->
            <img :src="goodsdetails.userAvatar" alt=""/>
            <p><input type="text" placeholder="说点什么" v-model="content"/></p>
            <p @click="commentTextClick">发布</p>
          </div>
          <ul class="pingList" v-if="commenList!=''">
            <li v-for="(item, index) in commenList" :key="index">
              <img :src="item.userAvatar" alt=""/>
              <div class="pingRight">
                <p><span>{{item.userName}}</span><span>{{changeTime(item.time)}}</span><span :class="{'nozan':true, 'give':commentGive}"></span></p>
                <p>{{item.content}}</p>
              </div>
            </li>
          </ul>
          <div class="getMore" v-if="commenListNext">
           <p @click="commentMore">加载更多<span></span></p>
          </div>
        </div>
        <div class="other">
          <p class="other_title">随便看看</p>
          <!--<goods-list :dataSource="goodsList"/>-->
        </div>
      </div>

    </V-Scroll>
    <div class="bottom">
      <p @click="guide">一键分享</p>
      <p @click="goingTo">要了</p>
    </div>
    <div class="rightBox">
      <p @click="goTop"></p>
      <p  @click="goHome"></p>
    </div>
    <div class="ruls" v-if="rulsShow" @click="rulsShow=false">
      <div class="introduce">
        <h1>{{introduce.memo}}</h1>
        <div v-html="introduce.value"></div>
      </div>
    </div>
    <div class=" priceruls" v-if="pricerulsShow" @click="pricerulsShow=false">
      <div>
        砍价规则
      </div>
    </div>
    <div class="order" v-if="orderShow" @click.stop.prevent="orderShow=false">
      <div class="orderBox" @click.stop.prevent="orderShow=true">
        <p class="piriceNum">一口果冻：<i></i><span>{{goodsListEntity.integral || ""}}</span></p>
        <p class="piriceNum">支付运费：<span>{{Postage || ""}}</span></p>
        <router-link tag="div" :to="`/myaccess/addressList?fullPath=${encodeURIComponent($route.path)}`" class="piriceNum address">
          <p class="rightText">收货地址：</p>
          <div class="piriceRight">
            <p>{{addressName}}</p>
            <p>{{address}}</p>
          </div>
          <b class="goaddress"></b>
        </router-link>
        <div class="text">
          <p >平台合作方快递上门收件后派送给您</p>
          <p >出糖后不可更改，任意违约取消扣糖20%</p>
        </div>
        <div class="orerBtn"  @click="goBuy">
          确认出({{goodsListEntity.integral || ""}})果冻
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import GoodsList from "~/goodsList/";
/* eslint-disable */
import { session } from "@/libs/utils";
import "swiper/dist/css/swiper.css";

// 获取商品详情
const getDetailUrl = "/goods/get";
// 竞拍列表
const BiddersUrl = "/auction/get/auction/detail";
// 评论列表
const commentUrl = "/comment/get/page";
// 砍价记录
const priceUrl = "goods/put/cutGoodsRecords";
// 获取商品列表
const getGoodsListUrl = "/goods/list/more";
// 查询当前用户是否对此商品
const isadmire = "/store/get/is";
// 保存/取消点赞信息数据
const admireput = "/store/put";
const noPut = "/store/put/update";
// 商品邮费
const PostageUrl = "/goods/put/buy/freight";
// 趣闲介绍
const introduceUrl = "/setting/get";
// 获取默认地址
const defaultAddress = "/tuser/get/defaultAddress";
//查看是否关注
const fansUrl = "/userfans/get/fans";
//关注 ||取消用户
const putfansUrl = "/userfans/put/fans";
// 打赏果冻
const rewardUrl = "/goods/put/reward";
// 查看打赏
const seerewardUrl = "/goods/list/page/reward";
// 下单
const buyUrl = "/goods/put/buy";
// 发布评论
const commentTextUrl = "/comment/put";
const swiperOptions = {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    type: "fraction"
  }
};

/* eslint-disable */
export default {
  name: "goodsDetails",
  mixins: [Ajax],
  data() {
    return {
      swiperOptions,
      // 商品ID
      id: this.$route.params.id,
      // 商品图片
      banners: [],
      describe: "",
      BiddersList: {},
      commenList: [],
      priceList: [],
      newTime: 0,
      goodsList: [],
      goodsdetails: {},
      goodsType: 1,
      nameDive: false,
      commentGive: false,
      commentstartPage: 0,
      goodsListEntity: {},
      commenListNext: false,
      rulsShow: false,
      pricerulsShow: false,
      commentIndex: -1,
      orderShow: false,
      userId: JSON.parse(session.getItem("user")).userId || "", //当前用户的id
      nameDiveStatus: 0, // 收藏状态
      Postage:0,   //商品邮费
      userAddress:'',//默认地址
      introduce: "", //趣闲介绍
      guanzhuText:"关注",
      rewardList:{}, // 赞赏列表
      address:'',
      addressId:"",
      phone:"",
      addressName:'',
      content: ""

    };
  },
  components: {
    swiper,
    swiperSlide,
    GoodsList
  },
  methods: {
    changeTime(time) {
      if (time) {
        var _this = this;
        var timestamp = Date.parse(new Date()),
          oldTime = new Date(time).getTime();
        _this.newTime = Math.floor((timestamp - oldTime) / 1000 / 60);
        if (_this.newTime < 60) {
          return _this.newTime + "分钟前";
        } else if (_this.newTime < 1440) {
          return Math.floor(_this.newTime / 60) + "小时前";
        } else if (_this.newTime < 43200) {
          return Math.floor(_this.newTime / 60 / 24) + "天前";
        } else {
          return time.substring(0, 10);
        }
      }
    },
    /**
     * 获取商品列表
     */
//    getGoodsList(page) {
//      page === 1 && (this.goodsList = []);
//      return this.get(getGoodsListUrl, {
//        startPage: page
//      }).then(body => {
//        this.goodsList = (this.goodsList || []).concat(body.items);
//        if (body.items.length <= 0) {
//          return false;
//        }
//        return body;
//      });
//    },
    goHome() {
      this.$router.push({ path: "/home" });
    },
    goTop() {
      this.$refs.scrollTop.scrollTo(0, 0);
    },
    // 跳转引导页
    guide() {
      this.$router.push({ path: "/guide/page" });
    },
    // 发布评论
    commentTextClick() {
      if(this.content == ""){

      }else{
        this.post(commentTextUrl, {
          content: this.content,
          goodsId: this.id,
          publishUserId: this.userId,
        }).then(body => {
          this.comment()
        });
      }
    },
    commentClick(index) {
      this.commentIndex = index;
      this.commentGive = !this.commentGive;
    },
    // 下单
    goBuy (){
      this.post(buyUrl, {
        userId: this.userId,
        goodsId: this.id,
        integral:this.goodsListEntity.integral,
        count:1,
        receiveNamestring: this.addressName,
        receivePhonestring: this.phone,
        postage: this.Postage,
        addressId: this.addressId,
        receiveAddress: this.address
      }).then(body => {
        if(body.code === 200){
          this.$router.push({ path: "/myaccess/orderDetail",params:{orderId:body.id}});
        }
      });
    },
    // 打赏商品
    rewardClick() {
      this.post(rewardUrl, {
        userId: this.userId,
        goodsId: this.id,
        rewardIntegral:1
      }).then(body => {
        this.seeReward();
      });
    },
    goingTo(){
      if(this.addressId!=undefined){
        this.orderShow=true
      }else{
        this.$router.push({ path: `/myaccess/addressList?fullPath=${encodeURIComponent(this.$route.path)}` });
      }
    },
    //查看打赏
    seeReward() {
      this.get(seerewardUrl, {
        goodsId: this.id,
        startPage:0
      }).then(body => {
        this.rewardList = body
        console.log(rewardList)
      });
    },
    //点击关注
    clickGuanzhu(){
      if(this.guanzhuText == "关注"){
        this.post(putfansUrl, {
          userId: this.userId,
          foucesUserId: this.goodsListEntity.publishUserId,
          flag:1
        }).then(body => {
          this.guanzhuText = "已关注"
        });
      }else{
        this.post(putfansUrl, {
          userId: this.userId,
          foucesUserId: this.goodsListEntity.publishUserId,
          flag:0
        }).then(body => {
          this.guanzhuText = "关注"
        });
      }
    },
    //点击收藏
    nameClick() {

      if(this.nameDiveStatus == 1){
        this.post(admireput, {
          userId: this.userId,
          relateId: this.id,
          type: 1
        }).then(body => {
            this.nameDive = !this.nameDive;
            this.nameDiveStatus = 0
        });
      }else{
        this.post(noPut, {
          userId: this.userId,
          relateId: this.id,
          type: 0
        }).then(body => {
            this.nameDive = !this.nameDive;
            this.nameDiveStatus = 1
        });
      }

    },
    comment() {
      // 评论列表
      this.get(commentUrl, {
        goodsId: this.id,
        startPage: this.commentstartPage,
        pageSize: 3
      }).then(body => {
        this.commenListNext = body.hasNextPage;
        this.commenList = (this.commenList || []).concat(body.items);
      });
    },
    commentMore() {
      this.commentstartPage++;
      this.comment();
      console.log(this.commenList);
    }
  },
  mounted() {
    this.comment();
    this.seeReward();
    // 商品详情信息
    this.get(getDetailUrl, {
      id: this.id
    }).then(body => {
      this.goodsdetails = body;
      this.goodsType = this.goodsdetails.goodsListEntity.saleTypeId;
      this.banners = this.goodsdetails.files.uploadPaths;
      this.goodsListEntity = body.goodsListEntity;
      // 查询商品邮费
      this.post(PostageUrl, {
        sellUserId: this.goodsListEntity.publishUserId,
        buyUserId: this.userId,
        goodsId: this.id
      }).then(body => {
        this.Postage = body
      });
      //查看是否关注
      this.post(fansUrl, {
        userId:this.userId,
        foucesUserId:this.goodsListEntity.publishUserId
      }).then(body => {
        if(body === 1){
          this.guanzhuText = "已关注"
        }
      });
    });
    // 竞拍列表
    this.post(BiddersUrl, {
      goodsId: this.id
    }).then(body => {
      this.BiddersList = body;
      //  alert(this.BiddersList == "")
    });
    // 砍价记录
    this.post(priceUrl, {
      goodsId: this.id,
      startPage: 0,
      pageSize: 10
    }).then(body => {
      this.priceList = body.goodCutRecordQueries;
      // console.log(this.commenList)
    });
    // 查看更多
    this.get(getGoodsListUrl, {
      startPage: 0,
      userId: this.userId
    }).then(body => {
      this.goodsList = body;
    });
    // 查询当前用户是否对此商品
    this.post(isadmire, {
      userId: this.userId,
      relateId: this.id
    }).then(body => {
      if(body > 0){
        this.nameDive = true;
        this.nameDiveStatus = 0
      }else{
        this.nameDiveStatus = 1
      }
    });

    //趣闲介绍
    this.get(introduceUrl, {
      type:0
    }).then(body => {
      this.introduce = body
    });
    if(this.$route.query.addressId!=undefined){
      this.orderShow=true;
      this.address = this.$route.query.province+this.$route.query.city+this.$route.query.address;
      this.addressId = this.$route.query.addressId;
      this.phone = this.$route.query.phone;
      this.addressName = this.$route.query.name;
    }else{
      // 获取默认地址
      this.get(defaultAddress, {
        userId: this.userId
      }).then(body => {
        this.userAddress = body
        this.address = this.userAddress.region+this.userAddress.address
        this.addressId = this.userAddress.id
        this.phone = this.userAddress.phone
        this.addressName = this.userAddress.name
      });
    }

    //  this.$nextTick(() => {
    //    this.mainHeight = this.mainHeight - this.navigationHeight;
    //  });
  }
};
</script>

<style scoped>
.banner-top {
  height: 0.73rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.banner-top span {
  font-size: 0.36rem;
  color: #000;
  line-height: 0.73rem;
  height: 0.73rem;
}

.banner-top span:nth-child(1) {
  background: #de2245;
  width: 2.2rem;
  display: inline-block;
  text-align: center;
  color: #fff;
  margin-right: 0.92rem;
}

.banner-top i {
  display: inline-block;
  width: 0.18rem;
  height: 0.73rem;
  background: url("../../images/xiangqing/beijin.png") no-repeat;
  background-size: 100%;
  position: absolute;
  left: 2.15rem;
}

.banner_img {
  width: 100%;
  height: 10.5rem;
  background: #ccc;
  position: relative;
  overflow: hidden;
}
.banner_img .pic-box {
  width: 100%;
  height: 10.5rem;
  overflow: hidden;
}
.banner_img .pic-box .pic {
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Prompt {
  width: 3.75rem;
  height: 0.73rem;
  background-color: rgba(53, 53, 53, 0.3);
  border-radius: 0.36rem;
  opacity: 0.5;
  position: absolute;
  /*top: 10rem;*/
  bottom: 1rem;
  font-size: 0.36rem;
  line-height: 0.73rem;
  text-align: center;
  left: -0.5rem;
  z-index: 100;
}

.detaTitle {
  height: 6rem;
  background: #fff;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

.deta_top {
  padding-top: 0.6rem;
  position: relative;
}

.deta_top p:nth-child(1) i {
  width: 1.21rem;
  height: 1.1rem;
  display: inline-block;
  background: url("../../images/xiangqing/bigt.png") no-repeat;
  background-size: 100%;
  margin-right: 0.2rem;
}

.deta_top p:nth-child(1) {
  font-size: 0.9rem;
  color: #de2245;
  font-family: PingFang-SC-Bold;
}

.deta_top p:nth-child(2) {
  font-size: 0.36rem;
  color: #888888;
}

.deta_top p:nth-child(3) {
  font-size: 0.36rem;
  color: #888888;
  position: absolute;
  right: 0.3rem;
  top: 0.98rem;
}

.deta_top p:nth-child(3) span {
  font-size: 0.42rem;
  color: #353535;
}

.deta_top p:nth-child(3) i {
  display: inline-block;
  width: 0.57rem;
  height: 0.57rem;
  background: url("../../images/home/ic_jelly.png") no-repeat;
  background-size: 100%;
  vertical-align: -0.1rem;
}

.deta_center {
  margin-top: 0.68rem;
  width: 9.18rem;
  position: relative;
}

.deta_center p {
  color: #353535;
  font-size: 0.54rem;
  width: 9.18;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.deta_center span {
  position: absolute;
  right: -1.5rem;
  top: 0.2rem;
}

.deta_bottom {
  margin-top: 0.72rem;
}

.deta_bottom p {
  font-size: 0.36rem;
  color: #888888;
}

.deta_bottom p span:nth-child(2) {
  margin-left: 1.36rem;
}

.deta_bottom p span:nth-child(3) {
  margin-left: 4rem;
  color: #f8aac2;
  position: relative;
}

.deta_bottom p span:nth-child(3) i {
  width: 0.17rem;
  height: 0.36rem;
  display: inline-block;
  background: url("../../images/xiangqing/goright.png") no-repeat;
  background-size: 100%;
  margin-left: 0.3rem;
  position: absolute;
  top: 0.02rem;
}

.describe {
  margin-top: 0.3rem;
  background: #fff;
  padding: 0.54rem 0.3rem;
}

.describe_title {
  width: 10.26rem;
  height: 1.17rem;
  color: #353535;
  font-size: 0.48rem;
  margin: 0 auto;
  font-family: PingFang-SC-Medium;
}

.seller {
  height: 1.31rem;
  background: #fff;
  margin-top: 0.3rem;
  padding: 0.26rem 0.3rem 0 0.3rem;
}

.seller img {
  width: 0.96rem;
  height: 0.96rem;
  overflow: hidden;
  float: left;
}

.seller_center {
  float: left;
  margin-left: 0.3rem;
}

.seller_center p:nth-child(1) {
  font-size: 0.42rem;
  color: #353535;
}

.seller_center p:nth-child(2) {
  font-size: 0.36rem;
  color: #888888;
}

.guanzhu {
  float: right;
  width: 1.69rem;
  height: 0.97rem;
  border-radius: 0.48rem;
  border: solid 1px #de2245;
  color: #de2245;
  text-align: center;
  line-height: 0.97rem;
}

.dianzan {
  height: 3.2rem;
  background: #fff;
  margin-top: 0.3rem;
  padding-top: 1.2rem;
}

.dianzan p:nth-child(1) {
  width: 3.71rem;
  height: 0.97rem;
  border-radius: 0.48rem;
  border: solid 1px #de2245;
  text-align: center;
  line-height: 0.97rem;
  margin: 0 auto;
}

.dianzan p:nth-child(2) {
  text-align: center;
  margin-top: 0.26rem;
  font-size: 0.42rem;
}

.dianzan p:nth-child(2) span {
  color: #e42647;
  margin: 0 0.2rem;
}

.priceList {
  height: auto;
  background: #fff;
  margin-top: 0.3rem;
}

.price_top {
  height: 4.25rem;
  background: url("../../images/xiangqing/tang_bg.png") no-repeat;
  background-size: 100%;
  padding-top: 0.9rem;
}

.price_top p:nth-child(1) {
  font-size: 0.52rem;
  text-align: center;
  color: #e73f63;
  font-family: PingFang-SC-Medium;
}

.price_top p:nth-child(2) {
  font-size: 0.39rem;
  text-align: center;
  color: #895a5a;
}

.price_top p:nth-child(3) {
  width: 6.22rem;
  height: 1.55rem;
  font-size: 0.54rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.27rem;
  background: url("../../images/xiangqing/btn1.png") no-repeat;
  background-size: 100%;
  line-height: 1.2rem;
  color: #fff;
}

.price_top p:nth-child(4) {
  font-size: 0.42rem;
  color: #a2512e;
  margin-left: 0.3rem;
}

.price_top p:nth-child(4) span:nth-child(2) {
  margin-left: 7rem;
  position: relative;
}

.price_top p:nth-child(4) span:nth-child(2) i {
  width: 0.17rem;
  height: 0.36rem;
  display: inline-block;
  background: url("../../images/xiangqing/goright.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
  position: absolute;
  top: 0.02rem;
}

.listStyle {
  padding: 0 0.3rem;
}

.listStyle li img {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  margin-right: 0.2rem;
}

.listStyle li {
  margin-top: 0.2rem;
  clear: both;
  padding-top: 0.2rem;
}

.listStyle li p {
  float: left;
  font-size: 0.36rem;
  line-height: 0.96rem;
}

.listStyle li p:nth-child(2) {
  width: 1.81rem;
  overflow: hidden;
}

.listStyle li p:nth-child(3) {
  color: #888888;
  margin-left: 1rem;
}

.listStyle li p:nth-child(4) {
  margin-left: 3.1rem;
}

.listStyle li p:nth-child(4) span {
  display: inline-block;
  width: 0.57rem;
  height: 0.57rem;
  vertical-align: -0.1rem;
  background: url("../../images/home/ic_jelly.png") no-repeat;
  background-size: 100%;
  margin-right: 0.2rem;
}

.listStyle li .Bidderstime {
  margin-left: 0 !important;
}

.listStyle li .Biddersnumber {
  margin-left: 0.6rem !important;
}

.listStyle li .Bidders_btn {
  width: 1.69rem;
  height: 0.97rem;
  background-color: #de2245;
  border-radius: 0.48rem;
  font-size: 0.45rem;
  text-align: center;
  line-height: 0.97rem;
  color: #fff;
  float: right;
}

.Modular_title {
  font-size: 0.42rem;
  padding: 0.55rem 0.3rem 0 0.3rem;
}

.Bidders {
  height: 6.67rem;
  background: #fff;
  margin-top: 0.3rem;
}

.Bidders .listStyle li:nth-child(1) .Biddersnumber {
  font-size: 0.72rem;
  color: #ef012d;
}

.input_top {
  padding: 0 0.3rem;
  padding-top: 0.6rem;
  height: 1rem;
}

.input_top img {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  margin-right: 0.4rem;
}

.input_top p:nth-child(2) {
  width: 6.75rem;
  height: 0.97rem;
  background-color: #f4f4f4;
  border-radius: 0.48rem;
  float: left;
  margin-right: 0.85rem;
}

.input_top p:nth-child(2) input {
  width: 5.45rem;
  height: 0.77rem;
  margin-top: 0.1rem;
  margin-left: 0.3rem;
  border: none;
  background-color: #f4f4f4;
}

.input_top p:nth-child(3) {
  width: 1.69rem;
  height: 0.97rem;
  background-color: #de2245;
  border-radius: 0.48rem;
  line-height: 0.97rem;
  text-align: center;
  color: #fff;
  font-size: 0.36rem;
  float: right;
}

.pingLun {
  background: #fff;
  margin-top: 0.3rem;
  padding-bottom: 0.3rem;
  overflow: hidden;
}

.pingList {
  padding: 0 0.3rem;
  background: #fff;
  padding-bottom: 0.5rem;
}

.pingList li {
  padding-top: 0.53rem;
  clear: both;
  background: #fff;
}

.pingList li img {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
  margin-right: 0.4rem;
  background: #fff;
}

.pingList li p:nth-child(1) {
  font-size: 0.36rem;
}

.pingList li p:nth-child(1) span:nth-child(2) {
  color: #888888;
  margin-left: 0.66rem;
}

.pingList li p:nth-child(1) span:nth-child(3) {
  float: right;
  width: 0.35rem;
  height: 0.37rem;
  display: inline-block;
}

.pingList li p:nth-child(2) {
  font-size: 0.42rem;
  margin-top: 0.1rem;
}

.pingRight {
  width: 9rem;
  float: left;
}

.other {
}

.other_title {
  margin-top: 0.55rem;
  font-size: 0.42rem;
  margin-bottom: 0.3rem;
  padding-left: 0.3rem;
}

.data-list {
  padding: 0.3rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list-item {
  display: flex;
  width: 5.18rem;
  flex-direction: column;
  background: #fff;
  margin-bottom: 0.3rem;
}

.list-item .item-pic {
  display: flex;
  position: relative;
}

.list-item .item-pic,
.pic {
  width: 5.18rem;
  height: 5.19rem;
}

.list-item .love-num {
  position: absolute;
  right: 0;
  bottom: 0.1rem;
  min-width: 1.52rem;
  height: 0.52rem;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.4);
  border-top-left-radius: 0.17rem;
  border-bottom-left-radius: 0.17rem;
  font-size: 0.36rem;
  color: #fff;
}

.list-item .love-num .icon-love {
  display: inline-block;
  width: 0.44rem;
  height: 0.37rem;
  background: url("../../images/home/dis_collect.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
  vertical-align: -1px;
}

.list-item .love-num .num {
  color: #fff;
  font-size: 0.36rem;
  font-weight: normal;
}

.list-item .name {
  font-size: 0.39rem;
  line-height: 0.5rem;
  margin: 0.26rem 0.3rem;
  letter-spacing: -0.008rem;
  color: #353535;
}

.list-item .dec-goods {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.3rem 0.5rem;
}

.list-item .dec-goods .price-num,
.list-item .dec-goods .user-info {
  display: flex;
  align-items: center;
}

.list-item .dec-goods .price-num .icon-currency {
  width: 0.57rem;
  height: 0.57rem;
  background: url("../../images/home/ic_jelly.png") no-repeat;
  background-size: 100%;
}

.list-item .dec-goods .price-num .num {
  font-size: 0.54rem;
  font-size: 0.54rem;
  margin-left: 0.12rem;
  color: #de2245;
}

.list-item .dec-goods .user-info .city {
  color: #888;
  font-size: 0.36rem;
  margin-right: 0.16rem;
}

.list-item .dec-goods .user-info .user-pic {
  width: 0.49rem;
  height: 0.49rem;
  border-radius: 200px;
  background-color: #f8aac2;
}

.bottom {
  background: #fff;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
}
.bottom p {
  margin: 0.07rem 0;
}
.bottom p:nth-child(1) {
  width: 5.13rem;
  height: 1.33rem;
  border-radius: 0.66rem;
  border: solid 1px #de2245;
  text-align: center;
  float: left;
  line-height: 1.33rem;
  color: #de2245;
  font-size: 0.54rem;
}

.bottom p:nth-child(2) {
  width: 5.13rem;
  height: 1.33rem;
  background-color: #de2245;
  border-radius: 0.66rem;
  border: solid 1px #de2245;
  text-align: center;
  float: left;
  line-height: 1.33rem;
  color: #fff;
  font-size: 0.54rem;
  margin-left: 0.24rem;
}

.rightBox {
  position: fixed;
  width: 1.08rem;
  height: 2.36rem;
  bottom: 2.05rem;
  right: 0.3rem;
  border-radius: 0.76rem;
  border: solid 1px #de2245;
  background: #fff;
}

.rightBox p {
  width: 0.62rem;
  height: 0.62rem;
}

.rightBox p:nth-child(1) {
  background: url("../../images/xiangqing/go_top.png") no-repeat;
  background-size: 100%;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}

.rightBox p:nth-child(2) {
  background: url("../../images/xiangqing/gohome.png") no-repeat;
  background-size: 100%;
  margin-top: 0.7rem;
  margin-left: 0.2rem;
}

.describeText {
  font-size: 0.42rem;
  color: #666666;
}
.banner_img img {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  width: 1.08rem;
  height: 0.73rem;
  background-color: rgba(53, 53, 53, 0.5);
  border-radius: 0.36rem;
  opacity: 0.5;
  font-size: 0.36rem;
  color: #fff;
  line-height: 0.7rem;
  text-align: center;
  position: absolute;
  left: 10rem;
  bottom: 0.7rem;
}
.nozan {
  width: 0.53rem;
  height: 0.53rem;
  background: url("../../images/userInfos/heart-icon.png") no-repeat;
  background-size: 100%;
}
.give {
  background: url("../../images/userInfos/heart-selected-icon.png") no-repeat;
  background-size: 100%;
}
.getMore {
  height: 0.52rem;
  background: #fff;
  clear: both;
  margin-top: 1.2rem;
}
.getMore p {
  color: #f8aac2;
  font-size: 0.36rem;
  line-height: 0.48rem;
  text-align: center;
}
.getMore p span {
  width: 0.36rem;
  height: 0.17rem;
  display: inline-block;
  background: url("../../images/home/leftDown-icon.png") no-repeat;
  background-size: 100%;
  margin-left: 0.1rem;
}
.introduce {
  width: 100%;
  height: 8.26rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 0 0.5rem;
}
.introduce h1 {
  font-size: 0.45rem;
  margin-top: 0.5rem;
  border-bottom: solid 1px #F4F4F4;
  height: 1rem;
  width: 10.33rem;
  font-weight: normal;
  margin-bottom: .2rem;
}
.ruls {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.priceruls,.order {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.priceruls div {
  width: 5rem;
  height: 7rem;
  background: #fff;
  border-radius: 10%;
  margin: 0 auto;
  margin-top: 50%;
}
  .orderBox{
    width: 100%;
    height: 9.69rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    z-index: 1000;
  }
  .piriceNum{
    height: 1.33rem;
    border-bottom: solid 1px #F4F4F4;
    padding-left: .4rem;
    line-height: 1.33rem;
    font-size: .45rem;
  }
  .piriceNum span {
    color: #DE2245;
  }
  .piriceNum i{
    display: inline-block;
    width: 0.57rem;
    height: 0.57rem;
    background: url("../../images/home/ic_jelly.png") no-repeat;
    background-size: 100%;
    vertical-align: -0.1rem;
  }
  .address{
    padding-bottom: .2rem;
    position: relative;
    height: auto;
    overflow: hidden;
  }
  .rightText{
    float: left;
  }
  .piriceRight{
    float: left;
    width: 7.9rem;
    line-height: .8rem;
    font-size: .4rem;
  }
  .text p{
    text-align: center;
    line-height: .8rem;
    font-size: .45rem;
    color: #888888;
  }
  .text{
    margin-top: .6rem;
  }
  .orerBtn{
    width: 10.05rem;
    height: 1.32rem;
    background-color: #de2245;
    border-radius: 66px;
    text-align: center;
    line-height: 1.32rem;
    font-size: .54rem;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: .6rem;
  }
  .goaddress{
    width: 0.17rem;
    height: 0.36rem;
    display: inline-block;
    background: url("../../images/xiangqing/goright.png") no-repeat;
    background-size: 100%;
    right: .5rem;
    position: absolute;
    top: 45%;
  }
  .dianzanList img{
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
    margin-left: .3rem;
    display: inline-block;
  }
  .dianzanList{
    text-align: center;
    margin-top: .2rem;
  }
</style>
