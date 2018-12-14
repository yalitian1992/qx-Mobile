<template>
  <div class="address-content">
    <V-Scroll ref="scroll" :isList="false" :scroll-height="`${mainHeight}px`">
      <div class="add-address">
        <p @click="toJoinAddress">新增收货地址</p>
      </div>
      <ul class="address-list">
        <li v-for="(item,index) in addressLists" :key="index">
          <!-- swiper -->
          <swiper :options="swiperOption" ref="swiper">
            <swiper-slide @click.native="handleAddressItem(item, index)" class="content addressLefts">
              <div :class="{checkouteds:checksbg ==index}" @click="checkFun(index,item.id)">
                <p></p>
              </div>
              <div>
                <p>{{item.name}}</p>
                <p>{{item.address}}</p>
              </div>
              <div @click="editFun(item)">
                <p></p>
              </div>
            </swiper-slide>
            <swiper-slide class="menu" @click.native="deleteFun(index,item.id)">
              <div>
                删除
              </div>
            </swiper-slide>
          </swiper>
        </li>
      </ul>
    </V-Scroll>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { session } from "@/libs/utils";

/* eslint-disable */
import "swiper/dist/css/swiper.css";

const addressListUrl = "/tuser/list/address";
const deleteAddressUrl = "/tuser/del/deleteAddress";
const chooseAddressUrl = "/tuser/put/chooseAddress";

export default {
  name: "orderList",
  data() {
    return {
      menuCross: false,
      userId: JSON.parse(session.getItem("user")).userId,
      swiperOption: {
        initialSlide: 0,
        resistanceRatio: 0,
        slidesPerView: "auto",
        slideToClickedSlide: true,
        on: {
          touchMove: () => {
            this.$refs.swiper.forEach(item => {
              item.swiper.slidePrev();
            });
          }
        }
      },
      addressLists: [],
      checksbg: null
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  mixins: [Ajax],
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // 删除地址
    deleteFun(index, adderssid) {
      this.get(deleteAddressUrl, {
        addressId: adderssid
      }).then(body => {
        this.$refs.swiper[index] &&
          this.$refs.swiper[index].swiper.slidePrev(false);
        this.addressLists.splice(index, 1);
      });
    },
    //编辑
    editFun(obj) {
      session.setItem("address", JSON.stringify(obj));
      this.$router.push({
        path: "/myaccess/addressEdit",
        query: { id: obj.id }
      });
    },
    // 选择用户地址
    checkFun(index, adderssid) {
      this.checksbg = index;
      const { userId } = this;
      this.post(chooseAddressUrl, {
        userId,
        addressId: adderssid
      }).then(body => {});
    },
    // 列表
    addressFun() {
      const { userId } = this;
      this.post(addressListUrl, {
        userId
      }).then(body => {
        this.addressLists = body;
        this.$nextTick(() => {
          this.$refs.scroll.refresh(true);
        });
      });
    },
    /**
     * 处理跳转到添加地址
     */
    toJoinAddress() {
      const { fullPath } = this.$route.query;
      if (fullPath) {
        this.$router.push(
          `/myaccess/addressEdit?fullPath=${encodeURIComponent(fullPath)}`
        );
      } else {
        this.$router.push("/myaccess/addressEdit");
      }
    },
    /**
     * 处理选择地址
     */
    handleAddressItem(item) {
      let { fullPath } = this.$route.query;
      // 返回路径存在
      if (fullPath) {
        // 路径解码
        fullPath = unescape(fullPath);
        // 是否有参数
        const isParams = fullPath.indexOf("?") >= 0;
        const params = `address=${item.address}&province=${
          item.province
        }&city=${item.province}&area=${item.area}&addressId=${item.id}&name=${item.name}&phone=${item.phone}`;
        if (isParams) {
          // 如果参数最后是&符号则删除
          fullPath =
            fullPath[fullPath.length - 1] === "&"
              ? fullPath.substr(0, fullPath.length - 1)
              : fullPath;
          // 跳转返回路径URL以及增加选择地址

          this.$router.replace(`${fullPath}&${params}`);
        } else {
          // 跳转返回路径URL以及增加选择地址
          this.$router.replace(`${fullPath}?${params}`);
        }
        // 设置下一次返回的步数
        this.$root.$emit("setGoStep", -2);
      }
    }
  },
  mounted() {
    this.addressFun();
  }
};
</script>

<style scoped>
.add-address {
  height: 1.48rem;
  line-height: 1.48rem;
  background-color: #fff;
  padding: 0 0.3rem;
  margin: 0.3rem auto;
}
.add-address > p {
  height: 1.48rem;
  font-size: 0.48rem;
  line-height: 1.48rem;
  color: #353535;
  padding-left: 0.6rem;
  background: url("../../images/userInfos/icon_add.png") no-repeat left
      center/.48rem 0.48rem,
    url("../../images/my/icon_right.png") no-repeat right center/.17rem 0.36rem;
}
.addressLefts {
  height: 2.46rem;
  background-color: #fff;
  margin-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.addressLefts > div:nth-child(1) > p {
  width: 1rem;
  height: 1rem;
}
div.checkouteds > p {
  background: url("../../images/userInfos/icon_addChecked.png") no-repeat
    center/.44rem 0.36rem;
}
.addressLefts > div:nth-child(2) {
  margin: 0 0.1rem;
  width: 9rem;
  text-align: left;
}
.addressLefts > div:nth-child(2) > p:nth-child(1) {
  height: 0.6rem;
  font-size: 0.48rem;
  line-height: 0.6rem;
  color: #353535;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.addressLefts > div:nth-child(2) > p:nth-child(2) {
  height: 1rem;
  font-size: 0.42rem;
  line-height: 0.5rem;
  color: #666666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.addressLefts > div:nth-child(3) > p {
  width: 1rem;
  height: 1rem;
  background: url("../../images/userInfos/icon_address.png") no-repeat
    center/.48rem 0.48rem;
}

.menu {
  width: 2rem;
  height: 2.46rem;
  line-height: 2.46rem;
  text-align: center;
  background-color: #de2245;
  color: #fff;
}
</style>
