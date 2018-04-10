<template>
  <section>
    <mt-header :title="$route.query.title">
      <i class="iconfont back-icon" slot="left" @click="$router.go(-1)">&#xe679;</i>
    </mt-header>
    <div class="bill-content" style="background: rgb(242, 242, 242)">
      <div class="echart-wrap">
        <div class="echart-wrap-herder">入账周期：2018.01.01-2018.03.01</div>
        <div class="echart-wrap-info">
          <div class="echart-wrap-l">
            <div style="width: 100%; height: 180px;" ref="myEchart"></div>
          </div>
          <div class="echart-wrap-r">
            <div class="echart-wrap-item"><span></span>支出金额：40000</div>
            <div class="echart-wrap-item"><span></span>入账金额：30000</div>
          </div>
        </div>
      </div>
      <div class="detail-account">
        <h4>账单明细</h4>
        <div class="detail-account-main">
          <div class="detail-account-list">
            <div class="detail-account-item">收/支账户</div>
            <div class="detail-account-item">金额</div>
            <div class="detail-account-item">状态</div>
            <div class="detail-account-item">时间</div>
          </div>
          <div class="detail-account-list">
            <div class="detail-account-item">
              <div class="detail-account-title">华庭公园201A房间</div>
              <div class="detail-account-label">收费项目</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title" style="color: #00c700;">+1500</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title">已入账</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title">2018.01.07 09:00:00</div>
            </div>
          </div>
          <div class="detail-account-list">
            <div class="detail-account-item">
              <div class="detail-account-title">华庭公园201A房间</div>
              <div class="detail-account-label">收费项目</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title" style="color: #F80303;">-1500</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title">支出</div>
            </div>
            <div class="detail-account-item">
              <div class="detail-account-title">2018.01.07 09:00:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        // tooltip: {
        //     trigger: 'item',
        //     formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['入账金额','支出金额']
        // },
        color: ['#FF797E','#97BAFB'],
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:3500, name:'入账金额'},
                    {value:8000, name:'支出金额'}
                ]
            }
        ]
      })
    }
  }
}
</script>

<style>
.echart-wrap{}
.echart-wrap-herder{
  font-size: .6rem;
  color:#F5A623;
  text-align: center;
  padding-top: .5rem;
  background: #ffffff;
}
.echart-wrap-info{
  display: flex;
  background: #ffffff;
}
.echart-wrap-l{
  flex: 1;
}
.echart-wrap-r{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.echart-wrap-item{
  font-size: .6rem;
  display: flex;
  align-items: center;
}
.echart-wrap-item:first-child{
  margin-bottom: 1rem;
}
.echart-wrap-item span{
  display: inline-block;
  width: .5rem;
  height: .5rem;
  background: #FF797E;
  margin-right: .3rem;
}
.echart-wrap-item:first-child span{
  background: #97BAFB;
}

.detail-account{
  padding: .5rem 0;
}
.detail-account h4{
  font-size: .6rem;
  color: #333333;
  margin-bottom: .3rem;
  padding-left: .5rem;
}
.detail-account-main{
  background: #ffffff;
  padding: .5rem 0;
}
.detail-account-list{
  display: flex;
  height: 2rem;
  border-bottom: 1px solid #eeeeee;
  color: #666666;
}
.detail-account-list:first-child{
  color: #333333;
}
.detail-account-item{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: .5rem;
  justify-content: center;
}
.detail-account-title{
  width: 4rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-account-label{
  color: #999999;
  margin-top: .2rem;
}
</style>
