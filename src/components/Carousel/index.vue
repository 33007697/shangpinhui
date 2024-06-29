<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
        <!-- 遍历数据 -->
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 抽取轮播图样式和结构，组成自定义组件
// 引入swiper
import Swiper from "swiper";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Carousel",
  props: ["list"],
  //   使用watch监视list和$nextTick()方法的回调函数中生成swiper实例对象
  watch: {
    list: {
        // immediate为true，表示组件加载后立马执行一次当前监视中的handler函数
      immediate:true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 表示分页器的小点是否可以点
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>