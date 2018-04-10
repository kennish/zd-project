<template>
  <div class="bill-cell">
    <div class="bill-cell-title">{{title}}</div>
    <div class="bill-cell-show">{{label}}</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'label'],
  data () {
    return {
      
    }
  }
}
</script>

<style>
.bill-cell{
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  margin-right: .3rem;
  height: 3rem;
  background: rgba(255, 255, 255, .2);
  justify-content: center;
  align-items: center;
}
.bill-cell .bill-cell-title{
  font-size: .5rem;
  color: #ffffff;
  margin-bottom: .4rem;
}
.bill-cell .bill-cell-show{
  font-size: .8rem;
  color: #ffffff;
}
</style>

