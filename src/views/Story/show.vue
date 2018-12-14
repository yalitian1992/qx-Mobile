<template>
  <!--eslint-disable -->
  <div class="warpdiv">
    <V-Scroll :scroll-height="`${mainHeight}px`" ref="scrollTop">
      <div class="warp">
        <div class="banner_img">
          <!--<img :src="goodsList.goodsListEntity.cover" alt="">-->
          <swiper class="slide-box" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in banners" :key="index">
              <img :src="item.img" width="100%"   :alt="item" style="overflow: hidden;max-height: 10.5rem" >
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="describe">
          <p class="describe_title">
            {{goodsdetails.storyTitle}}
          </p>
          <div class="describeText">
            {{goodsdetails.content}}
          </div>
        </div>
        <div class="seller">
          <img :src="goodsdetails.fromUrl" alt=""/>
          <div class="seller_center">
            <p>{{goodsdetails.fromName}}</p>
            <p>{{goodsListEntity.city}}</p>
          </div>
          <div class="guanzhu" @click="guide">
            关注
          </div>
        </div>
        <div class="dianzan">
          <p @click="guide">赞赏1个果冻</p>
          <p>当前已收到 <span>15</span>个果冻</p>
          <div class="dianzanList">
          </div>
        </div>
        <div class="priceList">
          <div class="price_top">
            <p>随机减果冻，最高0果冻白拿</p>
            <p>邀请好友，随机立减</p>
            <p @click="guide">立即邀请好友砍价</p>
            <p><span>砍价记录</span><span @click="pricerulsShow=true">砍价规则<i></i></span></p>
          </div>
          <ul class="listStyle"  v-if="false">
            <li v-for="(item, index) in priceList" :key="index">
              <img :src="item.avatar" alt="item.avatar"/>
              <p>{{item.nickName}}</p>
              <p>changeTime(item.createTime)出价</p>
              <p><span></span>{{item.number}}</p>
            </li>
          </ul>
        </div>
        <div class="Bidders"  v-if="false"><!--v-if="BiddersList!=''"-->
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
            <img src="../../images/send.png" alt=""/>
            <p><input type="text" placeholder="说点什么"/></p>
            <p @click="guide">发布</p>
          </div>
          <ul class="pingList" v-if="commenList!=''">
            <li v-for="(item, index) in commenList" :key="index">
              <img :src="item.userAvatar" alt=""/>
              <div class="pingRight">
                <p><span>{{item.userName}}</span><span>{{changeTime(item.time)}}</span><span :class="{'nozan':true, 'give':commentGive}" @click="guide"></span></p>
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
          <goods-list :dataSource="goodsList"/>
        </div>
      </div>

    </V-Scroll>
    <div class="bottom">
      <p @click="guide">一键分享</p>
      <p @click="guide">赞赏一颗糖</p>
    </div>
    <div class="rightBox">
      <p @click="goTop"></p>
      <p  @click="goHome"></p>
    </div>
    <div class="ruls" v-if="rulsShow" @click="rulsShow=false">
      <div class="introduce">
        <h1>娶闲介绍</h1>
        <div>描述</div>
      </div>
    </div>
    <div class=" priceruls" v-if="pricerulsShow" @click="pricerulsShow=false">
      <div>
        砍价规则
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import GoodsList from "~/goodsList/";
/* eslint-disable */
import "swiper/dist/css/swiper.css";

