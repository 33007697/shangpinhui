<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imgObj, index) in skuImageList"
        :key="imgObj.id"
      >
      <!-- 给img图片绑定点击事件，点击时切换主图信息，并且显示边框 -->
       <!-- 添加一个判断，判断一下当前点击图片的索引是否与当前索引一致，一致则添加一个类名 -->
        <img :src="imgObj.imgUrl" @click="changeHandler(index)" :class="{active:currentIndex === index}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  // 接收其父组件传递过来的数据
  props: ["skuImageList"],
  // 设置一个变量，保存当前点击的图片的索引值
  data(){
    return{
      // 默认值为0，即是第一张图片
      currentIndex:0
    }
  },
  // 设置轮播图，监听轮播图数据的变化
  watch: {
    skuImageList() {
      // 如果其数据发生了改变，则执行当前回调，保证其数据存在
      this.$nextTick(() => {
        // 当数据遍历渲染完毕之后，执行当前回调函数，生产swiper实例对象
        new Swiper(this.$refs.cur, {
          // direction: "vertical", // 垂直切换选项
          // loop: true, // 循环模式选项

          // 如果需要分页器
          // pagination: {
          //   el: ".swiper-pagination",
          // },
          // 定义每个页面显示多少张图片
          slidesPerView : 3,
          // 定义多少数量的图片为一组，即一次翻页翻多少张图片
          slidesPerGroup : 3,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          // 如果需要滚动条
          // scrollbar: {
          //   el: ".swiper-scrollbar",
          // },
        });
      });
    },
  },
  methods:{
    // 图片点击事件
    changeHandler(index){
      // 修改currentIndex的值，保存当前点击图片的索引值
      this.currentIndex = index
      // 并且使用全局事件总线，将index传递给其兄弟组件
      this.$bus.$emit('getIndex',this.currentIndex)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>