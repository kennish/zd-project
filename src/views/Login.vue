<template>
  <div class="login">
    <mt-header title="绑定房东账号" style="background: none; color: #333333;"></mt-header>
    <div class="bill-content" style="padding: 0;">
      <div class="login-main">
        <qd-field placeholder="请输入房东账户" v-model="username">
          <i class="iconfont" slot="left">&#xe704;</i>
          <div v-if="btnStatus" slot="right" @click="getAuthCode">获取验证码</div>
          <div v-if="!btnStatus" slot="right" style="font-size: .5rem; color:#999999;">{{time}}S后可重发</div>
        </qd-field>
        <qd-field placeholder="请输入验证码" v-model="authCode">
          <i class="iconfont" slot="left">&#xe616;</i>
        </qd-field>
        <button class="submit-btn" type="button" @click="loginRequest">绑定账号</button>
      </div>
    </div>
  </div>
</template>

<script>
import Field from '@/components/Field'
export default {
  components: {
    'QdField': Field
  },
  data () {
    return {
      username: '',
      authCode: '',
      btnStatus: true,
      time: 60
    }
  },
  methods: {
    getAuthCode () {
      //校验username格式
      let tel = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7]))\d{8}$/;
      if(!tel.test(this.username)) {
        if(this.username == ''){
          this.$toast({
            message: '请填写手机号码',
            position: 'middle',
            className: 'istoast'
          })
        } else{
          this.$toast({
            message: '请填写正确手机号码',
            position: 'middle',
            className: 'istoast'
          })
        }
        
        return false
      } else{
        //获取验证码
        this.$indicator.open()
        this.request({
          methodId: "N003",
          data: {
            'cellphone': this.username
          },
          success: (res) =>{
            if (res.data.results == '1') {
              this.$toast({
                message: '发送成功',
                position: 'bottom',
                className: 'istoast'
              });
            }
          },
          complete: ()=> {
            this.$indicator.close()
          }
        })
        //60s限制
        this.btnStatus = false
        let timer = setInterval(() => {
          if(this.time > 0){
            this.time--
          } else{
            clearInterval(timer)
            this.btnStatus = true
            this.time = 60
          }
        }, 1000)
      }
    },
    // 绑定账户
    loginRequest () {
      let user = this.$local.fetch('user')
      let that = this
      this.$indicator.open()
      this.request({
        methodId: "8105",
        data: {
          'phone': this.username,
          'code': this.authCode,
          'landlordWxOpenId': user.landlordWxOpenId,
          'weChatName': user.weChatName,
          'weChatPicture': user.weChatPicture
        },
        success: function (res) {
          that.$toast({
            message: res.res.msg,
            position: 'bottom'
          })
          if(res.code == '0'){
            that.$local.save('info',{
              landlordId: res.res.data.landlordId,
              openId: res.res.data.openId,
              username: that.username
            })
            that.$router.push('/home')
          }
        },
        error: function(res){
          that.$toast(res.res.msg)
        },
        complete: function(res){
          that.$indicator.close()
        }
      })
    }
  }
}
</script>

<style>
.login-main{
  padding: 3rem 1rem 0;
}
.submit-btn{
  display: block;
  width: 100%;
  height: 2rem;
  background: #FF790E;
  font-size: .7rem;
  color: #ffffff;
  border-radius: 2rem;
  margin-top: 4rem;
  position: relative;
}
.submit-btn:active:after{
  opacity: .4;
}
.submit-btn:after {
    background-color: #000;
    content: " ";
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    border-radius: 2rem;
}
</style>
