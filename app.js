//app.js
var User = require('model/User.js');

App({
  onLaunch: function () {
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
    gizwits: null
  }
})