// pages/userInfo/index.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [{
      icon: '../../images/iconfont-dingdan.png',
      title: '真实姓名',
      content:'小明'
    },{
      icon: '../../images/iconfont-dingdan.png',
      title: '手机号码',
      content:'1391234567',
      url: "/pages/userInfo/mobile"
    }, {
      icon: '../../images/iconfont-dingdan.png',
      title: '身份认证',
      content: '已认证',
      url: "/pages/userInfo/identificationCard"
    }]
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})