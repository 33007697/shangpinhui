// 使用Vuex管理多组件共享数据
// 引入vue
import Vue from "vue";
// 引入vuex
import Vuex from 'vuex'

// vue中使用vuex插件
Vue.use(Vuex)
// vuex中的state，mutations，actions，getters使用模块式开发
// 需要引入这些小仓库模块
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// 其暴露一个Vuex.store()实例对象,使用new调用Vuex.Store()
export default new Vuex.Store({
    // 使用modules配置项，注册这些小仓库
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})