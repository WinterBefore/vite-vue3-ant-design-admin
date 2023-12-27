<template>
  <div class="dashboard-container">
    <div class="dashboard-header-wrap">
      <h3>工作台</h3>
      <div class="greeting-info-wrap flex">
        <div class="greeting-info flex">
          <!-- 头像 -->
          <div class="avatar-wrap">
            <img
              width="70"
              height="70"
              src="https://c-ssl.dtstatic.com/uploads/blog/202206/16/20220616051519_a80f6.thumb.1000_0.jpg"
              alt=""
            />
          </div>
          <div class="txet-info">
            <span>早安,</span>
            <span class="nick-name">又是一年冬</span>
            <span>,</span>
            <span class="greeting">新的一天工作开心!</span>
            <!-- 职位信息 -->
            <div class="job-info">
              <span>北玄网络科技</span>
              <span>-</span>
              <span>开发部</span>
              <span>-</span>
              <span>全栈工程师</span>
              <span>-</span>
              <span>又是一年冬</span>
            </div>
          </div>
        </div>
        <div class="right-time-money-wrap">
          <div>北京时间:{{ newTime }}</div>
          <div>您已加入工作 <span style="color: #1677ff">1024</span> 天</div>
          <div>
            <span>个人财富</span>
            <span style="color: #ff4d4f">￥20542.55</span> 元
          </div>
        </div>
      </div>
    </div>

    <!-- 订单数据 -->
    <!-- xs <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 number|object -
            sm ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 number|object - 
            md ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 number|object - 
            lg ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 number|object - 
            xl ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 number|object - 
            xxl ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 </div> -->
    <!-- 四个框 -->
    <a-row class="system-count-wrap" :gutter="20">
      <a-col :span="6">
        <kinesis-container>
          <kinesis-element :strength="10">
            <div class="system-count-item">
              <div class="count-item-header flex">
                <span>成交额</span>
                <a-tag style="margin-left: auto" color="blue">年</a-tag>
              </div>
              <div class="count-item-center flex">
                <a-statistic
                  title="Account Balance (CNY)"
                  :precision="2"
                  :value="112893"
                />
                <img width="64" src="@/assets/images/bi.png" alt="" />
              </div>
              <div class="count-item-bottom">
                <span>成交额</span>
                <span class="red-color-font">￥112,893.00</span>
              </div>
            </div>
          </kinesis-element>
        </kinesis-container>
      </a-col>
      <a-col :span="6">
        <div class="system-count-item">
          <div class="count-item-header flex">
            <span>总用户</span>
            <a-tag style="margin-left: auto" color="orange">全</a-tag>
          </div>
          <div class="count-item-center flex">
            <a-statistic title="统计用户总数" :precision="0" :value="154214" />
            <img width="64" src="@/assets/images/vip.png" alt="" />
          </div>
          <div class="count-item-bottom">
            <span>总用户</span>
            <span>154214</span>
          </div>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="system-count-item">
          <div class="count-item-header flex">
            <span>成交数</span>
            <a-tag style="margin-left: auto" color="cyan">月</a-tag>
          </div>
          <div class="count-item-center flex">
            <a-statistic title="当月成交订单数" :precision="0" :value="568" />
            <img width="64" src="@/assets/images/order.png" alt="" />
          </div>
          <div class="count-item-bottom">
            <span>成交数</span>
            <span>568</span>
          </div>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="system-count-item">
          <div class="count-item-header flex">
            <span>访问量</span>
            <a-tag style="margin-left: auto" color="pink">周</a-tag>
          </div>
          <div class="count-item-center flex">
            <a-statistic
              title="统计一周内的访问量"
              :precision="0"
              :value="5448796"
            />
            <img width="64" src="@/assets/images/count.png" alt="" />
          </div>
          <div class="count-item-bottom">
            <span>访问量</span>
            <span>5448796</span>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row class="order-echarts-container" :gutter="20">
      <a-col
        :span="16"
        :lg="{ span: 16 }"
        :md="{ span: 24 }"
        :xs="{ span: 24 }"
      >
        <div class="echarts-item" ref="annualSalesDataEcharts"></div>
      </a-col>
      <a-col :lg="{ span: 8 }" :md="{ span: 24 }" :xs="{ span: 24 }">
        <div class="echarts-item" ref="accessDataEcharts">col-6</div>
      </a-col>
    </a-row>
    <!-- 收入来源统计 -->
    <a-row class="order-echarts-container">
      <a-col :span="24">
        <div class="echarts-item height-400" ref="sourceDataEcharts"></div>
      </a-col>
    </a-row>
    <a-row class="order-echarts-container">
      <a-col :span="24">
        <div class="echarts-item height-400"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeMount, defineProps } from "vue";
