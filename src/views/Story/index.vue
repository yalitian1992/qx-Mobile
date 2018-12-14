<template>
  <!--eslint-disable -->
  <div class="story-content" >
    <V-Scroll   ref="storyScroll" :scroll-height="`${mainHeight}px`" :pulldown="upDate"  :on-scroll-bottom="upDate">
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

// 故事列表
const storyListlUrl = "/story/get/story/list";

/* eslint-disable */
export default {
  name: "Robbing",
  mixins: [Ajax],
  data() {
    return {
      // 抢兑时间列表
      storyList: [],
      windWidth: window.innerHeight,
      viderShow:false,
      openPath:'',
      isPromise: false
    };
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
    handleDataTip(result) {
      if (typeof result === "boolean") {
        // 如果列表没有数据，则更新提示状态
        this.$refs.storyScroll.notData();
      } else {
        if (result.hasNextPage) {
          // 如果有数据则更改状态并把页码设置为下一页：1
          this.$refs.storyScroll.success(1);
        } else {
          this.$refs.storyScroll.notData("没有更多数据了");
        }
      }
      this.$nextTick(() => {
        this.$refs.storyScroll.refresh();
      });
    },
    upDate(page) {
      page === 0 && (this.storyList = []);
      return this.post(storyListlUrl, {
        startPage: page,
        currentUserId: ""
      }).then(body => {
        this.storyList = (this.storyList || []).concat(body.items);
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    }
  },
  mounted() {
    //获取本地当前时间
    var myDate = new Date();
    console.log(myDate);
    // 故事列表
    this.isPromise = this.upDate();
  }
};
</script>

<style scoped>
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
