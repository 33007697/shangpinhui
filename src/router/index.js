// 路由配置文件
// 引入vue-router和vue
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用VueRouter插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'


// 重写push和replace代码，已解决编程式路由导航时，重复执行push和replace时报错问题、
// 保存原来是push和replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace方法函数
VueRouter.prototype.push = function (location, res, rej) {
    // 判断一下res和rej参数是否存在
    if (res && rej) {
        // 存在则执行原来的push，并且将三个参数都传入，注意需要使用call方法，将上下文对象转变为当前的this
        originPush.call(this, location, res, rej)
    } else {
        // 如果res或rej参数不存在，则也执行原来的push，但是传入参数时，res和rej为空函数
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, res, rej) {
    // 判断一下res和rej是否存在
    if (res && rej) {
        // 存在则执行原来的replace，需要使用call方法改变上下文对象为当前this，并传入参数
        originReplace.call(this, location, res, rej)
    } else {
        // 如果不存在，则也执行原来的replace，需要使用call方法改变上下文对象为当前this，并在res和rej参数的位置传入空函数
        originReplace.call(this, location, () => { }, () => { })
    }
}


// 暴露路由配置信息
export default new VueRouter({
    // 路由配置项routes，其值为数组，数组中每一项都为路由对象
    routes: [
        {
            // path路由路径，component路由组件，meta：路由元信息，为自定义信息
            path: '/home',
            name: 'home',
            component: Home,
            meta: { show: true }
        },
        {
            // search搜索时需要参数，keyword，这个参数可以传递也可以不传递，在这个参数后添加?2问号
            path: '/search/:keyword?',
            name: 'search',
            component: Search,
            meta: { show: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { show: false }
        },
        // 商品详情路由,需要携带params参数
        {
            path: '/detail/:skuId',
            component: Detail,
            meta: { show: true }
        },
        // 商品成功添加到购物车路由注册
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        // 商品购物车路由注册
        {
            path:'/shopcart',
            name:'shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        // 路由路径重定向
        {
            path: '/',
            redirect: "/home"
        }
    ],
    // 滚动行为，让切换新路由之后，滚动条滚动到最上方
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})