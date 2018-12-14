<template>
  <div class="collect-box">
    <V-Scroll :scroll-height="`${mainHeight}px`">
      <ul class="tab">
        <li :class="{selected: sel == i}" v-for="(v,i) in tabList" @click="sel = i" :key="i">{{v.name}}</li>
      </ul>
      <div class="col-content" v-show="sel == 0">
        <div class="col-list">
          <img src="../../images/userInfos/share-icon.png" alt="">
          <div class="info">
            <h5>【转卖】时尚黄色汽车儿童收纳凳</h5>
            <p>时尚的很进本是新的，蛮喜欢的快点买，时尚的很进本是新的，蛮喜欢的快点买</p>
            <span><i class="tip-icon"></i>7300</span>
          </div>
        </div>
      </div>
      <!--收藏的故事-->
      <div class="grate-list Video" v-show="sel == 1">
        <div class="grate-con">
          <p class="head">
              <span>
                <img src="../../images/userInfos/headbg.png" alt="">
                <em>安立幸恵</em>
              </span>
            <span>上海</span>
          </p>
          <div class="video">
            <i class="play"></i>
          </div>
          <div class="bom">
            <p>时尚的很进本是新的，蛮喜欢的快点买，本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷</p>
            <div class="review">
              <p><span><i class="icon laud selected"></i>9800</span></p>
              <p><span><i class="icon heart"></i>98</span></p>
            </div>
          </div>
        </div>
        <div class="grate-con">
          <p class="head">
              <span>
                <img src="../../images/userInfos/headbg.png" alt="">
                <em>安立幸恵</em>
              </span>
            <span>上海</span>
          </p>
          <div class="video">
            <i class="play"></i>
          </div>
          <div class="bom">
            <p>时尚的很进本是新的，蛮喜欢的快点买，本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷</p>
            <div class="review">
              <p><span><i class="icon laud selected"></i>9800</span></p>
              <p><span><i class="icon heart"></i>98</span></p>
            </div>
          </div>
        </div>
        <div class="grate-con">
          <p class="head">
              <span>
                <img src="../../images/userInfos/headbg.png" alt="">
                <em>安立幸恵</em>
              </span>
            <span>上海</span>
          </p>
          <div class="video">
            <i class="play"></i>
          </div>
          <div class="bom">
            <p>时尚的很进本是新的，蛮喜欢的快点买，本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷本人的阻碍，室内好不下，登记局十字街万询价了。好不好储蓄卡机满了爷</p>
            <div class="review">
              <p><span><i class="icon laud selected"></i>9800</span></p>
              <p><span><i class="icon heart"></i>98</span></p>
            </div>
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
        sel: 0,
        tabList: [
          {name: '收藏的宝贝',num: 0},
          {name: '收藏的故事',num: 1}
        ]
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
  .col-content{
    padding: 0 0.3rem;
  }
  .col-list{
    display: flex;
    margin-top: 0.3rem;
    height: 3rem;
    background: #fff;
  }
  .col-list img{
    width: 3rem;
    height: 3rem;
    background: green;
  }
  .col-list .info{
    width: 70%;
    padding: 0.36rem 0.25rem 0 0.3rem;
  }
  .col-list .info>h5{
    font-size: 0.45rem;
    color: #353535;
  }
  .col-list .info>p{
    margin-top: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 0.39rem;
    color: #888;
  }
  .col-list .info>span{
    display: block;
    margin-top: 0.62rem;
    font-size: 0.54rem;
    color: #de2245;
  }
  .tip-icon{
    display: inline-block;
    margin-right: 0.2rem;
    width: 0.57rem;
    height: 0.5rem;
    background: url("../../images/home/ic_jelly.png") no-repeat center/contain;
  }

  .grate-list{
    padding: 0 0.3rem;
  }
  .grate-con{
    margin-top: 0.3rem;
    background: #fff;
  }
  .grate-con .head{
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    height: 1.51rem;
    line-height: 1.51rem;
    font-size: 0.42rem;
    color: #888;
  }
  .grate-con .head img{
    width: 0.96rem;
    height: 0.96rem;
    border-radius: 50%;
    vertical-align: middle;
  }
  .grate-con .head em{
    font-size: 0.42rem;
    color: #353535;
  }
  .grate-con .video{
    display:flex;
    justify-content:center;
    height: 5.1rem;
    background: #ccc8c5;
  }
  .grate-con .video .play{
    margin: auto;
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background: url("../../images/userInfos/play-icon.png") no-repeat center/contain;
  }
  .grate-con .bom{
    padding: 0 0.3rem;
  }
  .grate-con .bom>p{
    margin-top: 0.3rem;
    font-size: 0.39rem;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .grate-con .bom .review{
    margin-top: 0.3rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f4f4f4;
  }
  .grate-con .bom .review>p{
    width: 50%;
    height: 1.34rem;
    line-height: 1.34rem;
    text-align: center;
  }
  .grate-con .review .icon{
    display: inline-block;
    margin-right: 0.14rem
  }
  .grate-con .review .laud{
    width: 0.36rem;
    height: 0.36rem;
    background: url("../../images/userInfos/laud-icon.png") no-repeat center/contain;
  }
  .grate-con .review .heart{
    width: 0.44rem;
    height: 0.37rem;
    background: url("../../images/userInfos/heart-icon.png") no-repeat center/contain;
  }
  .grate-con .review .laud.selected{
    background: url("../../images/userInfos/laud-selected-icon.png") no-repeat center/contain;
  }
  .grate-con .review .heart.selected{
    background: url("../../images/userInfos/heart-selected-icon.png") no-repeat center/contain;
  }
</style>
