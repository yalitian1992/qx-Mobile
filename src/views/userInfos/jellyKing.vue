<template>
  <div class="main">
    <div class="start-box">
      <div class="back" @click="goBack()"></div>
      <div class="start-txt">
        <div class="title">
          <p>果冻王排行榜</p>
        </div>
        <div class="tab">
          <div :class="{rightBtn: rankSel != tabi,leftBtn: rankSel == tabi}"
               v-for="(tabv,tabi) in rankTabBtn"
               :key="tabi"
               @click="rankSel = tabi,rankTitle = tabv.title,rankTxt = tabv.txt,Rank('',tabv.type)">
            {{tabv.name}}
          </div>
          <!--<div class="leftBtn">
            周排行
          </div>
          <div class="leftBtn">
            月排行
          </div>-->
        </div>
        <div class="reward" @click="showRuls=false">
          <p>{{rankList.awardContext}}<span class="icon-promp"></span></p>
          <!--<p>3000<span class="icon-promp"></span></p>-->
          <span>{{rankList.time}}</span>
        </div>

        <div style="min-height: 12.8rem">
          <div class="rank-list">
            <dl>
              <dd>排名</dd>
              <dd>用户信息</dd>
              <dd>获得果冻数量</dd>
            </dl>
            <div class="ul">
              <ul>
                <li v-for="(rankV,rankI) in rankList.userRankIngVos" :key="rankI" :class="{spac:rankI < 3}">
                  <!-- <img :src="images(index)" alt=""> -->
                  <div class="li-bg"></div>
                  <div class="among" :class="{spac:rankI==0||rankI==1||rankI==2,first:rankI==0,second:rankI==1,third:rankI==2}">
                    <div class="img">
                      <img :src="rankV.avatar" alt="">
                      <div class="border"></div>
                    </div>
                    <i>{{rankV.name}}</i>
                  </div>
                  <p>{{Num(rankV.userCount)}}</p>
                </li>
              </ul>
            </div>
          </div>
          <!--<div class="end-rank">
            <i v-if="!rankListSelf">未上榜</i>
            <img v-else class="myself-rank" :src="images(rankNum)" alt="">
            <div class="c">
              <img src="../../images/userInfos/headbg.png" alt="">
              <p>一二三四</p>
            </div>
            <span>{{Num(9000)}}</span>
          </div>-->
        </div>

      </div>
      <!--弹框-->
      <div class="start-tip-box" v-if="showRuls" >
        <div class="start-tip">
          <div class="pop-upstitle">
            <p class="pop-upstitle-text">果冻王奖励</p>
          </div>
          <p class="start-time">每天{{rankTime}}发放奖励</p>
          <i class="close-icon" @click="showRuls=false"></i>
          <div class="start-over">
            <div class="start-rank-lis">
              <dl>
                <dd>排名</dd>
                <dd>奖励</dd>
              </dl>
              <ul :class="{startHeight:startHeight}">
                <div class="s-list">
                  <li v-for="(itemscore, indexscore) in ScoreRankings" :key="indexscore">
                    <p v-for="(rankNumListItem, rankNumListindex) in rankNumList" :key="rankNumListindex" v-if="itemscore.ranking == rankNumListItem.num">{{rankNumListItem.name}}</p>
                    <span v-if="itemscore.prizeType != 3">￥{{itemscore.prizeAmount}}</span>
                    <span v-else class="text-overflow">{{itemscore.productName}}</span>
                  </li>
                </div>
                <p class="all" v-show="allShow" @click="startHeight = !startHeight">{{startHeight?'展开全部':'收起'}}<i></i></p>
              </ul>
            </div>
            <p class="start-rule">奖励规则<i class="bom"></i></p>
            <ul class="tips">
              <li>每场获取微集分数量排名前10的用户，会获得一定奖励；</li>
              <li>排名每天20:50截至，并发放奖励；</li>
              <li>数量相等者，以到达该数量时间排名；</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--发送表情-->
    <!--<expressionPop :isShow.sync="expression" ref="expressionPop"></expressionPop>-->
  </div>
</template>
<script>
import Ajax from "@/mixins/ajax";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

