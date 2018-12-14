<template>
    <div class="head" :style="headStyle" id="header">
      <div class="back" v-if="isShowGoBack" @click="goBack">
        <span :class="['icon-back', backIcon && backIcon !== '' ? backIcon : null]"></span>
      </div>
      <h1 class="title">{{$route.meta.title}}</h1>
    </div>
</template>


<script>
export default {
  name: "Head",
  data() {
    const { background, backgroundColor, color, backIcon } = this.$route.meta;
    const { path } = this.$route;
    const paths = path.substr(1).split("/");
    return {
      headStyle: {
        background: background || null,
        backgroundColor: backgroundColor || null,
        color: color || null
      },
      backIcon,
      isShowGoBack: paths.length >= 2 && paths[1] !== "index",
      goStep: -1
    };
  },
  watch: {
    $route() {
      this.headStyle = {};
      this.backIcon = "";
      const { path } = this.$route;
      const paths = path.substr(1).split("/");
      this.isShowGoBack = paths.length >= 2 && paths[1] !== "index";
      const { background, backgroundColor, color, backIcon } = this.$route.meta;
      this.$nextTick(() => {
        this.backIcon = backIcon;
        this.headStyle = {
          background: background || null,
          backgroundColor: backgroundColor || null,
          color: color || null
        };
      });
    }
  },
  mounted() {
    this.$root.$on("setGoStep", step => {
      this.goStep = step;
    });
  },
  methods: {
    handleBack() {
      if (this.push.isShow) {
        this.$router.replace(this.$route.query.fullPath || "/");
      } else {
        this.$router.back();
      }
    },
    goBack() {
      // 后退之前要先关闭loading
      this.$root.$emit("loading", {
        isMask: false,
        state: false
      });
      this.$root.$emit("headBack", this.$route);
      this.$router.go(this.goStep);
      this.goStep = -1;
    },
    /**
     * 判断android还是IOS
     */
    clientType(adrCallback, iosCallback) {
      const u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
        if (adrCallback) {
          adrCallback();
        }
      } else if (iosCallback) {
        iosCallback();
      }
    }
  },
  destroyed() {
    this.$root.$off("setGoStep");
  }
};
</script>

<style scoped>
.head {
  color: #000;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.head .title {
  text-align: center;
  font-size: 0.6rem;
  font-weight: normal;
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 1.3rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

