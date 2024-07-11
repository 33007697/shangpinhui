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

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载默认图片
import atm from '@/assets/1.gif'

// 注册使用图片懒加载插件，并传入默认图片配置信息
// 使用懒加载插件之后，Vue中就会添加一个自定义指令v-lazy，用于代替img标签中的src属性
Vue.use(VueLazyload,{
    // 配置懒加载时，默认图片
    loading:atm
})
// 引入并执行表单验证功能
import '@/plugins/validate'


// 将TypeNav和Carousel和Pagination组件加入到全局组件中
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 将Api文件夹中的所有暴露的api统一暴露出来，然后添加到Vue的原型对象上、
import * as API from '@/api'
// 按需加载ElementUI组件MessageBox
import { MessageBox } from 'element-ui'
// 并将MessageBox绑定到Vue的原型对象上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


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
        // 将所有的API统一暴露并添加到vue的原型对象上
        Vue.prototype.$API = API
    }
}).$mount('#app')
