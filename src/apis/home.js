import httpInstance from "@/utils/http.js";
// 获取轮播图数据
export function getBannerAPI(params = {}) {
  // 默认为1,商品为2
  const { distributionSite = "1" } = params;
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
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
