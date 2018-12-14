<template>
  <div class="sendApplication-content">
    <div>
      <!--快递信息-->
      <div class="user-address-detail">
        <p>收件地址</p>
        <div>
          <p>
            <span>收件人:</span>
            <span>一个名字不会很长</span>
            <router-link tag="span" :to="{name: 'addressList'}">编辑</router-link>
          </p>
          <p>
            <span>收货地址:</span>
            <span>河北省张家口市赤城县赤城镇建国西街北三巷葡博园小区5号楼2单元401室</span>
          </p>
        </div>
        <p>寄件地址</p>
        <div>
          <p>
            <span>寄件人:</span>
            <span>一个名字不会很长</span>
          </p>
          <p>
            <span>寄货地址:</span>
            <span>河北省张家口市赤城县赤城镇建国西街北三巷葡博园小区5号楼2单元401室博园小区5号楼2单元401室</span>
          </p>
        </div>
        <p>期望上门收件时间</p>
        <div class="checkTime">
          <p @click="toShow">{{dates}}</p>
        </div>
      </div>
      <vue-pickers
        :show="show"
        :columns="columns"
        :defaultData="defaultData"
        :link="link"
        :selectData="pickData"
        v-on:cancel="close"
        v-on:confirm="confirmFn"></vue-pickers>
      <div class="send-btn">提交寄件申请</div>
      <div class="service-bottom">
        <p>联系客服</p>
        <p>联系对方</p>
      </div>
    </div>
  </div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import vuePickers from "vue-pickers";

export default {
  name: "orderDetail",
  data() {
    return {
      dates: "",
      show: false,
      columns: 4, // 四列
      link: false, // 联动必须需要link 参数
      defaultData: [],
      pickData: {
        // 第一列数据结构
        data1: [
          {
            text: 2018,
            value: 200
          },
          {
            text: 2019,
            value: 200
          }
        ],
        // 第二列数据结构
        data2: [
          {
            text: "01",
            value: 1
          },
          {
            text: "02",
            value: 2
          },
          {
            text: "03",
            value: 3
          }
        ],
        data3: this.getLoopArray(1, 31),
        data4: [
          {
            text: "07:00-09:00",
            value: 101
          },
          {
            text: "09:00-11:00",
            value: 102
          },
          {
            text: "11:00-13:00",
            value: 103
          },
          {
            text: "13:00-15:00",
            value: 104
          },
          {
            text: "15:00-17:00",
            value: 105
          },
          {
            text: "17:00-18:00",
            value: 106
          }
        ]
      }
    };
  },
  mixins: [Ajax],
  components: {
    vuePickers
  },
  created() {},
  mounted() {},
  methods: {
    withData(param) {
      return param < 10 ? `0${param}` : param;
    },
    getLoopArray(begin, over) {
      const start = begin || 0;
      const end = over || 1;
      const array = [];
      /* eslint-disable */
      for (let i = start; i <= end; i++) {
        array.push({
          text: this.withData(i),
          value: 100
        });
      }
      return array;
    },
    close() {
      this.show = false;
    },
    confirmFn(val) {
      /* eslint-disable */
      console.log(val);
      this.show = false;
      this.res = val;
      this.pickData.default = [val.select1, val.select2, val.select3];
      this.dates =
        val.select1.text +
        "-" +
        val.select2.text +
        "-" +
        val.select3.text +
        " " +
        val.select4.text;
    },
    toShow() {
      this.show = true;
    }
  }
};
</script>

<style scoped>
/*收寄货地址*/
.user-address-detail {
  margin-bottom: 0.3rem;
}
.user-address-detail > p {
  font-size: 0.36rem;
  color: #353535;
  padding: 0.3rem;
}
.user-address-detail > div {
  border-top: solid 1px #f5f5f5;
  background: #fff;
  padding: 0.4rem 0.3rem;
}
.user-address-detail > div > p {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  font-size: 0.45rem;
  color: #353535;
  position: relative;
  margin-bottom: 0.15rem;
}
.user-address-detail > div > p > span:nth-child(2) {
  max-width: 7.8rem;
  margin-left: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #888;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.user-address-detail > div > p:nth-child(2) > span:nth-child(2) {
  height: 1.2rem;
  line-height: 0.6rem;
  -webkit-line-clamp: 2;
}
/*地址end*/
.checkTime > p {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.45rem !important;
  color: #de2245 !important;
  background: #fff url("../../images/my/icon_right.png") no-repeat right
    center/.32rem 0.53rem !important;
}
.send-btn {
  width: 6.4rem;
  height: 1.3rem;
  background-image: linear-gradient(-30deg, #de2245 0%, #ed577b 100%);
  border-radius: 0.65rem;
  margin: 1rem auto 0;
  font-size: 0.45rem;
  color: #fff;
  text-align: center;
  line-height: 1.3rem;
}
/*联系客服*/
.service-bottom {
  height: 1.5rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.service-bottom > p {
  width: 50%;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.45rem;
  color: #171717;
}
.service-bottom > p:nth-child(2) {
  background-image: linear-gradient(-30deg, #de2245 0%, #ed577b 100%);
  color: #fff;
}
.user-address-detail > div > p > span:nth-child(3) {
  font-size: 0.36rem;
  color: #de2245;
  width: 1.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 0.1rem;
  border: solid 1px #de2245;
  text-align: center;
  position: absolute;
  right: 0;
}
</style>

