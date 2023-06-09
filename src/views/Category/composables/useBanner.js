// 封装banner轮播图相关的业务代码
// 获取轮播图
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home.js";
export function useBanner() {
  let bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    bannerList.value = res.result;
  };
  onMounted(() => {
    getBanner();
  });

  return {
    bannerList,
  };
}
