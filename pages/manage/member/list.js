// pages/manage/member/list.js
const app = getApp();
var api = require('../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInProgress: false,

    // 数据
    totalMember: 0,
    increased: 0,

    // 查找
    searchName: '',
    searchPhone: '',
    members: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    //
    // 提取我的信息
    //
    var paramData = {
      action: 'countMember',
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        that.setData({
          totalMember: res.data.totalMembers,
          increased: res.data.increasedcurrent
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 输入昵称
   */
  onInputName: function (e) {
    this.setData({
      searchName: e.detail.value
    });
  },

  /**
   * 输入手机号
   */
  onInputPhone: function (e) {
    this.setData({
      searchPhone: e.detail.value
    });
  },

  /**
   * 点击查找
   */
  doSearch: function (e) {
    var that = this;

    that.setData({
      isInProgress: true
    });
    
    //
    // 提取我的信息
    //
    var paramData = {
      action: 'queryMember',
      '3rd_session': app.globalData.thirdSession,
      nickname: that.data.searchName,
      phonenumber: that.data.searchPhone,
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        that.setData({
          members: res.data.members
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