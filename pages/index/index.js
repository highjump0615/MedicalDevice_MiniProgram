//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
var gstrCode;

Page({
  data: {
    isChecking: true
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },

  onLoad: function () {
    // 检查3rd session
    // var thirdSession = wx.getStorageSync('thirdSession');
    // if (thirdSession) {
    //   // 获取已保存的用户信息
    //   app.globalData.thirdSession = thirdSession;

    //   var userInfo = wx.getStorageSync('userInfo');
    //   app.globalData.currentUser = userInfo;

    //   // 进入主页面
    //   this.gotoMain();

    //   return;
    // }

    var that = this;

    // 登录
    wx.login({
      success: res => {
        gstrCode = res.code;
        
        //
        // 建立后台回话
        //
        var paramData = {
          action: 'createSession',
          code: gstrCode,
        };

        api.postRequest(paramData, 
          function success(res) {
            if (res.data.result < 0) {
              // 失败
              return;
            }

            // 保存session
            app.globalData.thirdSession = res.data['3rd_session'];
            wx.setStorageSync('thirdSession', res.data['3rd_session']);

            // 用户已存在
            if (res.data.result == 1) {
              // 获取用户角色
              that.getUserRole();
              return;
            }

            // 需要注册，亮起“进入”按钮
            that.makeMainAvailable();
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
   * 亮起“进入”按钮
   */
  makeMainAvailable: function () {
    this.setData({
      isChecking: false
    });
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

    //
    // 注册用户
    //
    var currentUser = app.globalData.currentUser;
    var paramData = {
      action: 'registerUser',
      '3rd_session': app.globalData.thirdSession,
      nickname: currentUser.nickName,
      gender: currentUser.gender,
      userid: '',
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 进入主页面
        that.gotoMain();
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 获取用户角色
   */
  getUserRole: function () {
    var that = this;

    var paramData = {
      action: 'getUserRole',
      '3rd_session': app.globalData.thirdSession,
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          that.makeMainAvailable();
          return;
        }

        var currentUser = app.globalData.currentUser;
        currentUser.setRoleFromString(res.data.userrole);

        // 保存用户信息
        wx.setStorageSync('userInfo', currentUser);
        app.globalData.currentUser = currentUser;

        // 进入主页面
        that.gotoMain();
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
  gotoMain: function () {

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
