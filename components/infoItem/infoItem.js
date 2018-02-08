// components/infoItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图标路径
    icon: {
      type: String,
      value: ''
    },
    //标题
    title: {
      type: String,
      value: ''
    },
    //内容
    content: {
      type: String,
      value: ''
    },
    //跳转地址
    url: {
      type: String,
      value: ""
    },
    //回调函数
    callback:{
      type:Object,
      value:null
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
    _gotoDetail: function () {
      console.log(this.data)
      if (this.data.callback) {
        this.triggerEvent(this.data.callback)
      }
      else {
        wx.navigateTo({
          url: this.data.url
        });
      }
    }
  }
})