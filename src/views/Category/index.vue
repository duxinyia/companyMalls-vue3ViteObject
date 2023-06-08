<script setup>
import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
let categoryList = ref({});
let route = useRoute();
let getCategory = async () => {
  let res = await getCategoryAPI(route.params.id);
  categoryList.value = res.result;
};
onMounted(() => {
  getCategory();
});
watch(route, (newvalue) => {
  getCategory();
});
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
      }
    }
  }
}
</style>
