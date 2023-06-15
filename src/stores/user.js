// 管理用户数据相关
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getLoginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({});
    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      let res = await getLoginAPI({ account, password });
      userInfo.value = res.result;
    };
    // 3.以对象的格式把state和action return出去
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  }
);
