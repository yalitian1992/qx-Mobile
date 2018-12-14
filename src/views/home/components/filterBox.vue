<template>
  <transition name="filter-fade">
    <div class="filter-list" v-if="isPopup" ref="filterList">
      <div class="mask" @click="closePop"></div>
      <div class="filterBox">
        <div class="goods-filter-box">
          <div class="goods-attr select">
            <span class="title">宝贝属性</span>
            <div class="attr-type">
              <button
                v-for="(item, index) in goodsAttrs"
                :key="index"
                :class="['btn', item.property === currentAttr ? 'active' : null]"
                type="button"
                @click="handleAttrItem(item)"
              >{{item.name}}</button>
            </div>
          </div>
          <div class="features-select select">
            <span class="title">特色选择</span>
            <div class="attr-type">
              <button
                v-for="(item, index) in chooses"
                :key="index"
                :class="['btn', currentChoose[index] === item.choose ? 'active' : null]"
                type="button"
                @click="handleChooseItem(item, index)"
              >{{item.name}}</button>
            </div>
          </div>
          <div class="goods-sort">
            <span class="title">宝贝筛选</span>
            <ul class="sort-list">
              <li
                :class="['sort-item', item.sort === currentSort ? 'active' : null]"
                v-for="(item, index) in goodsSortList"
                :key="index"
                @click="handleSortItem(item)"
              >
                <span>{{item.name}}</span>
                <span v-if="item.sort === currentSort" class="icon-sort-item-select"></span>
              </li>
            </ul>
          </div>
          <div class="operation">
            <button class="btn btn-reset" @click="resetSort">重置</button>
            <button class="btn btn-confirm" @click="handleConfirmSort">完成</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 宝贝属性list
const goodsAttrs = [
  {
    property: 0,
    name: "已送出"
  },
  {
    property: 1,
    name: "赠送中"
  }
];
// 特色选择list
const chooses = [
  {
    choose: 0,
    name: "全新"
  },
  {
    choose: 1,
    name: "同城"
  }
];
// 宝贝筛选list
const goodsSortList = [
  {
    sort: -1,
    name: "默认排序"
  },
  {
    sort: 0,
    name: "按发布时间"
  },
  {
    sort: 1,
    name: "按收藏热度"
  },
  {
    sort: 2,
    name: "按果冻数从高到低"
  },
  {
    sort: 3,
    name: "按果冻数从低到高"
  }
];

export default {
  name: "filterBox",
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { isShow } = this;
    return {
      goodsAttrs,
      chooses,
      goodsSortList,
      currentSort: undefined,
      currentAttr: undefined,
      currentChoose: [],
      isPopup: isShow
    };
  },
  watch: {
    isShow(nextValue) {
      this.isPopup = nextValue;
    }
  },
  mounted() {},
  methods: {
    /**
     * 处理宝贝筛选被选择
     */
    handleSortItem(item) {
      this.currentSort = item.sort;
    },
    /**
     * 处理宝贝属性被选择
     */
    handleAttrItem(item) {
      if (this.currentAttr === item.property) {
        this.currentAttr = undefined;
      } else {
        this.currentAttr = item.property;
      }
    },
    /**
     * 处理特色选择被选择
     */
    handleChooseItem(item, index) {
      if (
        typeof this.currentChoose[index] !== "undefined" &&
        this.currentChoose[index] !== -1
      ) {
        this.currentChoose.splice(index, 1, -1);
      } else {
        this.currentChoose[index] = 0;
        this.currentChoose.splice(index, 1, item.choose);
      }
    },
    /**
     * 重置筛选
     */
    resetSort() {
      const currentChoose = [].concat(this.currentChoose);
      currentChoose.forEach(() => {
        this.currentChoose.pop();
      });
      this.currentAttr = undefined;
      this.currentSort = undefined;
    },
    /**
     * 处理完成筛选
     */
    handleConfirmSort() {
      const { currentSort, currentAttr, currentChoose } = this;
      const choose = currentChoose.filter(item => item >= 0);

      this.$emit("onSort", {
        sort: currentSort,
        property: currentAttr,
        choose: choose.length > 0 ? currentChoose.toString() : undefined
      });
      this.closePop();
    },
    closePop() {
      this.isPopup = false;
      this.$emit("update:isShow", this.isPopup);
    }
  }
};
</script>

<style scoped>
.filter-fade-enter,
.filter-fade-leave-to {
  transform: translateX(70%);
}
.filter-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.filter-fade-leave-active {
  transition: all 0.3s ease-out;
}
.filter-list,
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9000;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.mask {
  background: rgba(0, 0, 0, 0.3);
}
.filterBox {
  position: relative;
  z-index: 9001;
  width: 63.4%;
  height: 100%;
  background: #f4f4f4;
}
.goods-filter-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.1rem 0;
}
.select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2.79rem;
  background-color: #fff;
  margin-bottom: 0.3rem;
  padding: 0 0.9rem;
}
.select .title {
  font-size: 0.36rem;
  color: #353535;
}
.select .attr-type {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.select .attr-type .btn {
  width: 2.22rem;
  height: 0.96rem;
  border-radius: 0.48rem;
  border: solid 0.02rem #de2245;
  background: #fff;
  color: #de2245;
}
.select .attr-type .btn.active {
  border: solid 0.02rem #de2245;
  background: #de2245;
  color: #fff;
}
.goods-sort {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0.29rem 0.91rem 0.17rem;
  background: #fff;
}
.goods-sort .title {
  font-size: 0.36rem;
  color: #353535;
  margin-bottom: 0.2rem;
}
.goods-sort .sort-list {
  display: flex;
  flex-direction: column;
  font-size: 0.42rem;
  color: #666;
}
.goods-sort .sort-list .sort-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.36rem 0;
}
.goods-sort .sort-list .sort-item .icon-sort-item-select {
  display: none;
}
.goods-sort .sort-list .sort-item.active {
  color: #de2245;
}
.goods-sort .sort-list .sort-item.active .icon-sort-item-select {
  display: flex;
  width: 0.36rem;
  height: 0.25rem;
  background: url("../../../images/home/ic_selected.png") no-repeat;
  background-size: 100%;
}
.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: auto;
}
.operation .btn {
  width: 50%;
  height: 1.94rem;
  font-size: 0.54rem;
}
.operation .btn.btn-reset {
  background: #fff;
  color: #de2245;
}
.operation .btn.btn-confirm {
  background: #de2245;
  color: #fff;
}
</style>
