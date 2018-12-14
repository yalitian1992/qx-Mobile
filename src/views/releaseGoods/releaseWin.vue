<template>
  <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`">
    <div class="releaseWin-box">
        <img :src="firstFigure" class="win-tag">
        <span class="tag-title">发布成功</span>
        <span class="win-info">{{message}}</span>
        <div class="btns">
          <router-link tag="button" :to="{name: 'Home'}" class="btn">返回首页</router-link>
          <router-link tag="button" :to="{name: 'GoodsDetails', params: {id: goodsId}}" class="btn btn-red">查看详情</router-link>
        </div>
    </div>
    <div class="des-pic">
      <div class="pic"></div>
    </div>
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";

export default {
  name: "releaseWin",
  mixins: [Ajax],
  data() {
    const { message, firstFigure, goodsId } = this.$route.query;
    return {
      firstFigure: firstFigure || false,
      message: message || "",
      goodsId
    };
  }
};
</script>

<style scoped>
.releaseWin-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.4rem;
  background: #fff url("../../images/releaseGoods/bg.png") no-repeat;
  background-size: 100%;
}
.info-box {
  background: #fff;
}
.win-tag {
  width: 4.2rem;
	height: 4.2rem;
  margin-bottom: 0.46rem;
  margin-top: 1.22rem;
  border-radius: 0.15rem;
  object-fit: cover;
}
.tag-title {
  font-size: 0.72rem;
  color: #0b8942;
  margin-bottom: 0.55rem;
}
.win-info {
  font-size: 0.42rem;
  color: #888;
  margin-bottom: 0.78rem;
}
.btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.9rem;
}
.btns .btn {
  width: 4.05rem;
  height: 1.32rem;
  background-color: #fff;
  border-radius: 0.66rem;
  border: solid 0.03rem #de2245;
  color: #de2245;
  font-size: 0.54rem;
}
.btns .btn.btn-red {
  background-color: #de2245;
  color: #fff;
}
.des-pic {
  margin: 0.3rem 0 0;
  background: #fff;
  height: 7.2rem;
}
.des-pic .pic {
  width: 100%;
  height: 7.2rem;
  background: #fff url("../../images/releaseGoods/des-pic.jpg") no-repeat center;
  background-size: 100%;

}
</style>
