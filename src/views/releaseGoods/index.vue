<template>
  <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`">
    <div class="release-content" :data-height="navigationHeight">
      <div class="title">
        <span class="title-line"></span>
        <span>发布指南</span>
        <span class="title-line"></span>
      </div>
      <div class="release-dec">
        <span>发布宝贝视频或图片时，选择合适的分类，描述清楚生动，会更快被领走哦！</span>
      </div>
      <router-link tag="div" :to="{name: 'EditGoods'}" class="release-box">
        <div class="release-icon">
          <span class="icon-release-currency"></span>
        </div>
        <span class="name">发布宝贝</span>
      </router-link>
    </div>
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";

export default {
  name: "releaseGoods",
  mixins: [Ajax],
  mounted() {
    this.$nextTick(() => {
      this.mainHeight = this.mainHeight - this.navigationHeight;
    });
  }
};
</script>

<style scoped>
.release-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.release-content .title {
  margin: 0.9rem 0 0.61rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #de2245;
  font-size: 0.63rem;
}
.release-content .title .title-line {
  width: 0.9rem;
  height: 0.03rem;
  background-color: #de2245;
  margin: 0 0.29rem;
}
.release-content .release-dec {
  width: 80%;
  line-height: 0.6rem;
  font-size: 0.42rem;
  margin: 0 auto;
  text-align: center;
  color: #888;
}
.release-content .release-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: 5.3rem;
  width: 100%;
}
.release-content .release-box .release-icon {
  width: 1.36rem;
  height: 1.36rem;
  display: flex;
}
.release-content .release-box .release-icon .icon-release-currency {
  width: 1.36rem;
  height: 1.36rem;
  background: url("../../images/releaseGoods/release-currency.png") no-repeat;
  background-size: 100%;
}
.release-content .release-box .name {
  font-size: 0.42rem;
  color: #000;
}
</style>
