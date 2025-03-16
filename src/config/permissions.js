// 角色权限映射表
const rolePermissions = {
  superAdmin: ["all"], // 访问所有页面
  admin: ["type", "total", "mine"], // 不能访问角色管理
  roomAdmin: ["type", "mine"] // 仅能访问房型管理、个人中心
};
export default rolePermissions;


