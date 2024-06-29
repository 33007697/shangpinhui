import {reqSearchList} from '@/api'
// search组件在vuex中存放数据的地方，即search组件小仓库
// state数据仓库
const state = {
    searchList:{},    //searchList初始值
}
// mutations唯一可以修改state中数据的地方
const mutations = {
    // 修改state中的数据
    GETSEARCHLIST(state,value){
        state.searchList = value
    }
}
// actions可以编写一些逻辑的地方，其有commit参数，用于联系mutations
const actions = {
    // 发送请求获取search数据，需要携带参数，参数至少得是一个空对象，不允许不传值，否则会请求失败
    // action可以传递第二个参数，这第二个参数就是dispatch时传递的第二个参数
    async getSearchList({commit},params={}){
        let result = await reqSearchList(params)
        // 判断一下result是否请求成功
        if(result.code === 200){
            // 请求成功提交到mutations中
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// getters相当于计算属性
const getters = {
    // 用于简化state中数据的获取
    attrsList(state){
        // 计算属性必须有返回值，这个返回值就是计算属性的新值
        // 这个返回的值在state中，这个值不一定存在，所以需要有一个保险的操作，给其一个默认值,让其为undefined时，返回一个空数组
        // 这样可以避免获取到的值为undefined，导致页面结构中无法遍历，这个返回的默认值不一定是空数组，而是要根据数据的结构而定
        return state.searchList.attrsList || [];
    },
    goodsList(state){
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    }
}

// 将以上对象暴露出去
export default {
    state,
    mutations,
    actions,
    getters,
}
