var app = getApp()
Page( {
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的消息',
      isunread: true,
      unreadNum: 2,
      url:"/pages/message/index"
    }, {
      icon: '../../images/iconfont-dingdan.png',
      text: '个人信息',
      url: "/pages/userInfo/index"
    }, {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    }, {
      icon: '../../images/iconfont-help.png',
      text: '常见问题'
    }]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})