var api = require('../utils/api.js');
const app = getApp();

var Device = function (mac) {
  // 初始化
  this.mac = mac

  // 地理位置
  this.latitude = 0;
  this.longitude = 0;

  // 数据
  this.energe = 0;
  this.workTime = 0;
}

Device.Types = ['通络盆', '通络机'];
Device.States = ['库存', '在途', '租用', '出售', '损坏'];

/**
 * 提取mac地址
 * @param {*} qrcode 
 */
Device.extractMac = function (qrcode) {
  var strPrefix = '?mac=';

  var nIndex = qrcode.indexOf(strPrefix);
  if (nIndex < 0) {
    return null;
  }

  return qrcode.substr(nIndex + strPrefix.length);
}

Device.initWithInfo = function (info) {
  var devNew = new Device(info.mac);
  devNew.did = info.did;

  return devNew;
}

Device.prototype = {
  /**
   * 启动设备
   */
  startDevice: function(success, fail) {
    var that = this;

    // 设备绑定
    api.gwControlDevice(that.did, 
      function _success(res) {
        if (res.data.error_code) {
          fail();          
          return;
        }

        // 定时获取数据
        that.timerId = setInterval(function () {
          that.getParameter();
        }, 3000);

        console.log('created Timer: ' + that.timerId);
        
        success();
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 获取参数
   */
  getParameter: function() {
    var that = this;

    // 设备绑定
    api.gwGetLatest(this.did, 
      function success(res) {
        // 数据
        that.energy = res.dev_energy;
        that.workTime = res.dev_work_time;

        // 已关闭，停止获取
        if (!res.dev_power) {
          clearInterval(that.timerId);
          app.closeDevice();

          console.log('cleared Timer: ' + that.timerId);
        }
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  }
}

module.exports = Device;