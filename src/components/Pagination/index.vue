<template>
  <div class="pagination">
    <!-- 测试数据 -->
     <!-- <h1>Start:{{startAndEnd.start}}，End:{{ startAndEnd.end }}  --- 当前页：{{pageNo}}</h1> -->
     <!-- 点击分页时，或者是点击上一页、下一页时，触发自定义事件getPageNo，并传入页数，使用$emit()触发事件 -->
     <!-- 上一页需要条件可点可不点,条件：pageNo当前页等于1，就不可以点 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <!-- 首页，第一页 ，有条件显示，条件为：start大于1时显示-->
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startAndEnd.start > 2">···</button>

    <!-- 动态渲染中间的连续显示分页 -->
     <!-- v-for可以遍历：数组、对象、数字、字符串等等 -->
     <!-- 有一部分需要隐藏 -->
    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
    <button v-for="(page,index) in startAndEnd.end" :key="index" v-if="page >= startAndEnd.start" 
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo === page}"
      >{{ page }}</button>

    <!-- 条件显示隐藏三个点，条件为end小于总页数减一 -->
    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <!-- 这里是总页数,有条件隐藏，条件end小于总页数 -->
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <!-- 下一页可点可不点，当当前页为最后一页时，下一页不可点 -->
    <button :disabled="pageNo === totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
// 分页器组件
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  // 获取分页器的四大要素数据
  props:['pageNo','pageSize','total','continues'],
  // 计算属性、
  computed:{
    // 计算出总共有多少页，使用总数据条目/每页显示条目 并向上取整,使用数学函数Math.ceil()向上取整
    totalPage(){
      // 计算出总页数，需要向上取整，分页只能多不能少
      return Math.ceil(this.total / this.pageSize)
    },
    // 自定义分页器中最重要的是计算出连续显示分页的开始页和结束页
    startAndEnd(){
      // 计算出连续显示分页的开始位置和结束位置
      // 首先定义两个变量接收开始页和结束页
      let start = 0, end = 0;
      // 第一种情况：总页数小于连续显示分页个数
      if(this.totalPage < this.continues){
        // 如果总页数小于连续显示分页个数,则start从1开始，end就等于总页数
        start = 1
        end = this.totalPage
      }else{
      // 第二种情况：总页数大于连续显示页数
        // 则需要计算出当前页前后几位对称的分页,对continues进行计算，让其除以2并向下取整
        // start：当前页 - parseInt(连续显示页个数 / 2)
        start = this.pageNo - parseInt(this.continues / 2)
        // end：当前页 + parseInt(连续显示分页个数 / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        
        //考虑点1:start 的值必须大于等于1，不能为负数或0，分页没有小于1的
        if(start < 1){
          // start的值小于1，则start = 1，而end则等于连续显示分页个数
          start = 1
          end = this.continues
        }
        // 考虑点2：end的值必须小于或等于总页数，不能超出总页码的值，分页没有超出的
        if(end > this.totalPage){
          // 则start的值为 总页码 - 连续显示分页个数 + 1, 为啥要加一呢？因为顾前不顾后原则
          start = this.totalPage - this.continues + 1
          // end的值就等于总页码数
          end = this.totalPage
        }
        
      }
      return {start,end}
    }
  }
};
</script>
  
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>