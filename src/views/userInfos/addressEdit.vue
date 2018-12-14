<template>
  <div class="addressEdit-box">
    <!--<V-Scroll :isList="false" :scroll-height="`${mainHeight}px`">-->
      <div class="address-form">
        <div>
          <label>联络人</label>
          <input type="text" v-model="Info.name" placeholder="名字">
        </div>
        <div>
          <label>手机号码</label>
          <input type="tel" pattern="[0-9]*" maxlength="11" v-model="Info.phone" placeholder="11位电话号码">
        </div>
        <div class="adderss-city">
          <label>选择地区</label>
          <input type="text" v-model="Info.region" placeholder="地区信息" readonly @click="openPicker">
        </div>
        <div class="address-textarea">
          <label>详细地址</label>
          <textarea placeholder="街道门牌" v-model="Info.address"></textarea>
        </div>
        <div>
          <label>邮政编码</label>
          <input type="tel" pattern="[0-9]*" placeholder="邮政编码" maxlength="6" v-model="Info.zipCode">
        </div>
      </div>
      <!--<div class="address-checkBtn">-->
        <!--<p>设置默认地址</p>-->
        <!--<label class="ui-switch">-->
          <!--<input type="checkbox" checked="">-->
        <!--</label>-->
      <!--</div>-->
      <div class="address-save" @click="saveFun">保存</div>
      <vue-pickers :show="show3"
                   :selectData="pickData3"
                   v-on:cancel="close"
                   v-on:confirm="confirmFn"></vue-pickers>
    <!--</V-Scroll>-->
  </div>
</template>

<script>
/* eslint camelcase: "off" */
import Ajax from "@/mixins/ajax";
import VuePickers from "~/vue-picker/picker";
import { provs_data, citys_data, dists_data } from "~/vue-picker/areaData";
import { session } from "@/libs/utils";

const insertAddressUrl = "/tuser/put/insertAddress";

export default {
  name: "orderList",
  data() {
    return {
      Info: {
        userId: JSON.parse(session.getItem("user")).userId,
        name: "",
        addressId: "", // 地址id
        phone: "",
        region: "",
        address: "",
        zipCode: "",
        // 省份
        province: "",
        // 城市
        city: "",
        // 地区
        area: ""
      },
      pickData3: {
        columns: 3,
        link: true,
        pData1: provs_data,
        pData2: citys_data,
        pData3: dists_data,
        default: [
          {
            text: provs_data[0].text,
            value: provs_data[0].value
          },
          {
            text: citys_data[provs_data[0].value][0].text,
            value: citys_data[provs_data[0].value][0].value
          },
          {
            text: dists_data[citys_data[provs_data[0].value][0].value][0].text,
            value: dists_data[citys_data[provs_data[0].value][0].value][0].text
          }
        ]
      },
      show3: false
    };
  },
  mixins: [Ajax],
  components: {
    VuePickers
  },
  mounted() {
    if (this.$route.query.id) {
      this.Info = JSON.parse(sessionStorage.getItem("address"));
    }
  },
  methods: {
    close() {
      this.show3 = false;
    },
    confirmFn(data) {
      console.log(data);
      this.Info.province = data.select1.text;
      this.Info.city = data.select2.text;
      this.Info.area = data.select3.text;
      this.Info.region =
        data.select1.text + data.select2.text + data.select3.text;
      this.show3 = false;
    },
    openPicker() {
      this.show3 = true;
    },
    saveFun() {
      const Info = this.Info;
      // 邮编
      const reg = /^\d{6}$/;
      // 表情
      const regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
      // 电话
      const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!Info.name) {
        this.$root.$emit("toast", {
          toastInfo: "请输入联系人"
        });
        return;
      } else if (regRule.test(Info.sname)) {
        this.$root.$emit("toast", {
          toastInfo: "联系人格式错误"
        });
        return;
      }
      if (!Info.phone) {
        this.$root.$emit("toast", {
          toastInfo: "请输入手机号码"
        });
        return;
      } else if (!myreg.test(Info.phone)) {
        this.$root.$emit("toast", {
          toastInfo: "请输入正确的手机号码"
        });
        return;
      }
      if (!Info.region) {
        this.$root.$emit("toast", {
          toastInfo: "请选择地区"
        });
        return;
      }
      if (!Info.address) {
        this.$root.$emit("toast", {
          toastInfo: "请输入详细地址"
        });
        return;
      } else if (regRule.test(Info.address)) {
        this.$root.$emit("toast", {
          toastInfo: "地址格式错误"
        });
        return;
      }
      if (!Info.zipCode) {
        this.$root.$emit("toast", {
          toastInfo: "请输入验证码"
        });
        return;
      } else if (!reg.test(Info.zipCode)) {
        this.$root.$emit("toast", {
          toastInfo: "验证码格式错误"
        });
        return;
      }
      this.post(insertAddressUrl, this.Info).then(body => {
        console.log(body);
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style scoped>
.addressEdit-box {
  width: 100%;
}
.address-form {
  margin-top: 0.3rem;
}
.address-form > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.5rem;
  padding: 0 0.3rem;
  border-bottom: 1px solid #f4f4f4;
  background: #fff;
  font-size: 0.48rem;
}
.address-form > div > label {
  text-align: left;
}
.address-form > div > input,
.address-textarea textarea {
  width: 8rem;
  font-size: 0.48rem;
  border: none;
  outline: none;
}
.address-form > div.address-textarea {
  height: 2.1rem;
}
.address-textarea textarea {
  resize: none;
  height: 1.4rem;
  line-height: 0.7rem;
}
.adderss-city input {
  background: url("../../images/my/icon_right.png") no-repeat right
    center/.17rem 0.36rem;
}
.address-checkBtn {
  height: 1.48rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
  margin-top: 0.3rem;
  background: #fff;
}
.address-save {
  margin: 0.45rem 0.6rem;
  height: 1.32rem;
  background-color: #de2245;
  border-radius: 1rem;
  line-height: 1.32rem;
  text-align: center;
  font-size: 0.54rem;
  color: #fff;
}
/*表单开关样式*/
.ui-switch {
  position: relative;
  font-size: 0.16rem;
  width: 1.5rem;
  height: 0.84rem;
  line-height: 0.84rem;
}
.ui-switch input {
  width: 1.5rem;
  height: 0.84rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border: 0;
  background: 0 0;
  -webkit-appearance: none;
  outline: 0;
}
.ui-switch input:before {
  content: "";
  width: 1.5rem;
  height: 0.84rem;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  border-radius: 1rem;
  cursor: pointer;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  border-color: #dfdfdf;
  -webkit-box-shadow: #dfdfdf 0 0 0 0 inset;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  -webkit-transition: border 0.4s, -webkit-box-shadow 0.4s;
  transition: border 0.4s, box-shadow 0.4s;
  -webkit-background-clip: content-box;
  background-clip: content-box;
}
</style>
