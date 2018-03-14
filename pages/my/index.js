var app = getApp()
Page( {
  data: {
    userInfo: {},
    userListInfo:{}
  },

  onLoad: function() {
    var that = this;
    //获取用户信息
    app.getUserInfo( function( userInfo ) {
      that.setData( {
        userInfo: userInfo
      })
    });
  },
  onShow() {
    var that = this;
    //设置用户信息列表
    wx.request({
      url: app.globalData.domain + '/getMyStatus',
      header: app.globalData.header,
      success: function (res) {
        console.log("获得用户状态列表", res.data)
        that.setData({
          userListInfo: [{
            icon: '../../images/iconfont-dingdan.png',
            text: '我的消息',
            unreadNum: res.data.messages,
            url: "/pages/message/index"
          }, {
            icon: '../../images/iconfont-dingdan.png',
            text: '任务单',
            unreadNum: res.data.tasks,
            url: "/pages/tasks/index"
          }, {
            icon: '../../images/iconfont-dingdan.png',
            text: '工资单',
            unreadNum: res.data.task,
            url: "/pages/salary/index"
          }, {
            icon: '../../images/iconfont-dingdan.png',
            text: '个人信息',
            url: "/pages/userInfo/index"
          }, {
            icon: '../../images/iconfont-kefu.png',
            text: '联系客服',
            url: '/pages/contactUs/index'
          }, {
            icon: '../../images/iconfont-help.png',
            text: '常见问题',
            url: '/pages/askAnswer/index'
          }]
        });
      }
    });
  }
})