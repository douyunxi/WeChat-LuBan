var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processing:{
      count:3,
      total:10988.76,
    },
    finished:{
      count: 18,
      total: 210988.56,
      content: '2018.5.8 11:11: 00',
    },
    unfinishedTask: [{
      icon: '../../images/iconfont-dingdan.png',
      title: '1000',
      content: '2018.05.08 11:11: 00',
      url: "/pages/tasks/taskDetail"
    }, {
      icon: '../../images/iconfont-dingdan.png',
      title: '9000',
      content: '2018.05.01 09:18: 00',
      url: "/pages/tasks/taskDetail"
    }, {
      icon: '../../images/iconfont-dingdan.png',
      title: '988.76',
      content: '2018.04.26 17:18: 00',
      url: "/pages/tasks/taskDetail"
    }],
    finishedTask: [{
      icon: '../../images/icon-right.png',
      title: '988',
      content: '2018.01.26 17:18: 00',
      url: "/pages/tasks/taskDetail"
    },{
      icon: '../../images/icon-right.png',
      title: '9000',
      content: '2018.05.01 09:18: 00',
      url: "/pages/tasks/taskDetail"
    }, {
      icon: '../../images/icon-right.png',
      title: '988.76',
      content: '2018.04.26 17:18: 00',
      url: "/pages/tasks/taskDetail"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
