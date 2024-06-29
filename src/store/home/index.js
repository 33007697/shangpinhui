// 引入请求接口
import { reqCategoryList,reqBannerList,reqFloorList } from "@/api"
// 创建home的vuex小仓库,就是home组件在vuex中存储数据的地方
// state数据仓库
const state = {
    categoryList:[],   //首页三级菜单数据
    bannerList:[],     //首页轮播图数据
    floorList:[]       //首页floor数据
}
// 唯一可以修改state中数据的地方
const mutations = {
    // 更新三级菜单数据
    CATEGORYLIST(state,value){
        // mutations中需要更新state中的数据
        state.categoryList = value
    },
    // 更新首页轮播图数据
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    // 更新floor的数据
    GETFLOORLIST(state,value){
        state.floorList = value
    }
}
// actions：方法，其中可以写一些逻辑
const actions = {
    // 请求三级菜单数据
   async categoryList({commit}){
        // 发起请求
        const result = await reqCategoryList()
        // 判断一下请求是否发送成功
        if(result.code === 200){
            // 请求成功，将提交数据到mutations中
            commit('CATEGORYLIST',result.data)
        }
    },
    // 请求轮播图数据
    async getBannerList({commit}){
        const result = await reqBannerList()
        // 如果请求成功则将数据提交到mutations中
        if(result.code === 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 请求floor的数据
    async getFloorList({commit}){
        // 请求数据
        const result = await reqFloorList()
        // 判断一下数据是否请求到
        if(result.code === 200){
            // 提交数据到mutations中
            commit('GETFLOORLIST',result.data)
        }
    }
}
// getters相当于计算属性
const getters = {}

// 将这些个对象暴露出去
export default {
    state,
    mutations,
    actions,
    getters
}