const ranking = "/userAccountDetail/get/ranking";

  export default {
//  name: "Home",
    data() {
      return {
        showRuls:false,
        rankListSelf: false,   //是否上榜
        rankSel: 0,
        rankTitle: '本周',
        rankTxt: '本周一',
        rankTabBtn: [
//          {name: '日排行',title: '本日',txt: '第二天发放'},
          {name: '周排行',title: '本周',txt: '本周一',type: 0},
          {name: '月排行',title: '本月',txt: '月第一天发放',type: 1}
        ],
        rankNumList:[
          {name: "第一名",num: 1},
          {name: "第二名",num: 2},
          {name: "第三名",num: 3},
          {name: "第四名",num: 4},
          {name: "第五名",num: 5},
          {name: "第六名",num: 6},
          {name: "第七名",num: 7},
          {name: "第八名",num: 8},
          {name: "第九名",num: 9},
          {name: "第十名",num: 10},
        ],
        rankList: {}
      };
    },
    mixins: [Ajax],
    components: {

    },
    mounted() {
      this.Rank('',0)
    },
    methods: {
      //      每3位逗号隔开
      Num: function(num){
        var result = [],counter = 0;
        var newnum = (num || 0).toString().split('');

        for(var i = newnum.length - 1; i >= 0; i--) {
          counter++;
          result.unshift(newnum[i]);
          if(!(counter % 3) && i != 0) {
            result.unshift(',');
          }
        }
        return result.join('');
      },
//      果冻王排行
      Rank: function (id,type) {
        this.get(ranking, {
//          userId: id,
          type: type
        }).then(body => {
          this.rankList = body
        });
      }
    }
  };




  /*import '../../components/common/public.js'
  import {expressionPop,fartPop} from "@/page/mammon/home/components/";
  import {imgBaseUrl} from '../../config/config'

  export default {
    data () {
      return {
        isIphonex: false,      //是否是iPhonex
        isIos: false,
        list:{},
        accountLogVoList: null,
        TodayPrize: 0,  //  今日奖励
        token: '',
        showRuls:false,
        startHeight: true,    //排名展示高度
        rankListSelf: false,   //是否上榜
        rankNum: 0,      //自己排名第几
        LogVoName: '',  //用户name
        LogVoAmount: 0,
        LogVoImg: '',
        ScoreRankings: null,   //弹框-奖励金额
        allShow: false,
        rankTime: '',
        expression:false,
        ownUserid:'',//自己的id
        rankNumList:[
          {name: "第一名",num: 1},
          {name: "第二名",num: 2},
          {name: "第三名",num: 3},
          {name: "第四名",num: 4},
          {name: "第五名",num: 5},
          {name: "第六名",num: 6},
          {name: "第七名",num: 7},
          {name: "第八名",num: 8},
          {name: "第九名",num: 9},
          {name: "第十名",num: 10},
        ]
      }
    },
    methods: {
      images: function (index) {
        var index=index+1;
        let defaultImg = require('../../images/rank-logo' + index + '.png');
        return defaultImg;
      },
//      每3位逗号隔开
      Num: function(num){
        var result = [],counter = 0;
        var newnum = (num || 0).toString().split('');

        for(var i = newnum.length - 1; i >= 0; i--) {
          counter++;
          result.unshift(newnum[i]);
          if(!(counter % 3) && i != 0) {
            result.unshift(',');
          }
        }
        return result.join('');
      },
      gohuoyue:function(){
        this.$router.replace({path: 'startActive', query: {native: 0}})
      },
      gojifen:function(){
        this.$router.replace({path: 'startSet', query: {native: 0}})
      },
      gopassword:function(){
        this.$router.replace({path: 'startpw', query: {native: 0}})
      },
      imprison:function(headUrl,userId,nickName){
        if(this.ownUserid!=userId){
          this.$refs.expressionPop.showUser(headUrl,userId,nickName);
        }
      }
    },
    components: {
      expressionPop
    },
    created() {
      this.token = this.getCookie('intoToken');
    },
    mounted(){
      var _this = this
      this.clientType(function(){},function(){
        if (window.screen.height == 812) {
          _this.isIphonex = true;
        }else{
          _this.isIos = true;
          document.querySelector('#app>div>div').style.height = '100%';
        }
      })

      if (this.$route.query.token) {
        _this.setCookie('intoToken', _this.$route.query.token, 3)
      }
      this.$http({
        method: 'post',
        url: '/card-service-web/account/accountDayRank',
        headers: {accessToken: this.token},
        params: { pageNo: "1",pageSize:"10",type: 1 }
      }).then(function(res) {
        let data = res.body;
        if(data.execErrCode == 200) {

          _this.list=data.execData
          _this.accountLogVoList = _this.list.accountLogVoList
          _this.TodayPrize = _this.list.mammonScoreRankingTodayPrize
          _this.LogVoName = _this.list.accountLogVo.nickName
          _this.LogVoAmount = _this.list.accountLogVo.changeAmount
          _this.LogVoImg = _this.list.accountLogVo.headUrl
          _this.ScoreRankings = _this.list.mammonScoreRankings
          _this.ownUserid=_this.list.accountLogVo.userId
          let timeR = new Date(_this.list.time)
          var  timefen,timeshi;
          if(timeR.getMinutes()<10){
            timefen="0"+timeR.getMinutes()
          }else{
            timefen=timeR.getMinutes()
          }
          if(timeR.getHours()<10){
            timeshi="0"+timeR.getHours()
          }else{
            timeshi=timeR.getHours()
          }
          _this.rankTime = timeshi + ':' + timefen
          for(let i=0;i<_this.accountLogVoList.length;i++){
            if(_this.accountLogVoList[i].loginName == _this.list.accountLogVo.loginName){
              _this.rankListSelf = true
              _this.rankNum = i
            }
          }

          if(_this.ScoreRankings.length >=4){
            _this.allShow = true
          }

        } else if(data.execErrCode == 4003) {
          //this.goLogin();
        } else {
          this.toast(data.execMsg);
        }
      })
    }
  }*/
