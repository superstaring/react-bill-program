import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <div>
      {/* 二级路由出口 */}
      <Outlet />
      我是Layout组件
      <br />
      <Button color="primary">全局样式定制</Button>
      <br />
      <div className="purple-theme">
        <Button color="primary">局部样式定制</Button>
      </div>
    </div>
  );
};

export default Layout;