import timeUtil from "../utils/timeUtil";
const props = defineProps({});

const accessDataEcharts = ref();
const annualSalesDataEcharts = ref();
const sourceDataEcharts = ref();
let newTime = ref("1970年1月1日1时20分20秒");

onMounted(() => {
  accessDataEchartsInit();
  annualSalesDataEchartsInit();
  sourceDataEchartsInit();
  getNowTime(); //进入页面调用该方法获取当前时间
  let myTimeDisplay = setInterval(() => {
    getNowTime(); //每秒更新一次时间
  }, 1000);
  // console.log(timeUtil.getTimeStamp("2020-11-28 18:20:17"));
  // console.log(timeUtil.getTimeByTimeStamp("1706558817000"));
  // console.log(
  //   timeUtil.compareTime("2020-11-29 18:20:17", "2020-11-28 18:20:17")
  // );
  //    组件挂挂载之前删除掉定时器
  onBeforeMount(() => {
    clearInterval(myTimeDisplay); //销毁之前定时器
  });
});

// 条形图统计
function annualSalesDataEchartsInit() {
  const myChart = echarts.init(annualSalesDataEcharts.value);
  const option = {
    title: {
      text: "年度成交额排行榜",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          3305, 9005, 5564, 8988, 10245, 7789, 2245, 6005, 15475, 6395, 9878,
          6369,
        ],
        type: "bar",
      },
    ],
  };
  myChart.setOption(option);
}
// 饼图统计
function accessDataEchartsInit() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(accessDataEcharts.value);
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: "网站访问来源",
      subtext: "建站至今的数据统计",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "统计来源",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "电商广告" },
          { value: 580, name: "线下推广" },
          { value: 484, name: "视频点击" },
          { value: 300, name: "其他" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

// 收入来源统计
function sourceDataEchartsInit() {
  const myChart = echarts.init(sourceDataEcharts.value);
  let option = {
    title: {
      text: "收入来源统计",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  myChart.setOption(option);
}

function getNowTime() {
  var date = new Date();
  var time =
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日" +
    date.getHours() +
    "时" +
    addZero(date.getMinutes()) +
    "分" +
    addZero(date.getSeconds()) +
    "秒";
  newTime.value = time;
  //根据自己的需求，看要不要在时间不大于10的时候在前面补0，如果需要直接this.addZero(date.getMinutes()),其它与之相同，如果不需要删掉addZero（）方法即可。
  //小于10的拼接上0字符串
}
function addZero(s: any) {
  return s < 10 ? "0" + s : s;
}
</script>
<style lang="less">
.dashboard-container {
}

.dashboard-header-wrap {
  border-top: 1px solid #eee;
  height: 172px;
  background-color: #fff;
  padding: 10px;
}

.greeting-info-wrap {
  margin-top: 20px;
}

.greeting-info-wrap img {
  border-radius: 8px;
}

.greeting-info {
  font-size: 18px;
}

.greeting-info > span {
  margin-left: 5px;
}

.nick-name {
  font-weight: 500;
  color: tomato;
}

.txet-info {
  margin: 10px 0 0 20px;
}

.job-info {
  margin-top: 15px;
  font-size: 12px;
  color: rgb(95, 95, 95);
}

.system-count-wrap {
  margin-top: 20px;
}

.system-count-item {
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
}

.count-item-header {
  align-items: center;
  color: rgb(53, 52, 52);
  border-bottom: 1px solid #eee;
  padding: 5px;
}

.count-item-center {
  margin-top: 20px;
  padding: 0 20px;

  img {
    margin-left: auto;
  }
}

.count-item-bottom {
  padding: 0 20px;
  margin-top: 20px;

  & span:last-child {
    float: right;
  }
}

.order-echarts-container {
  margin-top: 20px;
}

/* 右边金额和时间部分 */
.right-time-money-wrap {
  margin-left: auto;
  margin-right: 20px;
}

.right-time-money-wrap div {
  margin-top: 10px;
}

.echarts-item {
  padding: 10px;
  height: 300px;
  background-color: #fff;
}
</style>
