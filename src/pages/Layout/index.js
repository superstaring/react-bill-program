import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import React, { useState, useEffect } from "react";
import { Badge, TabBar, Button } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
} from "antd-mobile-icons";
import "./index.scss";

const Layout = () => {
  const [activeKey, setActiveKey] = useState("/month");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  const navigate = useNavigate();
  const switchRoute = (path) => {
    navigate(path);
    setActiveKey(path);
  };

  const tabs = [
    {
      key: "/month",
      title: "月度账单",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "/new",
      title: "记账",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "/year",
      title: "年度账单",
      icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
      badge: "99+",
    },
  ];

  return (
    <div className="layout">
      {/* 二级路由出口 */}
      <div className="container">
        <Outlet />
      </div>
      我是Layout组件
      {/* <Button color="primary">全局样式定制</Button>
      <div className="purple-theme">
        <Button color="primary">局部样式定制</Button>
      </div> */}
      <div className="footer">
        <TabBar activeKey={activeKey} onChange={switchRoute}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
