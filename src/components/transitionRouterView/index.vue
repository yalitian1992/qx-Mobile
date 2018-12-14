<template>
  <div class="wrapper" id="wrapper">
    <!-- <transition :name="transitionName"> -->
      <router-view ref="route" class="Router RouterView"/>
    <!-- </transition> -->
  </div>
</template>

<script>

export default {
  name: "transitionRouterView",
  props: ["a"],
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    /* eslint-disable */
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>


<style>
.wrapper {
  width: auto;
  overflow: hidden;
  background: #f5f5f4;
}
.Router {
  width: 100%;
}
/* left 进场动画 */
.slide-left-enter,
.slide-right-leave-active {
  height: 0;
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-right-enter,
.slide-left-leave-active {
  height: 0;
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
