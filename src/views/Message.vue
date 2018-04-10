<template>
  <section>
    <mt-header title="消息通知">
      <i class="iconfont back-icon" slot="left" @click="$router.go(-1)">&#xe679;</i>
    </mt-header>
    <div class="bill-content" style="background: rgb(242, 242, 242)">
      <div class="msg-list">
        <qd-cell title="20180118 入账流水" style="padding: 0 .5rem;">
          <router-link tag="span" :to="{name: 'MsgDetail', params: {id: 'qd123'}, query: {title: '20180118入账流水'}}" slot="right" class="msg-handle">
            2018.01.28<i class="iconfont">&#xe6a3;</i>
          </router-link>
        </qd-cell>
        <qd-cell title="20180118 入账流水" style="padding: 0 .5rem;">
          <span slot="right" class="msg-handle">2018.01.28<i class="iconfont">&#xe6a3;</i></span>
        </qd-cell>
        <qd-cell title="20180118 入账流水" style="padding: 0 .5rem;">
          <span slot="right" class="msg-handle">2018.01.28<i class="iconfont">&#xe6a3;</i></span>
        </qd-cell>
      </div>
    </div>
  </section>
</template>

<script>
import QdCell from '@/components/Cell'
export default {
  components: {
    QdCell
  }
}
</script>

<style>
.msg-list{
  background: #ffffff;
}
.msg-handle{
  font-size: .5rem;
  color: #999999;
}
</style>
