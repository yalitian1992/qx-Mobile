<template>
<div>
  <V-Scroll :isList="false" ref="categoryScroll" :scroll-height="`${mainHeight}px`">
    <div class="editGoodsCategory-box">
      <div class="tip">
        请勿超过分享物品的市场价，不会写价格？选择竞拍
      </div>
      <div class="tabs-box">
        <div class="tab-item">
          <div class="box">
            <span @click="handleTab(1)" :class="['item', tabType === 1 ? 'active' : null]">一口果冻</span>
            <span @click="handleTab(3)" :class="['item', tabType === 3 ? 'active' : null]">竞拍</span>
          </div>
        </div>
        <div class="tab-content">
          <div class="fixedPrice">
            <div class="option-block">
              <div class="item" v-if="tabType === 1">
                <span>一口果冻</span>
                <div class="contains">
                    <input type="number" class="shareInput" required inputmode="numeric" pattern="[0-9]*" v-model.number.trim="bidPrice">
                </div>
                <span>个</span>
              </div>
              <template v-else>
                <div class="item">
                  <span>起拍价</span>
                  <div class="contains">
                    <input type="number" class="shareInput" required inputmode="numeric" pattern="[0-9]*" v-model.number.trim="bidPrice">
                  </div>
                  <span>个</span>
                </div>
                <div class="item">
                  <span>竞拍时间</span>
                  <div class="contains">
                    <div class="slider">
                      <VSlider :slider-style="{backgroundColor: '#fff'}" :process-style="{backgroundColor: '#de2245'}" :tooltip="false"  :min="1" :max="24" v-model="auctionTime"></VSlider>
                    </div>
                  </div>
                  <span class="text">{{auctionTime}}小时</span>
                </div>
              </template>
              <div class="item" @click="handleCategory">
                <span>分类标签</span>
                <span class="category-text">{{currentCategory.text || "选择"}}</span>
                <span class="icon-arrow-right"></span>
              </div>
              <div class="item">
                <span>仅限同城享友</span>
                <VSwitch open-name="" close-name="" color="green" v-model="onlyCityFriends"></VSwitch>
              </div>
            </div>
            <div class="option-block">
              <div class="item" @click="handleDelivery">
                <span>普通快递</span>
                <span :class="['icon-checkbox', delivery ? 'active' : null]"></span>
              </div>
              <div class="item" @click="handleDoorToTake">
                <span>顺丰快递上门取件</span>
                <span :class="['icon-checkbox', doorToTake ? 'active' : null]"></span>
              </div>
            </div>
            <span class="edit-tip tip">快递费由享友支付给平台。</span>
            <div :class="['option-block', !isAnOptions ? 'first-item' : null]">
              <div class="item" @click="handleAnOptions">
                <span>高级选项</span>
                <span :class="['icon-arrow-down', isAnOptions ? 'arrow-up' : null]"></span>
              </div>
              <template v-if="isAnOptions">
                <div class="item">
                  <span>上架数量</span>
                  <div class="contains">
                    <input type="number" class="shareInput" required inputmode="numeric" pattern="[0-9]*" v-model.number.trim="shelfNum">
                  </div>
                </div>
                <div class="item">
                  <span>仅限分享过的享友领取</span>
                  <VSwitch open-name="" close-name="" color="red" v-model="onlyShareFriends"></VSwitch>
                </div>
                <div class="item">
                  <span>仅限我关注的人可以私信给我</span>
                  <VSwitch open-name="" close-name="" color="red" v-model="onlyFocusFriends"></VSwitch>
                </div>
                <div class="item">
                  <span>好友不可见</span>
                  <VSwitch open-name="" close-name="" color="red" v-model="isFriendInvisible"></VSwitch>
                </div>
              </template>
            </div>
            <template v-if="isAnOptions">
              <span class="edit-tip tip">想送给制定好友？选择商家时间，生成海报后，发送给好友、社群或微信朋友圈。若超时未被领取，将自动下架。</span>
              <div class="option-block last-block">
                <div class="item" @click="handleShelfTime">
                  <span>延迟上架</span>
                  <div class="contains-text">
                    <span class="text">{{currentShelfTime.text}}</span>
                    <span class="icon-arrow-right"></span>
                  </div>
                </div>
              </div>
            </template>
            <div class="next-step">
              <button type="button" @click="handleNextStep" class="btn btn-next-step">确认发布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </V-Scroll>
  <VPicker :show.sync="isShowPicker" :selectData="selectData" @cancel="closeAllPop" @confirm="categorysConfirm"/>
  <Popup :VClose="false" :delayTime="2" :isShow.sync="isPopup">
    <div slot="body" class="popupBody">
      <span>确认发布此商品吗？</span>
    </div>
    <div slot="footer" class="popupFooter">
      <button class="cancel btn" @click="closeAllPop">取消</button>
      <button class="confirm btn" @click="confirmReleaseGoods">确认发布</button>
    </div>
  </Popup>
