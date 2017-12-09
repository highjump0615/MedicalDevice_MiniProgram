// pages/profile/experience/create.js
const app = getApp();
var api = require('../../../utils/api.js');

var gnBlogId = -1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInProgress: false,    
    content: '',
    isPublic: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      gnBlogId = parseInt(options.id);

      this.setData({
        content: options.content
      });
    }
  },

  /**
   * 输入内容
   */
  onInputContent: function (e) {
    this.setData({
      content: e.detail.value
    });
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
   * 保存
   */
  onSave: function (e) {
    var that = this;

    that.setData({
      isInProgress: true
    });
    
    //
    // 保存体验感受
    //
    var paramData = {
      action: 'saveExperience',
      '3rd_session': app.globalData.thirdSession,
      experienceid: gnBlogId > 0 ? gnBlogId : '',
      content: that.data.content,
      canopen: that.data.isPublic ? 1 : 0
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 返回
        wx.showToast({
          title: '保存成功'
        });
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