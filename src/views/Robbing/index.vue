<template>
  <!--eslint-disable -->
  <div class="Robbing-content" :style="{top: `${headerElHeight}px`}">
    <div class="robbing-time-list" ref="timeList">
      <V-Scroll ref="timeListScroll" :isList="false" :hideXBar="true" scroll-direction="X" scroll-height="1.94rem">
        <ul class="time-list">
          <li
            v-for="(item, index) in timeList"
            :key="item"
            ref="timeItem"
            :class="['time-item', currentTimeTag === index ? 'active' : null]"
            @click="handleSelectItem(index, item)"
          >
            <div class="item-box">
              <span class="time">{{item | timeBriefFilter}}</span>
              <span class="tag">{{item | timeNameFilter}}</span>
            </div>
          </li>
          <!-- <li class="time-item active">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item active">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">已结束</span>
            </div>
          </li>
          <li class="time-item">
            <div class="item-box">
              <span class="time">22日21:00</span>
              <span class="tag">一开始</span>
            </div>
          </li> -->
        </ul>
      </V-Scroll>
    </div>
    <V-Scroll ref="goodsList" :isList="false" :scroll-height="`${mainHeight}px`">
      <ul class="robbing-list-group">
        <li
          class="group-item"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <div class="goods-pic">
            <img :src="item.cover" v-error-to-img class="pic" :alt="item.name">
          </div>
          <div class="goods-des">
            <h3 class="title">{{item.name}}</h3>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">{{item.integral}}</span>
              </div>
              <router-link tag="div" :to="`/goods/details/${item.id}`" class="btn btn-robbing" v-if="item.count > 0">立即抢购</router-link>
              <div class="btn btn-without" v-else>已抢光</div>
            </div>
          </div>
        </li>
      <!--
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
        <li class="group-item">
          <div class="goods-pic">
            <img src="../../images/icon-currency.png" class="pic" alt="goodsName">
          </div>
          <div class="goods-des">
            <h3 class="title">时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳时尚黄色汽车儿童收纳</h3>
            <span class="thrift">立省398元</span>
            <div class="goods-price-robbing">
              <div class="price">
                <span class="icon-price"></span>
                <span class="price-text">5000</span>
              </div>
              <div class="btn btn-robbing">立即抢购</div>
              <div class="btn btn-without" v-if="false">已抢光</div>
            </div>
          </div>
        </li>
      -->
      </ul>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

// 抢兑时间列表
const robbingTimeUrl = "/goods/get/rob/time/list";
// 抢兑商品列表
const getRobbingGoodsUrl = "/goods/get/rob/list";

/* eslint-disable */
export default {
  name: "Robbing",
  mixins: [Ajax],
  data() {
    return {
      // 时间列表
      timeList: [],
      // 商品列表
      goodsList: [],
      // 当前选择的时间所以 从0开始
      currentTimeTag: 0,
      currentTime: 0
    };
  },
  filters: {
    /**
     * 过滤时间至精简
     * [日] 时:分
     */
    timeBriefFilter(value) {
      /* eslint-disable */
      const arr = value.split(/[- : \/]/);
      const date = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
      let NMinutes = date.getMinutes(); // 分
      let NHours = date.getHours(); // 时
      const NDate = date.getDate(); // 日
      const NMonth = date.getMonth(); // 月
      const NFullYear = date.getFullYear(); // 年
      const currentDate = new Date();
      if (NHours < 10) {
        NHours = "0" + NHours;
      }
      if (NMinutes < 10) {
        NMinutes = "0" + NMinutes;
      }
      // 如果是当天则返回·时分·，如果不是则返回·日时分·
      if (
        +currentDate.getFullYear() === +NFullYear &&
        +currentDate.getMonth() === +NMonth &&
        +currentDate.getDate()() === +NDate
      ) {
        return `${NHours}:${NMinutes}`;
      }
      return `${NDate}日${NHours}:${NMinutes}`;
    },
    /**
     * 比较时间是否已开抢
     */
    timeNameFilter(value) {
      let result = "待开抢";
      const arr = value.split(/[- : \/]/);
      const time = new Date(
        arr[0],
        arr[1],
        arr[2],
        arr[3],
        arr[4],
        arr[5]
      ).getTime();
      const currentTime = Date.now();
      if (currentTime <= time) {
        result = "已开抢";
      }
      return result;
    }
  },
  created() {
    this.getRobbingTime();
  },
  mounted() {
    const timeList = this.$refs.timeList;
    const timeListHeight = this.getElHeight(timeList);
    this.$nextTick(() => {
      this.mainHeight -= timeListHeight;
    });
  },
  methods: {
    /**
     * 获取时间列表
     */
    getRobbingTime() {
      this.post(robbingTimeUrl).then(body => {
        this.timeList = body;
        this.$nextTick(() => {
          this.$refs.timeListScroll.refresh();
          this.getCurrentSelectTime();
        });
      });
    },
    /**
     * 获取当前时间段抢兑列表
     */
    getRobbingGoods() {
      this.post(getRobbingGoodsUrl, {
        saleType: 5,
        robType: 0,
        startPage: 0,
        time: this.currentTime
      }).then(body => {
        this.goodsList = body.items;
        this.$nextTick(() => {
          this.$refs.goodsList.refresh();
        });
      });
    },
    /**
     * 处理时间段被选择
     */
    handleSelectItem(index, item) {
      this.currentTimeTag = index;
      this.currentTime = item;
      // 重新获取当前时间段列表
      this.getRobbingGoods();
    },
    /**
     * 获取当前最新活动的时间，并选择上
     */
    getCurrentSelectTime() {
      const currentTime = Date.now();
      // 为了防止当前时间大于列表所有的时间而设置的一个标识
      let flag = false;
      this.timeList.reduce((prev, next, index) => {
        const nextTime = new Date(next).getTime();
        const prevTime = new Date(prev).getTime();
        // 如果上一次的时间就已经大于了当前时间就使用默认选择
        if (currentTime < prevTime && !flag) {
          flag = true;
          this.currentTimeTag = 0;
          this.currentTime = prev;
        }
        // 如果next时间大于了当前时间那么就选择上一次的时间区域作为首次选择时间段
        if (currentTime < nextTime && !flag) {
          flag = true;
          this.currentTimeTag = index - 1;
          this.currentTime = prev;
        }
        return next;
      });
      if (!flag) {
        this.currentTimeTag = this.timeList.length - 1;
        this.currentTime = this.timeList[this.timeList.length - 1];
      }
      // 滚动到指定位置
      this.timeListScrollTo();
    },
    /**
     * 滚动到选择位置
     */
    timeListScrollTo() {
      this.$nextTick(() => {
        this.$refs.timeListScroll.jrollScroll.scrollToElement(
          this.$refs.timeItem[this.currentTimeTag]
        );
      });
      this.getRobbingGoods();
    }
  }
};
</script>

