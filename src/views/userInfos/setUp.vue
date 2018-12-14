<template>
  <div class="setup-box">
    <ul>
      <router-link tag="li"
                   :to="{path:'/'}">
        <span class="L">收货地址</span>
        <span class="R"><i class="icon"></i></span>
      </router-link>
      <router-link tag="li"
                   :to="{path:'/bindPhone'}">
        <span class="L">绑定手机</span>
        <span class="R">{{pStr(mobile)}}<i class="icon"></i></span>
      </router-link>
      <router-link tag="li"
                   :to="{path:'/ModifyPwd'}">
        <span class="L">修改密码</span>
        <span class="R"><i class="icon"></i></span>
      </router-link>
      <li>
        <span class="L">客服电话</span>
        <span class="R">{{telphone}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";
//我的设置
const SetupList = "/tuser/get/mySetting"

  export default {
//  name: "Home",
    data() {
      return {
        mobile: '',      //绑定手机号
        telphone: ''     //客服电话
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.post(SetupList, {
      }).then(body => {
        this.mobile = body.mobile
        this.telphone = body.telphone
      });
    },
    methods: {
//      手机号中间四位星号代替
      pStr: function (para) {
        return para.substr(0,3)+"****"+para.substr(7);
      }
    }
  };
</script>

<style scoped>
.setup-box{
  width: 100%;
}
.setup-box ul{
  margin-top: 0.3rem;
  background: #fff;
}
.setup-box ul li{
  display: flex;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0.3rem 0.4rem;
}
.setup-box ul li .icon{
  display: inline-block;
  margin-left: 0.28rem;
  width: 0.23rem;
  height: 0.42rem;
  vertical-align: middle;
  background: url("../../images/icon-arrow-right.png") no-repeat center/100% 100%;
}
</style>
