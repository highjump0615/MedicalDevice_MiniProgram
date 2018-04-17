//app.js
var User = require('model/User.js');

App({
  onLaunch: function (options) {
    // 获取推荐人
    if (options && options.userid) {
      /*
      wx.showModal({
        title: '传入参数',
        content: 'userid = '+options.userid,
        showCancel: false
      })
      */
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        
        // 已有用户数据
        if (that.globalData.currentUser) {
          return;
        }
        
        that.globalData.currentUser = new User(res.userInfo);

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res);
        }
      }
    });
  },

  globalData: {
    currentUser: null,
    gizwits: null,
    currentDevice: null, 
    years: ['2015', '2016', '2017'],
    months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },

  /**
   * 关闭设备
   */
  closeDevice: function () {
    this.globalData.currentDevice = null;

    // 刷新当前页面
    var pages = getCurrentPages();
    var curPage = pages[pages.length - 1];
    if (curPage) {
      curPage.onShow();
    }
  }
})