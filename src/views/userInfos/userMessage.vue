<template>
  <div class="message-box">
    <V-Scroll :scroll-height="`${mainHeight}px`" :pulldown="getChatList" :autoLoad="false" :on-scroll-bottom="getChatList">
      <ul class="tab">
        <li :class="{selected: sel == i}" v-for="(v,i) in tabList" @click="sel = i" :key="i">
          <span><em v-show="sel != i">2</em>{{v.name}}</span>
        </li>
      </ul>
      <!--聊天消息-->
      <div class="atten-list" v-show="sel == 0">
        <div class="li">
          <div class="L">
            <img src="../../images/userInfos/headbg.png" alt="">
          </div>
          <div class="R">
            <p class="txt">
              <span class="nickname">画苑冠冕</span>
              <span class="spac">5小时前</span>
            </p>
            <p class="tit">能拍下您的产品编号吗？能拍下您的产品编号吗？能拍下您的产品编号吗？</p>
          </div>
        </div>
        <div class="li">
          <div class="L">
            <img src="../../images/userInfos/headbg.png" alt="">
          </div>
          <div class="R">
            <p class="txt">
              <span class="nickname">画苑冠冕</span>
              <span class="spac">5小时前</span>
            </p>
            <p class="tit">能拍下您的产品编号吗？能拍下您的产品编号吗？能拍下您的产品编号吗？</p>
          </div>
        </div>
        <div class="li">
          <div class="L">
            <img src="../../images/userInfos/headbg.png" alt="">
          </div>
          <div class="R">
            <p class="txt">
              <span class="nickname">画苑冠冕</span>
              <span class="spac">5小时前</span>
            </p>
            <p class="tit">能拍下您的产品编号吗？能拍下您的产品编号吗？能拍下您的产品编号吗？</p>
          </div>
        </div>
      </div>
      <!--系统消息-->
      <div class="atten-list" v-show="sel == 1">
        <div class="li">
          <div class="R">
            <p class="txt">
              <span class="nickname">系统消息</span>
              <span class="spac">2018-05-31 18:17:52</span>
            </p>
            <p class="tit">能拍下您的产品编号吗？能拍下您的产品编号吗？能拍下您的产品编号吗？</p>
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

const chatList = "	/chatroom/list"

  export default {
//  name: "Home",
    data() {
      return {
        sel: 0,
        tabList: [
          {name: '聊天消息',num: 0},
          {name: '系统消息',num: 1}
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
      getChatList: function () {
        return this.post(chatList, {}).then(body => {
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
  .tab li span{
    position: relative;
  }
  .tab li span>em{
    position: absolute;
    top: -0.18rem;
    right: -0.18rem;
    display: block;
    width: 0.34rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.24rem;
    color: #fff;
    background-image: linear-gradient(-30deg,#de2245 0%,#ed577b 100%);
  }
  .tab li.selected span{
    padding: 0.24rem 0.41rem;
    border-radius: 0.45rem;
    color: #fff;
    background-image: linear-gradient(-30deg,#de2245 0%,#ed577b 100%);
  }

  .atten-list{
    margin-top: 0.3rem;
  }
  .atten-list .li{
    display: flex;
    height: 1.2rem;
    padding: 0.4rem 0.3rem;
    background: #fff;
    border: 1px solid #f4f4f4;
  }
  .atten-list .li img{
    margin-right: 0.19rem;
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
    border-radius: 50%;
  }
  .atten-list .li .R{
    width: 100%;
  }
  .atten-list .li .tit{
    margin-top: 0.2rem;
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 0.36rem;
    color: #888;
  }
  .atten-list .li .txt{
    display: flex;
    justify-content: space-between;
    font-size: 0.36rem;
    color: #888;
  }
  .atten-list .li .txt .nickname{
    font-size: 0.45rem;
    color: #353535;
  }
  .spac{
    margin-left: 1.5rem;
  }
</style>
