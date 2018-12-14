<template>
  <div class="exchange-box">
    <div class="head-tip">
      <h4>安全性验证</h4>
      <p>验证码已发送至+86 17773119012</p>
    </div>
    <ul class="code">
      <li>
        <p>验证码</p>
        <input type="text" maxlength=6 v-model="code" placeholder="请输入6位验证码">
      </li>
    </ul>
    <p class="btn" @click="checkForm(code) ? nextPage() : '' ">下一步</p>
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
        code: ''
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    },
    methods: {
      checkForm: function (code) {
        if(!code){
          this.toast("请输入验证码！")
          return false
        }
        return true
      },
      nextPage: function () {
        this.$router.push({
          path: '/ModifyPwdSure',
          query: {

          }
        })
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
  .head-tip p{
    margin-top: 0.24rem;
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
    letter-spacing: 2px;
    color: #fff;
    background: #de2245;
  }
</style>
