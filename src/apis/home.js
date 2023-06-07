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
// 人气推荐数据
export function getHotAPI() {
  return httpInstance({
    url: "/home/hot",
  });
}
// 产品列表实现
export function getProductAPI() {
  return httpInstance({
    url: "/home/goods",
  });
}
