<template>
  <div class="auction-box">
    <V-Scroll :scroll-height="`${mainHeight}px`" :pulldown="getAucList" :autoLoad="false" :on-scroll-bottom="getAucList">
      <ul class="tab">
        <li :class="{selected: sel == i}" v-for="(v,i) in tabList" @click="sel = i" :key="i">{{v.name}}</li>
      </ul>
      <div class="pro-list Sha">
        <div class="re-pro-single" v-for="(aucV, aucI) in aucInfo.items" :key="aucI">
          <div class="reHead">
            <img src="../../images/userInfos/headbg.png" alt="">
            <span>{{aucV.publishUserName}}</span>
          </div>
          <img :src="aucV.goodsUrl" alt="">
          <div class="info">
            <p class="name">{{aucV.goodsName}}</p>
            <div class="re-goods">
              <p class="price-num"><i></i><span>{{aucV.integral}}</span></p>
              <p class="user-info"><img src="../../images/userInfos/heard-icon-col.png" alt=""><span>{{aucV.favorityCount}}</span></p>
            </div>
          </div>
          <!--爱心数字-->
          <!--<span class="love-num">
            <em class="icon-love"></em>
            <em class="num">98</em>
          </span>-->
          <!--<i class="tip sell">竞拍</i>-->
          <!--<i class="tip audit">审核中</i>-->
        </div >
      </div>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

const auctionUrl = "/auction/get/page"

  export default {
//  name: "Home",
    data() {
      return {
        sel: 0,
        tabList: [
          {name: '竞拍中',num: 0},
          {name: '已送出',num: 1}
        ],
        aucInfo: []
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    },
    methods: {
      getAucList: function () {
        return this.post(auctionUrl, {
          auctionStatus: 0,      //0：竞拍中  1：已送出
          userId: '3098',
          startPage: 1
        }).then(body => {
          this.aucInfo = body
          if(this.aucInfo.items == 0){
            return false
          }
          return body
        });
      }
    }
  };
</script>

<style scoped>
.tab{
  display: flex;
  justify-content: space-between;
  height: 1.92rem;
  line-height: 1.92rem;
  text-align: center;
  font-size: 0.54rem;
  color: #666;
  background: #fff;
}
.tab li{
  width: 50%;
}
.tab li.selected{
  color: #de2245;
  box-sizing: border-box;
  border-bottom: 0.09rem solid #de2245;
}

.pro-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.3rem;
  background: #f8f8f8;
}
.reHead{
  width: 100%;
  /*height: 1.4rem;*/
  padding: 0.34rem 0.2rem 0.25rem 0.2rem;
}
.reHead img{
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}
.reHead span{
  font-size: 0.39rem;
}
.release-box .share{
  position: fixed;
  top: 1.44rem;
  right: 0.36rem;
  width: 1.11rem;
  height: 1.11rem;
  background: url("../../images/userInfos/share-icon.png") no-repeat center/contain;
}
.head-box{
  width: 100%;
  height: 7.8rem;
  background: url("../../images/userInfos/headbg.png") no-repeat center/100% 100%;
}
.head-content{
  padding-top: 0.69rem;
  text-align: center;
  font-size: 0.36rem;
}
.head-content img{
  display: block;
  margin: 0 auto;
  width: 1.97rem;
  height: 1.97rem;
  border-radius: 50%;
  border: solid 0.06rem #fff;
  background: green;
}
.head-content h4{
  margin-top: 0.35rem;
  font-size: 0.5rem;
}
.head-content .level{
  margin-top: 0.25rem;
}
.head-content .level>span{
  position: relative;
}
.head-content .level .re-R{
  margin-left: 0.92rem;
}
.tipLogo{
  display: block;
  position: absolute;
  left: -0.4rem;
  top: 0;
}
.tipLogo.L{
  width: 0.27rem;
  height: 0.41rem;
  background: url("../../images/userInfos/map-icon.png") no-repeat center/contain;
}
.tipLogo.R{
  width: 0.39rem;
  height: 0.43rem;
  background: url("../../images/userInfos/map-icon.png") no-repeat center/contain;
}
.head-content .atten{
  margin: 0.25rem auto 0 auto;
  width: 46%;
  display: flex;
  justify-content: space-between;
}
.head-content .atten p{
  padding: 0.27rem 0.5rem;
  border-radius: 0.6rem;
}
.head-content .atten p.L{
  background: #ccc;
}
.head-content .atten p.R{
  color: #fff;
  background: linear-gradient(-30deg, #de2245 0%,#ed577b 100%);
}
.head-content .head-list{
  margin: 1.2rem auto 0 auto;
  width: 75%;
  display: flex;
  justify-content: space-between;
}
.head-content .head-list a{
  text-decoration: none;
  color: #353535;
}
.head-content .head-list dl{
  font-size: 0.45rem;
  color: #de2245;
}
.release-content .tab-list{
  display: flex;
  justify-content: space-between;
}
.release-content .tab-list li{
  width: 50%;
  height: 1.89rem;
  line-height: 1.89rem;
  background: #fff;
  font-size: 0.45rem;
  text-align: center;
}
.release-content .tab-list li.selected span{
  padding: 0.24rem 0.61rem;
  border-radius: 5rem;
  color: #fff;
  background: linear-gradient(-30deg,#de2245 0%,#ed577b 100%);
}
.release-content .pro-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.3rem;
  background: #f8f8f8;
}
.re-pro-single{
  position: relative;
  margin:0.3rem 0 0 0;
  width: 5.18rem;
  height: 9rem;
  border-radius: 0.36rem;
  overflow: hidden;
  background: #fff;
}
.re-pro-single .tip{
  font-style: normal;
  display: block;
  position: absolute;
  top: 1.4rem;
  padding: 0 0.2rem;
  height: 0.58rem;
  line-height: 0.58rem;
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
}
.re-pro-single .tip.sell{
  background: #d11135;
  border-bottom-right-radius: 0.36rem;
}
.re-pro-single .tip.audit{
  right: 0;
  background: #aaa;
  /*border-bottom-left-radius: 0.36rem;*/
}
.re-pro-single>img{
  width: 5.18rem;
  height: 5.18rem;
}
.re-pro-single>.info{
  padding: 0 0.3rem;
}
.re-pro-single>.info .name{
  height: 0.97rem;
  font-size: 0.39rem;
}
.re-pro-single>.info .re-goods{
  margin-top: 0.36rem;
}
.re-pro-single>.info .re-goods,.re-goods>p{
  display: flex;
  justify-content: space-between;
}
.re-goods .price-num i{
  display: block;
  margin-right: 0.04rem;
  width: 0.67rem;
  height: 0.42rem;
  background: url("../../images/home/ic_jelly.png") no-repeat center/contain;
}
.re-goods .user-info img{
  margin: 0 0.12rem;
  width: 0.49rem;
  height: 0.49rem;
}
.love-num{
  position: absolute;
  right: 0;
  top: 4.56rem;
  min-width: 1.52rem;
  height: 0.52rem;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.4);
  border-top-left-radius: 0.26rem;
  border-bottom-left-radius: 0.26rem;
  font-size: 0.36rem;
  color: #fff;
}
.love-num .icon-love{
  display: inline-block;
  width: 0.44rem;
  height: 0.37rem;
  background: url("../../images/home/dis_collect.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
  vertical-align: -1px;
}
.love-num .num{
  color: #fff;
  font-size: 0.36rem;
  font-weight: normal;
}
</style>
