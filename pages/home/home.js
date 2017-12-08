// pages/home/home.js
var api = require('../../utils/api.js');
var Device = require('../../model/Device.js');

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
      wx.scanCode({
        success: (res) => {
          console.log(res);

          // 设备绑定
          api.gwBindDevice('5ccf7ff6af95', 
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

              var device = new Device(res.data);
              that.startDevice(device.did);
            },
            function fail(err) {
            },
            function complete() {
            }
          );
        }
      });
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
  startDevice: function(did) {
    // 设备绑定
    api.gwControlDevice(did, 
      function success(res) {
        if (res.data.error_code) {
          // 失败
          wx.showModal({
            title: '设备开机失败',
            content: res.data.error_message,
            showCancel: false
          });
          
          return;
        }
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
    var that = this;
    
    // 获取屏幕大小
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);

        // 设置两个按钮
        that.setData({
          controls: [{
            id: 1,
            iconPath: '../../res/images/but_start.png',
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
  
  }
})