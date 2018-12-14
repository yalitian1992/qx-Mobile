<template>
	<div class="warp">
    <V-Scroll :scroll-height="`${mainHeight}px`" ref="taskScoll" :pulldown="upDate"  :on-scroll-bottom="upDate">
      <div class="task_top">
        <p>当前拥有<span>{{number}}<i>颗</i></span></p>
        <div class="task_bg">
          <span @click="goList">糖果记录</span>
        </div>
      </div>
      <div class="task_center">
        <ul>
          <li v-for="(item, index) in taskList" :key="index">
            <div class="task_left">
              <p>{{item.name}}</p>
              <p>果冻集分<span>{{item.priceMemo}}颗</span></p>
            </div>
            <div class="task_right">
              <p>去领取</p>
            </div>
          </li>
        </ul>
      </div>
    </V-Scroll>
	</div>
</template>

<script>
import Ajax from "@/mixins/ajax";
import { session } from "@/libs/utils";

// 获取商品详情
const taskUrl = "/task/get/tasklist";

export default {
  name: "task",
  mixins: [Ajax],
  data() {
    return {
      number: 0,
      userId: "",
      taskList:{}
    };
  },
  methods: {
    goList() {
      this.$router.push({ path: "/home/task/list" });
    },
    upDate() {
      // 任务列表
      this.get(taskUrl, {
        userId: JSON.parse(session.getItem("user")).userId || ""
      }).then(body => {
        this.taskList = body.datas;
        this.number = body.number;
        this.$refs.taskScoll.notData("没有更多数据了");
      });
    }
  },
  mounted() {
    this.upDate();
  }
};
</script>

<style scoped>
.warp {
  width: 100%;
}

.task_top {
  width: 100%;
  height: 4.78rem;
  background: #fff;
  margin-bottom: 0.25rem;
}

.task_top p {
  text-align: center;
  padding-top: 0.72rem;
  font-size: 0.4rem;
}

.task_top p span {
  font-size: 0.5rem;
  color: #de2245;
  margin-left: 0.1rem;
}

.task_top p span i {
  font-style: normal;
}

.task_center {
  height: auto;
  background: #fff;
}

.task_center ul {
  padding: 0 0.45rem;
}

.task_center ul li {
  height: 1.2rem;
  padding: 0.3rem 0;
  border-bottom: solid 1px #f4f4f4;
}

.task_left {
  float: left;
}

.task_right {
  float: right;
}

.task_left p:nth-child(1) {
  font-size: 0.45rem;
}

.task_left p:nth-child(2) {
  font-size: 0.36rem;
  color: #888888;
}

.task_left p:nth-child(2) span {
  color: #de2245;
  margin-left: 0.15rem;
}

.task_right p {
  width: 2.1rem;
  height: 0.92rem;
  background: #de2245;
  border-radius: 0.45rem;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  margin-top: 0.12rem;
}

.task_bg {
  height: 3.08rem;
  margin-top: 0.4rem;
  background: url("../../images/xiangqing/task_bg.png") no-repeat;
  background-size: 100%;
}

.task_bg span {
  display: block;
  width: 2.2rem;
  height: 0.75rem;
  margin: 0 auto;
  border: solid 1px #de2245;
  text-align: center;
  line-height: 0.75rem;
  color: #de2245;
  border-radius: 0.38rem;
}
</style>