</script>
<style scoped>
  /*iphoneX适配*/
  .main.iphonex{
    height: 100%;
    min-height:812px;
  }
  .main.ios{
    height: 100%;
  }

  .pop-upstitle {
    width: 9.05rem;
    height: 1.9rem;
    line-height: 1.9rem;
    text-align: center;
    /*border-bottom: 1px solid #c25e6c;*/
    margin: 0.4rem auto 0;

  }
  .start-over{
    height: 12.2rem;
    overflow: hidden;
    overflow-y: auto;
  }
  .back{
    z-index: 222;
    width: 1.2rem;
    height: 1.32rem;
    background: url("../../images/userInfos/back-btn1.png") no-repeat center center/.33rem .57rem;
    position: absolute;
  }
  .start-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f1afbd;
  }
  .start-txt{
    position: relative;
    margin: 0 0.4rem;
    border: 0.05rem solid #fff;
    border-radius: 0.2rem;
    background: #e54a4e;
    margin-top: 20%;
  }
  .start-txt.iphonex {
    margin-top: 20%;
  }
  .start-txt .title{
    position: absolute;
    top: -0.7rem;
    left: 0;
    right: 0;
  }
  .start-txt .title p{
    margin: 0 auto;
    width: 10.14rem;
    height:1.43rem;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.6rem;
    color: #fff;
    background: url("../../images/userInfos/start-title-bg.png") no-repeat center/100% 100%;
  }
  .reward,.rank-list dl,.rank-list .ul{
    width: 10.2rem;
  }
  .reward{
    margin:0 auto;
    height: 2.55rem;
    background: url("../../images/userInfos/start-reward-bg.png") no-repeat center/100% 100%;
  }
  .reward p,.reward span{
    display: block;
    text-align: center;
  }
  .reward p{
    padding-top: 0.36rem;
    font-size: 0.54rem;
    color: #e11b45;
  }
  .reward span{
    font-size: 0.36rem;
    color: #c25e6c;
  }
  .rank-list{
    overflow: hidden;

  }
  .rank-list dl{
    width: 91%;
    margin: 0 auto;
    font-size: 0.45rem;
    color: #fff;
    overflow: hidden;
  }
  .rank-list dd{
    float: left;
  }
  .rank-list dd:nth-child(1){
    width: 16%;
    text-align: center;
  }
  .rank-list dd:nth-child(2){
    width: 40%;
  }
  .rank-list dd:nth-child(3){
    width: 40%;
    text-align: right;
  }
  .rank-list .ul{
    position: relative;
    margin: 0.8rem auto 0.4rem auto;
    width: 10.2rem;
    height: 10.6rem;
    background: url("../../images/userInfos/start-rank-middle-bg.png") no-repeat center/100% 100%;
  }
  .iphonex .rank-list .ul {
    height: 16rem;
  }
  .rank-list .ul ul{
    overflow-y: auto;
  }
  .rank-list .ul:before,.rank-list .ul:after{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 0.45rem;
  }
  .rank-list .ul:before{
    top: -0.4rem;
    background: url("../../images/userInfos/start-rank-top-bg.png") no-repeat center/100% 100%;
  }
  .rank-list .ul:after{
    bottom: -0.44rem;
    background: url("../../images/userInfos/start-rank-bottom-bg.png") no-repeat center/100% 100%;
  }
  .rank-list li,.rank-list .among,.end-rank,.end-rank .c{
    display:flex;
    align-items:center;
  }
  .rank-list li{
    position: relative;
    margin: 0 auto;
    padding: 0 .24rem;
    width: 89%;
    height: 1.8rem;
  }
  .rank-list li.spac{
    background:#fff7cc;
  }
  .rank-list li:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0.07rem;
    width: 98%;
    height: 0.04rem;
    background: url("../../images/userInfos/cut-off-line.png") no-repeat center/contain;
  }
  .end-rank .myself-rank{
    width: 0.93rem;
    height: 1.08rem;
  }
  .rank-list li .li-bg {
    width: 0.93rem;
    height: 1.08rem;
    background-image: url("../../images/userInfos/rank-list1.png");
    background-repeat: no-repeat;
    background-size: auto 1.08rem;
  }
  .rank-list li:nth-child(1) .li-bg {
    background-position: 0 0;
  }
  .rank-list li:nth-child(2) .li-bg {
    background-position: -1.86rem 0;
  }
  .rank-list li:nth-child(3) .li-bg {
    background-position: -3.72rem 0;
  }
  .rank-list li:nth-child(4) .li-bg {
    background-position: -5.58rem 0;
  }
  .rank-list li:nth-child(5) .li-bg {
    background-position: -7.44rem 0;
  }
  .rank-list li:nth-child(6) .li-bg {
    background-position: -9.3rem 0;
  }
  .rank-list li:nth-child(7) .li-bg {
    background-position: -11.16rem 0;
  }
  .rank-list li:nth-child(8) .li-bg {
    background-position: -13.02rem 0;
  }
  .rank-list li:nth-child(9) .li-bg {
    background-position: -14.88rem 0;
  }
  .rank-list li:nth-child(10) .li-bg {
    background-position: -16.74rem 0;
  }
  .rank-list li p{
    position: absolute;
    right: 0.24rem;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.42rem;
    color: #bd8b93;
  }
  .rank-list .among{
    margin-left: 0.4rem;
    height: 1.8rem;
  }
  .rank-list .among .img{
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
  }
  .rank-list .among.spac .img{
    width: 1.47rem;
    height: 1.47rem;
  }
  .rank-list .among img{
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
  .rank-list .among.spac img{
    margin: .13rem auto;
  }
  .rank-list .among .border{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: .06rem solid #ea9aa5;
  }
  .rank-list .among.first .border{
    border: none !important;
    background: url("../../images/userInfos/No.1@2x.png") 0/100% 100% !important;
  }
  .rank-list .among.second .border{
    border: none;
    background: url("../../images/userInfos/No.2@2x.png") 0/100% 100%;
  }
  .rank-list .among.third .border{
    border: none;
    background: url("../../images/userInfos/No.3@2x.png") 0/100% 100%;
  }
  .rank-list .among i{
    padding-left: 0.1rem;
    font-size: 0.42rem;
    color: #c25e6c;
  }
  .end-rank{
    position: relative;
    height: 1.5rem;
    margin: 0 auto;
    padding: 0 0.54rem;
    font-size: 0.42rem;
    color: #fff;
  }
  .end-rank .c{
    margin-left: 0.3rem;
  }
  .end-rank .c img{
    display: inline-block;
    margin-right: 0.1rem;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .end-rank span{
    position: absolute;
    right: 0.54rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .start-tip-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 333;
    background: rgba(0,0,0,0.6);
  }
  .start-tip{
    position: relative;
    margin: 3rem auto 0 auto;
    padding-top: 0.01rem;
    width: 10.48rem;
    height: 15.86rem;
    background: url("../../images/userInfos/pop-upsbg.png") no-repeat center/100% 100%;
  }
  .start-time{
    position: relative;
    top: -.28rem;
    text-align: center;
    font-size: 0.36rem;
    color: #bd8b93;
  }
  .start-tip .close-icon{
    display: block;
    position: absolute;
    right: 0.2rem;
    top: -.2rem;
    width: 2rem;
    height: 2rem;
    background: url("../../images/userInfos/pop-upsClose1.png") no-repeat center/50% 50%;
  }
  .start-rank-lis{
    margin: 0.1rem auto 0 auto;
    overflow: hidden;
    width: 8.21rem;
    border-radius: 0.3rem;
    background: #fa9b97;
  }
  .start-rank-lis .iphonex{

  }
  .start-rank-lis .all{
    width: 96.4%;
    text-align: center;
    font-size: 0.33rem;
    color: #a9727b;
    background: #f0c9ce;
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    position: absolute;
    bottom: 0.14rem;
    left: 0.14rem;
  }
  .start-rank-lis .all i{
    display: block;
    width: 0.27rem;
    height: 0.14rem;
    position: absolute;
    top: 41%;
    right: 36%;
    background: url("../../images/userInfos/start-all-icon.png") no-repeat center/100% 100%;
  }
  .start-rank-lis dl{
    height: 0.87rem;
    line-height: 0.87rem;
    font-size: 0.36rem;
    color: #fff;
  }
  .start-rank-lis dd{
    width: 50%;
    float: left;
    text-align: center;
  }
  .start-rank-lis ul p,.start-rank-lis ul span{
    vertical-align: bottom;
    display: inline-block;
    width: 47%;
    text-align: center;
    height: 0.9rem;
    line-height: 0.9rem;
    font-weight: 600;
  }
  .startHeight{
    height: 6.32rem;
  }
  .s-list{
    margin-bottom: 0.9rem;
  }
  .startHeight .s-list{
    height: 5.6rem;
    overflow: hidden;
  }
  .start-rank-lis ul{
    position: relative;
    padding: 0 0.14rem 0.14rem 0.14rem;
  }
  .start-rank-lis ul li:nth-child(2n+1){
    background: #f0c9ce;
  }
  .start-rank-lis ul li:nth-child(2n){
    background: #e9bac2;
  }
  .start-rank-lis ul p{
    font-size: 0.48rem;
    color: #763429;
  }
  .start-rank-lis ul span{
    font-size: 0.54rem;
    color: #e11b45;
  }
  .start-rule{
    position: relative;
    width: 8.21rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.48rem;
    color: #b43333;
    text-align: center;
    margin: 0.5rem auto 0 auto;
    border-radius: 0.45rem;
    background: #e4c1bb;
  }
  .start-rule .bom{
    display: block;
    width: 0.33rem;
    height: 0.18rem;
    position: absolute;
    left: 49%;
    bottom: -.18rem;
    background: url("../../images/userInfos/start-bom-icon.png") no-repeat center/100% 100%;
  }
  .start-tip-box .tips{
    margin: 0.3rem auto 0.6rem 1.6rem;
    width: 7.8rem;
  }
  .start-tip-box .tips li{
    list-style-type:disc;
    line-height: 0.54rem;
    font-size: 0.39rem;
    color: #763429;
  }
  .ul ul{
    height: 12.1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .icon-promp {
    position: relative;
    display: inline-block !important;
    width: .8rem;
    height: .8rem;
    top: .21rem;
    left: .1rem;
    background: url("../../images/userInfos/icon-Prompt.png") no-repeat center/100% 100%;
  }
  .ul .iphonex{
    height: 16.1rem;
  }
  .tab{
    margin-top: .68rem;
    display: block;
    margin-bottom: .2rem;
    display: flex;
    justify-content: center;
  }
  .tab div{
    width: 3rem;
    height: .99rem;
    font-size: .51rem;
    color: #fff;
    float: left;
    line-height: .99rem;
    text-align: center;
  }
  .tab div:nth-child(2){
    margin:0 .3rem;
  }
  .rightBtn {
    background: url("../../images/userInfos/rightbtn1.png") no-repeat center/100% 100%;
  }

  .leftBtn {
    background: url("../../images/userInfos/left_bt.png") no-repeat center/100% 100%;
  }
</style>