</div>
</template>

<script>
import VSwitch from "vue-switch/switch-2";
import VSlider from "vue-slider-component";
import Ajax from "@/mixins/ajax";
import VPicker from "~/vue-picker/picker";
import Popup from "~/popOut/Popups";
import { session } from "@/libs/utils";

// 上传商品信息数据
const setGoodsPutDataUrl = "/goods/put_data";

function beforeunload(e) {
  /* eslint-disable */
  const confirmationMessage = "o/";
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
}

export default {
  name: "editGoodsCategory",
  mixins: [Ajax],
  components: {
    VSwitch,
    VSlider,
    VPicker,
    Popup
  },
  data() {
    return {
      // tab切换 1: 一口价 2: 竞拍
      tabType: 1,
      // 是否仅限同城享友
      onlyCityFriends: false,
      // 仅限分享过的享友
      onlyShareFriends: false,
      // 仅限我关注的人可以私信给我
      onlyFocusFriends: false,
      // 好友不可见
      isFriendInvisible: false,
      // 普通快递
      delivery: false,
      // 上门取件
      doorToTake: false,
      // 是否显示高级选项
      isAnOptions: false,
      // 竞拍时间
      auctionTime: 1,
      // 起拍价
      bidPrice: 1,
      // 是否显示分类列表
      isShowPicker: false,
      // 当前选择的分类
      currentCategory: {},
      // 上架数量
      shelfNum: 1,
      // 当前选择的上架时间
      currentShelfTime: { text: "立即上架", id: "0" },
      // 分类列表
      categorys: {
        columns: 1,
        pData1: [
          { text: "时尚", value: 1 },
          { text: "美妆", value: 2 },
          { text: "母婴", value: 3 },
          { text: "书籍", value: 4 },
          { text: "居家", value: 5 },
          { text: "数码", value: 6 },
          { text: "其他", value: -1 }
        ],
        default: [{ text: "时尚", value: 1 }]
      },
      // 延时上架
      shelfTime: {
        columns: 1,
        pData1: [
          { text: "立即上架", value: "0" },
          { text: "1小时后上架", value: "1" },
          { text: "2小时后上架", value: "2" },
          { text: "3小时后上架", value: "3" },
          { text: "4小时后上架", value: "4" },
          { text: "5小时后上架", value: "5" }
        ],
        default: [{ text: "立即上架", value: "0" }]
      },
      // picker 数据
      selectData: {},
      currentPickerType: null,
      // 是否显示确认发布弹框
      isPopup: false
    };
  },
  mounted() {
    // 注册如果页面返回事件
    this.$root.$on("headBack", () => {
      window.removeEventListener("beforeunload", beforeunload);
    });
    // 注册如果页面被刷新和离开事件
    window.addEventListener("beforeunload", beforeunload);
  },
  methods: {
    /**
     * 处理选中分类
     */
    categorysConfirm(item) {
      if (this.currentPickerType === 1) {
        // 保存当前选择的分类
        this.currentCategory = {
          value: item.select1.value,
          text: item.select1.text
        };
        this.categorys.default[0] = this.currentCategory;
      } else {
        // 保存当前选择的上架时间
        this.currentShelfTime = {
          value: item.select1.value,
          text: item.select1.text
        };
        this.shelfTime.default[0] = this.currentShelfTime;
      }
      this.closeAllPop();
    },
    /**
     * 关闭所有弹框
     */
    closeAllPop() {
      this.isShowPicker = false;
      this.isPopup = false;
    },
    /**
     * 处理选择分类
     */
    handleCategory() {
      // 保存当前选择状态值 1：分类选择 2: 延时上架选择
      this.currentPickerType = 1;
      const currentCategory = this.currentCategory.value
        ? this.currentCategory
        : false;
      this.categorys.default[0] = currentCategory || this.categorys.default[0];
      this.selectData = this.categorys;
      this.$nextTick(() => {
        // 显示picker框
        this.isShowPicker = true;
      });
    },
    handleShelfTime() {
      // 保存当前选择状态值 1：分类选择 2: 延时上架选择
      this.currentPickerType = 2;
      const currentShelfTime = this.currentShelfTime.value
        ? this.currentShelfTime
        : false;
      this.shelfTime.default[0] = currentShelfTime || this.shelfTime.default[0];
      this.selectData = this.shelfTime;
      this.$nextTick(() => {
        // 显示picker框
        this.isShowPicker = true;
      });
    },
    /**
     * 处理普通快递选择
     */
    handleDelivery() {
      this.delivery = !this.delivery;
    },
    /**
     * 处理上门取件
     */
    handleDoorToTake() {
      this.doorToTake = !this.doorToTake;
    },
    /**
     * 处理展开选项
     */
    handleAnOptions() {
      this.isAnOptions = !this.isAnOptions;
      this.$nextTick(() => {
        this.$refs.categoryScroll.refresh();
      });
    },
    handleTab(type) {
      this.tabType = type;
      this.$nextTick(() => {
        this.$refs.categoryScroll.refresh(true);
      });
    },
    /**
     * 下一步，打开确认发布商品弹框
     */
    handleNextStep() {
      // 判断上一页的事件是否存在，如果不存在说明用户刷新了页面或者是按照Url直接进来的，需要返回上一页重新填写
      if (this.$root._events.releaseGoods) {
        if (!this.currentCategory.value) {
          this.$root.$emit("toast", { toastInfo: "请选择分类" });
          this.handleCategory();
        } else if (!(+this.shelfNum > 0)) {
          this.$root.$emit("toast", {
            toastInfo: "请输入大于0的上架数量",
            time: 3000
          });
        } else {
          this.isPopup = true;
        }
      } else {
        this.$root.$emit(
          "toast",
          { toastInfo: "请填写完商品信息之后在发布" },
          5000
        );
        this.$root.$emit("setGoStep", -2);
        this.$router.replace({ name: "EditGoods" });
      }
    },
    /**
     * 确认发布商品
     */
    confirmReleaseGoods() {
      // 执行获取上一页数据的事件
      this.$root.$emit("releaseGoods", prevData => {
        this.isPopup = false;
        let goodsData;
        const publicData = {
          // 商品名称
          name: prevData.title,
          // 商品描述
          description: prevData.describe,
          // 是否全新
          brandNew: prevData.isNew ? 1 : 0,
          // 发货地址
          address: prevData.addressId,
          // 商品类型
          goodsTypeId: this.currentCategory.value,
          // 出售方式
          saleTypeId: this.tabType,
          // 当前发布用户的ID
          publishUserId: JSON.parse(session.getItem("user")).userId,
          // 标识商品是否仅限同城享友可见   0:仅限同城;1:全部可见
          seeInCity: this.onlyCityFriends ? 0 : 1,
          // 快递方式:  0:普通快递;1:顺丰快递上门取件
          trackType: this.doorToTake ? 1 : 0,
          // 是否仅限分享过的享友领取0:否; 1:是
          receiveType: this.onlyShareFriends ? 1 : 0,
          // 仅限我关注的人可以私信给我:0:否;1:是
          privateMessageType: this.onlyFocusFriends ? 1 : 0,
          // 延迟上架:0:立即上架;1:1小时后上架;2:2小时后上架;3:3小时后上架;4:4小时后上架;5:5小时后上架
          delayAdded: this.currentShelfTime.id,
          // 好友不可见 0:可见;1:不可见
          friendsNoSee: this.isFriendInvisible ? 1 : 0,
          // 花费积分
          integral: this.bidPrice,
          // 文件路径数组
          files: prevData.fileUrls,
          // 地区
          area: prevData.area,
          // 城市
          city: prevData.city,
          // 省份
          province: prevData.province,
          // 上架个数
          total: this.shelfNum
        };
        // 一口价
        // const flatly = {
        //   // 花费积分
        //   integral: this.bidPrice
        // }
        // 竞拍
        const auction = {
          // 竞拍时间（小时），审核通过后开始计时，1-24
          auctionTime: this.auctionTime
        };
        if (this.tabType === 1) {
          goodsData = publicData;
        } else {
          goodsData = Object.assign(auction, publicData);
        }
        this.post(setGoodsPutDataUrl, JSON.stringify(goodsData)).then(body => {
          this.$router.replace(
            `/release/ReleaseWin?message=${body.successRemind}&firstFigure=${
              prevData.firstFigure
            }&goodsId=${body.id}`
          );
        });
      });
    }
  },
  destroyed() {
    window.removeEventListener("beforeunload", beforeunload);
  }
};
</script>

