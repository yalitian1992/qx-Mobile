<template>
  <div class="order-content">
    <V-Scroll ref="mainscroll" :isList="false" :scroll-height="`${mainHeight}px`">
      <!--订单取消-->
      <div class="order-cancel" v-if="order.status ==5">
        <img src="../../images/userInfos/order_cancel.png" alt="">
        <p>订单已取消</p>
        <p>如有疑问请联系客服</p>
      </div>
      <div v-else>
        <!--进度条-->
        <div class="orderdetail-status">
          <!--订单状态(0:已拍下1:已付款2:已发货3:已完成,4竞拍中 5:未支付成功，订单已取消)-->
          <p class="statusSuccess" :class="[0,1,2,3].indexOf(order.status)>-1?'statusSuccess':''">
            <span></span>
            <span>已拍下</span>
          </p>
          <span></span>
          <p :class="[1,2,3].indexOf(order.status)>-1?'statusSuccess':''">
            <span></span>
            <span>已付款</span>
          </p>
          <span></span>
          <p :class="[2,3].indexOf(order.status)>-1?'statusSuccess':''">
            <span></span>
            <span>已发货</span>
          </p>
          <span></span>
          <p :class="[3].indexOf(order.status)>-1?'statusSuccess':''">
            <span></span>
            <span>已收货</span>
          </p>
        </div>
        <!--状态按钮-->
        <div class="order-state-button">
          <!--已拍下-->
          <div class="order-state0" v-if="order.status==0">
            <!--买家-->
            <div class="order-state0-buy" v-if="buyer">
              <p>成交果冻个数</p>
              <p>{{order.cost}}个</p>
              <p class="orderDetail-btn" @click="payPostage">支付运费{{order.postage}}元</p>
            </div>
            <!--卖家-->
            <div class="orderDetail-btn-grey" v-else>等待买家付款</div>
          </div>
          <!--已付款-->
          <div class="order-state1" v-else-if="order.status==1">
            <!--买家-->
            <p class="orderDetail-btn-grey" v-if="buyer">等待对方发货</p>
            <!--卖家-->
            <div v-else>
              <p class="orderDetail-btn" v-if="order.mailStatus==0">申请寄件</p>
              <p class="orderDetail-btn" v-else-if="order.mailStatus==1" @click="expressShow = true">填写快递单号</p>
              <p v-else></p>
            </div>
          </div>
          <!--已发货-->
          <div class="order-state2" v-else-if="order.status==2">
            <!--买家-->
            <p class="orderDetail-btn" @click="receiveFun" v-if="buyer">确认收货</p>
            <!--卖家-->
            <p class="orderDetail-btn-grey" v-else>等待对方收货</p>
          </div>
          <!--已收货-->
          <div class="order-state2" v-else-if="order.status==3">
            <!--买家-->
            <p class="orderDetail-btn" v-if="buyer" @click="forVideo()">去感谢</p>
            <!--卖家-->
            <p class="orderDetail-btn-grey" v-else>已完成</p>
          </div>
          <div v-else></div>
        </div>
        <!--快递信息-->
        <div class="user-address-detail" v-if="[1,2,3].indexOf(order.status)>-1">
          <div>
            <p>
              <span>收件人:</span>
              <span>{{order.receiveName}}</span>
            </p>
            <p>
              <span>收货地址:</span>
              <span>{{order.receiveAddress}}</span>
            </p>
          </div>
          <div v-if="!buyer">
            <p>
              <span>寄件人:</span>
              <span>{{order.senderName}}</span>
            </p>
            <p>
              <span>寄货地址:</span>
              <span>{{order.senderAddress}}</span>
            </p>
          </div>
        </div>
      </div>
      <!--商品查看详情-->
      <ul class="order-list">
        <li>
          <div class="order-list-top">
            <div class="order-list-left">
              <p>
                <img :src="order.goodsUrl" v-error-to-img alt="">
              </p>
            </div>
            <div class="order-list-right">
              <p class="text-overflow">{{order.goodsName}}</p>
              <p class="text-overflow">{{order.description}}</p>
              <router-link tag="span" :to="`/goods/details/${order.goodsId}`">查看详情 >></router-link>
            </div>
          </div>
        </li>
      </ul>
      <!--商品进度-->
      <div class="order-infos">
        <p>
          <!--订单状态(0:已拍下1:已付款2:已发货3:已完成,4竞拍中 5:未支付成功，订单已取消)-->
          <span>处理状态:</span>
          <span v-if="order.status==0">已拍下</span>
          <span v-else-if="order.status==1">已付款</span>
          <span v-else-if="order.status==2">已发货</span>
          <span v-else-if="order.status==3">已完成</span>
          <span v-else-if="order.status==4">竞拍中</span>
          <span v-else-if="order.status==5">已取消</span>
          <span v-else></span>
        </p>
        <p>
          <span>订单编号:</span>
          <span>{{order.goodsCode}}</span>
        </p>
        <p>
          <span>快递订单:</span>
          <span>{{order.trackCode}}</span>
        </p>
        <p>
          <span>支付果冻:</span>
          <span>{{order.cost}}个</span>
        </p>
        <p>
          <span>支付用户:</span>
          <span>{{order.userName}}</span>
        </p>
      </div>
      <!--快递信息-->
      <div class="express-infos" v-if="order.mailStatus==1 && [1,2,3].indexOf(order.status)>-1 && !buyer">
        <div class="express-time">
          <p>
            <span>上门取件时间:</span>
            <span>{{order.mailTime}}</span>
          </p>
          <p>
            <span>申请时间:</span>
            <span>{{order.mailTime}}</span>
          </p>
        </div>
        <div class="user-address-detail">
          <div>
            <p>
              <span>收件人:</span>
              <span>{{order.receiveName}}</span>
            </p>
            <p>
              <span>收货地址:</span>
              <span>{{order.receiveAddress}}</span>
            </p>
          </div>
          <div>
            <p>
              <span>寄件人:</span>
              <span>{{order.senderName}}</span>
            </p>
            <p>
              <span>寄货地址:</span>
              <span>{{order.senderAddress}}</span>
            </p>
          </div>
        </div>
        <div class="label-text">申请取件信息，仅自己和平台客服可见</div>
      </div>
      <p style="height:1.5rem"></p>
    </V-Scroll>
    <div class="express-status" v-if="expressShow" @click.stop.prevent="expressShow=false">
      <div class="express-center" @click.stop.prevent="expressShow=true">
        <p class="close-express">
          <span @click.stop.prevent="expressShow = false">关闭</span>
        </p>
        <p class="express-border">
          <label>变更状态:</label>
          <span>已发货</span>
        </p>
        <p class="express-border">
          <label>快递单号:</label>
          <input type="number" v-model="consig.trackCode" placeholder="请输入快递单号">
        </p>
        <p class="express-textarea">
          <label>备注信息:</label>
          <textarea placeholder="备注" v-model="consig.memo"></textarea>
        </p>
        <p class="resiveBtn" @click="consigFun">确认发货</p>
      </div>
    </div>
    <div class="service-bottom">
      <p>联系客服</p>
      <p>联系对方</p>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { session } from "@/libs/utils";

