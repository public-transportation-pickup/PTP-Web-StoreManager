// components
import React from 'react';
import CardStats from "../Cards/CardStats";
import { useLocation } from "react-router-dom";

function HeaderStats({param}) {
  var totalSalePercents=param!=undefined?`${RoundedNumber(Math.abs((param.totalSalesNew-param.totalSalesLast)/param.totalSalesLast))}`:"0";
  var totalOrderPercent=param!=undefined?`${RoundedNumber(Math.abs((param.totalOrdersNew-param.totalOrdersLast)/param.totalOrdersLast))}`:"0";
  var averagePercent=param!=undefined?`${RoundedNumber(Math.abs((param.averageSaleValueNew-param.averageSaleValueLast)/param.averageSaleValueLast))}`:"0";
  var visitorPercent=param!=undefined?`${RoundedNumber(Math.abs((param.visitorsNew-param.visitorsLast)/param.visitorsLast))}`:"0";
  var averageSaleValueNew=param!=undefined?`${formatNumber(param.averageSaleValueNew)} VNĐ`:"0 VNĐ"
  function RoundedNumber(num) {
    const roundedNum = num.toFixed(2);
  
    return `${roundedNum}`;
  }

  function formatNumber (number) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    return formatter.format(number);
  };
  
  return (
    <div>
      {/* Header */}
      <div >
          <div className="md:pt-10 pb-0 pt-0 mt-4">
            <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            {/* <div className="flex flex-wrap"> */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                <CardStats
                  statSubtitle="Tổng giá trị đơn hàng"
                  statTitle={param!=undefined?`${formatNumber(param.totalSalesNew)} VNĐ`:"0 VNĐ"}
                  statArrow={param!=undefined?((param.totalSalesNew-param.totalSalesLast) <0 ?"down":"up") :("up")}
                  statPercent={totalSalePercents!=='Infinity'? totalSalePercents:'0'}
                  statPercentColor={param!=undefined?((param.totalSalesNew-param.totalSalesLast) <0 ?"text-red-500":"text-emerald-500") :("text-red-500")}
                  statDescripiron="So với tuần trước"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                <CardStats
                  statSubtitle="Đơn hàng"
                  statTitle={param!=undefined?`${param.totalOrdersNew}`:"0"}
                  statArrow={param!=undefined?((param.totalOrdersNew-param.totalOrdersLast) <0 ?"down":"up") :("up")}
                  statPercent={totalOrderPercent!=='Infinity'? totalOrderPercent:'0'}
                  statPercentColor={param!=undefined?((param.totalOrdersNew-param.totalOrdersLast) <0 ?"text-red-500":"text-emerald-500") :("text-red-500")}
                  statDescripiron="So với tuần trước"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                <CardStats
                  statSubtitle="Doanh thu trung bình"
                  statTitle={averageSaleValueNew}
                  statArrow={param!=undefined?((param.averageSaleValueNew-param.averageSaleValueLast) <0 ?"down":"up") :("up")}
                  statPercent={averagePercent!=='Infinity'? averagePercent:'0'}
                  statPercentColor={param!=undefined?((param.averageSaleValueNew-param.averageSaleValueLast) <0 ?"text-orange-500":"text-emerald-500") :("text-red-500")}
                  statDescripiron="So với tuần trước"
                  statIconName="fas fa-percent"
                  statIconColor="bg-sky-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-3">
                <CardStats
                  statSubtitle="Khách hàng"
                  statTitle={param!=undefined?`${param.visitorsNew}`:"0"}
                  statArrow="up"
                  statPercent={visitorPercent!=='Infinity'? visitorPercent:'0'}
                  statPercentColor={param!=undefined?((param.visitorsNew-param.visitorsLast) <0 ?"text-orange-500":"text-emerald-500") :("text-red-500")}
                  statDescripiron="So với tuần trước"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
                </div>
          </div>
        </div>
      </div>
        
      </div>
    </div>
  );
}
export default HeaderStats;