<style scoped>
.tip {
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background: #ffe7d0;
  font-size: 0.39rem;
  color: #fa7d2a;
}
.edit-tip {
  align-self: flex-start;
  background: transparent;
  color: #888;
  height: auto;
  line-height: normal;
  padding: 0.19rem 0.45rem;
  margin-bottom: 0.58rem;
}
.tabs-box .tab-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.45rem 0.52rem;
  background: #fff;
}
.tabs-box .tab-item .box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #de2245;
  font-size: 0.45rem;
}
.tabs-box .tab-item .box .item {
  width: 5.1rem;
  height: 0.99rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #de2245;
}
.tabs-box .tab-item .box .item.active {
  background: #de2245;
  color: #fff;
}

.fixedPrice {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.fixedPrice .category-text {
  flex-grow: 1;
  text-align: right;
  margin-right: 0.3rem;
  margin-top: -0.01rem;
}
.option-block {
  display: flex;
  flex-direction: column;
  margin-top: 0.3rem;
  background: #fff;
  font-size: 0.42rem;
}
.option-block .item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.53rem 0.45rem;
  border-bottom: 1px solid #ddd;
}
.option-block .item:last-child {
  border-bottom: none;
}
.contains {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-left: 0.2rem;
}
.contains .slider {
  flex-grow: 1;
}
.option-block .text {
  white-space: nowrap;
  margin-left: 0.5rem;
}
.option-block .contains-text {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.option-block .contains-text .text {
  margin-right: 0.1rem;
  margin-top: -0.03rem;
}
.first-item,
.last-block {
  margin-bottom: 1.04rem;
}

.next-step {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.45rem;
  background: #fff;
}
.next-step .btn {
  width: 10.35rem;
  height: 1.32rem;
  border-radius: 0.66rem;
  color: #fff;
  font-size: 0.54rem;
  text-align: center;
}
.next-step .btn.btn-next-step {
  background-color: #de2245;
}
.shareInput {
  width: 100%;
  text-align: right;
  margin-right: 0.1rem;
  font-size: 0.42rem;
  border: none;
}

.icon-arrow-down {
  width: 0.42rem;
  height: 0.23rem;
  background: url("../../images/icon-arrow-down.png") no-repeat;
  background-size: 100%;
  transition: all 0.3s ease-in;
}
.icon-arrow-down.arrow-up {
  transform: rotate(-180deg);
}
.icon-arrow-right {
  width: 0.23rem;
  height: 0.42rem;
  background: url("../../images/icon-arrow-right.png") no-repeat;
  background-size: 100%;
}
.icon-checkbox {
  width: 0.69rem;
  height: 0.69rem;
  background-image: url("../../images/icon-checkbox.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.icon-checkbox.active {
  background-image: url("../../images/icon-checkbox-active.png");
}
/* 弹框 */
.popupBody {
  font-size: 0.39rem;
  margin: 1rem 0;
}
.popupFooter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
}
.popupFooter .btn {
  width: 50%;
  height: 1.2rem;
  background: #fff;
  font-size: 0.4rem;
}
.popupFooter .btn.cancel {
  color: #000;
  border-right: 1px solid #ccc;
  border-bottom-left-radius: 0.18rem;
}
.popupFooter .btn.confirm {
  color: rgb(0, 252, 21);
  border-bottom-right-radius: 0.18rem;
}
</style>
