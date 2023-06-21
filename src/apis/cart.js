// 封装购物车相关接口
import httpInstance from "@/utils/http.js";
// 加入购物车
export function getCartAPI({ skuId, count }) {
  return httpInstance({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
}
// 获取购物车列表
export function getCartListAPI() {
  return httpInstance({
    url: "/member/cart",
    method: "GET",
  });
}
// 删除购物车
export function delCartAPI(ids) {
  return httpInstance({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
}
// 将存储到本地的购物车列表合并登录的购物车
export function mergeCartAPI(data) {
  return httpInstance({
    url: "/member/cart/merge",
    method: "POST",
    data,
  });
}
