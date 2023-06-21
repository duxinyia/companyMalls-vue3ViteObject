// 封装购物车模块
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user.js";
import { getCartAPI, getCartListAPI } from "@/apis/cart.js";
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    let isLogin = computed(() => userStore.userInfo.token);
    // 1.定义state--cartList
    let cartList = ref([]);
    // 2.定义action--addCart
    let addCart = async (goods) => {
      let { skuId, count } = goods;
      // 如果有token值，登录了
      if (isLogin.value) {
        await getCartAPI({ skuId, count });
        let res = await getCartListAPI();
        cartList.value = res.result;
      } else {
        // 添加购物车操作 通过匹配传过来的商品对象中的skuId能不能在cartList里面找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        // 已添加过-count+1
        if (item) {
          item.count++;
        } else {
          // 没有添加过-直接push
          cartList.value.push(goods);
        }
      }
    };
    // 删除购物车
    const delCart = (skuId) => {
      let idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };
    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
      let item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    // 全选功能
    let allCheck = (selected) => {
      // 把cartListselected中的每一项selected都设为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };
    // 计算属性
    // 1.总的数量 所有项的count之和
    const allCount = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    });
    // 2.总价 所有项的count*price之和
    const allPrice = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count * c.price, 0);
    });
    // 3.已选择的数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 4.已选择商品价格合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );
    return {
      cartList,
      allCount,
      allPrice,
      singleCheck,
      addCart,
      delCart,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
    };
  },
  {
    persist: true,
  }
);
