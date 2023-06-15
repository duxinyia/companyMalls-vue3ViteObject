// 封装所有和用户相关的接口函数
import httpInstance from "@/utils/http.js";
// 获取登录
export function getLoginAPI({ account, password }) {
  return httpInstance({
    url: "/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
}
