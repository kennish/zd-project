<template>
  <section>
    <div class="home-head">
      <mt-header title="个人中心">
        <i class="iconfont back-icon" slot="left" @click="$router.go(-1)">&#xe679;</i>
      </mt-header>
      <div class="personal-info">
        <div class="personal-info-img">
          <img :src="userInfo.weChatPicture" />
        </div>
        <div class="personal-info-title">{{userInfo.weChatName}}</div>
      </div>
    </div>
    <div class="bill-main">
      <div class="personal-main">
        <qd-cell :title="`房东账号:${userName}`" style="padding: 0 .5rem;">
          <i class="iconfont" slot="icon" style="margin-right: .2rem;">&#xe78b;</i>
          <span slot="right" class="modification" @click="popupShow = true">点击修改</span>
        </qd-cell>
      </div>
    </div>
    <mt-popup v-model="popupShow" class="modification-popup">
      <h2>账户修改</h2>
      <div class="modification-info">
        <qd-field placeholder="请输入手机号码" v-model="user.userPhone" style="border-color: #eeeeee;">
          <i class="iconfont" slot="left">&#xe704;</i>
          <div v-if="user.btnStatus" slot="right" @click="getCode">获取验证码</div>
          <div v-if="!user.btnStatus" slot="right" style="font-size: .5rem; color:#999999;">{{user.time}}S后可重发</div>
        </qd-field>
        <qd-field placeholder="请输入验证码" v-model="user.userCode" style="border-color: #eeeeee;">
          <i class="iconfont" slot="left">&#xe616;</i>
        </qd-field>
      </div>
      <div class="modification-handle">
        <button class="modification-btn" @click="popupShow = false">取消</button>
        <button class="modification-btn" @click="confirm">确定</button>
      </div>
    </mt-popup>
  </section>
</template>

<script>
import QdCell from '@/components/Cell'
import Field from '@/components/Field'
export default {
  components: {
    QdCell,
    'QdField': Field
  },
  data () {
    return {
      userInfo: null,
      userName: null,
      popupShow: false,
      user: {
        btnStatus: true,
        time: 60,
        userPhone: '',
        userCode: ''
      }
    }
  },
  created () {
    this.userInfo = this.$local.fetch('user')
    this.userName = this.$local.fetch('info').username
  },
  methods: {
    getCode () {
      //校验username格式
      let tel = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7]))\d{8}$/;
      if(!tel.test(this.user.userPhone)) {
        console.log('格式不对')
        return false;
      } else{
        console.log('格式正确')
      }

      //60s限制
      this.user.btnStatus = false
      let timer = setInterval(() => {
        if(this.user.time > 0){
          this.user.time--
        } else{
          clearInterval(timer)
          this.user.btnStatus = true
          this.user.time = 60
        }
      }, 1000)
    },
    confirm () {
      console.log(this.user.userPhone)
    }
  }
}
</script>


<style>
.back-icon{
  color: #ffffff;
}
.personal-info{
  display: flex;
  height: 6.5rem;
  align-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
}
.personal-info-img{
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
}
.personal-info-img img{
  width: 100%;
}
.personal-info-title{
  font-size: .8rem;
  color: #ffffff;
  margin-left: .5rem;
}
.personal-main{
  margin-top: .5rem;
  background: #ffffff;
}
.modification{
  color: #999999;
}

.modification-popup{
  width: 13rem;
  height: 10rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modification-popup h2{
  display: flex;
  justify-content: center;
  font-size: .9rem;
  color: #333333;
  font-weight: normal;
  padding: 1rem;
}
.modification-info{
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 .5rem;
}
.modification-handle{
  display: flex;
  height: 2.2rem;
  border-top: 1px solid #D0D0D0;
}
.modification-btn{
  flex: 1;
  background: none;
  color: #808080;
  position: relative;
}
.modification-btn:last-child{
  border-left: 1px solid #D0D0D0;
  box-sizing: border-box;
  color: #FF790E;
}
.modification-btn:after{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0;
}
.modification-btn:active:after{
  opacity: .2;
}
</style>