// 订单详情
const userOrderDetailUrl = "/goods/get/userOrderDetail";
// 确认发货
const sendGoodsUrl = "/order/put/sendGoods";
// 确认收货
const comfireGoodsUrl = "/order/put/comfireGoods";
export default {
  name: "orderDetail",
  data() {
    return {
      order: {},
      expressShow: false, // 填写单号
      consig: {
        orderId: "",
        trackCode: "",
        memo: ""
      },
      userId: JSON.parse(session.getItem("user")).userId,
      buyer: false
    };
  },
  mixins: [Ajax],
  components: {},
  mounted() {
    this.orderInfos();
  },
  methods: {
    // 订单详情
    orderInfos() {
      this.get(userOrderDetailUrl, {
        userId: this.userId,
        orderId: this.$route.query.orderId
      }).then(body => {
        this.order = body;
        if (this.userId === this.order.userId) {
          this.buyer = true;
        } else {
          this.buyer = false;
        }
        this.$nextTick(() => {
          this.$refs.mainscroll.refresh(true);
        });
      });
    },
    // 去感谢
    forVideo() {
      this.$router.push({ path: "/myaccess/upvideo" });
      session.setItem("orderId", this.order.id);
    },
    // 支付邮费接口
    payPostage() {},
    // 确认发货
    consigFun() {
      if (!this.consig.trackCode) {
        this.$root.$emit("toast", {
          toastInfo: "请填写快递单号"
        });
        return;
      }
      // 打开loading
      this.$root.$emit("loading", {
        isMask: true,
        state: true
      });
      this.consig.orderId = this.order.id;
      this.post(sendGoodsUrl, this.consig).then(body => {
        this.$root.$emit("loading", {
          isMask: false,
          state: false
        });
        if (body.code === 200) {
          this.orderInfos();
          this.expressShow = false;
        }
      });
    },
    // 确认收货
    receiveFun() {
      this.$root.$emit("loading", {
        isMask: true,
        state: true
      });
      this.post(comfireGoodsUrl, {
        orderId: this.order.id
      }).then(() => {
        this.orderInfos();
        this.$root.$emit("loading", {
          isMask: false,
          state: false
        });
      });
    }
  }
};
</script>

