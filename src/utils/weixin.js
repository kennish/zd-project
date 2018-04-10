// 获取wxcode
var wxGetCode = function(weixinSelected) {
  if (isWeiXin() && weixinSelected) {
    var access_code = getParameterByName('code');
    // console.log(access_code);
    // var access_code;
    if (access_code == null) {
      var fromurl = window.location.href + '&sel=weixin' + '&wxPayRent=' + getParameterByName('prevPage'); //获取授权code的回调地址，获取到code
      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid= 

' + appId + '&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=' + outTradeNo + '#wechat_redirect';
      window.location.href = url;
      return url;
    } else {
      // console.log(access_code);
      // $('#loadingToast').css("display","block");
      $('.wrapper').show();
    }

    return false;
  }
}
