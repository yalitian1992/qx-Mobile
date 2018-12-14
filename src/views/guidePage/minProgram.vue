<template>
  <V-Scroll ref="guideScroll" :isList="false" :scroll-height="`${mainHeight}px`">
    <!-- <div :class="['guide-box', isIphonex ? 'max-pic-guide' : 'normal']">

      <a href="../../images/normal-pic-guide,jpg" download="file">下载图片</a>
    </div> -->
    <img src="" :width="width" ref="guideImg" />
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";

export default {
  name: "minProgram",
  mixins: [Ajax],
  data() {
    return {
      isIphonex: false,
      width: 0,
      height: 0
    };
  },
  created() {
    this.iphoneType();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
  mounted() {
    /* eslint-disable */
    let imageSrc;
    if (this.isIphonex) {
      imageSrc = require("../../images/guidePage/max-pic-guide.jpg");
    } else {
      imageSrc = require("../../images/guidePage/max-pic-guide.jpg");
    }
    this.$refs.guideImg.src = imageSrc;
    this.$refs.guideImg.addEventListener("load", () => {
      this.$nextTick(() => {
        this.$refs.guideScroll.refresh();
      });
    });
  },
  methods: {
    iphoneType() {
      const u = navigator.userAgent;
      if (!(u.indexOf("Android") > -1 || u.indexOf("Adr") > -1)) {
        if (window.screen.height == 812) {
          this.isIphonex = true;
        }
      }
    }
  }
};
</script>

<style scoped>
.guide-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: 100%;
  background-repeat: no-repeat;
}
.guide-box.normal {
  background-image: url("../../images/guidePage/normal-pic-guide.jpg");
}
.guide-box.max-pic-guide {
  background-image: url("../../images/guidePage/max-pic-guide.jpg");
}
</style>