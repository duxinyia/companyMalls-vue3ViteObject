// 管理用户数据相关
import { ref } from "vue";
import { defineStore } from "pinia";
import { getLoginAPI } from "@/apis/user";
import { useCartStore } from "./cartStore.js";
import { mergeCartAPI } from "@/apis/cart.js";
export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({});
    const cartStore = useCartStore();
    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      let res = await getLoginAPI({ account, password });
      userInfo.value = res.result;
      // 合并购物车
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      cartStore.updataNewList();
    };
    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      // 清除购物车
      cartStore.clearCart();
    };
    // 3.以对象的格式把state和action return出去
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
