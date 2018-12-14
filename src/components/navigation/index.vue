<template>
  <div class="nav" v-show="isShow" id="navigation">
    <div class="nav-list">
      <router-link
        tag="div"
        class="nav-item"
        v-for="(item, index) in navigation"
        :key="index"
        v-if="index > 0"
        :to="item.path"
      >
        <span :class="['icon', item.icon, item.name === $route.name && !item.isHideName ? 'active' : null]"></span>
        <span v-if="!item.isHideName" class="name">{{item.meta.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { navigation } from "@/router/config";

export default {
  name: "navigation",
  data() {
    return {
      navigation,
      currentNav: 1,
      isShow: this.$route.meta.navigation || false
    };
  },
  watch: {
    $route() {
      this.isShow = this.$route.meta.navigation || false;
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  background-color: #fff;
  box-shadow: 0rem -0.01rem 0rem 0rem #dddddd;
}
.nav .nav-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav .nav-list .nav-item {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 1.49rem;
  color: #888;
  font-size: 0.36rem;
}
.icon.acitve + name {
  color: #de2245;
}
</style>
