
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Layout.scss";
import {
  HomeOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  SettingOutlined,
  ExclamationCircleFilled,
 
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
const { confirm } = Modal;

const { Header, Sider, Content } = Layout;


const MyLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  // 菜单项当前选项
  const [current, setCurrent] = useState("home");
    const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();


// 顶部菜单项
  const items = [
    {
      label: "首页",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "邮件",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "通知",
      key: "noti",
      icon: <NotificationOutlined />,
    },
    {
      label: "个人中心",
      key: "mine",
      icon: <UserOutlined />,
      children: [
        {
          key: "my",
          label: "个人信息",
        },
        {
          key: "pwd",
          label: "修改密码",
        },
        {
          key: "exit",
          label: "退出系统",
        },
      ],
    },
  ];

  // 左侧菜单
const itmes2 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "账户管理",
      children: [
        {
          key: "role",
          label: "角色管理",
        },
        {
          key: "admin",
          label: "账户管理",
        },
      ],
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "客房管理",
      children: [
        {
          key: "type",
          label: "房型管理",
        },
        {
          key: "room",
          label: "房间管理",
        },
        {
          key: "total",
          label: "营业统计",
        },
      ],
    },
    {
      key: "guest",
      icon: <SettingOutlined />,
      label: "客户管理",
    },
  ];

  // const onClickMenu = (e) => {
  //   setCurrent(e.key);
  //   navigate(`/layout/${e.key}`);
  // };

const onClickMenu = (e) => {
    setCurrent(e.key);

    // 使用对象映射替代 switch，代码更简洁
    const routes = {
        role: "/layout/role",
        type: "/layout/type",
        total:"/layout/total",
        mine:"/layout/mine"
    };

    // 如果 `e.key` 存在于 `routes`，则导航到对应的路径
    if (routes[e.key]) {
        navigate(routes[e.key]);
    } else {
        console.warn("未知的菜单项:", e.key);
    }
};



return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "Bing" : "Bing酒店管理系统"}</div>
        <Menu
          onClick={onClickMenu}
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          items={itmes2}
        />
      </Sider>
      <Layout className="right">
        <Header className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Menu
            onClick={onClickMenu}
            theme="dark"
            className="menu"
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content className="content">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );


};

export default MyLayout;
