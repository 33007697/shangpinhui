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

// 注册时，发送请求获取验证码，因为一些原因，验证码将会被返回，本来验证码是会发送到用户的手机上的，由用户填写
// url: /api/user/passport/sendCode/{phone}   method:get  参数phone
export const reqUserCode = (phone) => request({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户，发送请求，将用户输入的信息，发个服务器，返回注册结果
// url：/api/user/passport/register  method ：post    参数：phone,code,password
export const reqUserRegister = (data) => request({url:'/user/passport/register',data,method:'post'})

// 用户登录，发送请求，将用户账号和密码，发给服务器，登录成功则返回用户的token（用户唯一身份识别码），即用户令牌
// token（令牌）：用户唯一身份标识，发送请求时，需要携带用户唯一身份标识，获取用户详细信息，进行展示
// url: /api/user/passport/login   method ：post  参数：phone，password
export const reqUserLogin = (data) => request({url:"/user/passport/login",data,method:'post'})


// 获取用户详细信息，用于展示,服务器返回的是用户信息,发送该请求前需要先登录(需要token)，否则获取不到用户信息
// url:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => request({url:'/user/passport/auth/getUserInfo',method:'get'})


// 退出登录，/api/user/passport/logout   get请求
export const reqLogout = () => request({url:"/user/passport/logout",method:'get'})

// 获取用户地址信息。url：/api/user/userAddress/auth/findUserAddressList   method：get   没有参数
export const reqUserAddress = () => request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})


// 获取用户订单交易页面信息， url：/api/order/auth/trade   method：get   参数无
export const reqUserOrderInfo = () => request({url:'/order/auth/trade',method:'get'})

// 发送请求，将订单详情发送给服务器，获取服务器返回的订单号
// url:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post  
// 参数：tradeNo订单号，consignee收件人姓名，consigneeTel收件人电话，deliveryAddress收件人地址  paymentWay支付方式，orderComment订单备注，orderDetailList商品详情列表
export const reqOrderPay = (tradeNo,data) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})


// 通过订单号，获取支付详情信息,服务器会返回支付详情
// url:/api/payment/weixin/createNative/{orderId}  method:get 参数orderId
export const reqPayInfo = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})


// 通过订单号，获取支付状态信息，这个请求，需要持续执行，直到获取到支付成功的状态为止
// url：/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})


// 获取个人详情页面中的订单详情
// url：/api/order/auth/{page}/{limit}  get请求
export const reqMyOrderList = (page,limit) => request({url:`/order/auth/${page}/${limit}`,method:'get'})