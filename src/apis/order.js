// 封装会员页面的订单接口
import httpInstance from "@/utils/http.js";

export const getUserOrder = (params) => {
  return httpInstance({
    url: "/member/order",
    method: "GET",
    params,
  });
};
