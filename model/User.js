class User {

  static Roles = ['普通会员', '设备管理员','维修工程师', '平台管理员', '系统管理员'];

  // 角色
  // 0：普通会员
  static ROLE_NORMAL = 0;
  // 1：设备管理员
  static ROLE_DEVICE_ADMIN = 1;
  // 2：维修工程师
  static ROLE_MAINTAIN_ENGINEER = 2;
  // 3：平台管理员
  static ROLE_PLATFORM_ADMIN = 3;
  // 4：系统管理员
  static ROLE_SYSTEM_ADMIN = 4;

  constructor (userInfo) {
    // 初始化
    this.nickName = userInfo.nickName;
    this.gender = userInfo.gender;
    this.avatarUrl = userInfo.avatarUrl;

    // 地理位置
    this.latitude = 0;
    this.longitude = 0;

    // 数据

    this.role = User.ROLE_NORMAL; // 普通会员
  }

  getLocationFormatted() {
    return this.latitude + ',' + this.longitude;
  }
  
  setRoleFromString(strRole) {
    for (var i = 0; i < User.Roles.length; i++) {
      if (strRole == User.Roles[i]) {
        this.role = i;
      }
    }
  }
}


module.exports = User;