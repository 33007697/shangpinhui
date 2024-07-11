import { reqUserCode, reqUserRegister, reqUserLogin,reqUserInfo,reqLogout } from "@/api"
// 用户相关信息的仓库
const state = {
    // 初始化验证码
    code: '',
    // 初始化token
    // 注意vuex中的数据不是持久化存储到，刷新就没有了
    token:localStorage.getItem('TOKEN'),
    // 初始化用户信息
    userInfo:{}
}
const mutations = {
    // 将验证码存储到数据库中
    GETUSERCODE(state, value) {
        state.code = value
    },
    // 将登录成功之后，服务器返回的token保存到state中
    GETUSERLOGIN(state,value){
        state.token = value
    },
    // 获取用户详细信息，并存储到state中
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    // 清除所有用户数据
    CLEAR(state){
        // 清除state中的token和userInfo中的值
        state.token = ''
        state.userInfo = {}
        // 清除loaclStorage中的token
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 发送请求获取用户的验证码
    async getUserCode({ commit }, phone) {
        // 发送请求，获取用户的验证码
        let result = await reqUserCode(phone)
        // 获取到验证码之后，将验证码保存到state中
        if (result.code === 200) {
            // 请求发送成功，获取到返回的验证码,提交到mutations中
            commit('GETUSERCODE', result.data)
            // 返回成功的结果
            return '成功'
        } else {
            // 请求失败，返回错误信息
            return Promise.reject(new Error(result.message))
        }
    },
    // 点击注册按钮，将数据发送到服务器，服务器返回注册结果，服务器不会返回数据
    // eslint-disable-next-line no-unused-vars
    async getUserRegister({ commit }, data) {
        // 发送请求，注册用户
        let result = await reqUserRegister(data)
        // 判断一下请求是否发送成功，服务器返回的注册结果是否成功
        if (result.code === 200) {
            // 请求注册成功
            return '成功'
        } else {
            // 请求注册失败,返回失败原因
            return Promise.reject(new Error(result.message))
        }
    },
    // 点击登录，将数据发送到服务器，服务器返回用户token令牌，该token为用户唯一身份标识
    async getUserLogin({ commit }, data) {
        // 发送请求登录
        let result = await reqUserLogin(data)
        //    判断一下是否登录成功
        if (result.code === 200){
            // 将用户令牌token放到loaclStorage中，持久化存储
            localStorage.setItem('TOKEN',result.data.token)
            // 登录成功,将token取出来放到state中
            commit('GETUSERLOGIN',result.data.token)
            // 返回成功
            return '成功'
        }else{
            // 请求失败，返回失败信息
            return Promise.reject(new Error(result.message))
        }
    },
    // 发送请求获取用户详细信息
    async getUserInfo({commit}){
        // 发送请求，获取用户信息，服务器返回的是用户信息，该请求必须要先登录(需要token)，否则无法获取到信息
        let result = await reqUserInfo()
        // 判断一下是否获取用户信息成功、
        if(result.code === 200){
            // 获取用户信息成功，将用户信息放到state中
            commit('GETUSERINFO',result.data)
            // 返回成功的信息
            return '成功'
        }else{
            // 返回失败的提示信息
            return Promise.reject(new Error(result.message))
        }
    },
    // 退出登录，退出登录时，需要删除所有用户的数据
    async getLogout({commit}){
        // 发送请求，退出登录状态
        let result = await reqLogout()
        //判断一下是否退出登录成功
        if(result.code === 200){
            //退出登录成功,需要清除当前程序保存到所有与用户信息相关的数据
            commit('CLEAR')
            // 组件中需要获取到其成功或者失败的状态
            return '成功'
        }else{
            // 请求失败时返回失败信息
            return Promise.reject(new Error(result.message))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}