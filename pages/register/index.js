var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    userGenders: [{ value: "MAN", text: "男" }, { value: "WOMAN", text: "女" }],
    userGendersText: ["男", "女"],
    selUserGender: '请选择',
    userTypes: [{ value: "WORKER", text: "我是墙纸工" }, { value: "EMPLOYER", text:"我要贴墙纸"}],
    userTypesText:[],
    selUserType: '请选择',
    selUserTypeValue:"",
    provinces:[],
    citys:[],
    districts:[],
    selProvince:'请选择',
    selCity:'请选择',
    selDistrict:'请选择',
    selProvinceIndex:0,
    selCityIndex:0,
    selDistrictIndex:0
  },
  bindCancel:function () {
    wx.navigateBack({});//关闭当前页面，返回上一页面
  },
  bindSave: function(e) {
    console.log(e)
    var that = this;
    var realName = e.detail.value.realName;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var postalcode = e.detail.value.postalcode;
    var gender = that.data.selUserGenderValue;
    var type = that.data.selUserTypeValue;
    if (realName == ""){
      wx.showModal({
        title: '提示',
        content: '请填写真实姓名',
        showCancel:false
      })
      return
    }
    if (!gender) {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
        showCancel: false
      })
      return
    }
    if (!type) {
      wx.showModal({
        title: '提示',
        content: '请选择用户类型',
        showCancel: false
      })
      return
    }
    if (!mobile){
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel:false
      })
      return
    }
    if (this.data.selProvince == "请选择"){
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel:false
      })
      return
    }
    if (this.data.selCity == "请选择"){
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel:false
      })
      return
    }
    var cityId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].id;
    var districtId;
    if (this.data.selDistrict == "请选择" || !this.data.selDistrict){
      districtId = '';
    } else {
      districtId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[this.data.selDistrictIndex].id;
    }
    if (!address){
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel:false
      })
      return
    }
    /*if (postalcode == ""){
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel:false
      })
      return
    }*/
    var apiAddoRuPDATE = "add";
    var apiAddid = that.data.id;
    if (apiAddid) {
      apiAddoRuPDATE = "update";
    } else {
      apiAddid = 0;
    }
    wx.request({
      url: app.globalData.domain + '/register/',
      header: app.globalData.header,
      data: {
        //token: app.globalData.token,
        //id: apiAddid,
        province: commonCityData.cityData[this.data.selProvinceIndex].id,
        city: cityId,
        district: districtId,
        address: address,
        nickname: app.globalData.userInfo.nickName,
        realName: realName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender: gender,
        type: type,
        mobile:mobile,
        postalcode: postalcode
      },
      success: function(res) {
        if (!res.data) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.msg,
            showCancel:false
          })
          return;
        }
        // 跳转到结算页面
        wx.setStorageSync('userType', that.data.selUserTypeValue);
        wx.navigateBack({})
      }
    })
  },
  initUserType:function(){
    var userTypesText = [];
    for (var i = 0; i < this.data.userTypes.length;i++){
      userTypesText.push(this.data.userTypes[i].text);
    }
    this.setData({
      userTypesText: userTypesText
    });
  },
  initCityData:function(level, obj){
    if(level == 1){
      var pinkArray = [];
      for(var i = 0;i<commonCityData.cityData.length;i++){
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces:pinkArray
      });
    } else if (level == 2){
      var pinkArray = [];
      var dataArray = obj.cityList
      for(var i = 0;i<dataArray.length;i++){
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys:pinkArray
      });
    } else if (level == 3){
      var pinkArray = [];
      var dataArray = obj.districtList
      for(var i = 0;i<dataArray.length;i++){
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts:pinkArray
      });
    }
    
  },
  bindUserGenderChange: function (event) {
    this.setData({
      selUserGender: this.data.userGenders[event.detail.value].text,
      selUserGenderValue: this.data.userGenders[event.detail.value].value
    })
  },
  bindUserTypeChange: function (event){
    console.log(event)
    this.setData({
      selUserType: this.data.userTypes[event.detail.value].text,
      selUserTypeValue: this.data.userTypes[event.detail.value].value
    })
  },
  bindPickerProvinceChange:function(event){
    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince:selIterm.name,
      selProvinceIndex:event.detail.value,
      selCity:'请选择',
      selCityIndex:0,
      selDistrict:'请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange:function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity:selIterm.name,
      selCityIndex:event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange:function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },
  onLoad: function (e) {
    var that = this;
    this.initUserType();
    this.initCityData(1);
  },
  setDBSaveAddressId: function(data) {
    var retSelIdx = 0;
    for (var i = 0; i < commonCityData.cityData.length; i++) {
      if (data.provinceId == commonCityData.cityData[i].id) {
        this.data.selProvinceIndex = i;
        for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
          if (data.cityId == commonCityData.cityData[i].cityList[j].id) {
            this.data.selCityIndex = j;
            for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
              if (data.districtId == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                this.data.selDistrictIndex = k;
              }
            }
          }
        }
      }
    }
   },
  selectCity: function () {
    
  },
  readFromWx : function () {//从微信中读取
    let that = this;
    console.log("readFromWx")
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        let provinceName = res.provinceName;
        let cityName = res.cityName;
        let diatrictName = res.countyName;
        let retSelIdx = 0;
        for (var i = 0; i < commonCityData.cityData.length; i++) {
          if (provinceName == commonCityData.cityData[i].name) {
            that.data.selProvinceIndex = i;
            for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
              if (cityName == commonCityData.cityData[i].cityList[j].id) {
                that.data.selCityIndex = j;
                for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
                  if (diatrictName == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                    that.data.selDistrictIndex = k;
                  }
                }
              }
            }
          }
        }

        that.setData({
          wxaddress: res,
          selProvince: provinceName,
          selCity: cityName,
          selDistrict: diatrictName
        });
      }
    })
  }
})
