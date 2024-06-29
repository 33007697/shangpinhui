<template>
  <div>
    <!-- 商品分类导航,全局组件 -->
    <TypeNav/>
    <!-- 列表 -->
    <ListContainer/>
    <!-- 每日推荐 -->
    <Recommend />
    <!-- 商品排行榜 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 v-for可以使用在自定义组件上-->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
// 引入其他的组件、
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
// 引入mapState
import { mapState } from 'vuex'

export default {
  name:'SPHHome',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    // 在home的mounted中请求floor的数据，然后通过props将数据传递给floor组件
    // 分发一个action
    this.$store.dispatch('getFloorList')
  },
  //计算属性
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style scoped lang="less">

</style>