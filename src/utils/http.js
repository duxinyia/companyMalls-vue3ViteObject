// axios基础封装
import axios from "axios";
// 如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式。
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 从pinia获取token数据
    let userStore = useUserStore();
    let token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 按照后端的要求拼接token数据
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    // 统一错误提示
    ElMessage({ type: "warning", message: e.response.data.message });
    return Promise.reject(e);
  }
);
export default httpInstance;
