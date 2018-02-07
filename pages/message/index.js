// pages/my/message/messageDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [{
        title: "新任务",
        content: "在北京朝阳区某某小区××楼××单元×××有一个贴墙纸任务，总面积1200平，施工材料××××，施工费2000元，施工时间2018.5.6 9：00",
        time: "2018.2.1 15:22:33",
        type:'task',
        id: "1"
      },{
        title: "通知",
        content: "热烈庆祝鲁班到家1.0.0版正式上线！ ",
        time: "2018.3.5 15:22:33",
        type:'message',
        id: "1" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      messageList: messageList
    })
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