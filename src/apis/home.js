import httpInstance from "@/utils/http.js";
// 获取轮播图数据
export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
  });
}
// 新鲜好物数据
export function getNewAPI() {
  return httpInstance({
    url: "/home/new",
  });
}
