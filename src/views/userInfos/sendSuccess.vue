<template>
  <div class="send-content">
    <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`">
      <div class="sendSuccess-main">
        <img src="../../images/userInfos/send_success.png" alt="">
        <p>提交成功!</p>
        <p>您的取件申请已提交成功！平台稍后会给您预约快递<br/>
          上门取件，请耐心等待，谢谢！</p>
      </div>
      <router-link class="return-home" tag="div" to="/home">返回首页 </router-link>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

export default {
  name: "orderDetail",
  data() {
    return {};
  },
  mixins: [Ajax],
  components: {},
  mounted() {
  },
  methods: {}
};
</script>
<style scoped>
  .send-content{
    background: #fff;
    position: relative;
  }
  .sendSuccess-main{
    margin-top:3rem;
    text-align: center;
  }
  .sendSuccess-main > img{
    width:2.93rem;
    height:3.67rem;
  }
  .sendSuccess-main >p:nth-child(2){
    font-size: .72rem;
    color: #de2245;
    margin:.3rem auto;
  }
  .sendSuccess-main >p:nth-child(3){
    font-size:.42rem;
    color: #888;
  }
  .return-home{
    position: absolute;
    bottom:1rem;
    left:0;
    right: 0;
    text-align: center;
    font-size: .48rem;
    color: #de2245;
  }
</style>

