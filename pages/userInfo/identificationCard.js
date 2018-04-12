// pages/userInfo/identificationCard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idCardNum:'',
    idCardFrontPath:'/images/idcard.png',
    idCardBackPath:'',
    idCardWithPersonPath:'/images/user-with-idcard.png'
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
  
  },
  getIdCardNum:function(e){
    this.setData({
      idCardNum: e.detail.value
    })
  },
  chooseImage1:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          idCardFrontPath: tempFilePaths[0]
        })
      }
    })
  },
  chooseImage3: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          idCardWithPersonPath: tempFilePaths[0]
        })
      }
    })
  },
  uploadFile1:function(){
    var that=this;
    if (that.data.idCardNum == "") {
      wx.showModal({
        title: '提示',
        content: '请填写身份证号码',
        showCancel: false
      })
      return
    }
    else if (that.data.idCardNum.length!=18){
      wx.showModal({
        title: '提示',
        content: '请填写正确的身份证号码',
        showCancel: false
      })
      return
    }
    if (this.data.idCardFrontPath !="/images/idcard.png"){
      wx.uploadFile({
        url: app.globalData.domain + '/uploadIdCard/',
        header: app.globalData.header,
        filePath: this.data.idCardFrontPath,
        name: 'idCardFront',
        formData: {
          'fileName': 'idCardFront'
        },
        success: function (res) {
          var data = res.data
          if(data){
            that.uploadFile3();
          }
        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请选择身份证正面照片',
        showCancel: false
      })
      return
    }
  },
  uploadFile3: function () {
    var that = this;
    if (this.data.idCardWithPersonPath != "/images/user-with-idcard.png") {
      wx.uploadFile({
        url: app.globalData.domain + '/uploadIdCard/',
        header: app.globalData.header,
        filePath: this.data.idCardWithPersonPath,
        name: 'idCardFront',
        formData: {
          'fileName': 'idCardWithPersonPath'
        },
        success: function (res) {
          var data = res.data
          if (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 3000,
              complete: function () {
                // 跳转到上级页面
                wx.navigateBack({})
              }
            })
            
          }
        }
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请选择手持身份证正面照片',
        showCancel: false
      })
      return
    }
  }
})