var Device = function (info) {
  // 初始化
  this.did = info.did;
  this.mac = info.mac

  // 地理位置
  this.latitude = 0;
  this.longitude = 0;

  // 数据
}

Device.prototype = {
}

module.exports = Device;