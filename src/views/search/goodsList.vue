<template>
  <div>
    <div ref="searchBox" class="searchBox">
      <div class="search">
        <span class="icon-search"></span>
        <input ref="searchInput" type="text" class="search-input" v-model="searchInfo" placeholder="请输入您要找的物品">
      </div>
    </div>
    <V-Scroll :isPullDown="false" ref="searchScroll" :autoLoad="false" :pulldown="getSearchList" :on-scroll-bottom="getSearchList">
      <GoodsList :dataSource="goodsList" />
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import GoodsList from "~/goodsList/";

const getSearchListUrl = "/goods/get/listGoodsByNameFuzzy";

export default {
  name: "SearchList",
  mixins: [Ajax],
  components: {
    GoodsList
  },
  data() {
    return {
      searchInfo: "",
      goodsList: []
    };
  },
  watch: {
    searchInfo(nextValue) {
      if (nextValue === "") {
        this.goodsList = [];
      }
      /* eslint-disable */
      const promise = this.getSearchList(0);
      this.$refs.searchScroll.setTip("查询中...");
      promise &&
        promise.then(body => {
          if (typeof body === "boolean") {
            this.$refs.searchScroll.notData("暂无相关数据");
          } else {
            this.$refs.searchScroll.success(1, body.length <= 0);
          }
        });
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  methods: {
    handleAutoFocue() {},
    getSearchList(page) {
      if (this.searchInfo === "") {
        this.$nextTick(() => {
          this.$refs.searchScroll.notData("请输入你要找的物品名称");
        });
        return;
      }
      page = page || 0;
      return this.post(getSearchListUrl, {
        searchKey: this.searchInfo,
        startPage: page
      }).then(body => {
        if (page === 0) {
          this.goodsList = body.items;
        } else {
          this.goodsList = (this.goodsList || []).concat(body.items);
        }
        if (body.items.length <= 0) {
          return false;
        }
        return body;
      });
    }
  }
};
</script>
<style scoped>
.searchBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  background: #fff;
  font-size: 0.39rem;
}
.search {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 0.44rem;
  padding: 0 0.54rem;
  height: 0.9rem;
}
.icon-search {
  width: 0.36rem;
  height: 0.36rem;
  background: url("../../images/search.png") no-repeat;
  background-size: 100%;
  margin-right: 0.28rem;
}
.search-input {
  flex-grow: 1;
  border: none;
}
</style>
