// pages/profile/price.js
const app = getApp();
var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInProgress: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //
    // 提取使用定价
    //
    var paramData = {
      action: 'queryUsingprice',
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result <= 0) {
          // 失败
          return;
        }

        // 数据
        that.setData({
          priceP: p_price,
          priceJ: j_price,
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
   * 输入昵称
   */
  onInputPrice: function (e) {
    // 通络盆
    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        priceP: e.detail.value
      });
    }
    // 通络机
    else if (e.currentTarget.dataset.type == 1) {
      this.setData({
        priceJ: e.detail.value
      });
    }
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
    // 保存使用定价
    //
    var paramData = {
      action: 'saveUsingprice',
      '3rd_session': app.globalData.thirdSession,
      p_price: that.data.priceP ? that.data.priceP : '',
      j_price: that.data.priceJ ? that.data.priceJ : ''
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