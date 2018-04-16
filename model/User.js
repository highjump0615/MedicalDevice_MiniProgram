class User {

  static Roles = ['普通会员', '设备管理员','维修工程师', '平台管理员', '系统管理员'];

  constructor (userInfo) {
    // 初始化
    this.nickName = userInfo.nickName;
    this.gender = userInfo.gender;
    this.avatarUrl = userInfo.avatarUrl;

    // 地理位置
    this.latitude = 0;
    this.longitude = 0;

    // 数据

    //
    // 角色，0：普通会员，1：设备管理员，2：维修工程师，3：平台管理员，4：系统管理员
    //
    this.role = 0; // 普通会员
  }

  getLocationFormatted() {
    return this.latitude + ',' + this.longitude;
  }
  
  setRoleFromString(strRole) {
    if (strRole == '普通会员') {
      this.role = 0;
    }
    else if (strRole == '系统管理员') {
      this.role = 4;
    }
  }
}


module.exports = User;