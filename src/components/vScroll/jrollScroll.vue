<template>
  <div>
    <!-- 如果是一个数据列表滚动容器则显示带有上拉加载和下拉刷新功能 -->
    <template v-if="isList">
      <VueInfinite
        :style="{width: width, height: height}"
        :jroll-options="options"
        :pulldown-options="isPullDown ? {} : false"
        :propsIsLoading="isLoading"
        :total="scrollTotal"
        :autoLoad="autoLoad"
        :hasNextPage="hasNextPage"
        @on-scroll-bottom="onLoadMore"
        @on-pulldown="onPullDown"
        ref="jrollRef"
      >
        <!-- 解决匿名插槽不能使用filter问题 -->
        <slot name="body" />
        <slot></slot>
      </VueInfinite>
    </template>
    <!-- 如果不是数据列表则是纯滚动 -->
    <template v-else>
      <div class="scroll_main" :style="{width: width,height: height}" ref="scrollWrapper">
        <div class="iscroll" :style="{width: scrollDirection.toLocaleUpperCase() === 'Y' ? '100%' : 'auto'}">
          <!-- 解决匿名插槽不能使用filter问题 -->
          <slot name="body" />
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Jroll from "jroll";
import "jroll-pulldown";

import "./jroll-vue-infinite2";

