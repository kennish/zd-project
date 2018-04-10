<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 576032 */
  src: url('http://at.alicdn.com/t/font_576032_pl8n0sqq7ow7y14i.eot');
  src: url('http://at.alicdn.com/t/font_576032_pl8n0sqq7ow7y14i.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_576032_pl8n0sqq7ow7y14i.woff') format('woff'),
  url('http://at.alicdn.com/t/font_576032_pl8n0sqq7ow7y14i.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_576032_pl8n0sqq7ow7y14i.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  /* font-size: 16px; */
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
