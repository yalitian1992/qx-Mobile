<template>
  <div class="my-content">
    <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`">
      <div class="my-top-info">
        <div class="my-userImgs">
          <p>
            <img :src=user.avatar v-error-to-img="require('../../images/error-to-user.png')" alt="">
          </p>
          <p>
            <span>{{user.name}}</span>
            <router-link tag="span" :to="{name: 'addressList'}">修改地址</router-link>
          </p>
          <router-link tag="p" :to="{name: 'myRelease'}">查看个人主页</router-link>
        </div>
        <div class="my-trans">
          <div class="my-trans-top-box">
            <p>
              <span>我送的宝贝</span>
              <router-link tag="span" to="/myaccess/sendOrderList/-1" @click.native="statusFun(-1)">查看全部>></router-link>
            </p>
            <div class="my-trans-top">
              <router-link
                tag="p"
                v-for="(item, index) in sendList"
                :key="index"
                :to="{path: item.pathTo}"
                @click.native="statusFun(item.status)"
              >
                <span class="my-trans-icons" :class="item.icon"></span>
                <span>{{item.name}}</span>
              </router-link>
            </div>
          </div>
          <div class="my-trans-bottom-box">
            <p>
              <span>我领的宝贝</span>
              <router-link tag="span" to="/myaccess/getOrderList/-1" @click.native="statusFun(-1)">查看全部>></router-link>
            </p>
            <div class="my-trans-bottom">
              <router-link
                tag="p"
                v-for="(item, index) in getList"
                :key="index"
                :to="{path: item.pathTo}"
                @click.native="statusFun(item.status)"
              >
                <span class="my-trans-icons" :class="item.icon"></span>
                <span>{{item.name}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="my-candy-box">
        <p>
          <span>我的糖果:</span>
          <span>{{user.integral}}颗</span>
        </p>
        <router-link class="my-go-candy" tag="p" :to="{path:'/home/task'}">去赚糖果</router-link>
      </div>
      <ul class="my-user-box">
        <router-link
          tag="li"
          v-for="(item, index) in myList"
          :key="index"
          :to="{path: item.path}"
          :class="item.icon"
          v-if="index<7"
        >
          <p>{{item.textname}}</p>
        </router-link>
      </ul>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { myAbout } from "@/router/config";
import { session } from "@/libs/utils";

const userInfoUrl = "/tuser/get/userInfo";
export default {
  name: "My",
  data() {
    return {
      getList: [
        {
          name: "待付款",
          pathTo: "/myaccess/getOrderList/0",
          icon: "getstatus0",
          status: 0
        },
        {
          name: "待发出",
          pathTo: "/myaccess/getOrderList/1",
          icon: "getstatus1",
          status: 1
        },
        {
          name: "待收货",
          pathTo: "/myaccess/getOrderList/2",
          icon: "getstatus2",
          status: 2
        },
        {
          name: "发出感谢",
          pathTo: "/myaccess/userVideo/1",
          icon: "getVideo",
          status: 1
        }
      ],
      sendList: [
        {
          name: "赠送中",
          pathTo: "/myaccess/sendOrderList/0",
          icon: "sendstatus0",
          status: 0
        },
        {
          name: "待发出",
          pathTo: "/myaccess/sendOrderList/1",
          icon: "sendstatus1",
          status: 1
        },
        {
          name: "待收货",
          pathTo: "/myaccess/sendOrderList/2",
          icon: "getstatus2",
          status: 2
        },
        {
          name: "收到感谢",
          pathTo: "/myaccess/userVideo/0",
          icon: "getVideo",
          status: 0
        }
      ],
      myList: myAbout,
      userId: JSON.parse(session.getItem("user")).userId,
      user: {}
    };
  },
  mixins: [Ajax],
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    });
    this.get(userInfoUrl, {
      userId: this.userId
    }).then(body => {
      this.user = body;
    });
  },
  methods: {
    statusFun(msg) {
      session.setItem("status", msg);
    }
  }
};
</script>

<style scoped>
  .my-content {
    background: #f4f4f4;
  }

  /*用户信息*/
  .my-top-info {
    padding: 0 .3rem;
    background: url("../../images/my/top_bg.png") no-repeat center -2.2rem/100% auto;
  }

  .my-userImgs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: .5rem 0;
  }

  .my-userImgs p:nth-child(1) {
    width: 1.60rem;
    height: 1.6rem;
    border: solid 0.05rem #fff;
    border-radius: 50%;
    overflow: hidden;
    margin-right: .3rem;
    background: #fff;
  }

  .my-userImgs p:nth-child(1) > img {
    width: 100%;
    height: 100%;
  }
  .my-userImgs p:nth-child(2){
    width:5.4rem;
  }
  .my-userImgs p:nth-child(2) > span:nth-child(1) {
    display: block;
    font-size: .6rem;
    color: #ffffff;
  }

  .my-userImgs p:nth-child(2) > span:nth-child(2) {
    display: block;
    width: 2.2rem;
    height: .7rem;
    background-color: #fff;
    border-radius: .35rem;
    font-size: .36rem;
    color: #717171;
    text-align: center;
    line-height: .7rem;
    margin-top: .2rem;
  }
  .my-userImgs p:nth-child(3){
    font-size: .38rem;
    color: #fff;
  }

  /*订单*/
  .my-trans {
    background: #fff;
    height: 6.44rem;
    padding: .3rem;
    background-color: #fff;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.23);
    border-radius: .3rem;
    box-sizing: border-box;
  }

  .my-trans-top-box > p, .my-trans-bottom-box > p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
  }

  .my-trans-bottom-box > p {
    margin-top: .3rem;
  }

  .my-trans-top-box > p > span:nth-child(1), .my-trans-bottom-box > p > span:nth-child(1) {
    color: #000;
  }

  .my-trans-top-box > p > span:nth-child(2), .my-trans-bottom-box > p > span:nth-child(2) {
    color: #717171;
  }

  .my-trans-top, .my-trans-bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: .4rem 0 .3rem;
    border-bottom: 1px solid #f4f4f4;
  }

  .my-trans-top > p > span:nth-child(2), .my-trans-bottom > p > span:nth-child(2) {
    color: #999;
    font-size:.4rem;
  }

  .my-trans-bottom {
    border-bottom: none;
  }

  .my-trans-icons {
    width: .74rem;
    height: .56rem;
    display: block;
    margin: 0 auto .2rem;
  }
  .getstatus0{
    background: url("../../images/my/getstatus0.png") no-repeat center/100% 100%;
  }
  .getstatus1{
    background: url("../../images/my/getstatus1.png") no-repeat center/100% 100%;
  }
  .getstatus2{
    background: url("../../images/my/getstatus2.png") no-repeat center/100% 100%;
  }
  .getVideo{
    background: url("../../images/my/getVideo.png") no-repeat center/100% 100%;
  }
  .sendstatus0{
    background: url("../../images/my/sendStatus0.png") no-repeat center/100% 100%;
  }
  .sendstatus1{
    background: url("../../images/my/sendStatus1.png") no-repeat center/100% 100%;
  }
  /*订单end*/
  /*糖果*/
  .my-candy-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.8rem;
    background-color: #fff;
    border-radius: .89rem;
    margin: .3rem;
    padding: 0 .4rem;
  }

  .my-candy-box > p:nth-child(1) > span {
    font-size: .5rem;
    color: #000;
    vertical-align: middle;
  }

  .my-candy-box > p:nth-child(1) > span:nth-child(2) {
    color: #de2245;
    background: url("../../images/home/ic_jelly.png") no-repeat .1rem center/.85rem .76rem;
    padding-left: 1.05rem;
    display: inline-block;
    height:.8rem;
    line-height: .8rem;
  }

  .my-go-candy {
    width: 2.50rem;
    height: 1rem;
    background-image: linear-gradient(-30deg,
    #de2245 0%,
    #ed577b 100%);
    border-radius: .5rem;
    text-align: center;
    line-height: 1rem;
    font-size: .4rem;
    color: #fff;
  }
  /*糖果end*/
  /*list*/
  .my-user-box {
    background: #fff;
  }

  .my-user-box li {
    height: 1.54rem;
    line-height: 1.54rem;
    padding: 0 .5rem 0 1.2rem;
    border-bottom: 1px solid #f4f4f4;
  }
  .myList0{
     background: url("../../images/my/mylist0.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList1{
    background: url("../../images/my/mylist1.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList2{
    background: url("../../images/my/mylist2.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList3{
    background: url("../../images/my/mylist3.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList4{
    background: url("../../images/my/mylist4.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList5{
    background: url("../../images/my/mylist5.png") no-repeat .5rem center/.49rem .48rem;
  }
  .myList6{
    background: url("../../images/my/mylist6.png") no-repeat .5rem center/.49rem .48rem;
  }

  .my-user-box li p {
    font-size:.5rem;
    color: #171717;
    background: url("../../images/my/icon_right.png") no-repeat right center/.32rem .53rem;
  }
  /*list end*/
</style>

