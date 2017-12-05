// pages/manage/account.js
const app = getApp();
var api = require('../../utils/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面效果
    isInProgress: false,
    
    // 数据
    year: '',
    months: app.globalData.months,
    monthIndex: -1  
  },

  getMonth: function() {
    if (this.data.monthIndex < 0) {
      return '';
    }
    
    return this.data.months[this.data.monthIndex];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    // 平台账户信息
    //
    var that = this;
    
    var paramData = {
      action: 'plateAccount',
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // that.setData({
        //   countDay: res.data.daytotal,
        //   countMonth: res.data.monthtotal,
        //   countYear: res.data.yeartotal,
        //   countTotal: res.data.total
        // });
      },
      function fail(err) {
      },
      function complete() {
      }
    );  
  },

  /**
   * 选择年
   */
  onSelectYear: function (e) {
    var that = this;
    
    wx.showActionSheet({
      itemList: app.globalData.years,
      success: function (res) {
        that.setData({
          year: app.globalData.years[res.tapIndex]
        });
      }
    });
  },

  /**
   * 选择月
   */
  monthChange: function (e) {
    this.setData({
      monthIndex: parseInt(e.detail.value)
    });
  },

  /**
   * 获取统计
   */
  onStatistics: function (e) {    
    //
    // 统计使用情况
    //
    var that = this;
    that.setData({
      isInProgress: true
    });
    
    var paramData = {
      action: 'countAccount',
      '3rd_session': app.globalData.thirdSession,
      year: that.data.year,
      month: that.getMonth()
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

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