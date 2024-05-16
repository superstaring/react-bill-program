import { useState } from "react";
import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";

const Month = () => {
  const [dateVisbible, setDateVisble] = useState(false);
  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  const onConfirm = (date) => {
    setDateVisble(false);

    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
  };

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>

      <div className="content">
        <div className="header">
          {/*时间切换区域 */}
          <div className="date" onClick={() => setDateVisble(true)}>
            <span className="text">{currentDate + ""}月账单</span>
            {/* 控制expand类名是否存在 */}
            <span
              className={classNames("arrow", dateVisbible && "expand")}
            ></span>
          </div>

          {/*统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>

              <span className="type">支出</span>
            </div>

            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>

            <div className="item">
              <span className="money">{300}</span>

              <span className="type">结余</span>
            </div>
          </div>

          {/*时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisbible}
            max={new Date()}
            onCancel={() => setDateVisble(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisble(false)}
          ></DatePicker>
        </div>
      </div>
    </div>
  );
};

export default Month;
