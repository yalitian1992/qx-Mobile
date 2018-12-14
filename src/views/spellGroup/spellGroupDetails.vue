<template>
  <V-Scroll ref="detailsScroll" :isPullDown="false" :scroll-height="`${mainHeight}px`" :pulldown="getMoreGoodsList" :on-scroll-bottom="getMoreGoodsList">
    <div class="slide">
      <swiper class="slide-box" :options="swiperOptions">
        <swiper-slide>
          <img v-gallery="details.groupBuyGoodsVo.goodsName" :src="details.groupBuyGoodsVo.goodsUrl" class="pic" :alt="details.groupBuyGoodsVo.goodsName">
        </swiper-slide>
        <div style="position: absolute;right: 0.3rem;bottom: 0.29rem;z-index:9000;" class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="goods-des item-block">
      <div class="goods-new-time" v-if="false">
        <span class="tip">每日上新：10点、20点</span>
        <span class="goods-num">共10件宝贝，还剩5件可抢</span>
      </div>
      <div class="goods-title">
        <span>{{details.groupBuyGoodsVo.goodsBuyName}}</span>
      </div>
      <div class="info">
        <span>{{details.groupBuyGoodsVo.description}}</span>
      </div>
    </div>
    <div class="user-box item-block" v-if="false">
      <img class="pic" src="https://card-87.zuanliantech.com/resources/998944330443268096.jpg" alt="头像">
      <span class="user-city">上海</span>
    </div>
    <div class="introduction item-block">
      <div class="gamesPlayed item">
        <span class="title">拼团玩法</span>
        <div class="content">
          <div class="num-list">
            <span class="num">1</span>
            <span class="line"></span>
            <span class="num">2</span>
            <span class="line"></span>
            <span class="num">3</span>
          </div>
          <div class="rules-info">
            <span v-html="firstValue"></span>
            <span v-html="twoValue"></span>
            <span v-html="twoValue"></span>
          </div>
        </div>
      </div>
      <div class="spellGroup-rules item">
        <span class="title">拼团规则</span>
        <div class="rules-info" v-html="rule"></div>
      </div>
    </div>
    <div class="receive-list">
      <div class="title">领取列表<em class="text">({{details.groupBuyUserVos.length}}位)</em></div>
      <V-Scroll v-if="details.groupBuyUserVos.length > 0" :isList="false" scroll-height="4.5rem" >
        <ul class="list-group">
          <li class="list-item" v-for="(item, index) in details.groupBuyUserVos" :key="index">
            <img :src="item.userUrl" class="pic" :alt="item.userName">
            <div class="user-info">
              <span class="name">{{item.userName}}</span>
              <span class="city">{{item.userRegion}}</span>
            </div>
            <span class="time">{{item.time | transformation}}</span>
            <span class="receive-num">{{item.count}}件</span>
          </li>
        </ul>
      </V-Scroll>
      <div v-else class="notReceive">暂无领取</div>
    </div>
    <div class="comment-box item-block">
      <span class="title">评论</span>
      <router-link tag="div" to="/guide/page" class="comment">
        <img src="../../images/send.png" class="pic" alt="头像">
        <input type="text" class="comment-input" placeholder="说点什么...">
        <button class="commit" type="button">发布</button>
      </router-link>
      <V-Scroll v-show="commentList.length > 0" scroll-height="5.5rem" :pulldown="getCommentList" :on-scroll-bottom="getCommentList" >
        <ul class="list-group">
          <li class="list-item" v-for="(item, index) in commentList" :key="index">
            <img :src="item.userAvatar" class="pic" :alt="item.userName">
            <div class="item-info">
              <div class="user-or-time">
                <span class="name">{{item.userName}}</span>
                <span class="time">{{item.time | transformation}}</span>
                <span class="icon-praise"></span>
              </div>
              <span class="info">{{item.content}}</span>
            </div>
          </li>
        </ul>
      </V-Scroll>
      <div v-if="commentList.length <= 0" class="notReceive">暂无评论</div>
    </div>
    <goods-list :dataSource="dataList" />
  </V-Scroll>
</template>

<script>
import GoodsList from "~/goodsList/";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Ajax from "@/mixins/ajax";

// 获取拼团详情Url
const getGoodsDetailsUrl = "/groupbuy/get/bookingDetail";
// 获取评论列表Url
const getCommentListUrl = "/comment/get/page";
// 获取规则Url
const getSettingUrl = "/setting/get";
// 获取更多相关商品
const getMoreGoodsListUrl = "/goods/list/more";

