<template>
  <div class="release-box">
    <V-Scroll :scroll-height="`${mainHeight}px`" :pulldown="getGoodsList" :autoLoad="false" :on-scroll-bottom="getGoodsList">
      <div class="head-box">
        <div class="head-content">
          <img :src="getInfor.userAvatar" v-error-to-img="require('../../images/error-to-user.png')" alt="">
          <h4>{{getInfor.nickName}}</h4>
          <p class="level">
            <span><i class="tipLogo L"></i>{{getInfor.address}}</span>
            <router-link class="re-R"
                         tag="span"
                         :to="{path:'/userLevel'}">
              <i class="tipLogo R"></i>用户等级:{{getInfor.userGrade}}
            </router-link>
          </p>
          <!--<div class="atten">
            <p class="L">私信</p>
            <p class="R">+关注</p>
          </div>-->
          <ul class="head-list">
            <li>
              <dl>{{getInfor.countGoodsListEntities}}</dl>
              <dt>宝贝</dt>
            </li>
            <li>
              <dl>{{getInfor.countStory}}</dl>
              <dt>感谢</dt>
            </li>
            <router-link :to="{path:'/Fans'}">
              <dl>{{getInfor.userFansCount}}</dl>
              <dt>粉丝</dt>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="release-content">
        <ul class="tab-list">
          <li :class="{selected:sel == i}" v-for="(v, i) in tabList" @click="sel = i" :key="i">
            <span>{{v.name}}</span>
          </li>
        </ul>
        <div v-show="sel == 0">
        <ul class="status-list">
          <li :class="{selected:statusSel == staI}" v-for="(staV,staI) in statusList" @click="statusSel = staI,getGoodsList(staV.status)" :key="staI">{{staV.name}}</li>
        </ul>
        <!--分享宝贝-->
        <div class="pro-list Sha">
          <div class="re-pro-single" v-for="(goodV, goodI) in getInfor.goodsListEntities" :key="goodI">
            <div class="reHead">
              <img :src="goodV.userAvatar" v-error-to-img="require('../../images/error-to-user.png')" alt="">
              <span>{{goodV.userName}}</span>
            </div>
            <router-link
              tag="div"
              class="proInfo"
              :to="`/goods/details/${goodV.id}`"
            >
              <img :src="goodV.cover" v-error-to-img alt="">
              <p class="name">{{goodV.name}}</p>
            </router-link>
            <div class="info">
              <div class="re-goods">
                <p class="price-num"><i></i><span>{{goodV.integral}}</span></p>
                <p class="user-info" v-bind="store = goodV.store" @click="cloPro(goodV.store,goodV.id,0)"><em :class="{selected:store == 1}"></em><span>{{goodV.favorityCount}}</span></p>
              </div>
            </div>
            <!--爱心数字-->
            <!--<span class="love-num">
              <em class="icon-love"></em>
              <em class="num">98</em>
            </span>-->
            <!--<i class="tip sell">竞拍</i>-->
            <i class="tip audit" v-if="goodV.status == -1">已下架</i>
            <i class="tip audit" v-if="goodV.status == 0">审核中</i>
            <i class="tip audit" v-if="goodV.status == 4">已赠送</i>
          </div >
          <!--暂无数据-->
          <!--<p class="noData" v-show="prolength">暂无相关数据</p>-->
        </div>
      </div>
        <!--感谢视频-->
        <div class="grate-list Video" v-show="sel == 1">
          <div class="grate-con" v-for="(thankV, thankI) in getInfor.tThanksStoryEntities" :key="thankI">
            <p class="head">
              <span>
                <img :src="thankV.fromUrl" v-error-to-img="require('../../images/error-to-user.png')" alt="">
                <em>{{thankV.fromName}}</em>
              </span>
              <span>{{thankV.city}}</span>
            </p>
            <div class="video">
              <div class="videoBg" :style="{backgroundImage: 'url(' + require('../../images/my/top_bg.png') + ')'}"></div>
              <video id="myvideo" :src="thankV.urls[0].video" :poster="thankV.urls[0].img">
              </video>
              <i class="play" @click="viderShowClick(thankV.urls[0].video)"></i>
            </div>
            <div class="bom">
              <p>{{thankV.content}}</p>
              <!--v-tap={ methods : xxx , paramA : a,paramB:b} -->
              <div class="review">
                <p><span><i class="icon laud selected"></i>{{thankV.admireCount}}</span></p>
                <p @click="cloPro(thankV.isStore,thankV.id,1)"><span><i class="icon heart"></i>{{thankV.storeCount}}</span></p>
              </div>
            </div>
          </div>
          <!--暂无数据-->
          <!--<p class="noData" v-show="thanklength">暂无相关数据</p>-->
        </div>
      </div>
      <p class="share"></p>
    </V-Scroll>
    <!--视频播放-->
    <div class="videoBox" v-if="videoShow">
      <video  controls="controls">
        <source :src='openPath' type="video/mp4"></source>
      </video>
      <div class="cloneBtn" @click="videoShow=false">退出播放</div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

