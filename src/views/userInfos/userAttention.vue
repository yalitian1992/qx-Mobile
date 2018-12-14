<template>
  <div class="atten-box">
    <V-Scroll :scroll-height="`${mainHeight}px`" :pulldown="getFansList" :autoLoad="false" :on-scroll-bottom="getFansList">
      <div class="atten-list">
        <div class="li" v-for="(fanV,fanI) in fansData.items">
          <img :src="fanV.userAvatar" alt="">
          <div>
            <p class="tit">{{fanV.userName}}</p>
            <p class="txt">
              <span>发布：{{fanV.publishGoods}}</span>
              <span class="spac">粉丝：{{fanV.fansCount}}</span>
            </p>
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

const fansList = "/userfans/get/page"

  export default {
//  name: "Home",
    data() {
      return {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,
        fansData: []
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    },
    methods: {
      getFansList: function () {
        return this.post(fansList, {
          userId: this.userId,
          startPage: 1
        }).then(body => {
          this.fansData = body
          if(this.fansData.items == 0){
            return false
          }
          return body
        })
      }
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
  margin-left: 1.5rem;
}
</style>
