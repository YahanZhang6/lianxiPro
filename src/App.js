import { useEffect, lazy, Suspense,memo} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AliveScope } from "react-activation";
import { message } from "antd";

import Login from "./views/Login/Login";
import rolePermissions from "./config/permissions";

// 懒加载组件
const Role = lazy(() => import("./views/Role/Role"));
const Layout = lazy(() => import("./views/Layout/Layout"));
const TotalPrice = lazy(() => import("./views/Type/TotalPrice"));
const Type = lazy(() => import("./views/Type/Type"));
const Mine = lazy(() => import("./views/Admin/Mine.js"));

// 获取当前用户角色
const getCurrentUserRole = () => localStorage.getItem("userRole") || "superAdmin";
const userRole = getCurrentUserRole();

console.log("当前用户角色:", userRole);
const userPermissions = rolePermissions[userRole] || [];

// 🚫 无权限页面提示
const NoPermissionPage = memo(() => {
  useEffect(() => {
    message.error("无权限访问该页面！");
  }, []);

  return <div style={{ textAlign: "center", padding: "50px", fontSize: "20px", color: "red" }}>🚫 无权限访问</div>;
});




// 定义路由表
const routes = [
  { path: "role", element: <Role />, permission: "role" },
  { path: "type", element: <Type />, permission: "type" },
  { path: "total", element: <TotalPrice />, permission: "total" },
  { path: "mine", element: <Mine />, permission: "mine" }
];

function App() {
  return (
    <BrowserRouter>
      <AliveScope>
        <Suspense fallback={<div style={{ textAlign: "center", padding: "20px" }}>加载中嘻嘻嘻...</div>}>
          <Routes>
            {/* 登录页面 */}
            <Route path="/" element={<Login />} />

            {/* 受保护的 Layout 页面 */}
            <Route path="/layout" element={<Layout />}>
              {routes.map(({ path, element, permission }) =>
                userPermissions.includes("all") || userPermissions.includes(permission) ? (
                  <Route key={path} path={path} element={element} />
                ) : (
                  <Route key={path} path={path} element={<NoPermissionPage />} /> // 🚫 无权限访问提示
                )
              )}
              {/* 其他未匹配的路由 */}
              <Route path="*" element={<NoPermissionPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AliveScope>
    </BrowserRouter>
  );
}

export default App;
