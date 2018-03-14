// components/messageBlock/messageBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //唯一标识
    data_id:{
      type: String,
      value: ''
    },
    //消息标题
    title: {
      type: String,
      value: ''
    },
    //图标路径
    icon: {
      type: String,
      value: ''
    },
    //消息内容
    content: {
      type: String,
      value: ''
    },
    //消息时间
    time: {
      type: String,
      value: ''
    },
    //任务类型：目前支持两类:1.message消息 2.task任务
    type:{
      type: String,
      value:"" 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true,
    icon:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok:function(para){
      console.log(para)
      var that = this;
      var app = getApp()
      wx.showModal({
        title:"确认",
        content:"您确认要接单吗？",
        confirmText:"确认",
        cancelText:"取消",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              header: app.globalData.header,
              url: app.globalData.domain + '/task/receipt',
              data: {
                id: that.properties.data_id
              },
              success: function (res) {
                if(res.data){
                  wx.showToast({
                    title: '接单成功',
                    icon: 'success',
                    duration: 3000,
                    complete:function(){
                      that.setData({
                        isShow: false
                      })
                    }
                  })
                }
              }
            });
          } 
        }
      });
    },
    cancel:function(){
      var that=this;
      var app = getApp()
      wx.showModal({
        title: "提示",
        content: "您确认要放弃接单吗？放弃后系统将会把此订单发给其他工人,您将不会再收到此工单！",
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              header: app.globalData.header,
              url: app.globalData.domain+'/task/reject',
              data: {
                id: that.properties.data_id
              },
              success: function (res) {
                if(res.data){
                  wx.showToast({
                    title: '拒单成功',
                    icon: 'success',
                    duration: 3000,
                    complete: function () {
                      that.setData({
                        isShow: false
                      })
                    }
                  })
                }
              }
            });
          }
        }
      });
    },
    read:function(){
      var that = this;
      var app = getApp()
      if (that.properties.type=="message"){
        //向后台发送MessageId,表示此信息客户已读
        wx.request({
          header: app.globalData.header,
          url: app.globalData.domain +'/message/read',
          data: {
            id: that.properties.data_id
          },
          success: function (res) {
            if (res.data) {
              that.setData({
                icon: '/images/read2.jpg'
              })
            }
          }
        });
      }
    }
  }
})
