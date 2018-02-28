//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    isRegistered:false
  },
  goToIndex:function(){
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  goToRegister:function(){
    wx.navigateTo({
      url: '/pages/register/index'
    });
  },
  onLoad:function(){
    var that = this
    /*wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })*/
    app.getUserInfo(function(userInfo){
      app.globalData.userInfo=userInfo;
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      //是否注册用户
      wx.request({
        url: app.globalData.domain+'/isRegistered',
        header: app.globalData.header,
        success: function (res) {
          console.log("是否注册用户", res.data)
          that.setData({
            isRegistered: res.data
          });
        }
      });
    })
    
  },
  onShow:function(){
    console.log("onShow")
    
  },
  onReady: function(){
    console.log("onReady")
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    //重力感应
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  }
});