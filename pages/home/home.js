// pages/home/home.js
var api = require('../../utils/api.js');
var Device = require('../../model/Device.js');
const app = getApp();

var gnWidthButton = 130;
var gnHeightButton = 45;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      }
    });
  },

  /**
   * 点击地图控件
   * @param {*} e 
   */
  controlTap: function (e) {
    var that = this;

    // 扫码开机
    if (e.controlId == 1) {
      // 设备已开机
      if (app.globalData.currentDevice) {
        wx.navigateTo({
          url: '../device/status'
        });
      }
      // 没有设备绑定
      else {
        wx.scanCode({
          success: (res) => {
            console.log(res);

            var strMac = Device.extractMac(res.result);

            // 设备绑定
            api.gwBindDevice(strMac, 
              function success(res) {
                if (res.data.error_code) {
                  // 失败
                  wx.showModal({
                    title: '绑定设备失败',
                    content: res.data.error_message,
                    showCancel: false
                  });

                  return;
                }

                var device = new Device.initWithInfo(res.data);
                that.startDevice(device);
              },
              function fail(err) {
              },
              function complete() {
              }
            );
          }
        });
      }
    }
    // 设备入网
    else {
      wx.navigateTo({
        url: '../device/configure'
      });
    }
  },

  /**
   * 打开设备
   */
  startDevice: function(device) {
    var that = this;

    wx.showModal({
      title: '开机确认',
      content: '确定要启动此设备吗？',
      confirmColor: '#1AAD19',
      success: function(res) {
        if (res.confirm) {
          that.doStartDevice(device);
        }
      }
    });
  },
  
  doStartDevice: function(device) {
    var that = this;

    device.startDevice(function success(res) {
      // 开机成功，保存设备
      app.globalData.currentDevice = device;
      that.onShow();

      // 保存理疗记录
      that.saveTreatLog(device);
    }, 
    function fail(err) {
      // 失败
      wx.showModal({
        title: '设备开机失败',
        content: res.data.error_message,
        showCancel: false
      });
    });
  },

  /**
   * 保存理疗记录
   */
  saveTreatLog: function(device) {
    var currentUser = app.globalData.currentUser;

    var paramData = {
      action: 'saveTreat',
      '3rd_session': app.globalData.thirdSession,
      devicecode: device.mac,
      payment: 0,
      location: currentUser.getLocationFormatted()
    };

    api.postRequest(paramData, 
      function success(res) {
      },
      function fail(err) {
      },
      function complete() {
      }
    );
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
    var that = this;

    var strIconPath = '../../res/images/but_start.png';
    // 已开机，改成状态按钮
    if (app.globalData.currentDevice) {
      strIconPath = '../../res/images/but_dev_status.png';
    }
    
    // 获取屏幕大小
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);

        // 设置两个按钮
        that.setData({
          controls: [{
            id: 1,
            iconPath: strIconPath,
            position: {
              left: (res.windowWidth - gnWidthButton) / 2,
              // top: res.screenHeight - 250,
              top: res.windowHeight - gnHeightButton * 4,
              width: gnWidthButton,
              height: gnHeightButton,
            },
            clickable: true
          }]
          // {
          //   id: 2,
          //   iconPath: '../../res/images/but_device.png',
          //   position: {
          //     left: (res.windowWidth - gnWidthButton) / 2,
          //     top: res.screenHeight - 190,
          //     width: gnWidthButton,
          //     height: gnHeightButton,
          //   },
          //   clickable: true
          // }]
        });
      }
    });  
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