<style scoped>
.Robbing-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #de2245 url("../../images/robbing/robbing-bg.png") no-repeat;
  background-size: 100%;
}
.robbing-time-list {
  width: 100%;
  background: url("../../images/robbing/time-line.png") no-repeat 0 0.03rem;
  background-size: 100%;
  height: 1.94rem;
}
.time-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 0.36rem;
}
.time-list .time-item {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.31rem;
  height: 1.94rem;
}
.time-list .time-item::after {
  content: "";
  width: 0.04rem;
  height: 0.9rem;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
  background-blend-mode: normal, normal;
  border-radius: 0.01rem;
  opacity: 0.2;
}
.time-list .time-item:last-child::after {
  width: 0;
  height: 0;
}
.time-list .time-item .item-box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  line-height: 1.4;
}
.time-list .time-item.active {
  background: url("../../images/robbing/time-active.png") no-repeat 0 -0.01rem;
  background-size: 100%;
}
/* 选中之后的字体大小 */
.time-list .time-item.active .item-box .time {
  font-size: 0.42rem;
}
.time-list .time-item.active .item-box .tag {
  font-size: 0.48rem;
}
/* 抢兑列表 */
.robbing-list-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.34rem 0.44rem;
}
.robbing-list-group .group-item {
  display: flex;
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0rem 0.1rem 0.09rem 0.01rem rgba(105, 17, 32, 0.2);
  border-radius: 0.09rem;
  margin-bottom: 0.45rem;
}
.robbing-list-group .group-item .goods-pic .pic {
  display: flex;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 0.09rem 0rem 0rem 0.09rem;
  margin-right: 0.3rem;
  object-fit: cover;
}
.robbing-list-group .group-item .goods-des {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.44rem 0;
}
.robbing-list-group .group-item .goods-des .title {
  width: 6.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #353535;
  font-size: 0.45rem;
  letter-spacing: -0.009rem;
}
.robbing-list-group .group-item .goods-des .thrift {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 0.36rem;
  width: 2.7rem;
  height: 0.54rem;
  background: url("../../images/robbing/thrift-bg.png") no-repeat;
  background-size: 100%;
}
.robbing-list-group .group-item .goods-des .goods-price-robbing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.45rem;
  flex-wrap: wrap;
}
.robbing-list-group .goods-des .goods-price-robbing .price {
  display: flex;
  align-items: center;
}
.robbing-list-group .goods-des .goods-price-robbing .icon-price {
  width: 0.69rem;
  height: 0.63rem;
  background: url("../../images/icon-currency-tag.png") no-repeat;
  background-size: 100%;
}
.robbing-list-group .goods-des .goods-price-robbing .price-text {
  font-size: 0.81rem;
  color: #ff7200;
  margin-left: 0.24rem;
}
.robbing-list-group .goods-des .btn {
  width: 3rem;
  height: 0.96rem;
  border-radius: 0.48rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.42rem;
}
.robbing-list-group .goods-des .btn-robbing {
  background-color: #de2245;

  box-shadow: 0 0.3rem 0.24rem -0.2rem rgba(222, 34, 69, 0.8);
}
.robbing-list-group .goods-des .btn-without {
  background-color: #bfbfbf;
  box-shadow: 0 0.3rem 0.24rem -0.2rem rgba(191, 191, 191, 0.8);
}
</style>
