import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import React, { useState, useEffect } from 'react';
import { Badge, TabBar, Button } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);


  const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/new',
      title: '记账',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: '/year',
      title: '年度账单',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
  ];

  const [activeKey, setActiveKey] = useState('/month');

  const navigate = useNavigate();
  const switchRoute = (path) => {
    navigate(path);
    setActiveKey(path);
  }

  return (
    <div>
      {/* 二级路由出口 */}
      <Outlet />
      我是Layout组件
      {/* <Button color="primary">全局样式定制</Button>
      <div className="purple-theme">
        <Button color="primary">局部样式定制</Button>
      </div> */}

      <TabBar activeKey={activeKey} onChange={switchRoute}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>

    </div>
  );
};

export default Layout;