export default {
  name: "jrollScroll",
  props: {
    /* eslint-disable */
    "scroll-direction": {
      type: String,
      default: "Y"
    },
    // 选填，是否开启弹动动画
    "scroll-momentum": {
      type: Boolean,
      default: true
    },
    // 滚动容器高度
    "scroll-height": {
      type: [String, Number],
      default: `${window.innerHeight}px`
    },
    // 滚动容器宽度
    "scroll-width": {
      type: [String, Number],
      default: `${window.innerWidth}px`
    },
    // 滚动条的参数
    "scroll-options": {
      type: Object,
      default: () => ({})
    },
    // 滚动到底部了
    "on-scroll-bottom": {
      type: Function,
      default: () => {}
    },
    // 上拉刷新
    pulldown: {
      type: Function,
      default: () => {}
    },
    hideYBar: {
      type: Boolean,
      default: false
    },
    hideXBar: {
      type: Boolean,
      default: false
    },
    // 是否是列表
    isList: {
      type: Boolean,
      default: true
    },
    // 选填 总页数
    total: {
      type: Number,
      default: 1
    },
    // 是否首次自动加载
    autoLoad: {
      type: Boolean,
      default: true
    },
    // isPullDown
    isPullDown: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VueInfinite: Jroll.VueInfinite2()
  },
  data() {
    const { scrollWidth, scrollHeight, scrollOptions, total } = this;
    return {
      jrollScroll: {},
      options: scrollOptions,
      width: scrollWidth,
      height: scrollHeight,
      scrollTotal: total,
      isLoading: false,
      hasNextPage: true,
      Y: 0,
      X: 0,
      maxScrollY: 0,
      maxScrollX: 0
    };
  },
  watch: {
    // 监听当前Scroll传递过来的options
    scrollOptions(nextOptions) {
      this.options = nextOptions;
    },
    scrollWidth(nextValue) {
      this.width = nextValue;
      this.$nextTick(() => {
        this.refresh();
      });
    },
    scrollHeight(nextValue) {
      this.height = nextValue;
      this.$nextTick(() => {
        this.refresh();
      });
    },
    total(nextValue) {
      this.scrollTotal = nextValue;
    }
  },
  created() {
    
  },
  mounted() {
    if (this.isList) {
      this.jrollScroll = this.$refs.jrollRef.jroll;
    } else {
      const { scrollDirection, hideYBar, hideXBar } = this;
      const isY = scrollDirection.toLocaleUpperCase() === "Y";
      const isX = scrollDirection.toLocaleUpperCase() === "X";
      this.jrollScroll = new Jroll(this.$refs.scrollWrapper, {
        // 开启垂直滚动条
        scrollBarY: isY && !hideYBar,
        // 是否开启水平滚动条
        scrollBarX: isX && !hideXBar,
        // 是否使用scrollX
        scrollX: isX,
        // 是否使用scrollY
        scrollY: isY,
        // 开启滚动条渐隐模式
        scrollBarFade: true,
        // 是否互动加速，惯性过度
        momentum: this.scrollMomentum,
        preventDefault: true,
        ...this.options
      });
    }
    const self = this;
    this.jrollScroll.on("scroll", function() {
      self.$emit("scroll", {
        x: this.x,
        y: ~this.y,
        e: this
      });
    });
    this.jrollScroll.on("scrollEnd", function() {
      self.$emit("scroll", {
        x: this.x,
        y: ~this.y,
        e: this
      });
      self.Y = this.y;
      self.X = this.x;
      self.maxScrollY = this.maxScrollY;
      self.maxScrollX = this.maxScrollX;
    });
  },
  methods: {
    onLoadMore(page, success, error) {
      const promise =
        this.hasNextPage && !this.isLoading ? this.onScrollBottom(page) : false;
      this.isLoading = true;
      if (promise) {
        this.pending();
        promise
          .then(body => {
            // 加载完毕
            this.isLoading = false;
            if (typeof body === "boolean") {
              this.hasNextPage = false;
              // 没有数据了
              this.notData();
            } else {
              // 如果列表不是items的这个key承载是直接body承载则这样判断分页
              if (typeof body.hasNextPage === "undefined") {
                this.hasNextPage = body.length > 0;
              } else {
                this.hasNextPage = body.hasNextPage;
              }
              this.$nextTick(() => {
                success();
              });
            }
          })
          .catch(() => {
            error();
            // 加载完毕
            this.isLoading = false;
          });
      } else {
        this.scrollTotal = 1;
        this.isLoading = false;
        this.$nextTick(() => {
          success();
        });
      }
    },
    onPullDown(success, error) {
      this.scrollTotal = 1;
      this.isLoading = true;
      const promise = this.pulldown(0);
      if (promise) {
        this.pending();
        promise
          .then(body => {
            this.isLoading = false;
            // 如果列表不是items的这个key承载是直接body承载则这样判断分页
            if (typeof body.hasNextPage === "undefined") {
              this.hasNextPage = body.length > 0;
            } else {
              this.hasNextPage = body.hasNextPage;
            }
            success();
          })
          .catch(() => {
            error();
          });
      } else {
        this.scrollTotal = 1;
        this.isLoading = false;
        this.$nextTick(() => {
          success();
        });
      }
    },
    success(page, hasNext) {
      this.isLoading = false;
      this.hasNextPage = !hasNext;
      this.$nextTick(() => {
        this.$refs.jrollRef.success(page);
      });
    },
    pending() {
      this.$refs.jrollRef.pending();
    },
    // 刷新滚动容器
    refresh(hasReset) {
      this.jrollScroll.refresh();
      // 需要重置滚动条位置
      if (!hasReset) {
        if (this.jrollScroll.maxScrollY > this.maxScrollY) {
          this.scrollTo(
            this.jrollScroll.maxScrollX,
            this.jrollScroll.maxScrollY * 0.91
          );
        }
      }
      // 滚动条更改了要执行scroll事件
      const event = {
        x: this.jrollScroll.x,
        y: ~(this.jrollScroll.y > this.jrollScroll.maxScrollY
          ? this.jrollScroll.y
          : this.jrollScroll.maxScrollY)
      };
      this.$emit("scroll", {
        ...event,
        e: {
          ...event
        }
      });
    },
    // 跳到指定位置
    scrollTo(x, y) {
      this.jrollScroll.scrollTo(x, y);
    },
    // 跳到指定元素位置
    scrollToElement(selector) {
      this.jrollScroll.scrollToElement(selector);
    },
    // 开启滑动
    enable() {
      this.jrollScroll.enable();
    },
    // 禁止滑动
    disable() {
      this.jrollScroll.disable();
    },
    // 缩放
    scale(multiple) {
      this.jrollScroll.scale(multiple);
    },
    // 没有数据
    notData(text) {
      this.hasNextPage = false;
      this.$refs.jrollRef.notData(text);
    },
    setTip(tip) {
      this.$refs.jrollRef.setTip(tip);
    }
  }
};
</script>

<style scoped>
.iscroll {
  display: inline-block;
}
</style>
