<template>
  <div class="content">
    <Head />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Navigation />
    <div v-show="isShowToast" :style="{left: toastLeft}" ref="toast" class="toast">
      <span>{{toastInfo}}</span>
    </div>
    <div v-if="isMask" class="mask"></div>
    <div v-show="isShowLoading" :style="{left: loadingLeft}" ref="loading" class="loading">
      <span class="loading-gif"></span>
    </div>
  </div>
</template>

<script>
import Head from "~/header/head";
import Navigation from "~/navigation/index";
import Ajax from "@/mixins/ajax";

export default {
  name: "Entrance",
  components: {
    Head,
    Navigation
  },
  mixins: [Ajax],
  data() {
    return {
      toastInfo: "error",
      // 吐司状态
      isShowToast: false,
      toastTime: 0,
      // 加载状态
      isShowLoading: false,
      // 是否需要遮罩层
      isMask: false,
      loadingLeft: "0",
      toastLeft: "0"
    };
  },
  created() {
    // 注册吐司事件
    this.$root.$on("toast", this.handleToast);
    // 注册加载事件
    this.$root.$on("loading", this.handleLoading);
  },
  mounted() {
    /* eslint-disable */
    const loadingWidth = parseInt(
      this.getStyle(this.$refs.loading, "width"),
      10
    );
    const winWidth = this.getWidth();
    this.loadingLeft = `${winWidth / 2 - loadingWidth / 2}px`;
  },
  methods: {
    /**
     * toast事件处理
     */
    handleToast(options) {
      /* eslint-disable */
      clearTimeout(this.toastTime);
      this.toastInfo = options.toastInfo || "";
      this.$nextTick(() => {
        const toastWidth = parseInt(
          this.getStyle(this.$refs.toast, "width"),
          10
        );
        const winWidth = this.getWidth();
        this.toastLeft = `${winWidth / 2 - toastWidth / 2}px`;
      });
      this.isShowToast = true;
      this.toastTime = setTimeout(() => {
        this.isShowToast = false;
      }, options.time || 2500);
    },
    /**
     * loading事件处理
     */
    handleLoading(obj) {
      this.isShowLoading = obj.state;
      if (obj.Mask && !obj.state) {
        this.isMask = false;
      } else {
        this.isMask = obj.Mask;
      }
    }
  },
  destroyed() {
    this.$root.$off("toast");
    this.$root.$off("loading");
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.6);
  z-index: 8000;
}
.toast {
  position: fixed;
  top: 50%;
  margin: 0 auto;
  z-index: 9999;
  min-width: 3rem;
  max-width: 80%;
  max-height: 30%;
  overflow: hidden;
  color: #fff;
  padding: 0.3rem 0.2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.24rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.loading {
  position: fixed;
  top: 50%;
  margin: 0 auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.24rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.loading-gif {
  width: 1.7rem;
  height: 1.7rem;
  background: url("../images/loading.gif") no-repeat;
  background-size: 100%;
}
</style>
