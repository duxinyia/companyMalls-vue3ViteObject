// 封装结算页接口
import httpInstance from "@/utils/http.js";

export function getCheckoutInfoAPI() {
  return httpInstance({
    url: "/member/order/pre",
  });
}
// 创建订单
export function creatOrderAPI(data) {
  return httpInstance({
    url: "/member/order",
    method: "POST",
    data,
  });
}
