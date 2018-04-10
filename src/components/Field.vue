<template>
  <div class="qd-field">
    <div class="qd-field-icon">
      <slot name="left" />
    </div>
    <input class="qd-field-input" type="text" :placeholder="placeholder" @input="updateValue($event.target.value)" />
    <div class="qd-field-r">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'placeholder' ],
  methods: {
    updateValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style>
.qd-field{
  display: flex;
  border-bottom: 1px solid #D0D0D0;
  height: 2rem;
  align-items: center;
  padding: 0 .3rem;
  color: #666666;
}
.qd-field-icon{
  margin-right: .5rem;
}
.qd-field-input{
  font-size: .7rem;
  flex: 1;
  width: 2rem;
}
.qd-field-r{
  color: #FF790E;
  font-size: .7rem;
  margin-left: .5rem;
}
</style>

