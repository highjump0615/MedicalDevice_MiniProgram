// pages/manage/partner/partner.js
var Device = require('../../../model/Device.js');
const app = getApp();
var api = require('../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 基础信息
    userId: 0,
    nickName: '',
    phone: '',

    devices: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: parseInt(options.userid),
      nickName: options.name,
      phone: options.phone
    });

    var that = this;
    
    //
    // 获取租用设备
    //
    var paramData = {
      action: 'getRentedDevice',
      '3rd_session': app.globalData.thirdSession,
      userid: this.data.userId
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        var devices = [];
        for (var i = 0; i < res.data.records.length; i++) {
          var devNew = new Device(res.data.records[i].devicecode);
          devices.push(devNew);
        }

        that.setData({
          devices: devices
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 添加设备
   */
  addDevice: function (e) {
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
          that.doAddDevice(strMac);
        }
      }
    });
  },

  /**
   * 添加租用设备
   */
  doAddDevice: function (mac) {
    var that = this;
    
    var paramData = {
      action: 'rentDevice',
      '3rd_session': app.globalData.thirdSession,
      userid: this.data.userId,
      devicecode: mac,
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }
        else if (res.data.result == 0) {
          // 失败
          wx.showModal({
            title: '添加失败',
            content: '此设备不在系统中',
            showCancel: false
          });
          
          return;
        }

        // 数据
        var devNew = new Device(mac);
        that.data.devices.push(devNew);
        that.setData({
          devices: that.data.devices
        });

        wx.showToast({
          title: '添加成功'
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 删除设备
   */
  deleteDevice: function (e) {
    var that = this;
    
    wx.showModal({
      title: '删除',
      content: '确认要取消租用此设备吗？',
      confirmColor: '#1AAD19',
      success: function(res) {
        if (res.confirm) {
          that.doDeleteDevice(e.currentTarget.dataset.index);
        }
      }
    });
  },

  doDeleteDevice: function (index) {
    var that = this;
    var device = this.data.devices[index];
  
    var paramData = {
      action: 'removeRentedDevice',
      '3rd_session': app.globalData.thirdSession,
      userid: that.data.userId,
      devicecode: device.mac
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result <= 0) {
          // 失败
          return;
        }
        
        // 删除该留言
        that.data.devices.splice(index, 1);

        // 更新数据
        that.setData({
          devices: that.data.devices
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