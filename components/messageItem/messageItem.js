// components/messageItem/messageItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图标路径
    icon:{
      type: String,
      value: ''
    },
    //标题
    title: {
      type: String,
      value: ''
    },
    //是否未读
    isunread: {
      type: Boolean,
      value: false
    },
    //未读数量
    unreadNum: {
      type: Number,
      value: 0
    },
    //跳转地址
    url:{
      type: String,
      value: ""
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
    _gotoDetail:function(){
      console.log(this.data.callback)
      console.log(this.data)
      if(this.data.callback){
        this.data.callback();
      }
      else{
        wx.navigateTo({
          url: this.data.url
        });
      }
    }
  }
})