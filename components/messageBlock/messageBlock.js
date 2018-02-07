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
    _read:function(){
      //this.removeClass("unread");
      //this.addClass("readed");
    }
  }
})
