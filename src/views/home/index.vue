<template>
	<!--eslint-disable -->
  <div class="home-content">
    <V-Scroll ref="mainScroll" @scroll="handleScrollMove" :scroll-height="`${mainHeight}px`" :pulldown="getGoodsList" :on-scroll-bottom="getGoodsList">
      <div class="tit">
        <div class="search-info">
          <router-link to="/search/list" tag="div" class="search">
            <span class="icon-search"></span>
            <span>闲置互赠，有用有趣！</span>
          </router-link>
          <span v-if="userId">您有{{integral}}个果冻，可白拿{{userBuyGoodsCount}}件宝贝</span>
        </div>
        <div class="currency-icon">
          <img src="../../images/home/currency.png" height="50" width="50" alt="">
          <span class="currency-des">点我赚果冻</span>
        </div>
      </div>
      <!-- 可能认识的人 -->
      <div class="friends" v-if="userId" >
        <div class="friends-content">
          <V-Scroll scroll-width="9rem" scroll-height="1.7rem" :hideXBar="true" scroll-direction="X" :isList="false">
            <ul class="friends-list">
              <li
                class="friends-item"
                v-for="(item, index) in userFollowerList"
                :key="index"
                @click="handleFriendsItem(item)"
              >
                <div class="head-portrait">
                  <img :src="item.avatar" class="user-img" :alt="item.name">
                  <span class="push">+</span>
                </div>
                <span class="name">{{item.name}}</span>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
              <li class="friends-item">
                <div class="head-portrait">
                  <img src="../../images/home/release-goods.png" class="user-img" alt="这是啥">
                  <span class="push">+</span>
                </div>
              </li>
            </ul>
          </V-Scroll>
          <div class="friends-release-goods">
            <span class="his-goods-icon"></span>
          </div>
        </div>
      </div>
      <!-- 幻灯片 -->
      <div class="slide">
        <swiper class="slide-box" :options="swiperOptions">
          <swiper-slide v-for="(item, index) in banners" :key="index">
            <img :src="item.src" width="100%" :alt="item.title">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="menu-list">
        <div class="list-box" >
          <router-link
            v-for="(item, index) in menuList"
            :key="index"
            tag="div"
            :to="`${item.path}`"
            class="menu-item"
          >
            <div class="item">
              <span :class="['item-icon', item.icon || null]"></span>
            </div>
            <span>{{item.meta.title}}</span>
          </router-link>
        </div>
      </div>
      <router-link :to="{name: 'Home'}" tag="div" class="banner-posters"></router-link>
      <!-- 商品类别 -->
      <div class="filters" ref="filters">
        <V-Scroll @scroll="handleScrollFilters(1, $event)" ref="scrollFilters" class="filters-scroll" scroll-width="9.7rem" scroll-height="1.36rem" :hideXBar="true" scroll-direction="X" :isList="false">
          <ul class="filter-list">
            <li
              :class="['filter-item', currentGoodsType === item.type ? 'active' : null]"
              v-for="(item, index) in goodsTypes"
              :key="index"
              @click="handleFilterItem(item)"
            >{{item.name}}</li>
          </ul>
        </V-Scroll>
        <div class="left-down-icon" @click="handleFilterOpen">
          <span class="icon-down"></span>
        </div>
      </div>
      <!-- 商品列表 -->
      <goods-list :dataSource="goodsList" />
    </V-Scroll>
    <FilterBox :isShow.sync="isPopup_filter" @onSort="handleSort($event)" />
    <!-- 商品类别 -->
    <div class="filters cloneFilters" ref="filtersClone">
      <V-Scroll @scroll="handleScrollFilters(2, $event)" ref="cloneFiltersScroll" class="filters-scroll" scroll-width="9.7rem" scroll-height="1.36rem" :hideXBar="true" scroll-direction="X" :isList="false">
        <ul class="filter-list">
          <li
            :class="['filter-item', currentGoodsType === item.type ? 'active' : null]"
            v-for="(item, index) in goodsTypes"
            :key="index"
            @click="handleFilterItem(item)"
          >{{item.name}}</li>
        </ul>
      </V-Scroll>
      <div class="left-down-icon" @click="handleFilterOpen">
        <span class="icon-down"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import vueWaterfallEasy from "vue-waterfall-easy";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { other } from "@/router/config";
import GoodsList from "~/goodsList/";
import { session } from "../../libs/utils";

import FilterBox from "./components/filterBox";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

// 获取商品列表
const getGoodsListUrl = "/goods/list";
// 获取用户可能认识的人
const getUserFollowerListUrl = "/userfollower/list";
// 获取根据用户的积分
const getUserCanBuyGoodsUrl = "/goods/get/goods_count/user_can_buy";
// 获取用户详情
const getUserInfoUrl = "/tuser/get/userInfo";

const swiperOptions = {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true
  },
  autoplay: true
};
// 商品列表类别
const goodsTypes = [
  {
    type: 0,
    name: "全部"
  },
  {
    type: 1,
    name: "时尚"
  },
  {
    type: 2,
    name: "美妆"
  },
  {
    type: 3,
    name: "母婴"
  },
  {
    type: 4,
    name: "书籍"
  },
  {
    type: 5,
    name: "居家"
  },
  {
    type: 6,
    name: "数码"
  },
  {
    type: -1,
    name: "其他"
  }
];

