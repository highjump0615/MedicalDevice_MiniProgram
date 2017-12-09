var config = require('../config/config.js');
var md5 = require('md5.js');
const app = getApp();

function postRequest(param, success, fail, complete) {
  console.log(param);
  
  wx.request({
    url: config.api.baseUrl,
    data: param,
    method: "POST",//get为默认方法/POST
    success: function(res) {
      console.log(res.data);

      if (res.data.result !== undefined) {
        success(res);
        return;
      }

      // 错误提示
      wx.showModal({
        title: '调用接口失败',
        content: res.errMsg + ', ' + res.statusCode,
        showCancel: false
      });
    },
    fail: function (err) {
      console.log(err);

      fail(err);
    },
    complete: complete
  });
}

function postRequestRaw(url, header, param, success, fail, complete) {
  wx.request({
    url: url,
    data: JSON.stringify(param),
    method: "POST",
    header: header,
    success: function(res) {
      console.log(res.data);

      success(res);
    },
    fail: function (err) {
      console.log(err);

      fail(err);
    },
    complete: complete
  });
}

function getRequestRaw(url, header, success, fail, complete) {
  wx.request({
    url: url,
    method: "GET",
    header: header,
    success: function(res) {
      console.log(res.data);

      success(res);
    },
    fail: function (err) {
      console.log(err);

      fail(err);
    },
    complete: complete
  });
}


module.exports = {
  postRequest: postRequest,

  /**
   * 机智云登录
   */
  gwLogin: function (openid, success, fail, complete) {
    var paramData = {
      username: config.gizwits.username,
      password: config.gizwits.password
    };

    var headerData = {
      'X-Gizwits-Application-Id': config.gizwits.appId
    };

    // 调用后台请求
    postRequestRaw(
      config.gizwits.apiBaseUrl + '/login',
      headerData,
      paramData,
      success,
      fail,
      complete
    );
  },

  /**
   * 绑定设备
   */
  gwBindDevice: function (macAddr, success, fail, complete) {
    // timestamp
    var strTimestamp = new Date().getTime() / 1000 | 0;
    var strSign = md5.hex_md5(config.gizwits.productSecret + strTimestamp).toLowerCase();

    var headerData = {
      'X-Gizwits-Application-Id': config.gizwits.appId,
      'X-Gizwits-User-token': app.globalData.gizwits.token,
      'X-Gizwits-Timestamp': strTimestamp,
      'X-Gizwits-Signature': strSign
    };

    var paramData = {
      product_key: config.gizwits.productKey,
      mac: macAddr,
      remark: '',
      dev_alias: ''
    };

    // 调用后台请求
    postRequestRaw(
      config.gizwits.apiBaseUrl + '/bind_mac',
      headerData,
      paramData,
      success,
      fail,
      complete
    );
  },

  /**
   * 控制设备
   */
  gwControlDevice: function (did, success, fail, complete) {
    var headerData = {
      'X-Gizwits-Application-Id': config.gizwits.appId,
      'X-Gizwits-User-token': app.globalData.gizwits.token,
    };

    var paramData = {
      attrs: {
        'dev_power' : true
      }
    };

    // 调用后台请求
    postRequestRaw(
      config.gizwits.apiBaseUrl + '/control/' + did,
      headerData,
      paramData,
      success,
      fail,
      complete
    );
  },

  /**
   * 获取数据
   */
  gwGetLatest: function (did, success, fail, complete) {
    var headerData = {
      'X-Gizwits-Application-Id': config.gizwits.appId,
      'X-Gizwits-User-token': app.globalData.gizwits.token
    };

    // 调用后台请求
    getRequestRaw(
      config.gizwits.apiBaseUrl + '/devdata/' + did + '/latest',
      headerData,
      function _success (res) {
        if (res.data.attr) {
          return success(res.data.attr);
        }
      },
      fail,
      complete
    );
  }
}
