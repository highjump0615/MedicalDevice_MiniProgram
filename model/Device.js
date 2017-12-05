var Device = function (mac) {
  // 初始化
  this.mac = mac

  // 地理位置
  this.latitude = 0;
  this.longitude = 0;

  // 数据
}

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
}

Device.prototype = {
}

module.exports = Device;