export default {
  name: "Home",
  data() {
    const { userId } = JSON.parse(session.getItem("user")) || {};
    return {
      // 用户ID
      userId,
      // 轮播图参数
      swiperOptions,
      // 功能菜单列表
      menuList: other,
      // 轮播图列表
      images: [],
      // 商品列表
      goodsList: [],
      // 用户可购买数量
      userBuyGoodsCount: 0,
      // 果冻(积分)数量
      integral: 0,
      // 首页幻灯片
      banners: [],
      // 商品类别列表
      goodsTypes,
      // 默认选中商品类型：0：全部； 1：时尚； 2：美妆； 3：母婴； 4：书籍； 5：居家； 6：数码； -1：其他
      currentGoodsType: 0,
      // 默认排序为： 0 发布时间
      currentSort: undefined,
      // 宝贝属性： 0 已送出 1：赠送中
      currentProperty: undefined,
      // 特色选择： -1：ALL 0：全新 1：同城
      currentChoose: undefined,
      // 筛选列表状态
      isPopup_filter: false,
      // 可能认识的人列表
      userFollowerList: [],
      // 商品列表克隆的元素
      filtersCloneEl: null,
      // 商品列表克隆元素是否被显示
      isFilterClone: false,
      // 筛选类型里顶部的位置
      filtersTop: 0
    };
  },
  mixins: [Ajax],
  filters: {
    filterSaleType(type) {
      let result = "";
      switch (+type) {
        case 1:
          result = "普通转售";
          break;
        case 2:
          result = "团购";
          break;
        case 3:
          result = "竞拍";
          break;
        case 4:
          result = "一花购";
          break;
        case 5:
          result = "抢兑一口价";
          break;
        case 6:
          result = "抢兑竞拍";
          break;
        default:
          break;
      }
      return result;
    }
  },
  components: {
    swiper,
    swiperSlide,
    vueWaterfallEasy,
    FilterBox,
    GoodsList
  },
  mounted() {
    // 保存实际的筛选盒子元素
    const filtersEl = this.$refs.filters;
    // 克隆的筛选盒子元素
    this.filtersCloneEl = this.$refs.filtersClone;
    // 实际筛选盒子的top位置
    this.filtersTop = filtersEl.offsetTop;

    this.$nextTick(() => {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    });
    // 获取轮播图
    this.getSlideList(1).then(body => {
      const { banners } = body;
      this.banners = banners;
    });
  },
  created() {
    const { userId } = this;
    if (userId) {
      this.getUserFollowerList();
      this.getUserCanBuyGoods();
      this.getUserInfo();
    }
  },
  activated() {
    this.$refs.mainScroll.refresh(true);
  },
  methods: {
    handleFilterItem(item) {
      this.currentGoodsType = item.type;
      this.$refs.mainScroll.pending();
      this.getGoodsList(0).then(body => {
        if (typeof body === "boolean") {
          this.$refs.mainScroll.notData();
        } else {
          this.$refs.mainScroll.success(1);
        }
        this.$nextTick(() => {
          this.$refs.mainScroll.refresh();
        });
      });
    },
    handleScrollFilters(type, event) {
      if (type === 1) {
        this.$refs.cloneFiltersScroll.scrollTo(event.e.x, event.e.y);
      } else {
        this.$refs.scrollFilters.scrollTo(event.e.x, event.e.y);
      }
    },
    /**
     * 处理主体滚动条滑动
     */
    handleScrollMove(event) {
      // 如果当前滚动条的位置大于等于了筛选条件盒子的top位置则显示固定顶部位置的盒子
      if (this.filtersTop <= event.y && !this.isFilterClone) {
        this.isFilterClone = true;
        // this.filtersCloneEl.style.position = "fixed";
        this.filtersCloneEl.style.top = `${this.headerElHeight}px`;
        this.$nextTick(() => {
          this.$refs.cloneFiltersScroll.refresh();
        });
      } else if (this.filtersTop >= event.y && this.isFilterClone) {
        this.isFilterClone = false;
        // this.filtersCloneEl.style.position = "relative";
        this.filtersCloneEl.style.top = "-100000rem";
      }
    },
    /**
     * 获取商品列表
     */
    getGoodsList(page) {
      const {
        currentGoodsType,
        currentSort,
        currentProperty,
        currentChoose
      } = this;
      page === 0 && (this.goodsList = []);
      return this.get(getGoodsListUrl, {
        startPage: page,
        type: currentGoodsType,
        sort: currentSort,
        property: currentProperty,
        choose: currentChoose
      }).then(body => {
        this.goodsList = (this.goodsList || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    },
    /**
     * 获取用户可购买商品的数量
     */
    getUserCanBuyGoods() {
      const { userId } = this;
      this.get(getUserCanBuyGoodsUrl, {
        userId
      }).then(body => {
        this.userBuyGoodsCount = body || 0;
      });
    },
    /**
     * 获取用户详情
     */
    getUserInfo() {
      const { userId } = this;
      this.get(getUserInfoUrl, {
        userId
      }).then(body => {
        this.integral = body.integral || 0;
        session.setItem("userInfo", JSON.stringify(body));
      });
    },
    /**
     * 获取可能认识的朋友列表
     */
    getUserFollowerList() {
      const { userId } = this;
      this.get(getUserFollowerListUrl, {
        userId
      }).then(body => {
        if (+body.code === 200) {
          this.userFollowerList = body.data;
        }
      });
    },
    /**
     * 打开筛选列表
     */
    handleFilterOpen() {
      this.isPopup_filter = true;
    },
    /**
     * 处理筛选成功按钮
     */
    handleSort(sorts) {
      const { sort, property, choose } = sorts;
      this.currentSort = sort;
      this.currentProperty = property;
      this.currentChoose = choose;
      this.$refs.mainScroll.pending();
      this.getGoodsList(0).then(body => {
        if (typeof body === "boolean") {
          this.$refs.mainScroll.notData();
        } else {
          this.$refs.mainScroll.success(1);
        }
        this.$nextTick(() => {
          this.$refs.mainScroll.refresh();
        });
      });
    },
    /**
     * 处理可能认识的人
     */
    handleFriendsItem() {}
  }
};
</script>

<style scoped>
.home-content {
  background: #fff;
}
.tit {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0.3rem 0.31rem;
  font-size: 0.42rem;
  color: #000;
}
.tit .search-info {
  flex-grow: 1;
  /* height: 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #de2245;
}
.tit .search-info .search {
  /* width: 6.5rem; */
  height: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 0.44rem;
  padding: 0 0.54rem;
  color: #888;
}
.tit .search-info .search .icon-search {
  width: 0.36rem;
  height: 0.36rem;
  background: url("../../images/search.png") no-repeat;
  background-size: 100%;
  margin-right: 0.28rem;
}
.currency-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  white-space: nowrap;
}
.currency-icon .currency-des {
  color: #fff;
  font-size: 0.36rem;
  padding: 0.06rem 0.33rem;
  background-color: #de2245;
  letter-spacing: -0.018rem;
  border-radius: 0.24rem 0.24rem 0.24rem 0rem;
}
.friends {
  display: flex;
  flex-direction: column;
  height: 2.3rem;
  margin-bottom: 0.07rem;
  padding: 0.29rem 0.1rem 0.29rem 0.28rem;
  color: #888;
  font-size: 0.36rem;
  background: #fff;
}
.friends .title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.friends-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.3rem;
}
.friends .friends-list {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.friends .friends-list .user-img {
  width: 0.9rem;
  height: 0.9rem;
}

.friends .friends-item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 1.5rem;
  padding: 0.11rem 0.2rem;
}
.friends-item .head-portrait {
  position: relative;
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  border: solid 0.02rem #b41230;
  overflow: hidden;
}
.friends-item .head-portrait .push {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.333rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #de2245;
  border-radius: 200px;
  color: #fff;
  border-radius: 50%;
}
.friends-item .name {
  width: 1.36rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}
.friends-release-goods {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  height: 1.7rem;
}
.his-goods-icon {
  width: 0.96rem;
  height: 0.96rem;
  background: url("../../images/home/his-goods.png") no-repeat;
  background-size: 100%;
}
.friends-release-goods .name {
  color: #de2245;
}
.slide {
  background: #fff;
}
.slide,
.slide-box {
  height: 3.5rem;
  overflow: hidden;
}
.menu-list {
  width: 100%;
  /* height: 3.2rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #000;
  background: #fff url("../../images/home/banner-min.png") no-repeat;
  background-size: 100%;
  box-sizing: border-box;
}
.menu-list .list-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 0 0.2rem;
}
.menu-list .menu-item {
  display: flex;
  width: 25%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 0.36rem;
  margin-bottom: 0.47rem;
}
.menu-list .menu-item .item {
  display: flex;
  margin-bottom: 0.1rem;
}
.banner-posters {
  height: 2.17rem;
  background: #fff url("../../images/home/banner-posters.png") no-repeat;
  background-size: 100%;
  padding-bottom: 0.3rem;
}
.filters {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.3rem;
}
.cloneFilters {
  position: fixed;
  top: -100000rem;
  box-shadow: 0 0rem 0.3rem rgba(0, 0, 0, 0.6);
}
.filters,
.filters-scroll {
  height: 1.36rem;
  background: #fff;
}
.filter-list {
  flex-grow: 1;
  white-space: nowrap;
  color: #888;
}
.filter-list .filter-item {
  display: inline-block;
  padding: 0.46rem 0.29rem;
  white-space: nowrap;
  font-weight: normal;
  font-size: 0.45rem;
}
.filter-list .filter-item.active {
  color: #d11135;
}
.left-down-icon {
  flex-grow: 1;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 0.1rem;
}
.left-down-icon .icon-down {
  width: 0.36rem;
  height: 0.17rem;
  background: url("../../images/home/leftDown-icon.png") no-repeat;
  background-size: 100%;
}
</style>
