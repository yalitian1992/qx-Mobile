<template>
  <div class="order-content">
    <div class="order-top-title" ref="filters">
      <p :class="{'titleChecked':status==-1}" @click="status=-1">全部订单</p>
      <p :class="{'titleChecked':status==0}" @click="status=0">赠送中</p>
      <p :class="{'titleChecked':status==1}" @click="status=1">待发出</p>
      <p :class="{'titleChecked':status==2}" @click="status=2">待收货</p>
    </div>
    <V-Scroll :isPullDown="false" :scroll-height="`${mainHeight}px`" ref="mainScroll" :autoLoad="false" :on-scroll-bottom="orderFun">
      <orderlist :dataList = orderLists ></orderlist>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import orderlist from "~/orderList";
import { session } from "@/libs/utils";

// 全部
const orderUserListUrl = "/order/list/userList";
// 赠送中
const goodsUserListUrl = "/goods/list/userList";

export default {
  name: "orderList",
  data() {
    return {
      status: 5,
      page: 0,
      orderLists: [],
      orderParams: {
        startPage: 0,
        pageSize: 10,
        status: -1,
        sellerUserId: JSON.parse(session.getItem("user")).userId
      },
      giveList: {
        userId: JSON.parse(session.getItem("user")).userId,
        status: 2,
        startPage: 1,
        pageSize: 10,
        type: 0
      }
    };
  },
  mixins: [Ajax],
  components: {
    orderlist
  },
  watch: {
    status(nextValue) {
      this.$refs.mainScroll.scrollTo(0, 0);
      session.setItem("status", nextValue);
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
  },
  methods: {
    orderFun(page) {
      page === 0 && (this.orderLists = []);
      if (this.status == 0) {
        return this.get(goodsUserListUrl, {
          userId: JSON.parse(session.getItem("user")).userId,
          status: 2,
          startPage: page,
          pageSize: 10,
          type: 0
        }).then(body => {
          this.orderLists = (this.orderLists || []).concat(body.items);
          if (body.items.length <= 0) {
            return false;
          }
          return body;
        });
      }
      return this.get(orderUserListUrl, {
        startPage: page,
        pageSize: 10,
        status: this.status,
        sellerUserId: JSON.parse(session.getItem("user")).userId
      }).then(body => {
        this.orderLists = (this.orderLists || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    }
  },
  mounted() {
    this.status = session.getItem("status");
    this.$nextTick(() => {
      const filtersEl = this.$refs.filters;
      const filtersElHeight = this.getElHeight(filtersEl);
      this.mainHeight -= filtersElHeight;
    });
  }
};
</script>

<style scoped>
  @import "../../style/order.css";
</style>

