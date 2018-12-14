<template>
  <V-Scroll :isList="false" ref="scroll" :scroll-height="`${mainHeight}px`">
    <div class="editGoods-box">
      <div class="video-banner">
        <img src="../../images/userInfos/videoBanner.jpg" alt="">
      </div>
      <div class="editInfo">
        <router-link tag="div" :to="`/myaccess/orderChange`" class="address item">
          <span class="address-title">选择宝贝</span>
          <span class="address-text">{{order.goodsName}}</span>
          <span class="address-arrow icon-arrow-right"></span>
        </router-link>
        <div class="item">
          <div class="title">上传感谢视频</div>
          <textarea type="text" ref="describe" v-model.trim="describe" maxLength="200" rows="5" class="goods-edit-input goods-dec-input" placeholder="这一刻的想法......"></textarea>
        </div>
      </div>
      <div class="add-pic-video">
        <div class="file-item item" v-for="(item, index) in files" :key="index">
          <div class="file-video-wrapper" v-if="item.type === 'video'">
            <video ref="video" :src="item.src"  class="uploadImg"></video>
            <div class="video-play" @click="handlePlay(item.typeIndex)">
              <span class="icon-play"></span>
            </div>
          </div>
          <div class="removeFile" @click="removeFile(item, index)">
            <span class="icon-removeFile"></span>
          </div>
        </div>
        <div class="add-btn item" @click="handleVideoClick">
          <input ref="videoRef" style="display: none;" @change="handleVideoChange($event)" class="camera" type="file" accept="video/*">
          <span class="icon-video"></span>
          <span>添加视频</span>
        </div>
      </div>
      <div class="type-select">
        <div class="quality item">
          <span>使用感谢卡</span>
          <VSwitch open-name="" close-name="" color="green" v-model="isNew"></VSwitch>
        </div>
      </div>
      <div class="bottom-tip tip">
        <span>不会拍视频？选择感谢卡试试！</span>
      </div>
      <div class="next-step">
        <button type="button" @click="handleNextStep" class="btn btn-next-step">下一步</button>
      </div>
    </div>
  </V-Scroll>
</template>
<script>
import VSwitch from "vue-switch/switch-2";

import Ajax from "@/mixins/ajax";
import FileView from "@/libs/fileReader";
import { session } from "@/libs/utils";

// 上传商品文件数据
const setGoodsPutFileUrl = "/goods/put_files";
// 订单详情
const userOrderDetailUrl = "/goods/get/userOrderDetail";

function beforeunload(e) {
  /* eslint-disable */
  const confirmationMessage = "o/";
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
}

