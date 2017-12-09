// pages/profile/credits.js
const app = getApp();
var api = require('../../utils/api.js');

// 加载参数
var gnPageNumber = 1;
var gnPageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(true);
  },

  /**
   * 获取列表
   */
  getList: function (isRefresh) {
    var that = this;
    var nPageNumber = gnPageNumber + 1;

    if (isRefresh) {
      nPageNumber = 1;
    }

    // 显示正在加载
    wx.showNavigationBarLoading();

    //
    // 设备使用统计
    //
    var paramData = {
      action: 'getCredits',
      pageNumber: nPageNumber,
      pageSize: gnPageSize,
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        gnPageNumber = nPageNumber;

        var records = that.data.items;
        if (isRefresh) {
          records = [];
        }
        
        for (var i = 0; i < res.data.records.length; i++) {
          records.push(res.data.records[i]);
        }

        // 更新数据
        that.setData({
          items: records
        });
      },
      function fail(err) {
      },
      function complete() {
        wx.stopPullDownRefresh();
        // 隐藏正在加载
        wx.hideNavigationBarLoading();
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