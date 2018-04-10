<template>
  <div class="maxcell">
    <div class="maxcell-l">
      <div class="maxcell-title">{{label}}</div>
      <div class="maxcell-show">{{title}}</div>
      <div class="maxcell-info">{{msg}}</div>
    </div>
    <div class="maxcell-r">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'label', 'title', 'msg' ]
}
</script>

<style>
.maxcell{
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  height: 3.8rem;
  padding: 0 .5rem;
}
.maxcell-l{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.maxcell-title{
  font-size: .5rem;
  margin-bottom: .3rem;
  color: #888888;
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.maxcell-show{
  font-size: .8rem;
  margin-bottom: .3rem;
  color: #FF790E;
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.maxcell-info{
  font-size: .5rem;
  color: #999999;
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.maxcell-r{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

