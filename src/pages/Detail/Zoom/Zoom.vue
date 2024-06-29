<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 鼠标移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Zoom",
    // 定义一个动态变量存储兄弟组件传递过来的索引值
    data(){
      return {
        currentIndex:0
      }
    },
    // 获取到其父组件传递给其的数据，是哦给你props
    props:['skuImageList'],
    // 为了避免skuImageList是个空数组，必须对其进行处理
    computed:{
      imgObj(){
        // skuImageList的第0项是个对象，为避免skuImageList【0】是undefined，进行处理，让其最少返回一个空对象，避免报错
        return this.skuImageList[this.currentIndex] || {};
      }
    },
    // 在mounted中绑定全局事件总线，只需要绑定一次，就可以在其他地方的使用了
    mounted(){
      this.$bus.$on('getIndex',(index)=>{
        // 将兄弟组件传递过来的index值赋值给动态属性currentIndex中
        this.currentIndex = index
      })
    },
    methods:{
      handler(event){
        // 当鼠标移动时，获取遮罩层的对象
        let mask = this.$refs.mask
        // 获取大图片的对象
        let big = this.$refs.big
        // 鼠标移动时，获取当前鼠标的移动坐标，计算出来遮罩层需要移动的坐标
        // 使用当前鼠标坐标 - 遮罩层的一半 = 需要移动距离
        let left = event.offsetX - mask.offsetWidth / 2
        let top = event.offsetY - mask.offsetHeight / 2
        // 设置遮罩层移动的限制位置，不能超出当前元素
        // 限制左右移动的位置
        // 如果左侧left的值小于0，则left就等于0
        if(left < 0) left = 0;
        // 如果右侧的left值大于遮罩层的宽度，则让left等于遮罩层的宽度，因为遮罩层刚好就当前元素的一半
        if(left > mask.offsetWidth) left = mask.offsetWidth
        // 如果上方top值小于0，则top就等于0
        if(top < 0) top = 0;
        // 如果下方top的值大于遮罩层的高度，则top就等于遮罩层的高度
        if(top > mask.offsetHeight) top = mask.offsetHeight
        //计算出遮罩层需要移动到距离后，开始移动遮罩层
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        // 移动遮罩层的同时需要移动大图的位置，大图是当前图片的两倍，所以其移动的距离也是当前遮罩层移动的两倍
        // 因为移动需要移动到框框外面，则需要移动负数
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'

      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>