const swiperOptions = {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    renderFraction: (currentClass, totalClass) =>
      `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
  },
  autoplay: true
};

export default {
  name: "SpellGroupDetails",
  mixins: [Ajax],
  components: {
    swiper,
    swiperSlide,
    GoodsList
  },
  data() {
    return {
      swiperOptions,
      banners: [],
      dataList: [],
      // 详情数据
      details: {
        groupBuyGoodsVo: {},
        groupBuyUserVos: []
      },
      // 评论列表
      commentList: [],
      // 规则1
      firstValue: "",
      // 规则2
      twoValue: "",
      // 规则3
      lastValue: "",
      // 规则 5
      rule: ""
    };
  },
  mounted() {
    // 获取轮播图
    // this.getSlideList(2).then(body => {
    //   const { banners } = body;
    //   this.banners = banners;
    // });
    // 获取详情
    this.getGoodsDetails();
    // 获取规则列表
    this.getRules(4);
    this.getRules(11);
    this.getRules(12);
    this.getRules(5);
  },
  methods: {
    getRules(type) {
      this.get(getSettingUrl, { type }).then(body => {
        switch (type) {
          case 4:
            this.firstValue = body.value;
            break;
          case 5:
            this.rule = body.value;
            break;
          case 11:
            this.twoValue = body.value;
            break;
          case 12:
            this.lastValue = body.value;
            break;
          default:
            break;
        }
      });
    },
    getMoreGoodsList(page) {
      /* eslint no-unused-expressions: "off" */
      page === 0 && (this.dataList = []);
      return this.get(getMoreGoodsListUrl, {
        startPage: page,
        userId: ""
      }).then(body => {
        this.dataList = (this.dataList || []).concat(body);
        if (body.length <= 0) {
          return false;
        }
        return body;
      });
    },
    /**
     * 获取当前商品评论列表
     */
    getCommentList(page) {
      const { id } = this.$route.params;
      /* eslint no-unused-expressions: "off" */
      page === 0 && (this.commentList = []);
      return this.get(getCommentListUrl, {
        startPage: page,
        pageSize: 5,
        goodsId: id
      }).then(body => {
        this.commentList = (this.commentList || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    },
    /**
     * 获取拼团详情数据
     */
    getGoodsDetails() {
      const { id } = this.$route.params;
      this.get(getGoodsDetailsUrl, {
        groupBuyId: id
      }).then(body => {
        this.details = body;
        this.$nextTick(() => {
          this.$refs.detailsScroll.refresh();
        });
      });
    }
  }
};
</script>

<style scoped>
.slide {
  background: #fff;
  position: relative;
}
.slide,
.slide-box {
  height: 11.25rem;
  overflow: hidden;
}
.slide-box .pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-pagination {
  position: absolute;
  right: 0.3rem;
  bottom: 0.29rem;
  min-width: 1.08rem;
  max-width: 2rem;
  height: 0.73rem;
  background-color: rgba(53, 53, 53, 0.2);
  border-radius: 0.36rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 0.36rem;
}
.goods-des {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.45rem;
  font-size: 0.42rem;
  color: #353535;
}
.goods-des .goods-new-time {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.62rem;
}
.goods-des .goods-new-time .tip {
  width: 4.94rem;
  height: 0.81rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #de2245;
  border-radius: 0.405rem;
  color: #fff;
}
.goods-des .goods-new-time .goods-num {
  white-space: nowrap;
  color: #888;
}
.goods-des .goods-title {
  margin-bottom: 0.61rem;
  font-size: 0.54rem;
  color: #000;
}
.goods-des .info {
  line-height: 1.5;
}
.user-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: #353535;
  font-size: 0.42rem;
  height: 1.44rem;
}
.user-box .pic {
  width: 0.96rem;
  height: 0.96rem;
  border-radius: 200px;
  margin-right: 0.3rem;
}
.introduction {
  display: flex;
  flex-direction: column;
}
.introduction .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.48rem;
  color: #000;
}
.gamesPlayed {
  margin: 0.45rem 0;
}
.gamesPlayed .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.83rem;
  font-size: 0.42rem;
}
.gamesPlayed .content .num-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.89rem;
  margin-bottom: 0.3rem;
}
.gamesPlayed .content .num-list .num {
  width: 0.78rem;
  height: 0.78rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #de2245;
  border-radius: 200px;
}
.gamesPlayed .content .num-list .line {
  width: 25%;
  flex-grow: 1;
  height: 2px;
  background-color: rgba(222, 34, 69, 0.5);
}
.gamesPlayed .content .rules-info {
  width: 118%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.42rem;
}
.spellGroup-rules {
  padding: 0.46rem 0;
}
.spellGroup-rules .title {
  margin-bottom: 0.46rem;
}
.receive-list {
  padding: 0.44rem 0;
  font-size: 0.48rem;
  color: #000;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.3rem;
}
.notReceive {
  align-self: center;
  padding: 0.5rem 0;
}
.receive-list .title {
  margin-bottom: 0.3rem;
  padding: 0 0.45rem;
}
.receive-list .title .text {
  color: #de2245;
}
.receive-list .list-group {
  padding: 0 0.45rem;
}
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.42rem;
}
.list-item .pic {
  width: 1.2rem;
  max-height: 1.2rem;
  border-radius: 200px;
  margin-right: 0.3rem;
}
.list-item .user-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-item .user-info .name {
  color: #353535;
  margin-bottom: 0.25rem;
}
.list-item .user-info .city {
  color: #888;
}
.list-item .time {
  margin-right: 0.6rem;
  color: #888;
}
.list-item .receive-num {
  color: #888;
}
/* 评论 */
.list-item .item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.list-item .item-info .user-or-time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.24rem;
  font-size: 0.36rem;
}
.list-item .item-info .user-or-time .time {
  flex-grow: 1;
  margin-left: 0.57rem;
}
.list-item .item-info .info {
  line-height: 1.5;
}
.list-item .icon-praise {
  width: 0.35rem;
  height: 0.37rem;
  background: url("../../images/xiangqing/notzan.png") no-repeat;
  background-size: 100%;
}

.comment-box {
  display: flex;
  flex-direction: column;
  font-size: 0.42rem;
}
.comment-box .title {
  font-size: 0.48rem;
  margin-bottom: 0.46rem;
}
.comment-box .comment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.49rem;
}

.comment-box .comment .pic {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 200px;
  margin-right: 0.3rem;
}
.comment-box .comment .comment-input {
  flex-grow: 1;
  height: 0.96rem;
  background: #f4f4f4;
  border-radius: 0.48rem;
  padding: 0 0.47rem;
  border: none;
}
.comment-box .comment .commit {
  width: 1.68rem;
  height: 0.96rem;
  background-color: #de2245;
  border-radius: 0.48rem;
  margin-left: 0.3rem;
  color: #fff;
}
.item-block {
  padding-left: 0.45rem;
  padding-right: 0.45rem;
  margin-bottom: 0.3rem;
  background: #fff;
}
</style>
