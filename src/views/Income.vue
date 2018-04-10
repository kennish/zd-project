<template>
  <div v-infinite-scroll="loadMore">
    <bill-maxicell label="本月累计收入" title="9000" msg="到账金额以租客实际支付为准">
      <router-link class="maxcell-handle" to="/home">查看明细<i class="iconfont maxcell-handle-icon">&#xe6a3;</i></router-link>
    </bill-maxicell>
    <div class="bill-record">
      <div class="bill-bar" v-for="(item, index) in incomeData" :key="index">
        <qd-cell title="本月" style="height:2.2rem; padding: 0 .5rem; font-size: .8rem;">
          <span slot="right">+9000</span>
        </qd-cell>
        <div class="bill-bar-list">
          <qd-cell title="签到抽奖赠送" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #A3DA26;">&#xe606;</i>
            <span slot="right" style="color: #00C700">+1800</span>
          </qd-cell>
          <qd-cell title="签到抽奖赠送" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #A3DA26;">&#xe606;</i>
            <span slot="right" style="color: #00C700">+1800</span>
          </qd-cell>
          <qd-cell title="签到抽奖赠送" label="09-11 14:00:00">
            <i slot="icon" class="iconfont qd-cell-icon" style="color: #A3DA26;">&#xe606;</i>
            <span slot="right" style="color: #00C700">+1800</span>
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
      incomeData: [],
      page: 1,
      pageCount: null,
      loading: false,
      noMore: false
    }
  },
  created () {
    //this.getIncomeData()
  },
  methods: {
    loadMore () {
      if(!this.noMore){
        this.getIncomeData()
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
    }
  }
}
</script>

<style>
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
.loadmore-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .2rem 0;
  font-size: .6rem;
  color: #999999;
}
</style>

