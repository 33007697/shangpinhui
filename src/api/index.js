// 需要统一请求接口
// 引入request
import request from './request'
// 引入mockRequest
import mockRequest from './mockRequest'
// 请求地址
// const BASE_URL = 'http://sph-h5-api.atguigu.cn'


// 请求首页三级联动数据/api/product/getBaseCategoryList
export const reqCategoryList = ()=> request({url:'/product/getBaseCategoryList',methods:'GET'})

// 请求banner首页轮播图模拟数据
export const reqBannerList = ()=> mockRequest({url:'/banner'})

// 请求floor的模拟数据
export const reqFloorList = ()=> mockRequest({url:'/floor'})

// 请求搜索页面数据接口，POST请求，需要携带参数data
export const reqSearchList = (params)=> request({url:'/list',method:'post',data:params})

// 请求商品详情数据接口，Get请求，需要携带skuId参数
export const reqGoodsInfo = (skuId) => request({url:`/item/${skuId}`,method:'get'})

// 将商品成功添加都购物车，或者更新购物车中的商品个数
// /api/cart/addToCart/{ skuId }/{ skuNum }  post请求
export const reqAddOrUpdateShopCar = (skuId,skuNum) => request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 请求获取购物车列表信息，/api/cart/cartList  get请求，无参数
export const reqCartList = () => request({url:"/cart/cartList",method:'get'})

// 点击删除购物车中指定的商品，/api/cart/deleteCart/{skuId} DELETE请求，参数skuId
export const reqDeleteCart = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 点击修改购物车中商品的选中状态，/api/cart/checkCart/{skuID}/{isChecked}  get请求， 参数为：skuid和isChecked
export const reqUpdateCartChecked = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})