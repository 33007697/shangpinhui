// 路由配置文件
// 引入vue-router和vue
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用VueRouter插件
Vue.use(VueRouter)
// 引入路由组件
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 引入store仓库
import store from '@/store'


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
let router = new VueRouter({
    // 路由配置项routes，其值为数组，数组中每一项都为路由对象
    // 路由懒加载：为了提高效率，路由组件一般使用的是懒加载模式，需要该路由组件时，才进行加载，按需加载
    // 当JavaScript打包的时候，文件将变得很大，加载到页面时影响效率，路由组件都是独立组件，当访问路由时再加载对应的路由组件，从而提高效率
    // 路由懒加载需要使用：动态加载import()函数,该函数返回的是一个promise对象
    // 例子：component:()=>import('@/pages/Home')
    routes: [
        {
            // path路由路径，component路由组件，meta：路由元信息，为自定义信息
            path: '/home',
            name: 'home',
            // 路由懒加载
            component: ()=>import('@/pages/Home'),
            meta: { show: true }
        },
        {
            // search搜索时需要参数，keyword，这个参数可以传递也可以不传递，在这个参数后添加?2问号
            path: '/search/:keyword?',
            name: 'search',
            component: ()=>import('@/pages/Search'),
            meta: { show: true }
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/pages/Login'),
            meta: { show: false }
        },
        {
            path: '/register',
            name: 'register',
            component: ()=>import('@/pages/Register'),
            meta: { show: false }
        },
        // 商品详情路由,需要携带params参数
        {
            path: '/detail/:skuId',
            component: ()=>import('@/pages/Detail'),
            meta: { show: true }
        },
        // 商品成功添加到购物车路由注册
        {
            path: "/addcartsuccess",
            name: 'addcartsuccess',
            component: ()=>import('@/pages/AddCartSuccess'),
            meta: { show: true }
        },
        // 商品购物车路由注册
        {
            path: '/shopcart',
            name: 'shopcart',
            component: ()=>import('@/pages/ShopCart'),
            meta: { show: true }
        },
        {
            path:'/trade',
            name:'trade',
            component:()=>import('@/pages/Trade'),
            meta:{show:true},
            // 设置路由独享守卫，监测当前路由是否由购物车页面跳转而来，其他页面无法跳转到当前路由上
            beforeEnter(to,from,next){
                // 判断一下跳转到当前路由的，上一级路由是否从购物车页面而来
                if(from.path == '/shopcart'){
                    // 如果是从购物车跳转而来，则通过
                    next()
                }else{
                    // 如果不是从购物页面跳转而来，则拒绝跳转请求，返回原地址
                    console.log('不能进入订单页面，只能从购物车进入订单页面')
                    next(false)
                }
            }
        },
        {
            path:'/pay',
            name:'pay',
            component:()=>import('@/pages/Pay'),
            meta:{show:true},
            // 设置路由独享守卫，监测当前路由是否由订单页面跳转而来，其他页面无法跳转到当前路由上
            beforeEnter(to,from,next){
                //判断一下跳转到当前路由的源地址是否为订单页面trade
                if(from.path == '/trade'){
                    // 是从订单页面而来，直接通过
                    next()
                } else{
                    console.log('不能进入支付页面，只能从订单页面进入支付页面')
                    // 不是从订单页面而来，就让其返回源地址
                    next(false)
                }
            }
        },
        {
            path:'/paysuccess',
            name:'paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true}
        },
        {
            path:'/center',
            name:'center',
            component:()=>import('@/pages/Center'),
            meta:{show:true},
            //二级路由
            children:[
                {
                    // 二级路由的path不需要添加"/"
                    path:'myorder',
                    component:MyOrder,
                },
                {
                    path:'grouporder',
                    component:GroupOrder
                },
                // 路由重定向，默认是myorder
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
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
// 导航守卫:当路由发生改变的时候，导航守卫都可以监测到，让符合一定条件的路由通过，其他路由拦截
/*
    导航守卫分为：全局导航守卫，路由独享守卫，组件内守卫
        全局导航守卫：统管全局路由，只要路由发生了改变都可以监测，让符合条件的路由通过
        路由独享守卫：管理一条线路上的路由，只要是这一条线上的路由都可以监测到，让符合条件的路由通过，其他线上的路由不管
        组件内守卫：管理当前组件，只要跳转到当前组件就会被检测导。只让符合条件的路由通过，其他的路由不管
        守卫分为三种：
            前置路由守卫：在路由跳转之前执行
            前置解析守卫：在路由解析之前执行，和前置路由守卫差不多
            后置路由守卫：在路由跳转过来之后执行
*/
// 设置全局前置路由守卫(常用)
router.beforeEach(async (to, from, next) => {
    // 全局前置路由守卫回调函数的三个参数的说明
    /*
    to:到那个路由去，目的地
    from：从那个路由来，来源地、
    next：放行函数，有三种调用方式：next()直接放行，next(false):中断当前跳转，返回原籍（来源地），next(path路由)：中断当前跳转，跳转到其他路由上
    */
    //   进行判断，首先先判断一下用户是否登录，通过token进行判断，有token则表示登录了
    // 获取token值进行判断，token在store仓库中
    let token = store.state.user.token
    // 获取用户信息userInfo中的name属性的值，判断是userInfo中是否有值，因为userInfo是个对象，就算是空对象，判断也永远是真
    let name = store.state.user.userInfo.name
    // 判断token是否存在
    if (token) {
        // 当前是存在的，表示已经登录了
        // 在判断一下用户是否要去login登录页面和register注册页面，如果去，则不通过，返回home首页
        if (to.path === '/login' || to.path === '/register') {
            // 如果是去登录和注册页面，则直接让其返回到home首页
            console.log('去的是登录或注册页面')
            next('/home')
        } else {
            // 如果不是去登录页和注册页，而是去其他页面，则让其通过
            // 判断一下是否有用户信息
            if (name) {
                // 表示有用户信息，则直接通过
                console.log('去的是其他页面，但是有用户信息')
                next()
            } else {
                //    使用try...catch捕获用户信息是否获取成功
                try {
                    // 表示没有用户信息，userInfo为一个空对象，就需要获取用户信息userInfo
                    console.log('去的是其他页面，但是没有用户信息，需要派发action，获取用户信息')
                    // 使用store.dispatch，派发action
                    await store.dispatch('getUserInfo')
                    // 获取成功之后，通过跳转
                    next()
                } catch (error) {
                    // 获取用户信息失败，只能是因为token失效了，直接清除当前登录信息，跳转到登录页面
                    await store.dispatch('getLogout')
                    // 获取失败之后，清除用户信息后，跳转到登录页面
                    next('/login')
                }
            }
        }
    }else{
        // 如果用户没有登录，就是游客身份，暂时先全部放行
        console.log('用户没有登录，游客身份')
        // 获取到当前去往的地址
        let toPath = to.path
        // 判断一下地址的路径,不能去订单trade，支付pay和paysuccess页面，也不能去个人中心center
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 ){
            // 当前就是符合以上条件，去的就是以上地址，则跳转到login登录页面，并把当前去往的地址路由保存到路由的query参数中
            console.log('不能进入订单页面、支付页面、个人中心，请先登录')
            next('/login?redirect=' + toPath)
        }else{
            // 表示去的不是以上地址，直接放行
            next()
        }
    }
})

export default router