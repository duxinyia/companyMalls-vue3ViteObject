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
// 获取热榜数据
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit,
    },
  });
};
