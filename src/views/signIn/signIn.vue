<template>
  <!--eslint-disable -->
  <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`" :hideYBar="true">
    <div class="login-box">
      <div class="tabs">
        <span :class="['item', currentType === 1 ? 'active' : null]" @click="handleToggle(1)">账号密码登录</span>
        <span :class="['item', currentType === 2 ? 'active' : null]"  @click="handleToggle(2)">手机验证登录</span>
        <span :class="['bottom-lien', currentTypeClass]"></span>
      </div>
      <div class="tab-content">
          <div class="form-list">
            <div class="form-item">
              <label for="phone" class="input-label">手机号</label>
              <input type="number" id="phone" class="input-control" @input="handleNumberInput('phone', 11, $event)" @blur="handlePhone" pattern="[0-9]*" inputmode="numberirc" v-model.trim="phone" placeholder="请输入手机号">
            </div>
            <div class="form-item" v-show="currentType === 1">
              <label for="password" class="input-label">密码</label>
              <input type="password" id="password" class="input-control" v-model.trim="password" placeholder="请输入密码">
            </div>
            <div class="form-item form-code-item" v-show="currentType === 2">
              <label for="code" class="input-label">验证码</label>
              <input type="number" id="code" class="input-control" @input="handleNumberInput('code', 6, $event)" pattern="[0-9]*" inputmode="numberirc" v-model.trim="code" placeholder="请输入6位验证码">
              <button type="button" @click="handleGetCode" class="btn btn-get-code">{{codeInfo}}</button>
            </div>
          </div>
      </div>
      <button type="button" @click="handleLogin" class="btn btn-login">登录</button>
      <div class="registered">
        <span>无账号?</span>
        <router-link tag="div" :to="{name: 'SignUp'}" class="signup">
          <span>立即注册</span>
          <span class="icon-arrow-right"></span>
        </router-link>
      </div>
    </div>
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { session } from "@/libs/utils";
// 获取验证码
const getCodeUrl = "/tuser/put/verificationCode";
// 验证验证码
// const valiDateCodeUrl = "/tuser/put/verification";
// 手机号登录
const loginUrl = "/tuser/put/loginByPhone";

export default {
  name: "SignIn",
  mixins: [Ajax],
  data() {
    return {
      currentType: 1,
      currentTypeClass: "one",
      phone: null,
      code: null,
      password: "",
      codeInfo: "获取验证码",
      isGetCode: false
    };
  },
  methods: {
    handleLogin() {
      const { isGetCode, password, currentType, code } = this;
      let result = "";
      if (!isGetCode) {
        result = "请输入手机号";
      } else if (currentType === 1 && !password) {
        result = "请输入密码";
      } else if (currentType === 2 && !code) {
        result = "请输入验证码";
      } else if (currentType === 2 && code.length < 6) {
        result = "请输入完整的验证码";
      }
      if (result !== "") {
        this.$root.$emit("toast", {
          toastInfo: result
        });
        return;
      }

      // 打开loading
      this.$root.$emit("loading", {
        isMask: true,
        state: true
      });
      this.login();
    },
    /**
     * 登入
     */
    login() {
      const { phone, password, currentType, code } = this;
      return this.post(loginUrl, {
        phone,
        password,
        code,
        type: currentType === 1 ? 1 : 0
      }).then(body => {
        if (body.token && body.token !== "") {
          session.setItem("token", body.token);
          session.setItem("user", JSON.stringify(body));
          this.$router.replace({ name: "Home" });
        } else {
          this.$root.$emit("toast", {
            toastInfo: body.message
          });
        }
        this.$root.$emit("loading", {
          isMask: false,
          state: false
        });
      });
    },
    handleToggle(type) {
      if (type === 1) {
        this.currentTypeClass = "one";
      } else {
        this.currentTypeClass = "two";
      }
      this.currentType = type;
    },
    /**
     * 获取验证码
     */
    handleGetCode() {
      if (this.downInterval) {
        return;
      }
      if (this.isGetCode) {
        // 打开Loading
        this.$root.$emit("loading", {
          state: true
        });
        const { phone } = this;
        this.post(getCodeUrl, {
          mobile: phone
        }).then(data => {
          if (+data.code === 200) {
            this.timeDown();
          } else {
            this.$root.$emit("toast", {
              toastInfo: data.message
            });
          }
          // 关闭loading
          this.$root.$emit("loading", {
            state: false
          });
        });
      } else {
        this.$root.$emit("toast", {
          toastInfo: "请输入正确的手机号，手机号由11位数字组成",
          time: 3000
        });
      }
    },
    timeDown() {
      clearInterval(this.downInterval);
      let time = 60;
      this.downInterval = setInterval(() => {
        /* eslint no-plusplus: "off" */
        time--;
        this.codeInfo = `${time}秒`;
        if (time <= 0) {
          clearInterval(this.downInterval);
          this.codeInfo = "获取验证码";
          this.downInterval = null;
        }
      }, 1000);
    },
    /**
     * 处理手机号输入框失去焦点
     */
    handlePhone() {
      /* eslint no-unused-expressions: "off" */
      const nextPhone = this.phone;
      if (nextPhone && +nextPhone >= 0 && nextPhone.length === 11) {
        const re = /^1[3-9][0-9][0-9]{8,}$/;
        if (!re.test(nextPhone)) {
          this.$root.$emit("toast", {
            toastInfo: "请输入正确的手机号，手机号由11位数字组成",
            time: 3000
          });
          this.phone = null;
          this.isGetCode = false;
        } else {
          this.isGetCode = true;
        }
      } else {
        nextPhone &&
          this.$root.$emit("toast", {
            toastInfo: "请输入正确的手机号，手机号由11位数字组成",
            time: 3000
          });
        this.phone = null;
        this.isGetCode = false;
      }
    },
    /**
     * 处理每一次输入是否为数字
     * @param {String} type 需要处理的dataKey
     * @param {Number} len 需要限制的长度
     * @param {Event} e 这个参数一般是vue提供的, 在template里用$event传递
     */
    handleNumberInput(type, len, e) {
      const nextInputValue =
        e.data || e.target.value.substr(e.target.value.length - 1);
      if ((this[type] && !(+nextInputValue >= 0)) || this[type].length > len) {
        this[type] = this[type].substr(0, this[type].length - 1);
      }
    }
  }
};
</script>

<style scoped>
.login-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
.login-box .tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: relative;
  font-size: 0.54rem;
  color: #666;
}
.login-box .tabs .item {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: 0.71rem 0;
}
.login-box .tabs .bottom-lien {
  width: 50%;
  height: 0.09rem;
  position: absolute;
  bottom: 0;
  background-color: #de2245;
  transition: all 0.5s ease-in-out;
}
.login-box .tabs .item.active {
  color: #de2245;
}
.login-box .tabs .bottom-lien.one {
  left: 0;
}
.login-box .tabs .bottom-lien.two {
  left: 50%;
}
/* 表单 */
.form-list {
  display: flex;
  flex-direction: column;
  font-size: 0.48rem;
  color: #000;
  margin-top: 0.36rem;
}
.form-list .form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 0.45rem;
  height: 1.47rem;
  background: #fff;
  box-sizing: border-box;
}
.form-list .form-item:first-child {
  border-bottom: 0.01rem solid #ccc;
}
.form-list .form-item .input-label {
  white-space: nowrap;
  margin-right: 0.62rem;
  flex-basis: 1.4rem;
  text-align: right;
}
.form-list .form-item .input-control {
  flex-grow: 1;
  font-size: 0.48rem;
  outline: none;
  border: none;
}
/* 按钮 */
.btn {
  background: #fff;
  border-radius: 0.495rem;
}
.btn-get-code {
  width: 2.83rem;
  height: 0.99rem;
  border: 1px solid #de2245;
  margin-left: 0.2rem;
  font-size: 0.42rem;
  color: #de2245;
}
.btn-login {
  height: 1.32rem;
  background-color: #de2245;
  border-radius: 0.66rem;
  font-size: 0.54rem;
  color: #fff;
  margin: 0.8rem 0.45rem 0;
}
.registered {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 0.9rem;
}
.registered .signup {
  display: flex;
  flex-direction: row;
  color: #de2245;
  margin-left: 0.31rem;
}
.icon-arrow-right {
  width: 0.23rem;
  height: 0.42rem;
  margin-top: 0.04rem;
  margin-left: 0.31rem;
  background: url("../../images/icon-arrow-right.png") no-repeat;
  background-size: 100%;
}
</style>
