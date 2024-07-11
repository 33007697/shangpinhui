<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    // 配置一下组件内路由守卫，只守卫当前组件，渲染当前组件之前执行，其他的路由它不管
    beforeRouteEnter(to,from,next){
      /*
      在组件被渲染之前执行，不能获取到当前组件的实例this，因为当守卫执行的时候，当前组件实例还没有生成
      */ 
      // 判断一下跳转到当前路由是否为pay支付，如果不是则不能跳转到当前路由上
      if(from.path == '/pay'){
        // 是pay跳转过来的，直接放行
        next()
      }else{
        console.log('不能进入支付成功页面，只能从支付页面进入支付成功页面')
        // 不是pay跳转过来的，则让其返回原地址
        next(false)
      }
    },
    beforeRouteUpdate(to,from,next){
      /*
        即路由地址中有动态数据，即params参数时，跳转时，只是params参数发生改变，时调用
        当路由组件复用时，调用 ，可以获取到组件实例this，因为是当前组件被复用，组件实例没有发生改变
      */ 
     next()
    },
    // 当路由离开当前组件时调用
    beforeRouteLeave(to,from,next){
      // 当路由从当前组件离开时调用该函数，一般情况下不使用该函数
      next()
    }
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;
    width: 1148px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;

        img {
          max-width: 100%;
          vertical-align: middle;
          border: 0;
          margin-right: 14px;
        }
      }

      .paydetail {
        margin-left: 66px;
        font-size: 15px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: #e1251b;
              border: 1px solid #e1251b;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>