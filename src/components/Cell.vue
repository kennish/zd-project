<template>
  <div class="qd-cell">
    <div class="qd-cell-l">
      <slot name="icon"></slot>
      <div class="qd-cell-info">
        <div class="qd-cell-title">{{title}}</div>
        <div v-if="label" class="qd-cell-show">{{label}}</div>
      </div>
    </div>
    <div class="qd-cell-r">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'label', 'title' ]
}
</script>

<style>
.qd-cell{
  border-bottom: 1px solid #eeeeee;
  height: 2.4rem;
  /* padding-top: .5rem; */
  /* padding-bottom: .5rem; */
  display: flex;
  justify-content: space-between;
  font-size: .7rem;
  color: #333333;
}
.qd-cell-l{
  display: flex;
  flex: 1;
  align-items: center;
}
.qd-cell-info{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.qd-cell-title{
  
}
.qd-cell-show{
  font-size: .5rem;
  color: #999999;
  margin-top: .2rem;
}
.qd-cell-r{
  font-size: .7rem;
  color: #333333;
  display: flex;
  align-items: center;
}
</style>
