<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部组件，home、search时显示 -->
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入Header组件和Footer组件
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 向vuex中发放一个action
    this.$store.dispatch("categoryList");
    // 在App加载完毕之后，派发action，获取用户详细信息
    // 是为了让所有的页面都可以使用到userInfo，用户信息，获取一次，全局使用
    // this.$store.dispatch('getUserInfo')
  },
};
</script>

<style>
</style>
