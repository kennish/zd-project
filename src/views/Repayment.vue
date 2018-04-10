<template>
  <div v-infinite-scroll="loadMore">
    <div class="repayment-bar">
      <div class="repayment-header">
        <h3>未还款本金</h3>
        <span>{{money}}</span>
      </div>
      <transition name="slide-fade">
        <div class="repayment-list" v-show="show">
          <bill-maxicell v-for="(item, index) in moneyList" :key="index" :label="item.orderNo" :title="`借款${item.orderAmount}`" :msg="item.loanDate">
            <span class="repayment-font">未还款本金{{item.planRepaymentTotal}}</span>
          </bill-maxicell>
        </div>
      </transition>
      <div class="repayment-btn">
        <div class="repayment-btn-bar" @click="show = !show">
          <p v-show="!show">查看贷款明细</p>
          <i :class="`iconfont xl-icon ${show? 'active': ''}`">&#xe62d;</i>
        </div>
      </div>
    </div>
    <bill-maxicell label="09月30日之前待还款" title="99,000.00" msg="请合理安排资金，保证账户余额充足">
      <router-link class="maxcell-handle" :to="{name: 'BillingDetails', query: {title: '09月30日之前待还款'}}">查看明细<i class="iconfont maxcell-handle-icon">&#xe6a3;</i></router-link>
    </bill-maxicell>
    <div class="bill-record">
      <div class="bill-bar" v-for="(item, index) in incomeData" :key="index">
        <qd-cell title="本月" style="height:2.2rem; padding: 0 .5rem; font-size: .8rem;">
          <span slot="right">-9000</span>
        </qd-cell>
        <div class="bill-bar-list">
          <qd-cell title="租金分期还款" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #F7A90A;">&#xe600;</i>
            <span slot="right" style="color: #FF5858;">-1800</span>
          </qd-cell>
          <qd-cell title="装修贷还款" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #35CEF0;">&#xe6d5;</i>
            <span slot="right" style="color: #FF5858;">-1800</span>
          </qd-cell>
          <qd-cell title="签到抽奖赠送" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #A3DA26;">&#xe606;</i>
            <span slot="right" style="color: #00C700">+1800</span>
          </qd-cell>
        </div>
      </div>
    </div>
    <div class="loadmore-icon" v-if="loading">
      <mt-spinner type="fading-circle" color="#999999" style="margin-right: .3rem;" :size="20"></mt-spinner>加载中
    </div>
    <div class="loadmore-icon" v-if="noMore">
      没有更多了
    </div>
  </div>
</template>

<script>
import BillMaxicell from '@/components/BillMaxicell'
import QdCell from '@/components/Cell'
export default {
  components: {
    BillMaxicell,
    QdCell
  },
  data () {
    return {
      show: false,
      money: '--',
      moneyList: [],
      incomeData: [],
      page: 1,
      pageCount: null,
      loading: false,
      noMore: false
    }
  },
  created () {
    this.getMoneyData()
  },
  methods: {
    loadMore () {
      if(!this.noMore){
        this.getIncomeData()
        this.getMoneyList()
      }
    },
    getIncomeData () {
      this.loading = true
      let that = this
      this.request({
        methodId: "J019",
        data: {
          'landlordId': '73551632-fe8c-4786-91f2-199c8d9dcf15',
          'openId': '63cdac799f58321daf5622d2eb81cec5', //this.info.openId
          'page': that.page,
          'rows': 5,
          'subject1': '收入',
          'dateStart': '',
          'dateEnd': ''
        },
        success: function (res) {
          if(that.page == 1){
            that.incomeData = res.res.data.rows
            that.pageCount = parseInt(res.res.data.pageCount)
          } else{
            that.incomeData = that.incomeData.concat(res.res.data.rows)
            if(that.page >= that.pageCount){
              that.noMore = true
            }
          }
          that.loading = false
          that.page++
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          
        }
      })
    },
    // 获取未还款本金
    getMoneyData () {
      let that = this
      this.request({
        methodId: "8100",
        data: {
          'openId': '63cdac799f58321daf5622d2eb81cec5', //this.info.openId
        },
        success: function (res) {
          that.money = res.res.data.applySumAmount
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          
        }
      })
    },
    // 获取未还款本金列表
    getMoneyList () {
      let that = this
      this.request({
        methodId: "8101",
        data: {
          'openId': '63cdac799f58321daf5622d2eb81cec5', //this.info.openId
          'dateStart': '',
          'dateEnd': '',
          'pageIndex': 1,
          'pageSize': 1000
        },
        success: function (res) {
          that.moneyList = res.res.data.rows
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          
        }
      })
    }
  }
}
</script>

<style>
.repayment-bar{
  background: #ffffff;
  margin-bottom: .5rem;
  padding: .5rem 0;
  box-sizing: border-box;
}
.repayment-header{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: .5rem;
}
.repayment-header h3{
  font-weight: normal;
  font-size: .6rem;
  color: #333333;
}
.repayment-header span{
  font-size: .9rem;
  color: #FF790E;
  margin-top: .5rem;
}
.repayment-list{
  margin-bottom: .5rem;
  padding: 0 .5rem;
  box-sizing: border-box;
  overflow: hidden;
}
.repayment-list .maxcell{
  border-bottom: 1px solid #d1d1d1;
  padding: 0;
}
.repayment-list .maxcell:first-child{
  border-top: 1px solid #b1b1b1;
}
.repayment-list .maxcell-info,.repayment-list .maxcell-title,.repayment-list .maxcell-show{
  width: 7rem;
}
.repayment-font{
  font-size: .6rem;
  color: #FF790E;
}
.repayment-btn{
  display: flex;
  height: 1.6rem;
  flex-direction: column;
  align-items: center;
}
.repayment-btn-bar{
  text-align: center;
  display: flex;
  flex-direction: column;
}
.repayment-btn p{
  font-size: .5rem;
  color: #999999;
}
.repayment-btn-bar .xl-icon{
  font-size: .5rem;
  color: #999999;
  margin-top: .3rem;
  transition: transform .3s;
}
.repayment-btn-bar .active{
  transform: rotate(180deg);
}

.maxcell-handle{
  font-size: .5rem;
  color: #808080;
}
.maxcell-handle-icon{
  margin-left: .2rem;
}
.bill-record{
  background: #ffffff;
  margin-top: .5rem;
}
.people-icon{
  font-size: 1.2rem;
}
.qd-cell-icon{
  display: flex;
  font-size: 1.6rem;
  margin-right: .5rem;
}
.bill-bar-list{
  padding: 0 .5rem;
  border-bottom: 1px solid #eeeeee;
}
.bill-bar-list .qd-cell:last-child{
  border-bottom: none;
}

/** 过渡动画 **/
.slide-fade-enter-active {
  transition: all .3s ease;
  transform-origin: top;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transform-origin: top;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(.7);
  opacity: 0;
}

.loadmore-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .2rem 0;
  font-size: .6rem;
  color: #999999;
}
</style>

