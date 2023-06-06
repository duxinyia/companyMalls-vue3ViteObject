// 引入初始化样式文件
import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// 引入懒加载插件
import { lazyPlugin } from "@/directives";
const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount("#app");
//注册懒加载插件
app.use(lazyPlugin);

// 定义全局指令
// app.directive("img-lazy", {
//   mounted(el, binding) {
//     // el:指令绑定的那个元素 img
//     // binding:bingdingvalue 指令等于号后面绑定的表达式的值 图片url
//     console.log(el, binding.value);
//     const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
//       // console.log(isIntersecting);
//       if (isIntersecting) {
//         // 进入视口区域
//         el.src = binding.value;
//         stop();
//       }
//     });
//   },
// });
