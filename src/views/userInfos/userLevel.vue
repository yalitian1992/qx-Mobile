<template>
  <div class="userLevel-box">
    <div class="level-head">
      <img class="logo" :src="levelImg" alt="">
      <p class="txt">当前等级:{{levelNum}}级</p>
      <div class="progress">
        <div class="levelNum">
          <p>
            <span v-for="(vN,iN) in Num" :key="iN"><em :class="{selected: levelNum == iN}">{{vN.name}}</em></span>
          </p>
        </div>
        <ul>
          <li v-for="(v,i) in Level" :key="i"></li>
        </ul>
      </div>
    </div>
    <div class="ins">
      <h4>您的等级由以下确定</h4>
      <p><i></i><span>成功送出宝贝数量</span></p>
      <p><i></i><span>送出宝贝质量</span></p>
      <p><i></i><span>粉丝数量</span></p>
    </div>
    <div class="senior-ins">
      <h3>高等级用户可以获得以下权限</h3>
      <div class="txt">
        <h4>“送出的宝贝糖果立即到账”特权</h4>
        <p>高等级用户在发货后，系统会立即将糖果转入账户。将享受免7天等待糖果入账时间。</p>
      </div>
      <div class="txt">
        <h4>“透支小糖果换宝贝”特权</h4>
        <p>高等级用户将拥有透支小糖果特权.<br>3级1000颗，4级3000颗，5级5000颗。</p>
      </div>
    </div>
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
        levelNum: 3,
        levelImg: '',
        Num: [
          {name: "0"},
          {name: "V1"},
          {name: "V2"},
          {name: "V3"},
          {name: "V4"},
          {name: "V5"}
        ],
        Level: []
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.levelImg = require(`../../images/userInfos/level${this.levelNum}.png`)

      for(var i=0;i<3;i++){
        this.Level.push("");
      }
    },
    methods: {

    }
  };


</script>

<style scoped>
.level-head{
  padding: 0.46rem 0 0 0;
  height: 6rem;
  background: #fddae0;
}
.level-head .logo{
  display: block;
  margin: 0 auto;
  width: 2.72rem;
  height: 3.01rem;
}
.level-head .txt{
  margin-top: 0.38rem;
  text-align: center;
  font-size: 0.45rem;
  color: #353535;
}
.level-head .progress{
  position: relative;
  margin: 1.22rem auto 0 auto;
  width: 10.49rem;
  background: #fff;
}
.progress .levelNum{
  position: absolute;
  top: -0.96rem;
  font-size: 0.36rem;
  color: #888;
}
.progress .levelNum span{
  display: inline-block;
  width: 1.94rem;
}
.progress .levelNum span:last-child{
  width: 0.4rem;
}
.progress .levelNum span em{
  display: inline-block;
  width: 0.6rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}
.progress .levelNum span em.selected{
  color: #fff;
  background: url("../../images/userInfos/level-icon.png") no-repeat center/contain;
}


.level-head .progress,.level-head .progress ul{
  height: 0.3rem;
  /*overflow: hidden;*/
  border-radius: 0.15rem;
}
.level-head .progress ul{
  position: absolute;
  display: flex;
  background-image: linear-gradient(-90deg,#de2245 0%,#ed577b 100%);
}
.level-head .progress li{
  position: relative;
  width: 2.098rem;
  height: 100%;
  display: inline-block;
}
.level-head .progress li:before{
  display: block;
  content: "";
  height: 100%;
  width: 1px;
  background: #fff;
}
.level-head .progress li:first-child:before{
  background: none;
}
.ins{
  padding: 0.3rem 0.47rem 0.5rem 0.47rem;
  background: #fff;
}
.ins h4{
  font-size: 0.45rem;
  color: #353535;
}
.ins p{
  margin-top: 0.28rem;
  font-size: 0.36rem;
  color: #888;
}
.ins p>i{
  margin-right: 0.1rem;
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  background: url("../../images/userInfos/ins-icon.png") no-repeat center/contain;
}
.senior-ins{
  margin-top: 1px;
  padding: 0.5rem 0 0.59rem 0;
  background: #fff;
}
.senior-ins h3{
  margin: 0 auto;
  width: 7.5rem;
  height: 1.1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.45rem;
  font-weight: normal;
  color: #fff;
  background: url("../../images/userInfos/senior-ins-bg.png") no-repeat center/contain;
}
.senior-ins .txt{
  padding: 0.54rem 0.35rem 0 0.55rem;
}
.senior-ins .txt h4{
  font-size: 0.45rem;
  color: #353535;
}
.senior-ins .txt p{
  margin-top: 0.2rem;
  font-size: 0.36rem;
  color: #888;
}
</style>
