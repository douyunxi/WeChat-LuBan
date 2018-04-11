//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.checkSession({//校验登录状态
      success: function () {//登录态未过期

      },
      fail: function () {//登录态已过期
        wx.clearStorageSync()
        wx.login({//重新登录
          success:function(res){
            if (res.code) {
              //登录服务器换取登录凭证
              that.wechatLogin(res.code)
            }
          }
        })
      }
    })
  },
  wechatLogin: function (code) {//登录服务器换取登录凭证
    var that = this;
    wx.request({
      url: that.globalData.domain + '/login',
      data: {
        code: code
      },
      success: function (res) {
        var data = res.data;
        console.log(res)
        wx.setStorageSync('sessionId', data.sessionId);//存储服务器的sessionId作为登录凭证，具有一定时效性
        that.globalData.header.cookie = 'JSESSIONID=' + data.sessionId;
        wx.setStorageSync('userType', data.userType);//保存用户类型
        that.getUserInfo();//获取用户信息
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this;
    var userInfo=wx.getStorageSync('userInfo');
    if(userInfo){
      that.globalData.header.cookie = 'JSESSIONID=' + wx.getStorageSync('sessionId');
      console.log('getUserInfo-->'+userInfo.nickName)
      if (cb) {
        cb(userInfo);
      }
    }
    else{  
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          if(cb){
            cb(res.userInfo)
          }
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
          var language= userInfo.language
          console.log("获取用户信息成功", nickName, avatarUrl, gender, province, country, city, language);
          try{
            wx.setStorageSync('userInfo', res.userInfo);
            console.log('wx.setStorageSync.userInfo成功')
          } catch (e) {
            console.log('wx.setStorageSync.userInfo失败')
          }
        },
        fail: function (data) {
          console.log("获取用户信息失败" + data);
        }
      })
    }      
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: that.globalData.domain + '/getUserInfo',
      header: that.globalData.header,
      success: function (res) {
       if(!res.data){
         console.log("重新登录")
         wx.login({//重新登录
           success: function (res) {
             if (res.code) {
               //登录服务器换取登录凭证
               that.wechatLogin(res.code)
             }
           }
         })
       }
      }
    })
  },
  onHide: function () {
    
  },
  globalData: {
    userInfo: null,
    domain:"http://127.0.0.1/wechat",
    //domain: "https://www.oceanb.cn/luban/wechat",
    header: { 'cookie': '' } //这里还可以加入其它需要的请求头，比如'x-requested-with': 'XMLHttpRequest'表示ajax提交，微信的请求时不会带上这个的
  }
})