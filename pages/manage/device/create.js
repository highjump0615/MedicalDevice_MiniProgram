// pages/manage/device/create.js
var Device = require('../../../model/Device.js');
const app = getApp();
var api = require('../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInProgress: false,

    // 数据
    id: '',
    type: Device.Types[0],
    state: Device.States[0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 点击设备编码
   */
  onDevCode: function (e) {
    var that = this;

    wx.scanCode({
      success: (res) => {
        console.log(res);

        // 失败
        if (res.errMsg !== 'scanCode:ok') {
          return;
        }

        var strMac = Device.extractMac(res.result);
        if (strMac) {
          that.setData({
            code: strMac
          });
        }
      }
    });
  },

  /**
   * 选择设备类型
   */
  onSelectType: function (e) {
    var that = this;
    
    wx.showActionSheet({
      itemList: Device.Types,
      success: function (res) {
        that.setData({
          type: Device.Types[res.tapIndex]
        });
      }
    });
  },

  /**
   * 选择设备状态
   */
  onSelectState: function (e) {
    var that = this;
    
    wx.showActionSheet({
      itemList: Device.States,
      success: function (res) {
        that.setData({
          state: Device.States[res.tapIndex]
        });
      }
    });
  },

  /**
   * 提交
   */
  onSubmit: function (e) {
    //
    // 检查输入项
    //
    if (!this.data.code) {
      // 失败
      wx.showModal({
        title: '请输入设备参数',
        content: '设备编码不能为空',
        showCancel: false
      });

      return;
    }

    //
    // 保存设备
    //
    var that = this;
    
    that.setData({
      isInProgress: true
    });
    
    var paramData = {
      action: 'saveDevice',
      '3rd_session': app.globalData.thirdSession,
      devicecode: that.data.code,
      devicetype: that.data.type,
      status: that.data.state,
      deviceid: that.data.id
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 返回
        wx.showToast({
          title: '添加成功'
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