//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');

Page({
  data: {
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },

  onLoad: function () {
    // 检查3rd session
    var thirdSession = wx.getStorageSync('thirdSession');
    if (thirdSession) {
      this.set3rdSession(thirdSession);
    }    
  },

  getPhoneNumber: function(e) {
    var that = this;

    if (e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '获取手机号失败',
        content: '获取不到该微信手机号',
        showCancel: false
      });

      return;
    }

    // 登录
    wx.login({
      success: res => {
        //
        // 建立后台回话
        //
        var currentUser = app.globalData.currentUser;
        var paramData = {
          action: 'createSession',
          code: res.code,
          nickname: currentUser.nickName,
          avatarurl: currentUser.avatarUrl,
          gender: currentUser.gender,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        };

        api.postRequest(paramData, 
          function success(res) {
            if (res.data.result < 0) {
              // 失败
              return;
            }

            that.getUserRole(res.data['3rd_session']);
          },
          function fail(err) {
          },
          function complete() {
          }
        );
      }
    });
  },

  /**
   * 获取用户角色
   */
  getUserRole: function (thirdSession) {
    var that = this;
    
    var paramData = {
      action: 'getUserRole',
      '3rd_session': thirdSession,
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        wx.setStorageSync('thirdSession', thirdSession);
        that.set3rdSession(thirdSession);
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 设置Session
   */
  set3rdSession: function(session) {
    app.globalData.thirdSession = session;

    // 机智云匿名登录
  //   api.gwLogin(null, 
  //     function success(res) {
  //       if (!res.data.token) {
  //         // 失败
  //         wx.showModal({
  //           title: '机智云登录失败',
  //           content: '获取不到token和uid',
  //           showCancel: false
  //         });

  //         return;
  //       }

  //       app.globalData.gizwits = res.data;

        // 跳转转到附近页
        wx.reLaunch({
          url: '../home/home'
        });
  //     },
  //     function fail(err) {
  //     },
  //     function complete() {
  //     }
  //   );
  }
  
})
