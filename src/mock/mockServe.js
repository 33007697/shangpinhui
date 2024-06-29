// 使用mockjs虚拟数据
/*
    1.在src文件夹下创建一个mock文件夹
    2.在mock文件夹中创建数据的json文件，记住是json格式的数据文件
    3.在mock文件夹中创建mockServe.js文件，然后将数据json文件都引入该文件中
    4.引入Mock对象，在mockjs中，使用Mock.mock()生成接口数据，其有两个参数，一个url，一个就是数据
    5.最后在入口文件main.js中引入该文件即可
    5.使用mock时，浏览器不会真实请求服务器，而是将请求拦截了
*/ 

// 引入mock
import Mock from 'mockjs'

// 引入json数据文件
import banner from './banner.json'
import floor from './floor.json'

// 使用Mock.mock(url,data)创建mock接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})