// 获取故事详情
const getStoryUrl = "/story/get/story/detail";
// 竞拍列表
const BiddersUrl = "/auction/get/auction/detail";
// 评论列表
const commentUrl = "/comment/get/page";
// 砍价记录
/* eslint no-unused-vars: "off" */
const priceUrl = "goods/put/cutGoodsRecords";
// 获取商品列表
const getGoodsListUrl = "/goods/list/more";
const swiperOptions = {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    type: "fraction"
  },
  autoplay: true
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
      goodsdetails:{},
      goodsType:1,
      nameDive:false,
      commentGive:false,
      commentstartPage:0,
      goodsListEntity:{},
      commenListNext:false,
      rulsShow: false,
      pricerulsShow:false,
      commentIndex: -1
    };
  },
  components: {
    swiper,
    swiperSlide,
    GoodsList
  },
  methods: {
    changeTime(time) {
      if(time){
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
          return time.substring(0, 10)
        }
      }
    },
    /**
     * 获取商品列表
     */
    getGoodsList(page) {
      page === 1 && (this.goodsList = []);
      return this.get(getGoodsListUrl, {
        startPage: page,
      }).then(body => {
        this.goodsList = (this.goodsList || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    },
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
    commentClick(index) {
      this.commentIndex = index
      this.commentGive = !this.commentGive
    },
    nameClick() {
      this.nameDive = !this.nameDive
    },
    comment(){
      // 评论列表
      this.get(commentUrl, {
        goodsId: this.id,
        startPage: this.commentstartPage,
        pageSize: 3,
      }).then(body => {
        this.commenListNext = body.hasNextPage;
        this.commenList = (this.commenList || []).concat(body.items);
      })
    },
    commentMore(){
      this.commentstartPage++;
      this.comment()
      console.log(this.commenList)
    }
  },
  mounted() {
//    this.comment()
    // 商品详情信息
    this.post(getStoryUrl, {
      storyId: "998503770083442688",
    }).then(body => {
      this.goodsdetails = body;
      this.goodsType = this.goodsdetails.goodsListEntity.saleTypeId
      this.banners = this.goodsdetails.urls
      this.goodsListEntity = body.goodsListEntity

    });
    // 竞拍列表
    this.post(BiddersUrl, {
      goodsId: this.id,
    }).then(body => {
      this.BiddersList = body;
      //  alert(this.BiddersList == "")
    });

    // 砍价记录
//    this.post(priceUrl, {
//      goodsId: this.id,
//      startPage: 0,
//      pageSize: 10,
//    }).then(body => {
//      this.priceList = body.goodCutRecordQueries;
//      // console.log(this.commenList)
//    });
    // 查看更多
    this.get(getGoodsListUrl, {
      startPage: 0,
      userId: null
    }).then(body => {
      this.goodsList = body;
    });
    //  this.$nextTick(() => {
    //    this.mainHeight = this.mainHeight - this.navigationHeight;
    //  });
  }
};
</script>

<style scoped>
  .banner-top {
    height: .73rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .banner-top span {
    font-size: .36rem;
    color: #000;
    line-height: .73rem;
    height: .73rem;
  }

  .banner-top span:nth-child(1) {
    background: #de2245;
    width: 2.2rem;
    display: inline-block;
    text-align: center;
    color: #fff;
    margin-right: .92rem;
  }

  .banner-top i {
    display: inline-block;
    width: .18rem;
    height: .73rem;
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
  }

  .Prompt {
    width: 3.75rem;
    height: .73rem;
    background-color: rgba(53, 53, 53, 0.3);
    border-radius: .36rem;
    opacity: 0.5;
    position: absolute;
    /*top: 10rem;*/
    bottom: 1rem;
    font-size: .36rem;
    line-height: .73rem;
    text-align: center;
    left: -.5rem;
    z-index: 100;
  }

  .detaTitle {
    height: 6rem;
    background: #fff;
    padding-left: .3rem;
    padding-right: .3rem;
  }

  .deta_top {
    padding-top: .6rem;
    position: relative;
  }

  .deta_top p:nth-child(1) i {
    width: 1.21rem;
    height: 1.1rem;
    display: inline-block;
    background: url("../../images/xiangqing/bigt.png") no-repeat;
    background-size: 100%;
    margin-right: .2rem;
  }

  .deta_top p:nth-child(1) {
    font-size: .9rem;
    color: #de2245;
    font-family: PingFang-SC-Bold;
  }

  .deta_top p:nth-child(2) {
    font-size: .36rem;
    color: #888888;
  }

  .deta_top p:nth-child(3) {
    font-size: .36rem;
    color: #888888;
    position: absolute;
    right: .3rem;
    top: .98rem;
  }

  .deta_top p:nth-child(3) span {
    font-size: .42rem;
    color: #353535;
  }

  .deta_top p:nth-child(3) i {
    width: .56rem;
    height: .31rem;
    display: inline-block;
    background: url("../../images/xiangqing/smallt.png") no-repeat;
    background-size: 100%;
  }

  .deta_center {
    margin-top: .68rem;
    width: 9.18rem;
    position: relative;
  }

  .deta_center p {
    color: #353535;
    font-size: .54rem;
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
    top: .2rem;
  }

  .deta_bottom {
    margin-top: .72rem;
  }

  .deta_bottom p {
    font-size: .36rem;
    color: #888888;
  }

  .deta_bottom p span:nth-child(2) {
    margin-left: 1.36rem;
  }

  .deta_bottom p span:nth-child(3) {
    margin-left: 4.34rem;
    color: #f8aac2;
    position: relative;
  }

  .deta_bottom p span:nth-child(3) i {
    width: .17rem;
    height: .36rem;
    display: inline-block;
    background: url("../../images/xiangqing/goright.png") no-repeat;
    background-size: 100%;
    margin-left: .3rem;
    position: absolute;
    top: .02rem;
  }

  .describe {
    margin-top: .3rem;
    background: #fff;
    padding: .54rem .3rem;
  }

  .describe_title {
    width: 10.26rem;
    height: 1.17rem;
    color: #353535;
    font-size: .48rem;
    margin: 0 auto;
    font-family: PingFang-SC-Medium;
  }

  .seller {
    height: 1.31rem;
    background: #fff;
    margin-top: .3rem;
    padding: .26rem .3rem 0 .3rem;
  }

  .seller img {
    width: .96rem;
    height: .96rem;
    overflow: hidden;
    float: left;
  }

  .seller_center {
    float: left;
    margin-left: .3rem;
  }

  .seller_center p:nth-child(1) {
    font-size: .42rem;
    color: #353535;
  }

  .seller_center p:nth-child(2) {
    font-size: .36rem;
    color: #888888;
  }

  .guanzhu {
    float: right;
    width: 1.69rem;
    height: .97rem;
    border-radius: .48rem;
    border: solid 1px #de2245;
    color: #de2245;
    text-align: center;
    line-height: .97rem;
  }

  .dianzan {
    height: 3.82rem;
    background: #fff;
    margin-top: .3rem;
    padding-top: 1.2rem;
  }

  .dianzan p:nth-child(1) {
    width: 3.71rem;
    height: .97rem;
    border-radius: .48rem;
    border: solid 1px #de2245;
    text-align: center;
    line-height: .97rem;
    margin: 0 auto;
  }

  .dianzan p:nth-child(2) {
    text-align: center;
    margin-top: .26rem;
    font-size: .42rem;
  }

  .dianzan p:nth-child(2) span {
    color: #e42647;
    margin: 0 .2rem;
  }

  .priceList {
    height: auto;
    background: #fff;
    margin-top: .3rem;
  }

  .price_top {
    height: 4.25rem;
    background: url("../../images/xiangqing/tang_bg.png") no-repeat;
    background-size: 100%;
    padding-top: .9rem;
  }

  .price_top p:nth-child(1) {
    font-size: .52rem;
    text-align: center;
    color: #E73F63;
    font-family: PingFang-SC-Medium;
  }

  .price_top p:nth-child(2) {
    font-size: .39rem;
    text-align: center;
    color: #895a5a;
  }

  .price_top p:nth-child(3) {
    width: 6.22rem;
    height: 1.55rem;
    font-size: .54rem;
    text-align: center;
    margin: 0 auto;
    margin-top: .27rem;
    background: url("../../images/xiangqing/btn1.png") no-repeat;
    background-size: 100%;
    line-height: 1.2rem;
    color: #fff;
  }

  .price_top p:nth-child(4) {
    font-size: .42rem;
    color: #a2512e;
    margin-left: .3rem;
  }

  .price_top p:nth-child(4) span:nth-child(2) {
    margin-left: 7rem;
    position: relative;
  }

  .price_top p:nth-child(4) span:nth-child(2) i {
    width: .17rem;
    height: .36rem;
    display: inline-block;
    background: url("../../images/xiangqing/goright.png") no-repeat;
    background-size: 100%;
    margin-left: .2rem;
    position: absolute;
    top: .02rem;
  }

  .listStyle {
    padding: 0 .3rem;
  }

  .listStyle li img {
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: .2rem;
  }

  .listStyle li {
    margin-top: .2rem;
    clear: both;
    padding-top: .2rem;
  }

  .listStyle li p {
    float: left;
    font-size: .36rem;
    line-height: .96rem;
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
    margin-right: .2rem;
  }

  .listStyle li .Bidderstime {
    margin-left: 0 !important;
  }

  .listStyle li .Biddersnumber {
    margin-left: .6rem !important;
  }

  .listStyle li .Bidders_btn {
    width: 1.69rem;
    height: .97rem;
    background-color: #de2245;
    border-radius: .48rem;
    font-size: .45rem;
    text-align: center;
    line-height: .97rem;
    color: #fff;
    float: right;
  }

  .Modular_title {
    font-size: .42rem;
    padding: .55rem .3rem 0 .3rem;
  }

  .Bidders {
    height: 6.67rem;
    background: #fff;
    margin-top: .3rem;
  }

  .Bidders .listStyle li:nth-child(1) .Biddersnumber {
    font-size: .72rem;
    color: #ef012d;
  }

  .input_top {
    padding: 0 .3rem;
    padding-top: .6rem;
    height: 1rem;
  }

  .input_top img {
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: .4rem;
  }

  .input_top p:nth-child(2) {
    width: 6.75rem;
    height: .97rem;
    background-color: #f4f4f4;
    border-radius: .48rem;
    float: left;
    margin-right: .85rem;
  }

  .input_top p:nth-child(2) input {
    width: 5.45rem;
    height: .77rem;
    margin-top: .1rem;
    margin-left: .3rem;
    border: none;
    background-color: #f4f4f4;
  }

  .input_top p:nth-child(3) {
    width: 1.69rem;
    height: .97rem;
    background-color: #de2245;
    border-radius: .48rem;
    line-height: .97rem;
    text-align: center;
    color: #fff;
    font-size: .36rem;
    float: right;
  }

  .pingLun {
    background: #fff;
    margin-top: .3rem;
    padding-bottom: .3rem;
    overflow: hidden;
  }

  .pingList {
    padding: 0 .3rem;
    background: #fff;
    padding-bottom: .5rem;
  }

  .pingList li {
    padding-top: .53rem;
    clear: both;
    background: #fff;
  }

  .pingList li img {
    width: .96rem;
    height: .96rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: .4rem;
    background: #fff;
  }

  .pingList li p:nth-child(1) {
    font-size: .36rem;
  }

  .pingList li p:nth-child(1) span:nth-child(2) {
    color: #888888;
    margin-left: .66rem;
  }

  .pingList li p:nth-child(1) span:nth-child(3) {
    float: right;
    width: .35rem;
    height: .37rem;
    display: inline-block;
  }

  .pingList li p:nth-child(2) {
    font-size: .42rem;
    margin-top: .1rem;
  }

  .pingRight {
    width: 9rem;
    float: left;
  }

  .other {
  }

  .other_title {
    margin-top: .55rem;
    font-size: .42rem;
    margin-bottom: .3rem;
    padding-left: .3rem;
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
    height: 1.47rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 .3rem;
  }

  .bottom p:nth-child(1) {
    width: 5.13rem;
    height: 1.33rem;
    border-radius: .66rem;
    border: solid 1px #de2245;
    text-align: center;
    float: left;
    line-height: 1.33rem;
    color: #de2245;
    font-size: .54rem;
  }

  .bottom p:nth-child(2) {
    width: 5.13rem;
    height: 1.33rem;
    background-color: #de2245;
    border-radius: .66rem;
    border: solid 1px #de2245;
    text-align: center;
    float: left;
    line-height: 1.33rem;
    color: #fff;
    font-size: .54rem;
    margin-left: .24rem;
  }

  .rightBox {
    position: fixed;
    width: 1.08rem;
    height: 2.36rem;
    bottom: 2.05rem;
    right: .3rem;
    border-radius: .76rem;
    border: solid 1px #de2245;
    background: #fff;
  }

  .rightBox p {
    width: .62rem;
    height: .62rem;
  }

  .rightBox p:nth-child(1) {
    background: url("../../images/xiangqing/go_top.png") no-repeat;
    background-size: 100%;
    margin-top: .2rem;
    margin-left: .2rem;
  }

  .rightBox p:nth-child(2) {
    background: url("../../images/xiangqing/gohome.png") no-repeat;
    background-size: 100%;
    margin-top: .7rem;
    margin-left: .2rem;
  }

  .describeText {
    font-size: .42rem;
    color: #666666;
  }
  .banner_img img{
    width: 100%;
    height: 100%;
  }
  .swiper-pagination{
    width: 1.08rem;
    height: .73rem;
    background-color: rgba(53, 53, 53, 0.5);
    border-radius: .36rem;
    opacity: 0.5;
    font-size: .36rem;
    color: #fff;
    line-height: .7rem;
    text-align: center;
    position: absolute;
    left: 10rem;
    bottom: .7rem;
  }
  .nozan{
    width: .53rem;
    height: .53rem;
    background: url("../../images/xiangqing/notzan.png") no-repeat;
    background-size: 100%;
  }
  .give{
    background: url("../../images/xiangqing/give.png") no-repeat;
    background-size: 100%;
  }
  .getMore{
    height: .52rem;
    background: #fff;
    clear: both;
    margin-top: 1.2rem;
  }
  .getMore p{
    color: #f8aac2;
    font-size: .36rem;
    line-height: .48rem;
    text-align: center;
  }
  .getMore p span{
    width: .36rem;
    height: .17rem;
    display: inline-block;
    background: url("../../images/home/leftDown-icon.png") no-repeat;
    background-size: 100%;
    margin-left: .1rem;
  }
  .introduce{
    width: 100%;
    height: 12.26rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    padding: 0 .5rem;
  }
  .introduce h1{
    font-size: .45rem;
    margin-top: .5rem;
    border-bottom: solid 1px #888888;
    height: 1rem;
    width: 10.33rem;
  }
  .ruls{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .priceruls{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .priceruls div{
    width: 5rem;
    height: 7rem;
    background: #fff;
    border-radius: 10%;
    margin: 0 auto;
    margin-top: 50%;
  }
</style>
