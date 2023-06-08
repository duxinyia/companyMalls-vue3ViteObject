import httpInstance from "@/utils/http.js";
// 获取面包屑数据
export function getCategoryAPI(id) {
  return httpInstance({
    url: "/category",
    params: {
      id,
    },
  });
}
