<template>
  <section>
    <mt-header :title="$route.query.title">
      <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe679;</i>
    </mt-header>
    <div class="bill-content" style="padding: 0;">
      <div class="bill-details">
        <div class="bill-details-list">
          <div class="bill-details-item">借款编号</div>
          <div class="bill-details-item">还款本金</div>
          <div class="bill-details-item">还款利息</div>
          <div class="bill-details-item">计息周期</div>
        </div>
        <div class="bill-details-list">
          <div class="bill-details-item">00002</div>
          <div class="bill-details-item">20000.00</div>
          <div class="bill-details-item">1000.00</div>
          <div class="bill-details-item">09/11-10/11</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>


<style>
.home-icon{
  color: #ffffff;
}
.bill-details{}
.bill-details-list{
  display: flex;
  height: 2.4rem;
  border-bottom: 1px solid #eeeeee;
  font-size: .5rem;
  color: #333333;
}
.bill-details-list:first-child{
  border-color: #d1d1d1;
  font-size: .6rem;
  color: #666666;
}
.bill-details-item{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
