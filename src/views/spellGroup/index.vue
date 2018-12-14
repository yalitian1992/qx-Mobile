<template>
  <div  class="spell-group-box">
    <V-Scroll ref="spellGroupScroll" :isList="false" :scroll-height="`${mainHeight}px`">
      <template>
        <div class="tit"></div>
        <ul class="spell-list">
          <router-link
            tag="li"
            class="list-group"
            v-for="(item, index) in groupBuyList"
            :key="index"
            :to="{name: 'SpellGroupDetails', params: {id: item.groupBuyId}}"
          >
            <div class="goods-pic">
              <img :src="item.goodsUrl" class="img-pic" :alt="item.goodsName">
              <span class="badge">{{item.groupPeopleNuber}}人团</span>
            </div>
            <div class="goods-info">
              <span class="goods-title">{{item.goodsName | filterSubStrName}}</span>
              <div class="price-num">
                <span class="icon-currency"></span>
                <span class="currency-num">{{item.integral}}</span>
              </div>
              <div class="goods-status">
                <span class="thrift">立省{{item.save}}元</span>
                <span class="send-out">已送{{item.saledCount}}件</span>
              </div>
            </div>
          </router-link>
        </ul>
      </template>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

// 拼团列表Url
const getGroupBuyListUrl = "/groupbuy/list/booking";

export default {
  name: "spellGroup",
  mixins: [Ajax],
  data() {
    return {
      banners: [],
      groupBuyList: []
    };
  },
  mounted() {
    // 获取轮播图
    this.getSlideList(2).then(body => {
      const { banners } = body;
      this.banners = banners;
    });
    this.getGroupBuyList();
  },
  methods: {
    getGroupBuyList() {
      this.get(getGroupBuyListUrl).then(body => {
        this.groupBuyList = body.groupBuyGoodsVos;
        this.$nextTick(() => {
          this.$refs.spellGroupScroll.refresh();
        });
      });
    }
  }
};
</script>

<style scoped>
.spell-group-box {
  background: #fed202 url("../../images/spellGroup/bg.jpg") no-repeat 0
    bottom/100%;
}
.spell-group-box .tit {
  width: 100%;
  height: 5.4rem;
  background: #fed202 url("../../images/spellGroup/banner.jpg") no-repeat center
    center/100%;
}
.spell-list {
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0.3rem 0;
  font-size: 0.42rem;
}
/* 图片区域 */
.spell-list .list-group {
  border-radius: 0.5rem;
  background: #fff;
  display: flex;
  margin-bottom: 0.3rem;
  height: 3.6rem;
  overflow: hidden;
}
.spell-list .list-group .goods-pic {
  position: relative;
  display: flex;
}
.spell-list .list-group .goods-pic .img-pic {
  width: 3.94rem;
  height: 3.6rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  object-fit: cover;
}
.spell-list .list-group .goods-pic .badge {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.17rem;
  height: 0.72rem;
  position: absolute;
  left: 0;
  top: 0;
  background-image: linear-gradient(0deg, #de2245 0%, #ed577b 100%);
  border-radius: 0.5rem 0.36rem 0.36rem 0rem;
  color: #f4f4f4;
}
/* 描述信息区域 */
.spell-list .list-group .goods-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.39rem 0.3rem 0;
}
.spell-list .list-group .goods-info .goods-title {
  font-size: 0.45rem;
  color: #353535;
  line-height: 1.1;
  letter-spacing: -0.009rem;
}
.spell-list .list-group .price-num {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.44rem;
  margin-bottom: 0.22rem;
}
.spell-list .list-group .price-num .icon-currency {
  width: 0.69rem;
  height: 0.63rem;
  margin-right: 0.24rem;
  background: url("../../images/icon-currency-tag.png") no-repeat;
  background-size: 100%;
}
.spell-list .list-group .price-num .currency-num {
  font-size: 0.81rem;
  color: #de2245;
}
.spell-list .list-group .goods-status {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.spell-list .list-group .goods-status .thrift {
  font-size: 0.36rem;
  color: #de2245;
}
.spell-list .list-group .goods-status .send-out {
  font-size: 0.42rem;
  color: #888;
}
</style>
