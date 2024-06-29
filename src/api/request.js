// 二次封装axios，设置请求拦截和响应拦截
// 引入axios
import axios from "axios";
// 引入进度条模块nprogress
// 其start()方法开启进度条，done()方法结束进度条
import nProgress from "nprogress";
// 还需要引入进度条样式nprogress.css,这个文件中可以修改进度条颜色
import 'nprogress/nprogress.css'

// 引入store
import store from "@/store";

// 配置axios设置，使用axiso.create()方法
const requests = axios.create({
    // 配置默认url开头,即每次请求时，自动在请求地址后方添加该值
    baseURL:'/api',
    // 设置请求超时时间为5秒
    timeout:5000
})

// 设置请求拦截，每次请求时都能被监测到，可以做一些其他的事情
// 使用requests.interceptors.requesat.use()方法，其参数是个回调函数，该函数可以接收到一个参数
requests.interceptors.request.use((config)=>{
    // 在请求拦截中添加请求头信息，信息为UUID用户唯一标识，用于鉴定识别用户
    // 因为uuid放在了vuex仓库中,需要引入store仓库，再从仓库中获取uuid
    config.headers.userTempId = store.state.detail.uuid_token
    // 请求拦截时开启进度条
    nProgress.start()
    // 期中最后必须返回该回调函数的参数,这个参数是配置对象，其中有一个参数很重要就是header请求头信息
    return config
})

// 设置响应拦截，每次请求返回的响应都会被监测到，可以做一些其他的事情
// 使用requests.interceptors.response.use()方法，该方法的参数是两个回调函数，成功的回调和失败的回调
requests.interceptors.response.use((res)=>{
    // 响应拦截中成功的回调，结束进度条
    nProgress.done()
    // 成功的回调，res是请求成功后返回的数据，需要将该数据返回
    return res.data
},(err)=>{
    // 失败的回调，请求失败时，需要将错误信息返回
    return Promise.reject(new Error(err))
})

// 暴露requests
export default requests;