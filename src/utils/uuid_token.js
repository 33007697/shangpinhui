// 这里是生成UUID的地方，UUID只需要生成一次，在没有登录的时候，使用游客UUID，这个UUID需要持久化使用
// UUID没有重复的，可以使用uuid库生成一个随机的UUID，这个UUID，将作为用户唯一标识，用于操作指定的数据
// 比如：购物车等等
// 登录之后，游客UUID将会变更成正式的用户UUID
// UUID需要放到每次请求的请求头之中，字段：userTempId，这个字段是由后台数据人员决定的，只有的每次请求的请求头中都要携带该参数，用于鉴定权限

// 引入uuid库，用于生成uuid
import { v4 as uuidv4 } from "uuid"
// 生成并暴露一个函数
export const getUuid = ()=>{
    // 首先需要先从loaclStorage中获取uuid，用于判断是否有uuid
    let uuidToken = localStorage.getItem('UUID_TOKEN')
    // 判断一下是否有uuid_token
    if(!uuidToken){
        // 如果没有uuid，则生成uuid
        let uuid_token = uuidv4()
        // 并将uuid放到localStorage中持久化存储
        localStorage.setItem("UUID_TOKEN",uuid_token)
    }
    // 如果有uuid则直接返回localStorage中的uuid
    return uuidToken;
}
