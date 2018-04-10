<template>
  <div></div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      appid: 'wx3dbe26dbea448d24',
      fromurl: 'http://wx.innjia.com/h5v2/zzlb/',
      webUrl: ''  
    }
  },
  methods: {
    // 获取url参数
    getQueryString: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    //处理hash模式微信回调回来code破坏url的问题并跳转
    urlstr (route) {
      let pullUrl = window.location.href
      let code = '?code='+this.getQueryString('code')+'&state='+ this.getQueryString('state')
      let startIndex = pullUrl.indexOf(code)
      let endIndex = pullUrl.indexOf(code) + code.length
      if(startIndex != -1){
        pullUrl = pullUrl.substring(0, startIndex) + pullUrl.substring(endIndex, pullUrl.length)
       
      }
      window.location.href = pullUrl+route
    },
    //检验是否绑定过
    verify (WeChatOpenId, WeChatName, WeChatPicture) { 
      this.request({
        methodId: "8104",
        data: {
          'WeChatOpenId': WeChatOpenId,
          'WeChatName': WeChatName,
          'WeChatPicture': WeChatPicture
        },
        success: (res) => {
          if(res.code == '0'){ //绑定过了
            this.$local.save('info',{
              landlordId: res.res.data.landlordId
            })
            this.urlstr('home')
            //this.$router.push('/home')
          } else{ //未绑定
            this.urlstr('login')
            //this.$router.push('/login')
          }
        }
      })
    }
  },
  created () {
    let ua = window.navigator.userAgent.toLowerCase()
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ //微信
      let user = this.$local.fetch('user')
      if(user){ // 已登录过了
        this.verify(user.data.landlordWxOpenId, user.data.weChatName, user.data.weChatPicture)
      } else{ // 未登录过
      let code = this.getQueryString('code')
        if(code){ //表示授权回调过来的
          this.request({
            methodId: "8106",
            data: {
              'code': code
            },
            success: (res) => {
              this.$local.save('user',{
                'landlordWxOpenId': res.res.data.landlordWxOpenId,
                'weChatName': res.res.data.weChatName,
                'weChatPicture': res.res.data.weChatPicture
              })
              this.verify(res.res.data.landlordWxOpenId, res.res.data.weChatName, res.res.data.weChatPicture)
            }
          })
        } else{ //表示首次进来 调授权
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ this.appid +'&redirect_uri='+ encodeURIComponent(this.fromurl) +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
        }
      }
    } else{ //非微信 开发用
      this.$local.save('user',{
        "landlordWxOpenId":"ov-V0w9jkMAke7TU2hYckBpUGvXU",
        "weChatName":"大龄青年",
        "weChatPicture":"http://thirdwx.qlogo.cn/mmopen/vi_32/Eez4AvBmMGm9stJjMV1LYd6ribrTMn9ibJnMO9xDVtfB9GVAlVbXXEcshC4dAMpSt6RuPxAGDHY718t2mV2Co6Tw/132"
      })
      let img = 'http://thirdwx.qlogo.cn/mmopen/vi_32/Eez4AvBmMGm9stJjMV1LYd6ribrTMn9ibJnMO9xDVtfB9GVAlVbXXEcshC4dAMpSt6RuPxAGDHY718t2mV2Co6Tw/132'
      this.verify('ov-V0w9jkMAke7TU2hYckBpUGvXU', '大龄青年', img)
      //this.$router.push('/home')
    }
  }
}
</script>
