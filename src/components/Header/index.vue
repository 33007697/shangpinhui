<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 判断是否有userName ,没有显示登录-->
          <p v-if="!getUserName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 有则显示用户名 -->
          <p v-else>
            <a >{{ getUserName }}</a>
            <a class="register" @click="getLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model = 'keyword'
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name:'SPHHeader',
  data(){
    return{
      keyword:''
    }
  },
  methods:{
    goSearch(){
      // 编程式路由导航
      // params:{keyword:this.keyword || undefined}} 解决输入的值是个空值，路径不对的问题
      // 判断一下当前路由有没有query参数，有则需要合并params参数和query参数
      if(this.$route.query){
        this.$router.push({name:'search',params:{keyword:this.keyword || undefined},query:this.$route.query})
      }
    },
    // 退出登录
   async getLogout(){
      //需要捕获到退出登录的状态是否成功，需要使用try...catch配合async和await，保证获取到成功或失败
      try {
        // 派发action，退出登录
        await this.$store.dispatch('getLogout')
        // 退出成功之后，跳转到home页面
        this.$router.push('/home')
      } catch (error) {
        // 请求失败时，提示错误信息
        alert(error.message)
      }
    }
  },
  mounted(){
    // 在全局事件总线$bus上绑定一个clearKeyword方法，在其他组件上使用$emit激活该方法时，执行其回调函数中的内容
    this.$bus.$on('clearKeyword',()=>{
      // 清空keyword的值
      this.keyword = ''
    })
  },
  computed:{
    // 计算出vuex中用户信息userInfo中的name
    getUserName(){
      return this.$store.state.user.userInfo.name
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>