// pages/manage/device/list.js
var Device = require('../../../model/Device.js');
const app = getApp();
var api = require('../../../utils/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 界面效果
    isInProgress: false,

    // 查找
    searchCode: '',
    searchType: '',
    searchState: '',
    devices: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 点击设备编码
   */
  onDevCode: function (e) {
    var that = this;

    wx.scanCode({
      success: (res) => {
        console.log(res);

        // 失败
        if (res.errMsg !== 'scanCode:ok') {
          return;
        }

        var strMac = Device.extractMac(res.result);
        if (strMac) {
          that.setData({
            searchCode: strMac
          });
        }
      }
    });
  },

  /**
   * 选择设备类型
   */
  onSelectType: function (e) {
    var that = this;
    
    wx.showActionSheet({
      itemList: Device.Types,
      success: function (res) {
        that.setData({
          searchType: Device.Types[res.tapIndex]
        });
      }
    });
  },

  /**
   * 选择设备状态
   */
  onSelectState: function (e) {
    var that = this;
    
    wx.showActionSheet({
      itemList: Device.States,
      success: function (res) {
        that.setData({
          searchState: Device.States[res.tapIndex]
        });
      }
    });
  },

  /**
   * 查找设备
   */
  onSearch: function (e) {
    var that = this;
    
    that.setData({
      isInProgress: true
    });
    
    var paramData = {
      action: 'queryDevices',
      '3rd_session': app.globalData.thirdSession,
      devicecode: that.data.searchCode,
      devicetype: that.data.searchType,
      status: that.data.searchState
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        that.setData({
          devices: res.data.devices
        });
      },
      function fail(err) {
      },
      function complete() {
        that.setData({
          isInProgress: false
        });
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