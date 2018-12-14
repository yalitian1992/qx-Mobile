<template>
  <div class="navigation">
    <div class="menuIcon" @click="handleMenuClick"></div>
    <div v-show="isMenu" class="mask" @click="handleMenuClick"></div>
    <transition name="slide">
      <div v-show="isMenu" class="menuList">
        <!-- eslint-disable -->
        <router-link 
          v-for="(item, index) in menuList" 
          v-if="index !== 0 && !item.noShowMenu"
          :key="item.path" 
          :to="{path: `${item.path}`}" 
          tag="div" 
          @click.native="handleMenuClick" class="menuItem"
        >
          <div :class='["item-icon", item.icon]' :alt="item.meta.title"></div>
          <span class="title">{{item.meta.title}}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>
<script>
import MenuList from "@/router/config";

export default {
  name: "Menu",
  props: ["itemData"],
  data() {
    return {
      menuList: MenuList[0].children,
      isMenu: false
    };
  },
  methods: {
    /**
     * 处理菜单按钮被点击
     */
    handleMenuClick() {
      this.isMenu = !this.isMenu;
    }
  }
};
</script>

<style scoped>
.menuIcon {
  width: 1.52rem;
  height: 1.52rem;
  background: url("../../assets/img/menu.png") no-repeat;
  background-size: 100%;
  border-radius: 200px;
  position: fixed;
  bottom: 4.38rem;
  left: 0.26rem;
  z-index: 9997;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9998;
}
.menuList {
  width: 3rem;
  font-family: "STXihei";
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 0.41rem;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  transition: all 0.2s ease;
}
.menuList .menuItem {
  padding: 10px 8px;
  text-align: center;
}
.menuList .menuItem .item-icon {
  width: 1.22rem;
  height: 1.22rem;
  margin: 0 auto;
  background-size: 100%;
  border: solid 0rem #ffffff;
  margin-bottom: 0.1rem;
}
.item-icon.item-home {
  background: url("../../assets/img/home.png") no-repeat;
}
.item-icon.item-myRelease {
  background: url("../../assets/img/myRelease.png") no-repeat;
}
.item-icon.item-mySell {
  background: url("../../assets/img/mySell.png") no-repeat;
}
.item-icon.item-myBuy {
  background: url("../../assets/img/myBuy.png") no-repeat;
}
.menuList .menuItem .title {
  color: #fff;
  font-size: 0.33rem;
}
.slide-leave-active,
.slide-enter-active {
  left: -40%;
}
</style>

