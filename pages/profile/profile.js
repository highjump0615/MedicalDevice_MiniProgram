// pages/profile/profile.js

const app = getApp();
var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {        
      }
    });
  },

  /**
   * 提取我的信息
   */
  getUserInfoDetail: function() {
    var currentUser = app.globalData.currentUser;
    var that = this;

    this.setData({
      userInfo: currentUser
    });

    //
    // 提取我的信息
    //
    var paramData = {
      action: 'getMember',
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        currentUser.phone = res.data.phonenumber;
        currentUser.isPartner = res.data.ispartner;
        // 累计积分
        currentUser.totalCredit = res.data.creditstotal;
        // 理疗数次
        currentUser.countTreat = res.data.treattimes;
        // 提成
        currentUser.totalCommission = res.data.commissiontotal;
        // 合伙人设备管理员数量
        currentUser.countDevAdmin = res.data.deviceadministrator;

        that.setData({
          userInfo: currentUser
        });
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
    // 获取当前用户
    if (app.globalData.currentUser) {
      this.getUserInfoDetail();
    }
    else {
      app.userInfoReadyCallback = res => {
        this.getUserInfoDetail();
      }
    }  
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
    var currentUser = app.globalData.currentUser;

    return {
      title: '通络吧',
      path: '/pages/index/index?userid=' + currentUser.id,
      success: function (res) {
        console.log(res.shareTickets[0]);
        
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }

})