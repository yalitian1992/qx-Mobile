<template>
  <div class="exchange-box">
    <ul class="code">
      <li>
        <p>手机号</p>
        <input type="number" v-model="phone" placeholder="请输入手机号"
               oninput="if(value.length>11)value=value.slice(0,11)">
      </li>
      <li class="yz">
        <p>验证码</p>
        <input type="text" maxlength="6" v-model="code" placeholder="请输入6位验证码">
        <span class="yz-code" @click="checkForm(1,phone) ? verFun() : '' ">{{codeTxt}}</span>
      </li>
    </ul>
    <p class="btn" @click="checkForm(2,phone,code) ? subCode() : '' ">提交</p>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";
//获取验证码
const VerCode="/tuser/put/verificationCode"
//提交验证码
const SubCode="/tuser/put/verification"

  export default {
//  name: "Home",
    data() {
      return {
        phone: '',
        code: '',
        codeTxt: '获取验证码',
        countdown: 60,       //倒计时
        sendMsgDisabled: false
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {

    },
    methods: {
//      表单验证
      checkForm: function (type, phone, code) {
        if (!phone) {
          this.toast("手机号不能为空！")
          return false
        } /*else if (!/^[1][3578]\\d{9}$/.test(phone)) {
          this.toast("请输入正确手机号！")
          return false
        }*/
        if(type == 2){
          if (!code) {
            this.toast("请输入验证码！")
            return false
          }
        }
        return true
      },
//      验证码倒计时
      setTime: function () {
        var _this = this;
        _this.sendMsgDisabled = true;
        let interval = window.setInterval(function() {
          if ((_this.countdown--) <= 0) {
            _this.codeTxt = "请重新发送"
            _this.countdown = 60;
            _this.sendMsgDisabled = false;
            window.clearInterval(interval);
          }else{
            _this.codeTxt = `${_this.countdown}秒`
          }
        }, 1000);
      },
//      获取验证码
      verFun: function () {
        this.setTime()
        this.post(VerCode, {
          mobile: this.phone,
        }).then(body => {
          console.log(body)
        });
      },
//      提交验证码
      subCode: function () {
        this.post(SubCode, {
          mobile: this.phone,
          code: this.code
        }).then(body => {
          console.log(body)
        });
      },
    }
  };
</script>

<style scoped>
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
  .code li.yz input{
    width: 50%;
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
  .yz-code{
    position: relative;
    top: .21rem;
    width: 2.83rem;
    height: 0.99rem;
    line-height: 0.99rem;
    text-align: center;
    border-radius: 0.5rem;
    font-size: 0.42rem;
    color: #de2245;
    border: 1px solid #de2245;
  }
</style>