export default {
  name: "editGoods",
  mixins: [Ajax],
  components: {
    VSwitch
  },
  data() {
    return {
      files: [],
      fileView: {},
      // 是否全新
      isNew: false,
      // 描述信息
      describe: "",
      // 标题
      title: "",
      // 上传图片是否有首图
      isImageOne: false,
      // 首图
      firstFigure: "",
      eventFiles: null,
      test: "",
      order: {}
    };
  },
  mounted() {
    this.fileView = new FileView();
    this.fileView.removeEvent("loadend");
    this.fileView.on("loadend", this.handleFileLoadend);
    this.orderInfos()
    // 注册如果页面返回事件
    this.$root.$on("headBack", () => {
      window.removeEventListener("beforeunload", beforeunload);
    });
    // 注册如果页面被刷新和离开事件
    window.addEventListener("beforeunload", beforeunload);
  },
  methods: {
    // 订单详情
    orderInfos() {
      this.get(userOrderDetailUrl, {
        userId: JSON.parse(session.getItem("user")).userId,
        orderId: session.getItem("orderId")
      }).then(body => {
        this.order = body;
      });
    },
    /**
     * 处理文件加载完成
     */
    handleFileLoadend(files, status) {
      if (files.length > 0 && files[0].type === "image" && !this.isImageOne) {
        /* eslint-disable */
        files[0].isOne = true;
        // 上传图片已经有首图了
        this.isImageOne = true;
      }
      if (status === "resource") {
        this.files = files;
      } else {
        this.files = files;
        // 处理视频超过时长
        this.handleVideoDuration();
      }
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    /**
     * 处理视频超出时长
     */
    handleVideoDuration() {
      const self = this;
      const shadowFiles = this.files;
      shadowFiles.forEach((file, index) => {
        if (file.type === "video") {
          ((file, i) => {
            const videoEl = document.createElement("video");
            videoEl.src = file.src;
            videoEl.addEventListener("canplaythrough", e => {
              handleCanplay(i, file, e);
            });
          })(file, index);
        }
      });
      function handleCanplay(i, file, e) {
        self.test = e.path[0].duration;
        if (e.path[0].duration > 30) {
          self.$root.$emit("toast", {
            toastInfo: `${file.file.name}\n视频超过了30秒，请换一个视频试试`,
            time: 4000
          });
          self.files.splice(i, 1);
        }
      }
    },

    handleVideoChange(e) {
      this.eventFiles = e.target.files;
      this.fileView.fileReader(e.target.files);
      this.$refs.videoRef.setAttribute("type", "text");
    },
    handleVideoClick() {
      this.$refs.videoRef.setAttribute("type", "file");
      this.$refs.videoRef.click();
    },
    removeFile(item) {
      if (item.type === "image" && item.isOne) {
        // 首图被删除下一张来代替首图
        this.isImageOne = false;
      }
      this.fileView.deleteIdSource(item.typeIndex, item.type);
      this.files = []
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    handlePlay(index) {
      const videoEl = this.$refs.video[0];
      if (videoEl.paused) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
    },
    /**
     * 处理下一步
     */
    handleNextStep() {
      const {
        describe,
        files,
        isNew,
      } = this;
      console.log(files)
      let toastInfo = "";
      let flag = true;
      if (describe === "" && flag) {
        toastInfo = "请输入描述";
        flag = false;
        this.$refs.describe.focus();
      }
      if (files.length <= 0 && flag) {
        toastInfo = "请上传视频";
        flag = false;
      }
      if (!flag) {
        this.$root.$emit("toast", {
          toastInfo
        });
        return;
      }
      // 移除上一次事件
      this.$root.$off("releaseGoods");
      // 绑定新事件
      this.$root.$on("releaseGoods", callback => {
        // 响应上传
        const uploadFile = new Promise(this.uploadFiles);
        uploadFile.then(obj => {
          callback({
            id: "",
            goodsId: "",
            goodsName: "",
            fromId: "", // 发送感谢/故事的用户IDstring无bodytrue
            toId: "", //接受感谢/故事的用户ID(商品发布用户的ID)string无bodytrue
            content: "", // 感谢文字内容string无bodyfalse
            orderId: "",
            files: ""
          });
        });
      });
      window.removeEventListener("beforeunload", beforeunload);
      this.$router.push({ name: "EditGoodsCategory" });
    },
    uploadFiles(resolve, reject) {
      const { files } = this;
      let fileUrls = [];
      let fileObjs = [];
      let forFlag = false;
      /* eslint-disable */
      files.length > 0 &&
      this.$root.$emit("loading", {
        isMask: false,
        state: true
      });
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        // 开始上传
        formData.append("files", files[i].file);
        ((file, index) => {
          this.upload(setGoodsPutFileUrl, formData)
            .then(body => {
              // 保存首图地址
              if (file.isOne) {
                this.firstFigure = body.filePaths[0].filePath;
              }
              fileUrls = fileUrls.concat(body.filePaths[0].filePath);
              fileObjs = fileObjs.concat(body.filePaths[0]);
              if (index + 1 >= files.length) {
                this.$root.$emit("loading", {
                  isMask: false,
                  state: false
                });
                resolve({
                  fileUrls: fileUrls,
                  fileObjs: fileObjs,
                  firstFigure: this.firstFigure
                });
              }
            })
            .catch(err => {
              !forFlag && reject(err);
              forFlag = true;
            });
        })(files[i], i);
      }
    }
  },
  destroyed() {
    // 卸载返回事件
    this.$root.$off("headBack");
    window.removeEventListener("beforeunload", beforeunload);
  }
};
</script>

<style scoped>
  .editGoods-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .tip {
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background: #ffe7d0;
    font-size: 0.39rem;
    color: #fa7d2a;
  }
  .video-banner{
    height:4.45rem;
    width:100%;
  }
  .video-banner img{
    width:100%;
    height:auto;
  }
  .editInfo {
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .editInfo .item {
    box-sizing: border-box;
    padding: 0.42rem 0.45rem;
    font-size: 0.42rem;
    color: #000;
  }
  .address{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .editInfo .item:last-child {
    height: 4.1rem;
    border-top: 1px solid #ddd;
  }
  .editInfo .item:last-child .title,
  .editInfo .item:last-child .goods-edit-input {
    align-self: flex-start;
  }
  .editInfo .item .title {
    margin-right: 0.49rem;
  }
  .goods-edit-input {
    flex-grow: 1;
    border: none;
    padding: 0.1rem 0.1rem;
    font-size: 0.42rem;
    width:100%;
    margin-top:.1rem;
  }
  .add-pic-video {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    padding: 0.45rem 0.21rem 0.45rem 0.45rem;
    margin-bottom: 0.3rem;
  }
  .add-pic-video .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    color: #888;
    margin-left: 0.24rem;
    margin-bottom: 0.24rem;
  }

  .add-pic-video .add-btn {
    width: 2.4rem;
    height: 2.4rem;
    background-color: #f1f1f1;
  }
  .add-pic-video .icon-video {
    width: 1.18rem;
    height: 0.92rem;
    margin-bottom: 0.25rem;
    background: url("../../images/releaseGoods/video.png") no-repeat;
    background-size: 100%;
  }
  .add-pic-video .icon-image {
    width: 1.02rem;
    height: 0.92rem;
    margin-bottom: 0.25rem;
    background: url("../../images/releaseGoods/image.png") no-repeat;
    background-size: 100%;
  }

  /* 文件位置样式 */
  .add-pic-video .item .uploadImg {
    width: 2.4rem;
    height: 2.4rem;
  }
  .file-item {
    position: relative;
    background-color: #f1f1f1;
  }
  /* 删除文件对象 */
  .add-pic-video .removeFile {
    position: absolute;
    right: -0.1rem;
    top: -0.1rem;
    display: flex;
  }
  .add-pic-video .removeFile .icon-removeFile {
    width: 0.6rem;
    height: 0.6rem;
    background: url("../../images/delete.png") no-repeat;
    background-size: 100%;
  }
  .file-video-wrapper {
    position: relative;
  }
  .file-video-wrapper .video-play {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-video-wrapper .video-play .icon-play {
    width: 0.53rem;
    height: 0.6rem;
    background: url("../../images/play.png") no-repeat;
    background-size: 100%;
  }
  .file-image-wrapper {
    position: relative;
  }
  .file-image-wrapper .image-one {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    background-color: rgba(222, 34, 69, 0.7);
  }
  /* 选择商品属性，以及地址样式 */
  .type-select {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    font-size: 0.42rem;
    background: #fff;
  }
  .type-select .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0.45rem;
    min-height: 1.07rem;
  }
  .type-select .quality {
    border-bottom: 1px solid #ddd;
  }
  .address .icon-arrow-right {
    width: 0.23rem;
    height: 0.42rem;
    background: url("../../images/icon-arrow-right.png") no-repeat;
    background-size: 100%;
  }
  .address .address-text {
    flex-grow: 1;
    width: 70%;
    font-size: 0.4rem;
    color: #d1d0d0;
    padding: 0 0.5rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .address .address-title {
    white-space: nowrap;
  }
  .address .address-arrow {
    white-space: nowrap;
  }
  .bottom-tip.tip {
    background: transparent;
    color: #888;
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
</style>
