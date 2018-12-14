<template>
  <V-Scroll :isList="false" :scroll-height="`${mainHeight}px`" :hideYBar="true">
    <div class="password-box">
      <div class="tip">请为您的账号设置密码</div>
      <div class="form-list">
        <div class="form-item">
          <label for="password" class="input-label">密码</label>
          <input type="password" id="password" class="input-control" @blur="handlePassword" inputmode="numberirc" v-model="password" placeholder="请输入8-20为字母或数字">
        </div>
      </div>
      <button type="button" @click="handleSavePassword" class="btn btn-save">保存密码</button>
    </div>
  </V-Scroll>
</template>

<script>
import Ajax from "@/mixins/ajax";
// 设置密码
const setPasswordUrl = "/tuser/updatePassword";

export default {
  name: "setPassword",
  mixins: [Ajax],
  data() {
    return {
      password: "",
      isSave: false
    };
  },
  methods: {
    handleSavePassword() {
      // 是否能够保存
      if (this.isSave) {
        const { phone } = this.$route.query;
        const { password } = this;
        if (phone) {
          this.post(setPasswordUrl, {
            phone,
            password
          }).then(body => {
            // 成功 200 其余都是失败
            if (+body.code === 200) {
              this.$root.$emit("toast", {
                toastInfo: "保存成功"
              });
              this.$router.replace({ name: "Home" });
            } else {
              this.$root.$emit("toast", {
                toastInfo: body.message
              });
            }
          });
        } else {
          this.$root.$emit("toast", {
            toastInfo: "请完善信息在来保存密码"
          });
          this.$router.replace({ name: "SignUp" });
        }
      } else {
        this.$root.$emit("toast", {
          toastInfo: "请填写8-20位字母或数字的密码之后在保存"
        });
      }
    },
    /**
     * 处理密码框失去焦点
     */
    handlePassword() {
      const { password } = this;
      if (password.length < 8) {
        this.$root.$emit("toast", {
          toastInfo: "输入的密码至少8位的字母或数字"
        });
        // 密码格式不正确，不允许保存密码
        this.isSave = false;
      } else if (password.length > 20) {
        this.$root.$emit("toast", {
          toastInfo: "输入的密码要小于20位的字母或数字"
        });
        // 密码格式不正确，不允许保存密码
        this.isSave = false;
      } else {
        // 密码格式通过允许保存密码
        this.isSave = true;
      }
    }
  }
};
</script>

<style scoped>
.password-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #000;
}
.password-box .tip {
  margin: 0.91rem auto;
  font-size: 0.6rem;
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
  padding: 0.51rem 0.45rem;
  background: #fff;
  box-sizing: border-box;
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
.btn-save {
  height: 1.32rem;
  background-color: #de2245;
  border-radius: 0.66rem;
  font-size: 0.54rem;
  color: #fff;
  margin: 0.9rem 0.45rem 0;
}
</style>
