// pages/manage/user/user.js
var User = require('../../../model/User.js');
const app = getApp();
var api = require('../../../utils/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,

    // 界面效果
    isInProgress: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    this.setData({
      id: parseInt(options.id),
      name: options.name,
      phone: options.phone,
      role: options.role ? options.role : '普通会员'
    });
  },

  /**
   * 选择角色
   */
  onSelectRole: function (e) {
    var that = this;

    wx.showActionSheet({
      itemList: User.Roles,
      success: function (res) {
        that.setData({
          role: User.Roles[res.tapIndex]
        });
      }
    });
  },

  /**
   * 保存
   */
  onSave: function (e) {
    var that = this;

    that.setData({
      isInProgress: true
    });
  
    //
    // 提取我的信息
    //
    var paramData = {
      action: 'setSystemUser',
      '3rd_session': app.globalData.thirdSession,
      userid: that.data.id,
      userrole: that.data.role
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result <= 0) {
          // 失败
          return;
        }

        // 返回
        wx.navigateBack();
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