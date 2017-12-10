// pages/device/status.js
var Device = require('../../model/Device.js');

const app = getApp();
var gntimerId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    energy: 0,
    remaining: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateData();
    gntimerId = setInterval(this.updateData, 1000);
  },

  /**
   * 更新数据
   */
  updateData: function () {
    var device = app.globalData.currentDevice;

    if (device) {
      this.setData({
        energy: device.energy,
        remaining: (device.workTime / 2500) * 10
      });
    }
    // 已关闭
    else {
      // 提示
      wx.showModal({
        title: '设备已关闭',
        content: '用户关闭了电源',
        showCancel: false,
        success: function (res) {
          // 返回
          wx.navigateBack();
        }
      });
    }
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
    // 停止timer
    clearInterval(gntimerId);
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