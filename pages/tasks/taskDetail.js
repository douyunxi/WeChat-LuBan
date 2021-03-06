// pages/tasks/taskList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   /*id:null,
    title:"某某小区项目",
    content:"北京市朝阳区某某路某某小区5号楼1门303，需要贴120平墙纸，墙纸材料...",
    money:"2000",
    time:"2018.3.6 14:00"*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    console.log(params)
    var that = this;
    wx.request({
      url: app.globalData.domain + '/task/' + params.id,
      header: app.globalData.header,
      success: function (res) {
        console.log(res)
        var data = res.data;
        that.setData(data)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (params) {
   
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