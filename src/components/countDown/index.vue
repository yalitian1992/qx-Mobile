<template>
  <span><slot v-if="!isTimeDown" name="first" />{{CountdownTime}}<slot v-if="!isTimeDown" /></span>
</template>
<script>
export default {
  name: "CountDown",
  props: {
    totalSeconds: {
      required: true
    },
    intervalId: {
      type: [Number, String],
      required: true
    },
    endInfo: {
      type: String,
      default: () => "已结束"
    },
    // 1: 自动显示 2: 只显示几天和几小时
    timeType: {
      type: [String, Number],
      default: () => 1
    }
  },
  data() {
    return {
      CountdownTime: "",
      // 是否有计时完成的状态
      isTimeDown: false
    };
  },
  mounted() {
    // 如果定时器存在则清楚上次的定时器
    if (window[`mark${this.intervalId}`]) {
      clearInterval(window[`mark${this.intervalId}`]);
    }
    // 保存当前总时间
    let currentTime = this.totalSeconds || 0;
    if (currentTime !== 0) {
      currentTime = this.timeDown(currentTime);
      window[`mark${this.intervalId}`] = setInterval(() => {
        if (currentTime === 0) {
          // 如果时间为0 则停止定时器
          clearInterval(window[`mark${this.intervalId}`]);
          this.CountdownTime = this.endInfo;
          this.isTimeDown = true;
          // 执行组件绑定事件
          this.$emit("endTime");
        } else {
          /* eslint-disable */
          // 开始倒计时
          // 递减时间 每次一秒
          --currentTime;
          currentTime = this.timeDown(currentTime);
        }
      }, 1000);
    } else {
      this.isTimeDown = true;
      this.CountdownTime = this.endInfo;
      // 执行组件绑定事件
      this.$emit("endTime");
    }
  },
  methods: {
    /**
     * 倒计时  一秒为单位
     * @param {Number|String} totalSeconds 以秒为单位
     */
    timeDown(totalSeconds) {
      totalSeconds = parseInt(totalSeconds, 10);
      // 一天的秒数
      const dayTime = 24 * 60 * 60;
      // 一小时的秒数
      const hourTime = 60 * 60;
      // 一分钟的秒数
      const minuteTime = 60;
      /* eslint-disable */
      // 天数    总时间 / (24 * 60 * 60);
      const Nday = parseInt(totalSeconds / dayTime, 10);
      // 小时数  总时间 - 天数 = 剩余秒数 / (60 * 60)
      const Nhour = parseInt((totalSeconds - Nday * dayTime) / hourTime, 10);
      // 分数   总时间 - 天数 - 小时数 = 剩余秒数  / 60 = 分数
      const Nminute = parseInt(
        (totalSeconds - Nday * dayTime - Nhour * hourTime) / minuteTime,
        10
      );
      // 秒数   总时间 - 天数 - 小时数 - 分数 = 剩余秒数
      const Nseconds = parseInt(
        totalSeconds - Nday * dayTime - Nhour * hourTime - Nminute * minuteTime,
        10
      );
      // 如果天数和小时数都为0则不显示这个
      if (+this.timeType === 2 && (Nday > 0 || Nhour > 0)) {
        this.CountdownTime = `${Nday}天${Nhour}时`;
      } else {
        if (Nday > 0) {
          this.CountdownTime = `${Nday}天${Nhour}时${Nminute}分${Nseconds}秒`;
        } else if (Nhour > 0) {
          this.CountdownTime = `${Nhour}时${Nminute}分${Nseconds}秒`;
        } else if (Nminute > 0) {
          this.CountdownTime = `${Nminute}分${Nseconds}秒`;
        } else {
          this.CountdownTime = `${Nseconds}秒`;
        }
      }

      return totalSeconds;
    }
  }
};
</script>

