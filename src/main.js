import Vue from 'vue'
import App from './App.vue'
// 引入路由文件
import router from '@/router/index'
// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 引入vuex配置文件store
import store from './store'
// 引入mockServe文件执行一次
import '@/mock/mockServe'
// 引入swiper的样式
import 'swiper/css/swiper.css'
// 将TypeNav和Carousel和Pagination组件加入到全局组件中
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)


new Vue({
    // 注册路由，注册路由后所有组件中将多出$route和$router属性
    router,
    // 注册vuex插件,注册后，所有组件中将多出一个$store的属性
    store,
    render:h => h(App),
    // 配置全局事件总线$bus，在beforeCreate中
    beforeCreate(){
        // 在Vue的原型对象上添加一个$bus的属性，其值为当前VM实例
        Vue.prototype.$bus = this
    }
}).$mount('#app')
