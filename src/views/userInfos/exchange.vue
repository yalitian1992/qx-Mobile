<template>
  <div class="exchange-box">
    <div class="code">
      <p>兑换号码</p>
      <input type="text" v-model="code" placeholder="请输入兑换号码">
    </div>
    <button class="btn" @click="checkForm(code) ? CodeF() : '' ">兑换</button>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

const codeList = '/redeemcode/put/code'

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
          this.toast("请输入兑换码！")
        }
      },
      CodeF: function () {
        this.post(codeList, {
          userId: '3098',
          code: this.code
        }).then(body => {
          this.toast(body.errMsg)
        });
      }
    }
  };
</script>

<style scoped>
.exchange-box .code{
  margin-top: 0.3rem;
  padding: 0 0.3rem;
  display: flex;
  height: 1.48rem;
  line-height: 1.48rem;
  background: #fff;
  color: #353535;
}
.code>p{
  font-size: 0.48rem;
}
.code>input{
  margin-left: 0.8rem;
  width: 73%;
  font-size: 0.45rem;
  border: none;
  outline:none;
}
.code>input::-webkit-input-placeholder{
  font-size: 0.44rem;
  color:#ccc;
}
.code>input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  font-size: 0.44rem;
  color:#ccc;
}
.code>input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  font-size: 0.44rem;
  color:#ccc;
}
.code>input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  font-size: 0.44rem;
  color:#ccc;
}
.exchange-box .btn{
  display: block;
  margin: 0.3rem auto 0 auto;
  width: 10.05rem;
  height: 1.32rem;
  border-radius: 0.66rem;
  line-height: 1.32rem;
  font-size: 0.54rem;
  letter-spacing: 2px;
  color: #fff;
  background: #de2245;
}
</style>
