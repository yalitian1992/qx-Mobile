<template>
  <div class="story-content" >
    <ul class="tab" ref="filters">
      <li :class="{'selected' : sel ==0}">
        <p @click="sel =0">发出感谢</p>
      </li>
      <li :class="{'selected' : sel ==1}">
        <p @click="sel =1">收到感谢</p>
      </li>
    </ul>
    <V-Scroll ref="storyScroll" :scroll-height="`${mainHeight}px`" :autoLoad="false" :pulldown="upDate" :on-scroll-bottom="upDate">
      <div class="warp">
        <div class="storyList">
          <ul>
            <li v-for="(item, index) in storyList" :key="index">
              <div class="list-Top">
                <img src="../../images/home/release-goods.png" alt=""/>
                <p>{{item.fromName}}</p>
                <p>{{item.city}} </p>
              </div>
              <div class="list-center">
                <div class="video">
                  <p>{{item.urls[0].video}}</p>
                  <video id="myvideo" :src="item.urls[0].video" :poster="videoImg" :autoplay="playStatus" >
                  </video>
                  <p @click="viderShowClick(item.urls[0].video)">
                    <span></span>
                  </p>
                </div>
                <p @click="goStyryShow(item.fromId)">{{item.content}}</p>
              </div>
              <div class="list-bottom">
                <p @click="guide"><span></span>{{item.admireCount}}</p>
                <p @click="guide"><span></span>{{item.storeCount}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </V-Scroll>
    <div class="videoBox" v-if="viderShow">
      <video  controls="controls">
        <source :src='openPath' type="video/mp4"></source>
      </video>
      <div class="cloneBtn" @click="viderShow=false">退出播放</div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
/* eslint-disable */
import "swiper/dist/css/swiper.css";
import { session } from "@/libs/utils";
// 故事列表
const storyListlUrl = "/story/get/story/list";

  export default {
//  name: "Home",
    data() {
      return {
        sel: 5,
        tabList: [
          {name: '收藏的宝贝',num: 0},
          {name: '收藏的故事',num: 1}
        ],
        storyList: [],
        windWidth: window.innerHeight,
        viderShow:false,
        openPath:'',
        isPromise: false
      };
    },
    mixins: [Ajax],
    components: {},
    watch: {
      sel(nextValue){
        this.$refs.storyScroll.scrollTo(0, 0);
        session.setItem("status", nextValue);
        this.$refs.storyScroll.pending();
        this.upDate(0).then(body => {
          if (typeof body === "boolean") {
            // 如果列表没有数据，则更新提示状态
            this.$refs.storyScroll.notData();
          } else if (body.hasNextPage) {
            // 如果有数据则更改状态并把页码设置为下一页：1
            this.$refs.storyScroll.success(1);
          } else {
            this.$refs.storyScroll.notData("没有更多数据了");
          }
        });
      }
    },
    mounted() {
      this.sel = sessionStorage.getItem("status");
      this.$nextTick(() => {
        const filtersEl = this.$refs.filters;
        const filtersElHeight = this.getElHeight(filtersEl);
        this.mainHeight -= filtersElHeight;
      });
    },
    methods: {
      goStyryShow(id) {
        this.$router.push({ path: `/story/show/${id}` });
      },
      viderShowClick(path){
        this.viderShow = true
        this.openPath=path
      },
      guide() {
        this.$router.push({ path: "/guide/page" });
      },
      upDate(page) {
        page === 0 && (this.storyList = []);
        return this.post(storyListlUrl,{
          userId:JSON.parse(session.getItem("user")).userId,
          type: this.sel,  // 0发送的视频，1接受的视频integer无bodyfalse
          startPage: page,
          currentUserId: JSON.parse(session.getItem("user")).userId,
        }).then(body => {
          this.storyList = (this.storyList || []).concat(body.items);
          if (body.items.length <= 0) {
            return false;
          }
          return body;
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
    font-size:.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab li.selected p{
    color: #fff;
    width: 3rem;
    height: .9rem;
    background-image: linear-gradient(-30deg,
    #de2245 0%,
    #ed577b 100%);
    border-radius: .45rem;
    text-align: center;
    line-height: .9rem;
  }
  .story-content {
    background: #f1f1f1;
  }

  .banner {
    width: 100%;
    height: 4.14rem;
    background: #ccc;
  }

  .storyList {
    padding: 0 0.3rem;
    padding-bottom: 0.5rem;
  }

  .storyList li {
    width: 10.65rem;
    height: 9.16rem;
    background-color: #ffffff;
    border-radius: 0.09rem;
    margin-top: 0.3rem;
    padding-top: 0.3rem;
  }

  .list-Top img {
    width: 0.96rem;
    height: 0.96rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 0.2rem;
    margin-left: 0.3rem;
  }

  .list-Top p {
    float: left;
    font-size: 0.42rem;
    line-height: 1rem;
  }

  .list-Top p:nth-child(3) {
    float: right;
    margin-right: 0.3rem;
    color: #888888;
  }

  .list-center {
    padding: 0 0.3rem;
  }

  .list-center video {
    width: 100%;
    height: 5.1rem;
    margin-top: 0.2rem;
    margin-bottom: .5rem;
  }

  .list-center p {
    width: 10.08rem;
    font-family: PingFang-SC-Medium;
    font-size: 0.39rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    margin: 0 auto;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .list-bottom {
    border-top: solid 1px #f1f1f1;
    width: 10.24rem;
    height: auto;
    margin: 0 auto;
    margin-top: 0.4rem;
  }

  .list-bottom p {
    float: left;
    width: 3.32rem;
    padding-left: 1.8rem;
    margin-top: 0.45rem;
  }

  .list-bottom p:nth-child(1) span {
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    background: url("../../images/xiangqing/notzan.png") no-repeat;
    background-size: 100%;
    margin-right: 0.1rem;
  }

  .list-bottom p:nth-child(2) span {
    width: 0.5rem;
    height: 0.5rem;
    display: inline-block;
    background: url("../../images/home/dis_collect.png") no-repeat;
    background-size: 100%;
    margin-right: 0.1rem;
    vertical-align: -0.06rem;
    filter: contrast(0%)
  }

  .video {
    width: 100%;
    height: 5.1rem;
    background: #fff;
    margin-top: 1.2rem;
    position: relative;
    margin-bottom: .5rem;
  }

  .video p {
    width: 1.8rem;
    height: 1.8rem;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.6;
    border-radius: 50%;
    position: absolute;
    left: 40%;
    top: 28%;
  }

  .video p span {
    display: block;
    width: 0;
    height: 0;
    border-top: 0.6rem solid transparent;
    border-left: 0.9rem solid #fff;
    border-bottom: 0.5rem solid transparent;
    margin-left: 0.6rem;
    margin-top: 0.3rem;
  }
  .videoBox{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .videoBox video{
    width: 100%;
    height: 7.1rem;
    background: #000;
    margin-top: 1.3rem;
  }
  .cloneBtn{
    width: 5.13rem;
    height: 1.33rem;
    border-radius: .66rem;
    border: solid 1px #de2245;
    text-align: center;
    line-height: 1.33rem;
    color: #fff;
    background: #de2245;
    font-size: .54rem;
    margin-top: 0 auto;
    margin-top: .5rem;
    margin-left: 25%;

  }
</style>