const GetInformationUrl = "/tuser/getInformation"
const Store = "/store/put"
const UpStore = "/store/put/update"

export default {
//  name: "Home",
  data() {
    return {
      userId: '',
      sel: 0,     //tab标签切换
      tabList: [
        {name: '分享宝贝',num: 0},
        {name: '感谢视频',num: 1}
      ],
      statusSel: 0,      //状态标签切换
      statusList: [
        {name: '已发布',num: 0,status: 2},
        {name: '已下架',num: 1,status: -1},
        {name: '审核中',num: 2,status: 0},
        {name: '未过审',num: 3,status: 1}
      ],
      getInfor: [],
      store: '',       //是否收藏
      videoShow: false,
//      prolength: false,        //无商品状态
//      thanklength: false
    };
  },
  mixins: [Ajax],
  components: {

  },
  mounted() {
    this.userId = JSON.parse(sessionStorage.getItem("user")).userId
    this.mainHeight = this.mainHeight - this.navigationHeight;

    this.getGoodsList(2)
  },
  methods: {
//    视频播放
    viderShowClick(path){
      this.videoShow = true
      this.openPath=path
      console.log(this.videoShow,path)
    },
//    收藏商品
    cloPro: function (status,id,type) {
      if(status == 0){
        /*收藏*/
        this.post(Store, {
          userId: this.userId,
          relateId: id,           //商品ID
          type: type,            //0:商品收藏   1：故事收藏
        }).then(body => {
          this.store = 1
          console.log(body)
        })
      }else{
        /*取消收藏*/
        this.post(UpStore, {
          userId: this.userId,
          relateId: id,           //商品ID
          type: 1,            //0:商品收藏   1：故事收藏
        }).then(body => {
          this.store = 0
          console.log(body)
        })
      }
    },

//    我发布商品列表
    getGoodsList: function (status) {
      return this.post(GetInformationUrl, {
        userId: this.userId,
        status: status
      }).then(body => {
        this.getInfor = body
        if(this.sel == 0){
          if(this.getInfor.goodsListEntities.length == 0){
//          this.prolength = true
            return false
          }
        }
        if(this.sel == 1){
          if(this.getInfor.tThanksStoryEntities.length == 0){
//          this.thanklength = true
            return false
          }
        }
        return body
      });
    },
  }
};
</script>

<style scoped>
.noData{
  margin: 1rem auto;
  text-align: center;
  color: gray;
}
.status-list{
  display: flex;
  height: 1.5rem;
  line-height: 1.5rem;
}
.status-list li{
  width: 25%;
  text-align: center;
}
.status-list li.selected{
  color: #de2245;
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
  height: 8.8rem;
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
.re-pro-single .proInfo>img{
  width: 5.18rem;
  height: 5.18rem;
}
/*.re-pro-single>.info{
  padding: 0 0.3rem;
}*/
.re-pro-single .proInfo>p.name{
  padding: 0 .3rem;
  height: 0.97rem;
  line-height: 0.97rem;
  font-size: 0.39rem;
}
.re-pro-single .re-goods{
  margin-top: 0.26rem;
  padding: 0 .3rem;
}
.re-pro-single .re-goods,.re-goods>p{
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
.re-goods .user-info em{
  margin: 0 0.12rem;
  width: 0.49rem;
  height: 0.49rem;
  background: url("../../images/userInfos/heard-icon-col.png") no-repeat center/100% 100%;
}
.re-goods .user-info em.selected{
  background: url("../../images/userInfos/heart-selected-icon.png") no-repeat center/100% 100%;
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

.release-content .grate-list{
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
  position: relative;
  display:flex;
  justify-content:center;
  height: 5.1rem;
  background: #ccc8c5;
}
.grate-con .video .videoBg{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: no-repeat center/100% 100%;
}
.grate-con .video .play{
  position: absolute;
  top: 0;
  bottom: 0;
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
/*视频播放*/
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
