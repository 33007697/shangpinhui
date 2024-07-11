// 引入请求方法
import {reqUserAddress,reqUserOrderInfo} from '@/api'
const state = {
    // 初始化地址信息
    address:[],
    // 初始化用户订单页面详情信息
    orderInfo:{}
}
const mutations = {
    GETUSERADDRESS(state,value){
        // 将用户地址信息保存到state中
        state.address = value
    },
    // 将用户订单页面详情信息，保存到state中
    GETORDERINFO(state,value){
        state.orderInfo = value
    }
}
const actions = {
    // 获取用户地址信息进行展示
    async getUserAddress({commit}){
        // 获取用户地址信息,获取用户地址信息必须要登录
      let result = await reqUserAddress()
    //   判断数据是否请求成功
      if(result.code === 200){
        // 数据请求成功
        commit('GETUSERADDRESS',result.data)
      }
    },
    // 获取用户订单页面信息
    async getOrderInfo({commit}){
        // 获取用户订单页面详情信息
        let result = await reqUserOrderInfo()
        // 判断一下数据是否获取到
        if(result.code === 200){
            // 数据获取到，提交到mutations中
            commit('GETORDERINFO',result.data)
        }
    }
}
const getters = {
    // 计算属性，将数据简单提取出去
    address(state){
        return state.address || []
    },
    orderInfo(state){
        return state.orderInfo || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}