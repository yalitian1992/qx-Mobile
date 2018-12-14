<template>
	<div class="warp">
		<div class="task_center">
			<ul>
				<li>
					<div class="task_left">
						<p>关注公众号</p>
						<p>糖果集分<span>+1~20颗</span></p>
					</div>
					<div class="task_right">
						<p>去领取</p>
					</div>
				</li>
				<li>
					<div class="task_left">
						<p>关注公众号</p>
						<p>糖果集分<span>+1~20颗</span></p>
					</div>
					<div class="task_right">
						<p>去领取</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {};
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
