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
  },
};
</script>

<style>
</style>
