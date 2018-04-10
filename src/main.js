// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

require('./assets/css/reset.css')
require('./assets/css/main.css')

// mint-ui
import 'mint-ui/lib/style.css'
import MintUI, { Header, Popup, Toast, Indicator, InfiniteScroll, Spinner } from 'mint-ui'
Vue.use(MintUI, Header.name, Header, Popup.name, Popup, Toast.name, Toast, Indicator.name, Indicator, InfiniteScroll.name, InfiniteScroll, Spinner.name, Spinner )

// localStorage插件
import local from './utils/local'
Vue.use(local)

// 日期插件-获取当月起始-结束时间等 例 2018-04-02 00:00:00 至 2018-04-30 23:59:59
import date from './utils/date'
Vue.use(date)

// 租管ajax
import request from './utils/signature'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created () {
    Vue.prototype.request = request.rest(this)
  }
})

let iWin = document.body.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize = iWin / 16 + 'px'
