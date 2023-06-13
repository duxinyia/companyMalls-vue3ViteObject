import httpInstance from "@/utils/http.js";
// 获取详情页面数据
export function getDetailAPI(id) {
  return httpInstance({
    url: "/goods",
    params: {
      id,
    },
  });
}
