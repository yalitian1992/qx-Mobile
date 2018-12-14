<template>
  <div class="order-content">
    <V-Scroll :isPullDown="false" :scroll-height="`${mainHeight}px`" ref="mainScroll" :autoLoad="false" :on-scroll-bottom="orderFun">
      <ul class="order-list">
        <li v-for="(item, index) in orderLists" :key="index" @click="changeOrder(item.id)">
          <div class="order-list-top">
            <div class="order-list-left">
              <p>
                <img :src=item.goodsUrl class="pic" v-error-to-img alt="">
              </p>
            </div>
            <div class="order-list-right">
              <p class="text-overflow">{{item.goodsName}}</p>
              <p class="text-overflow">{{item.description}}</p>
              <p>
                <span>{{item.cost}}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import orderlist from "~/orderList";
import { session } from "@/libs/utils";

// 已领取宝贝
const userOrderUrl = "/goods/list/userOrder";

export default {
  name: "orderList",
  data() {
    return {
      page: 0,
      orderLists: []
    };
  },
  mixins: [Ajax],
  components: {
    orderlist
  },
  methods: {
    orderFun(page) {
      page === 0 && (this.orderLists = []);
      return this.get(userOrderUrl, {
        userId: JSON.parse(session.getItem("user")).userId,
        status: 3,
        startPage: page
      }).then(body => {
        this.orderLists = (this.orderLists || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    },
    changeOrder(item) {
      session.setItem("orderId", item);
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.mainScroll.pending();
    this.orderFun(0).then(body => {
      if (typeof body === "boolean") {
        // 如果列表没有数据，则更新提示状态
        this.$refs.mainScroll.notData();
      } else if (body.hasNextPage) {
        // 如果有数据则更改状态并把页码设置为下一页：1
        this.$refs.mainScroll.success(1);
      } else {
        this.$refs.mainScroll.notData("没有更多数据了");
      }
    });
  }
};
</script>

<style scoped>
@import "../../style/order.css";
</style>

