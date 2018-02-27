//app.js
App({
  onLaunch: function () {

  },
  getUserInfo: function (cb) {
    var self=this;
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: self.globalData.domain+'/login',
            header: self.globalData.header,
            data: {
              code: res.code
            },
            success: function (data) {
              console.log(data)
              wx.setStorageSync('sessionId', data.data);
              self.globalData.header.cookie='JSESSIONID=' + data.data;
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  console.log("获取用户信息成功" + userInfo, nickName, avatarUrl, gender, province, city, country);
                 cb(res.userInfo)
                },
                fail: function (data) {
                  console.log("获取用户信息失败" + data);
                }
              })
            },
            fail: function () {

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onShow: function () {

  },
  onHide: function () {

  },
  globalData: {
    userInfo: null,
    domain:"http://127.0.0.1",
    header: { 'cookie': '' } //这里还可以加入其它需要的请求头，比如'x-requested-with': 'XMLHttpRequest'表示ajax提交，微信的请求时不会带上这个的
  }
})