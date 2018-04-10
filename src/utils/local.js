/** vue的插件 用来设置和获取localStorage存储 **/

let local = {
  save (key, value, timer) { //timer过期时间
    const curTime = new Date().getTime(); //当前时间
    localStorage.setItem(key, JSON.stringify({data: value, time: curTime, timer: timer }))
  },
  fetch (key) {
    const dataObj = JSON.parse(localStorage.getItem(key)) || {}
    const curTime = new Date().getTime(); //当前时间
    if(curTime - dataObj.time >= dataObj.timer && dataObj.timer){  //过期
      return localStorage.removeItem(key)
    } else{
      return dataObj.data
    }
  }
}

export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}