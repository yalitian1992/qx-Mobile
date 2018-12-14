<template>
  <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`" :hideYBar="true">
    <div class="signUpBox">
      <div class="form-list">
        <div class="form-item">
          <label for="phone" class="input-label">手机号</label>
          <input type="number" id="phone" class="input-control" @input="handleNumberInput('phone', 11, $event)" @blur="handlePhone" pattern="[0-9]*" inputmode="numberirc" v-model.trim="phone" placeholder="请输入手机号">
        </div>
        <div class="form-item form-code-item">
          <label for="code" class="input-label">验证码</label>
          <input type="number" id="code" class="input-control" @input="handleNumberInput('code', 6, $event)" pattern="[0-9]*" inputmode="numberirc" v-model.trim="code" placeholder="请输入6位验证码">
          <button type="button" @click="handleGetCode" class="btn btn-get-code">{{codeInfo}}</button>
        </div>
      </div>
      <button type="button" @click="handleNextStep" class="btn btn-next-step">下一步</button>
    </div>
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { session } from "@/libs/utils";
// 获取验证码
const getCodeUrl = "/tuser/put/verificationCode";
// 验证手机号
const valiDatePhoneUrl = "/tuser/put/checkPhoneUser";
// 用户注册加登录
const signUpUrl = "/tuser/put/insertPhoneUser";

export default {
  name: "SignUp",
  mixins: [Ajax],
  data() {
    return {
      phone: null,
      code: null,
      codeInfo: "获取验证码",
      // 是否可以获取验证码
      isGetCode: false
    };
  },
  methods: {
    /**
     * 处理下一步
     */
    handleNextStep() {
      const { phone, code, isGetCode } = this;
      if (!isGetCode) {
        this.$root.$emit("toast", {
          toastInfo: "请填写完手机号"
        });
        return;
      }
      if (code === null || code === "") {
        this.$root.$emit("toast", {
          toastInfo: "请输入6位验证码，如果没有请点击获取验证码"
        });
        return;
      }
      this.post(signUpUrl, {
        phone,
        code
      }).then(body => {
        if (body.userId !== "") {
          // 存储token
          session.setItem("token", body.token);
          session.setItem("user", JSON.stringify(body));
          // 去设置密码
          this.$router.replace(`/user/signup/password?phone=${phone}`);
        } else {
          this.$root.$emit("toast", {
            toastInfo: body.message
          });
        }
      });
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
        this.post(valiDatePhoneUrl, {
          phone
        })
          .then(body => {
            if (body.userId !== "") {
              this.$root.$emit("toast", {
                toastInfo: "手机号已被注册"
              });
            }
            return body;
          })
          .then(body => {
            // 如果UserId不存在则代表没有被注册过
            if (body.userId === "") {
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
            }
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
      const nextInputValue = e.data;
      if ((this[type] && !(+nextInputValue >= 0)) || this[type].length > len) {
        this[type] = this[type].substr(0, this[type].length - 1);
      }
    }
  },
  destroyed() {
    clearInterval(this.downInterval);
  }
};
</script>

<style scoped>
.signUpBox {
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding: 0.36rem 0;
}
.form-list {
  display: flex;
  flex-direction: column;
  font-size: 0.48rem;
  color: #000;
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
.form-list .form-item.form-code-item {
  border-top: 1px solid #ccc;
}
.form-list .form-item .input-label {
  white-space: nowrap;
  margin-right: 0.62rem;
}
.form-list .form-item .input-control {
  flex-grow: 1;
  font-size: 0.48rem;
  outline: none;
  border: none;
}
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
.btn-next-step {
  height: 1.32rem;
  background-color: #de2245;
  border-radius: 0.66rem;
  font-size: 0.54rem;
  color: #fff;
  margin: 0.9rem 0.45rem 0;
}
</style>
