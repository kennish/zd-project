<template>
  <section>
    <div class="home-head">
      <mt-header :title="user.weChatName">
        <router-link to="/personal" slot="left">
          <i class="iconfont">&#xe6b8;</i>
        </router-link>
        <router-link to="/message" slot="right">
          <i class="iconfont">&#xe667;</i>
        </router-link>
      </mt-header>
      <div class="bill-detail">
        <div class="bill-detail-clu">
          <bill-cell title="本月应收总额" :label="billingInfo.byysze"></bill-cell>
          <bill-cell title="本月已收房租" :label="billingInfo.byysfz"></bill-cell>
          <bill-cell title="本月待收房租" :label="billingInfo.bydsfz"></bill-cell>
        </div>
        <div class="bill-detail-clu">
          <bill-cell title="本月应还款总额" :label="billingInfo.byyhkze"></bill-cell>
          <bill-cell title="授信总额" :label="billingInfo.creditLine"></bill-cell>
          <bill-cell title="可用额度" :label="billingInfo.availableCreditLine"></bill-cell>
        </div>
      </div>
    </div>
    <div class="bill-main">
      <nav class="bill-nav">
        <router-link to="/home" exact class="nav-link">收入</router-link>
        <router-link to="/repayment" class="nav-link">还款</router-link>
      </nav>
      <router-view class="bill-content"></router-view>
    </div>
  </section>
</template>

<script>
import BillCell from '@/components/BillCell'
export default {
  components: {
    BillCell
  },
  data () {
    return {
      user: null,
      info: null,
      billingInfo: {
        byysze: '', //本月应收总额
        byysfz: '', //本月已收房租
        bydsfz: '', //本月待售房租
        byyhkze: '少接口', //本月应还款总额
        creditLine: '', //授信额度
        availableCreditLine: '' //可用额度
      },
      startMonth: null, //本月开始日期
      endMonth: null // //本月结束日期
    }
  },
  created () {
    this.user = this.$local.fetch('user')
    this.info = this.$local.fetch('info')
    this.startMonth = this.$date.getMonth('s', 0)
    this.endMonth = this.$date.getMonth('e', 0)

    this.getBillingInfo()
    this.getBillingInfo2('8069', this.startMonth, this.endMonth, 'billingInfo', 'byysze')
    this.getBillingInfo2('8070', this.startMonth, this.endMonth, 'billingInfo', 'byysfz')
    this.getBillingInfo2('8071', this.startMonth, this.endMonth, 'billingInfo', 'bydsfz')
  },
  methods: {
    getBillingInfo () {
      let that = this
      this.request({
        methodId: "8100",
        data: {
          'openId': '63cdac799f58321daf5622d2eb81cec5', //this.info.openId
        },
        success: function (res) {
          that.billingInfo.creditLine = res.res.data.creditLine
          that.billingInfo.availableCreditLine = res.res.data.availableCreditLine
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          that.$indicator.close()
        }
      })
    },
    getBillingInfo2 (methodId, startDate, endDate, parameter, parameter2) {
      let that = this
      this.request({
        methodId: methodId,
        data: {
          'landlordId': '73551632-fe8c-4786-91f2-199c8d9dcf15', //this.info.landlordId
          'startTime': startDate,
          'endTime': endDate
        },
        success: function (res) {
          that[parameter][parameter2] = res.res.data.totalAmount
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          that.$indicator.close()
        }
      })
    }
  }
}
</script>

<style>
.bill-detail{
  padding: .7rem .5rem;
}
.bill-detail-clu{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-right: -.3rem;
}
.bill-detail-clu:first-child{
  margin-bottom: .3rem;
}
.bill-main{
  display: flex;
  flex: 1;
  flex-direction: column;
  background: rgb(242, 242, 242);
}
.bill-main .bill-nav{
  display: flex;
  height: 2.3rem;
  background: rgb(255, 255, 255);
  padding: 0 1rem;
  box-shadow: 0 3px 5px #d1d1d1;
  z-index: 10;
}
.bill-main .bill-nav .nav-link{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: .8rem;
  color: #333333;
  border-bottom: 2px solid rgba(255, 102, 51, 0);
}
.bill-main .bill-nav .nav-link.active{
  color: #FF790E;
  border-bottom: 2px solid #FF790E;
}
</style>

