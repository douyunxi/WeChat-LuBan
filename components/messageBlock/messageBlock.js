// components/messageBlock/messageBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok:function(){
      wx.showModal({
        title:"确认",
        content:"您确认要接单吗？",
        confirmText:"确认",
        cancelText:"取消",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'test.php', //仅为示例，并非真实的接口地址
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res.data)
              }
            });
          } 
        }
      });
    },
    cancel:function(){
      wx.showModal({
        title: "提示",
        content: "您确认要放弃接单吗？放弃后系统将会把此订单发给其他工人,您将不会再收到此工单！",
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'test.php', //仅为示例，并非真实的接口地址
              data: {
                x: '',
                y: ''
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res.data)
              }
            });
          }
        }
      });
    },
    read:function(){
      //向后台发送MessageId,表示此信息客户已读
      wx.request({
        url: 'readMessage', //仅为示例，并非真实的接口地址
        data: {
          messageId: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }
      });
    }
  }
})
