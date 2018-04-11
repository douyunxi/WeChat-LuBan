var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    userGenders: [{ value: "MAN", text: "男" }, { value: "WOMAN", text: "女" }],
    userGendersText: ["男", "女"],
    selUserGender: '请选择',
    userTypes: [{ value: "WORKER", text: "我是墙纸工" }, { value: "EMPLOYER", text: "我要贴墙纸" }/*, { value: "ADMIN", text: "管理员" }*/],
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
    selDistrictIndex:0,
    userInfo:{}
  },
  bindCancel:function () {
    wx.navigateBack({});//关闭当前页面，返回上一页面
  },
  bindSave: function(e) {
    var that = this;
    var realName = e.detail.value.realName;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var postalcode = e.detail.value.postalcode;
    var gender ="UNKNOW"
    switch(app.globalData.userInfo.gender){
      case 1: gender ="MAN";break;
      case 1: gender = "WOMAN"; break;
    }
    if (realName == ""){
      wx.showModal({
        title: '提示',
        content: '请填写真实姓名',
        showCancel:false
      })
      return
    }
    if (mobile == ""){
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
    if (address == ""){
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
    console.log("gender->"+app.globalData.userInfo.gender)
    wx.request({
      url: app.globalData.domain + '/updateUserInfo/',
      header: app.globalData.header,
      data: {
        province: commonCityData.cityData[this.data.selProvinceIndex].id,
        city: cityId,
        district: districtId,
        address: address,
        nickname: app.globalData.userInfo.nickName,
        realName: realName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender: gender,
        type: that.data.selUserTypeValue,
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
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 3000,
          complete: function () {
            that.setData({
              isShow: false
            })
          }
        })
        // 跳转到结算页面
        wx.setStorageSync('userType', that.data.selUserTypeValue);
        wx.navigateBack({})
      }
    })
  },
  initUserGender:function(gender){
    for (var i = 0; i < this.data.userGenders.length; i++) {
      if (this.data.userGenders[i].value == gender) {
        return this.data.userGenders[i].text;
      }
    }
  },
  initUserType:function(type){
    var userType = "", userTypesText=[]
    for (var i = 0; i < this.data.userTypes.length;i++){
      userTypesText.push(this.data.userTypes[i].text)
      if(this.data.userTypes[i].value==type){
        userType=this.data.userTypes[i].text;
      }
    }
    this.setData({
      userTypesText: userTypesText
    })
    return userType;
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
  bindUserGenderChange:function(event){
    this.setData({
      selUserGender: this.data.userGenders[event.detail.value].text,
      selUserGenderValue: this.data.userGenders[event.detail.value].value
    })
  },
  bindUserTypeChange: function (event){
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
  onShow: function (e) {
    console.log("onLoad")
    var that = this;
    //初始化原数据
    wx.showLoading();
    //获取用户信息
    wx.request({
      url: app.globalData.domain + '/getUserInfo',
      header: app.globalData.header,
      success: function (res) {
        wx.hideLoading();
        var data=res.data;
        console.log(res)
        that.setData({
          selUserGender:that.initUserGender(data.gender),
          selUserType: that.initUserType(data.type),
          selProvince: data.province.text,
          selCity: data.city.text,
          selDistrict: data.district ? data.district.text:"",
          addressData: data.address,
          userInfo:{
            realName:data.realName,
            mobile: data.mobile,
            address:data.address,
            postalcode: data.postalcode
          }
        });
        that.initCityData(1);
        var cityIndex=null
        for (var i = 0; i < commonCityData.cityData.length;i++){
          if (commonCityData.cityData[i].id == data.province.id){
            that.initCityData(2, commonCityData.cityData[i]);
            cityIndex=i;
            break;
          }
        }
        if (data.district){
          for (var j = 0; j < commonCityData.cityData[cityIndex].cityList.length;j++){
            if (commonCityData.cityData[cityIndex].cityList[j]==data.city.id){
              that.initCityData(3, commonCityData.cityData[cityIndex].cityList[j]);
            }
          }
        }
        var addressData={}
        addressData.provinceId=data.province.id
        addressData.cityId = data.city.id
        addressData.districtId = data.district ? data.district.id:null
        that.setDBSaveAddressId(addressData);
      }
    })
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
  gotoCertification:function(){
    wx.navigateTo({
      url: '/pages/userInfo/identificationCard'
    });
  },
  readFromWx : function () {//从微信中读取
    let that = this;
    wx.chooseAddress({
      success: function (res) {
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
