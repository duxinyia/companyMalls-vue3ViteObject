// 封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore(
  "cart",
  () => {
    // 1.定义state--cartList
    let cartList = ref([]);
    // 2.定义action--addCart
    let addCart = (goods) => {
      // 添加购物车操作 通过匹配传过来的商品对象中的skuId能不能在cartList里面找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      // 已添加过-count+1
      if (item) {
        item.count++;
      } else {
        // 没有添加过-直接push
        cartList.value.push(goods);
      }
    };
    // 删除购物车
    const delCart = (skuId) => {
      let idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };
    return { cartList, addCart, delCart };
  },
  {
    persist: true,
  }
);
