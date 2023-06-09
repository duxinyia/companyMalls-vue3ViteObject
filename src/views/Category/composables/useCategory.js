import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";
import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
export function useCategory() {
  let categoryList = ref({});
  let route = useRoute();
  let getCategory = async (id = route.params.id) => {
    let res = await getCategoryAPI(id);
    categoryList.value = res.result;
    console.log(1, res);
  };
  onMounted(() => {
    getCategory();
  });
  // 路由参数变化的时候重新请求数据
  onBeforeRouteUpdate((to) => {
    // 存在问题:使用最新的路由参数请求最新的分类数据 所以使用to
    getCategory(to.params.id);
  });
  return {
    categoryList,
  };
}
