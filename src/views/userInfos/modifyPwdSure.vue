<template>
  <div class="exchange-box">
    <div class="head-tip">
      <h4>请为您的账号设置新密码</h4>
    </div>
    <ul class="code">
      <li>
        <p>新密码</p>
        <input type="text" maxlength=6 v-model="pwd" placeholder="请输入8-20位字母或数字">
      </li>
    </ul>
    <p class="btn" @click="checkForm(pwd)">保存新密码</p>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

  export default {
//  name: "Home",
    data() {
      return {
        pwd: ''
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    },
    methods: {
      checkForm: function (pwd) {
        if(!pwd){
          this.toast("请输入新密码！")
          return false
        }
        return true
      }
    }
  };
</script>

<style scoped>
  .head-tip{
    padding: 0.8rem 0;
    text-align: center;
  }
  .head-tip h4{
    font-size: 0.6rem;
    color: #000;
  }
  .exchange-box .code{
    margin-top: 0.3rem;
    background: #fff;
    color: #353535;
  }
  .code li{
    padding: 0 0.3rem;
    display: flex;
    height: 1.48rem;
    line-height: 1.48rem;
  }
  .code li p{
    font-size: 0.48rem;
  }
  .code li input{
    margin-left: 0.8rem;
    width: 73%;
    font-size: 0.45rem;
    border: none;
    outline:none;
  }
  .code li input::-webkit-input-placeholder{
    font-size: 0.44rem;
    color:#ccc;
  }
  .code li input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: 0.44rem;
    color:#ccc;
  }
  .code li input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: 0.44rem;
    color:#ccc;
  }
  .code li input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    font-size: 0.44rem;
    color:#ccc;
  }
  .exchange-box .btn{
    margin: 0.9rem auto 0 auto;
    width: 10.05rem;
    height: 1.32rem;
    border-radius: 0.66rem;
    line-height: 1.32rem;
    text-align: center;
    font-size: 0.54rem;
    color: #fff;
    background: #de2245;
  }
</style>
