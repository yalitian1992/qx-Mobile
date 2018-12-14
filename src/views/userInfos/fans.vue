<template>
  <div class="atten-box">
    <V-Scroll :scroll-height="`${mainHeight}px`">
      <div class="atten-list">
        <div class="li">
          <img src="../../images/userInfos/headbg.png" alt="">
          <div class="li-right">
            <div>
              <p class="tit">画苑冠冕</p>
              <p class="txt">
                <span>发布：2</span>
                <span class="spac">粉丝：1</span>
              </p>
            </div>
            <p class="atten-btn">关注</p>
          </div>
        </div>
      </div>
    </V-Scroll>
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

      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    },
    methods: {

    }
  };
</script>

<style scoped>
  .atten-list .li{
    display: flex;
    height: 1.2rem;
    padding: 0.4rem 0.3rem;
    background: #fff;
  }
  .atten-list .li img{
    margin-right: 0.19rem;
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    border-radius: 50%;
  }
  .atten-list .li .tit{
    font-size: 0.45rem;
    color: #353535;
  }
  .atten-list .li .txt{
    font-size: 0.36rem;
    color: #888;
  }
  .atten-list .li .txt>span{
    width: 50%;
  }
  .spac{
    margin-left: 0.6rem;
  }
  .atten-list .li-right{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .atten-btn{
    margin-top: 0.16rem;
    width: 2rem;
    height: 0.89rem;
    line-height: 0.89rem;
    text-align: center;
    border-radius: 0.16rem;
    background: #cb383b;
  }
</style>
