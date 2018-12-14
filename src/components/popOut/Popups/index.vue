<template>
  <div class="popups-box" v-show="isPopup">
    <div class="mask" v-if="isMaskDown" @click="close"></div>
    <div class="mask" v-else></div>
    <div class="popups">
      <div class="pop-header">
        <div v-if="title !== ''" class="title">
          <span>{{title}}</span>
        </div>
        <div v-if="VClose && title === ''"></div>
        <div v-if="VClose" class="close">
          <i @click="close" class="icon-close"></i>
        </div>
      </div>
      <div class="pop-body">
        <slot name="body"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "popOut",
  props: {
    // 必填，是否显示弹框
    isShow: {
      type: [Boolean],
      required: true
    },
    // 选填，遮罩层是否可以点击触发关闭
    isMaskDown: {
      type: [Boolean],
      default: () => false
    },
    // 选填, 是否显示关闭按钮
    VClose: {
      type: [Boolean],
      default: () => true
    },
    // 选填，弹框标题
    title: {
      type: String,
      default: ""
    },
    // 选填，弹框下次可点击时间
    delayTime: {
      type: [Number, String],
      default: () => 0
    }
  },
  data() {
    return {
      isPopup: this.isShow || false,
      isMaskClose: this.isMaskDown || false,
      // 上次关闭时间
      lastTime: 0,
      // 结束标识
      endFlag: false
    };
  },
  watch: {
    isShow(nextValue) {
      const { delayTime } = this;
      if (+delayTime > 0) {
        let currentShowTime;
        // 如果为打开状态,并且已经不再记录时间内,则记录下当前时间
        /* eslint-disable no-unused-expressions */
        nextValue && (currentShowTime = Date.now());
        // 如果为结束状态,并且已经不再记录时间内,则保存下结束时间
        /* eslint-disable no-unused-expressions */
        !nextValue && !this.endFlag && (this.lastTime = Date.now());
        // 在打开状态 并且 关闭时间存在
        if (nextValue && this.lastTime !== 0) {
          // 获取当前点击打开的时间秒数
          const time = (currentShowTime - this.lastTime) / 1000;
          if (time < +delayTime) {
            this.endFlag = true;
            return;
          }
          this.endFlag = false;
        }
      }
      this.isPopup = nextValue;
      this.$nextTick(() => {
        // 如果弹框为打开状态
        if (nextValue) {
          this.setPopPosition();
        }
      });
    },
    isMaskDown(nextValue) {
      this.isMaskClose = nextValue;
    }
  },
  methods: {
    /**
     * 设置弹框位置
     */
    setPopPosition() {
      /* eslint-disable */
      const maskEls = document.getElementsByClassName("popups");
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      if (this.getWidth) {
        windowWidth = this.getWidth();
      }
      if (this.getHeight) {
        windowHeight = this.getHeight();
      }
      for (let i = 0; i < maskEls.length; i++) {
        let element = maskEls[i];
        let elWidth = window.getComputedStyle(element).width;
        let elHeight = window.getComputedStyle(element).height;
        if (this.getStyle) {
          elWidth = this.getStyle(element, "width");
          elHeight = this.getStyle(element, "height");
        }
        const leftPx = (windowWidth - parseInt(elWidth, 10)) / 2;
        const topPx = (windowHeight - parseInt(elHeight, 10)) / 2;
        element.style.left = `${leftPx}px`;
        element.style.top = `${topPx}px`;
      }
    },
    /**
     * 关闭弹框
     */
    close() {
      this.isPopup = !this.isPopup;
      this.$emit("update:isShow", this.isPopup);
    }
  }
};
</script>
<style scoped>
.popups-box {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  width: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.6);
}
.popups {
  position: fixed;
  top: 26%;
  width: 7.43rem;
  margin: 0 auto;
  -webkit-border-radius: 0.18rem;
  border-radius: 0.18rem;
  background: #fff;
  text-align: center;
  z-index: 10002;
  font-size: 0.54rem;
}
.pop-header {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin-bottom: 0.09rem;
}
.pop-header .title {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  margin: 0.89rem 0 0.09rem 0.61rem;
  color: #d11463;
}
.close .icon-close {
  display: inline-block;
  width: 0.43rem;
  height: 0.43rem;
  margin: 0.18rem 0.18rem 0 0;
  /* background: url("../../../assets/img/close.png"); */
  background-size: 100%;
}
.pop-body {
  padding: 0 0.63rem;
}
.footer {
  /* margin: 0.85rem 0 0.61rem; */
  /* padding: 0 0.3rem; */
}
</style>

