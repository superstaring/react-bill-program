import { useState, useMemo, useEffect } from "react";
import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector(state => state.bill.billList);
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
  }, [billList])

  const [dateVisbible, setDateVisble] = useState(false);
  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  const [currentMonthList, setCurrentMonthList] = useState([]);
  const monthResult = useMemo(() => {
    // 支出 收入 结余
    const pay = currentMonthList.filter((item) => item.type === 'pay').reduce((a, c) => a + c.money, 0);
    const income = currentMonthList.filter((item) => item.type === 'income').reduce((a, c) => a + c.money, 0);

    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])

  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM');
    // 边界值控制，重点
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup])

  // 确认回调
  const onConfirm = (date) => {
    setDateVisble(false);

    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);

    setCurrentMonthList(monthGroup[formatDate]);
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
              <span className="money">{monthResult.pay.toFixed(2)}</span>

              <span className="type">支出</span>
            </div>

            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>

            <div className="item">
              <span className="money">{monthResult.total}</span>

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
