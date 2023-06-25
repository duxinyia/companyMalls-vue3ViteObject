//封装倒计时逻辑函数

import { computed, ref, onUnmounted } from "vue";
import dayjs from "dayjs";
export const useCountDown = () => {
  let times = null;
  // 响应式的数据
  const time = ref(0);
  // 格式化时间为**分**秒
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  // 开启倒计时的函数
  const start = (currentTime) => {
    // 开始倒计时的逻辑
    // 核心逻辑，每隔一秒减一
    time.value = currentTime;
    times = setInterval(() => {
      time.value--;
    }, 1000);
  };
  // 组件销毁时清除定时器
  onUnmounted(() => {
    clearInterval(times);
  });
  return {
    formatTime,
    start,
  };
};
