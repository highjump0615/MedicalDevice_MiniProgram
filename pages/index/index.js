//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 点击进入
   */
  gotoHome: function() {
    wx.reLaunch({
      url: '../home/home'
    });
  },

  onLoad: function () {
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
