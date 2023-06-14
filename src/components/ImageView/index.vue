<script setup>
import { ref, watch } from "vue";
// 拿到鼠标相对位置
import { useMouseInElement } from "@vueuse/core";
// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg",
];
// 1.小图切换大图显示
const activeIndex = ref(0);
let enterhandler = (i) => {
  activeIndex.value = i;
};
// 拿到鼠标相对位置
let target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

// 鼠标有效移动范围内的计算逻辑：(大图宽高400px)
// 横向：100<elementX<300 ,left=elementX-小滑块宽度的一半
// 纵向：100<elementY<300 ,top=elementY-小滑块宽度的一半
// 边界距离控制
// 横向：elementX>300 left=200 elementX<100 left=0
// 纵向：elementY>300 top=200 elementY<100 top=0

let left = ref(0);
let top = ref(0);

let bigLeft = ref(0);
let bigTop = ref(0);
let watchxy = watch([elementX, elementY], () => {
  // 如果鼠标没有移入到盒子里面，直接不执行后面的逻辑
  if (isOutside.value) return;
  // console.log("后续逻辑执行");
  // 有效移动范围内控制滑块距离
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100;
  }
  // 纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100;
  }
  // 边界距离控制
  if (elementX.value > 300) {
    left.value = 200;
  } else if (elementX.value < 100) {
    left.value = 0;
  }

  if (elementY.value > 300) {
    top.value = 200;
  } else if (elementY.value < 100) {
    top.value = 0;
  }
  // 为了实现放大效果，大图的宽高是小图的两倍
  // 大图移动的方向和滑块移动的方向相反，且倍数为2倍
  // 控制大图的展示
  bigLeft = -left.value * 2;
  bigTop = -top.value * 2;
});
</script>
<template>
  <div class="goods-image">
    <!-- 左侧大图 -->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div
        v-show="!isOutside"
        class="layer"
        :style="{ left: `${left}px`, top: `${top}px` }"
      ></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, index) in imageList"
        :key="index"
        @mouseenter="enterhandler(index)"
        :class="{ active: index === activeIndex }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imageList[activeIndex]})`,
          backgroundPositionX: `${bigLeft}px`,
          backgroundPositionY: `${bigTop}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>
<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图：盒子的大小=2:1 将来控制背景图的移动来实现放大的效果查看background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $themeColor;
      }
    }
  }
}
</style>
