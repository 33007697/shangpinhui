// shopcart购物车小仓库信息
import { reqCartList,reqDeleteCart,reqUpdateCartChecked } from "@/api"
const state = {
    //  初始化数据
    cartList:[]
}
const mutations = {
    // 将数据存储到state中
    GETCARTLIST(state,value){
        state.cartList = value
    }
}
const actions = {
    // 生成一个action，获取购物车列表数据
    async getCartList({commit}){
       let result =  await reqCartList()
    //  但是获取到的数据是空的，因为服务器不知道需要获取谁的购物车数据
    // 需要指定UUID，没有登录的时候默认是游客UUID，需要生成游客UUID，这个UUID只需要生成一次，持久有效
    // 因此需要将UUID放到loaclStorage中保存
    // 现已添加了游客UUID，将获取到的数据放到state中
       if(result.code === 200){
        // 将数据提交到mutations中
        commit('GETCARTLIST',result.data)
       }
    },
    // 删除购物车中指定的商品action
    // eslint-disable-next-line no-unused-vars
    async deleteCart({commit},skuId){
        // 该请求，发送之后，将不会有数据返回，只能手动返回promise成功或者失败
        // 所以不需要三连环
       let result =  await reqDeleteCart(skuId)
    //    判断一下请求是否成功
        if(result.code === 200){
            // 请求发送成功,返回一个非空的字符串，表示成功
            return '成功'
        }else{
            // 请求失败时，返回一个promise.reject()对象
            return Promise.reject(new Error('删除商品失败'))
        }
    },
    // 修改购物车中商品的选中状态
    // eslint-disable-next-line no-unused-vars
    async updateCartChecked({commit},{skuId,isChecked}){
        // 发送请求，修改指定商品的状态，该请求，没有返回值，只会返回成功或者失败
      let result = await reqUpdateCartChecked(skuId,isChecked)
    //   判断修改是否成功
      if(result.code === 200){
        // 表示请求成功，返回一个非空的字符串
        return '成功'
      }else{
        // 请求失败，返回一个Promise.reject()对象
        return Promise.reject(new Error('失败'))
      }
    },
    // 删除购物车中全部已经选中的商品
    // 需要使用context中的dispatch和state等功能，因为派发action需要使用dispatch功能
    // context中有：dispatch（派发action），state（仓库数据），getters（计算属性），commit（提交到mutations）
    deleteAllCart({dispatch,getters}){
        // 定义一个数组变量，接收遍历的每一项返回值
        let promiseAll = []
        // 遍历getters中的cartList中的cartInfoList数组，将其中isChecked的值为1的商品，全部删除
        getters.cartList.cartInfoList.forEach(item =>{
            if(item.isChecked == '1'){
                // isChecked=1 表示已选中，需要派发action，将其删除，这个action有返回值
               let promise =  dispatch('deleteCart',item.skuId)
            //    将action的返回值放到数组中，这个返回值是promsie对象
                promiseAll.push(promise)
            }
        })
        // 遍历结束之后，将Promise.all(数组)的结果返回
        // Promise.all([p1,p2,..])，这个方法是当数组中的所有的promise对象的返回值都是成功时，该方法返回的就是成功，只要数组中有一个失败，其返回的就是失败
        return Promise.all(promiseAll)
    },
    // 修改购物车中全部商品的选中状态，同样需要遍历数据，派发action
    updateAllCartChecked({dispatch,state},isChecked){
        // 定义一个空数组，存放遍历时返回的promise
        let promiseAll = []
        // 遍历数据
        state.cartList[0].cartInfoList.forEach(item =>{
            // 无需判断，直接将所有的商品的选中状态全部修改为isChecked的值
           let promise =  dispatch('updateCartChecked',{skuId:item.skuId,isChecked})
        //    将返回的promise结果，存放到数组中
            promiseAll.push(promise)
        })
        // 将Promise.all(数组)的结果返回，数组中全部成功则返回成功，只要有一个失败就返回失败
        return Promise.all(promiseAll)
    }
}
const getters = {
    // 将数据简化出去,需要有保底数据，这里的保底数据是空对象
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}