<style scoped>
@import "../../style/order.css";
/*进度条*/
.orderdetail-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3.5rem;
  width: 9.01rem;
  margin: 0 auto;
}
.orderdetail-status p > span:nth-child(1) {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  margin: 0 auto 0.3rem;
  background: url("../../images/userInfos/icon-fall.png") no-repeat center/.2rem
    0.2rem;
  position: relative;
}
.orderdetail-status p > span:nth-child(2) {
  font-size: 0.36rem;
  color: #888;
}
.orderdetail-status p > span:nth-child(1):after {
  content: "";
  height: 2px;
  width: 1.4rem;
  background: #ccc;
  display: block;
  position: absolute;
  left: -1.6rem;
  top: 50%;
}
.orderdetail-status p.statusSuccess > span:nth-child(1) {
  background: url("../../images/userInfos/icon-success.png") no-repeat
    center/.6rem 0.6rem;
}
.orderdetail-status p.statusSuccess > span:nth-child(2) {
  color: #353535;
}
.orderdetail-status p.statusSuccess > span:nth-child(1):after {
  background: #d84a4d;
}
.orderdetail-status p:nth-child(1) > span:nth-child(1):after {
  width: 0;
}
/*状态按钮*/
.order-state-button {
  padding: 0.4rem 0;
  background: #fff;
}
.order-state-button > div {
  text-align: center;
}
.order-state0 {
  text-align: center;
}
.order-state0-buy > p:nth-child(1) {
  font-size: 0.36rem;
  line-height: 0.5rem;
  color: #888;
}
.order-state0-buy > p:nth-child(2) {
  font-size: 0.9rem;
  color: #353535;
  line-height: 1.2rem;
  margin: 0.2rem auto;
}
/*按钮*/
.orderDetail-btn {
  display: inline-block;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  border: solid 1px #de2245;
  font-size: 0.36rem;
  color: #de2245;
  margin: 0 auto;
  min-width: 3.4rem;
}
.orderDetail-btn-grey {
  display: inline-block;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  border: solid 1px #888;
  font-size: 0.36rem;
  color: #888;
  margin: 0 auto;
  min-width: 3.4rem;
}
/*收寄货地址*/
.user-address-detail {
  margin-bottom: 0.3rem;
}
.user-address-detail > div {
  border-top: solid 1px #f5f5f5;
  background: #fff;
  padding: 0.4rem 0.3rem;
}
.user-address-detail > div > p {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  font-size: 0.45rem;
  color: #353535;
  margin-bottom: 0.15rem;
}
.user-address-detail > div > p > span:nth-child(2) {
  max-width: 7.8rem;
  margin-left: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #888;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.user-address-detail > div > p:nth-child(2) > span:nth-child(2) {
  height: 1.2rem;
  line-height: 0.6rem;
  -webkit-line-clamp: 2;
}
/*地址end*/
.order-list-right > span {
  font-size: 0.36rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #de2245;
  position: absolute;
  bottom: 0;
  right: 0;
}
/*订单进度条*/
.order-infos {
  background: #fff;
  margin-top: 0.3rem;
}
.order-infos > p {
  padding: 0 0.3rem;
  border-bottom: solid 1px #f4f4f4;
  height: 1.56rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.45rem;
  color: #171717;
}
.order-infos > p > span:nth-child(2) {
  color: #888;
}
/*订单进度条end*/
.express-infos {
  margin-top: 0.3rem;
}
.express-time {
  background: #fff;
  padding: 0.3rem;
}
.express-time > p {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #353535;
  font-size: 0.45rem;
}
.express-time > p > span:nth-child(2) {
  color: #888;
  margin-left: 0.2rem;
}
.label-text {
  font-size: 0.36rem;
  color: #de2245;
  padding: 0.2rem 0 0.5rem;
  text-align: center;
}
/*填写寄件码*/
.express-status {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
.express-center {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #fff;
  width: 100%;
}
.close-express {
  height: 1.18rem;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.close-express > span {
  color: #de2245;
  font-size: 0.45rem;
  margin-right: 0.3rem;
  display: block;
  padding: 0 0.2rem;
  height: 1.18rem;
  line-height: 1.18rem;
}
.express-border {
  height: 1.2rem;
  line-height: 1.2rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.express-border > label,
.express-textarea > label {
  font-size: 0.45rem;
  color: #000;
  margin-right: 0.2rem;
}
.express-border > span {
  color: #de2245;
  font-size: 0.45rem;
}
.express-border > input {
  border: none;
  font-size: 0.45rem;
}
.express-textarea {
  height: 1.8rem;
  padding: 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid #f4f4f4;
}
.express-textarea > textarea {
  height: 1.6rem;
  width: 7.5rem;
  padding: 0.1rem;
  border: none;
  outline: none;
  resize: none;
  font-size: 0.45rem;
}
.resiveBtn {
  width: 10rem;
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  border-radius: 2rem;
  margin: 0.3rem auto;
  background-image: linear-gradient(-30deg, #de2245 0%, #ed577b 100%);
  color: #fff;
  font-size: 0.45rem;
}
/*联系客服*/
.service-bottom {
  height: 1.5rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.service-bottom > p {
  width: 50%;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.45rem;
  color: #171717;
}
.service-bottom > p:nth-child(2) {
  background-image: linear-gradient(-30deg, #de2245 0%, #ed577b 100%);
  color: #fff;
}
.order-cancel {
  padding: 0.5rem 0;
  text-align: center;
}
.order-cancel > img {
  width: 1.95rem;
  height: 1.11rem;
}
.order-cancel > p:nth-child(2) {
  font-size: 0.45rem;
  color: #353535;
  margin: 0.2rem auto;
}
.order-cancel > p:nth-child(3) {
  font-size: 0.36rem;
  color: #888;
  margin: 0.2rem auto;
}
</style>

