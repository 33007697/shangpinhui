// 创建detail小仓库
import {reqGoodsInfo,reqAddOrUpdateShopCar} from '@/api'
import { getUuid } from '@/utils/uuid_token'
const state = {
    // 初始化goodInfo
    goodInfo:{},
    // 获取localStorage中的uuid,这个UUID将放到请求的请求头之中，可以在请求拦截里面添加
    uuid_token:getUuid()
}
const actions = {
    // 发送请求获取商品详情数据
    async getGoodInfo({commit},skuId){
      let result = await reqGoodsInfo(skuId)
    // 判断一下数据是否请求成功、
      if(result.code === 200){
        // 将数据提交到mutations中
        commit('GETGOODINFO',result.data)
      }
    },
    // 发送请求，将商品id和数量，发送给服务器，将商品添加到购物车中
    // eslint-disable-next-line no-unused-vars
    async addOrUpdateShopCar({commit},{skuId,skuNum}){
        // 添加商品到购物中的步骤
        // 1.需要将商品的id和商品到数量收集到
        // 2. 发送请求，将数据发送到服务器上，服务器之后只会返回成功或者失败，不会返回数据，则不需要三连环
        // 3. 我们需要通过判断其是否成功或者失败，将这个结果返回给使用的组件中
        let result = await reqAddOrUpdateShopCar(skuId,skuNum)
        // 该函数使用了async关键字修饰，那么该函数将会返回一个promise对象
        // 当其返回任何一个不为空的字符串时，promise表示成功
        // 当其返回一个Promise.reject(new Error('...'))时，promise表示失败
        // 判断一下result是否成功
        if(result.code === 200){
            // 如果成功，则返回成功信息，promise中只要返回一个不为空的字符串，则就表示成功
            return '成功'
        }else{
            // 如果失败，则返回promise失败信息
            return Promise.reject(new Error('添加或修改商品数量失败'))
        }
    }
}
const mutations = {
    GETGOODINFO(state,value){
        state.goodInfo = value
    }
}
const getters = {
    // 计算属性，简化获取数据流程
    categoryView(state){
        // 要注意goodInfo的数据有可能是空对象，保险一点，最少需要返回一个空对象
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    },
}

// 暴露出去
export default {
    state,
    actions,
    mutations,
    getters
}