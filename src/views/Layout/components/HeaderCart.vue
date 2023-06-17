<script setup></script>
<template>
  <div class="cart">
    <a href="javascript:;" class="curr">
      <i class="iconfont icon-cart"> </i>
      <em>2</em>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="i in cartList" :key="i">
          <RouterLink to="">
            <img :src="i.picture" alt="" />
            <div class="center">
              <p class="name elipsis-2">{{ i.name }}</p>
              <p class="attr elipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right"></div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
