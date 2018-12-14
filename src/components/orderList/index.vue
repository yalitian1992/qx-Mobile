<template>
  <div class="order-content">
    <ul class="order-list">
      <li v-for="(item, index) in dataList"
        :key="index"
      >
        <router-link tag="div" class="order-list-top" :to="{path:'/myaccess/orderDetail',query:{orderId:item.id}}">
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
              <span>{{item.time | transformation}}</span>
            </p>
          </div>
        </router-link>
        <router-link tag="div" class="order-list-bottom" :to="{path:'/myaccess/orderDetail',query:{orderId:item.id}}">
          <!--订单状态(0:已拍下1:已付款2:已发货3:已完成,4竞拍中 5:未支付成功，订单已取消)-->
          <p v-if="item.status==0">已拍下</p>
          <p v-else-if="item.status==1">已付款</p>
          <p v-else-if="item.status==2">已发货</p>
          <p v-else-if="item.status==3">已完成</p>
          <p v-else-if="item.status==4">竞拍中</p>
          <p v-else-if="item.status==5">订单已取消</p>
          <p>查看详情</p>
          <!--<router-link tag="p" :to="{path:'/myaccess/orderDetail',query:{orderId:item.id}}">查看详情</router-link>-->
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

export default {
  name: "orderList",
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      status: -1
      // dataLists: this.dataList || []
    };
  },
  mixins: [Ajax],
  components: {},
  mounted() {
  }
};
</script>

<style scoped>
  @import "../../style/order.css";
</style>

