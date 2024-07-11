<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 遍历cartInfoList，动态获取数据 -->
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 添加状态改变事件 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="updateCartChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 给下方三个按钮，添加点击事件，点击事件时，修改商品数个,并传递参数用于区分点击的是哪个元素 -->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('inp', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <!-- 点击删除当前的商品 -->
            <a class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 添加全选，全不选事件 -->
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <!-- 点击删除全部选中商品 -->
        <a @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{ getAllCart }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ getSum }}</i>
        </div>
        <div class="sumbtn">
          
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入mapGetters，获取vuex中的数据
import { mapGetters } from "vuex";
// 引入throttle，做函数节流和函数防抖
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    // 派发一个action，获取购物车列表数据
    this.getData();
  },
  // 将获取购物车列表数据提取出来，单独放到一个函数中，以便于重复使用
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改商品的个数,添加参数用于区分是哪个元素触发的事件
    // type参数：用于区分哪个元素
    // disNum参数：修改商品的数量个数 ，修改数量 = disNum最新数量 - skuNum原来数量
    // cart参数：修改的是哪个商品，商品的信息
    // 函数节流设置
    handler: throttle(async function (type, disNum, cart) {
      // 使用type判断一下点击的是哪个元素
      // 使用switch循环
      switch (type) {
        case "add":
          // 如果是add，则disNum就等于1，点击一下加一个数量
          disNum = 1;
          break;
        case "mins":
          // 如果是mins，则需要先判断一下原始数据中的数量是否大于1
          // 如果大于1，则是-1，即点击一下数量减一，如果小于等于1，则为0，即点击一下不加不减
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        default:
          // default就是用户输入的数据,该数据需要进行处理,乘以1，判断其是否非法
          // 除了需要判断其是否合法外，还需要判断其是否为负数，不能为非法数据，也不能为负数和0
          if (isNaN(disNum) || disNum < 1) {
            // 如果为非法数据，则让disNum为0，不做任何操作
            disNum = 0;
          } else {
            // 如果为合法数据，则还要对数据进行取整，避免出现小数现象，同时还要计算出差值
            // 就是用最新的数量disNum - 原来的数量skuNum，得出差值
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      // 判断完成之后，则派发action，修改数量，修改数量成功后，则重新获取数据
      try {
        // 需要捕获promise是否成功，需要使用async和await
        await this.$store.dispatch("addOrUpdateShopCar", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 修改数据成功之后，重新获取购物车列表数据
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 500),
    // 点击删除指定商品
    async deleteCart(cart) {
      // 派发一个aciton，删除指定id的商品
      // 因为需要获取到dispatch的返回信息，所以需要使用try...catch捕获promise异常信息
      // 然后结合async和await，保证获取到promise返回的信息
      try {
        // 使用await保证获取到promsie的成功信息，然后再发送请求，获取最新的购物车列表数据
        await this.$store.dispatch("deleteCart", cart.skuId);
        //  发送请求获取购物车列表数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改指定商品的选中状态
    async updateCartChecked(cart, event) {
      // 获取选中状态，选中为1，没有选中为0，而不是布尔值
      let isChecked = event.target.checked ? "1" : "0";
      // 派发一个action，并将skuid和ischecked传入
      // 使用try...catch捕获action的返回值，通过返回值判断请求是否成功
      try {
        // 使用async和await，保证获取到promsie的返回成功的回调
        await this.$store.dispatch("updateCartChecked", {
          skuId: cart.skuId,
          isChecked,
        });
        //  成功之后，再次请求购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 点击删除购物车中全部已经选中的商品
    async deleteAllCart() {
      // 派发一个action，在仓库中遍历，重复调用action，删除购物车中全部选中的数据
      try {
        // 保证获取到Promise的成功的返回
        await this.$store.dispatch("deleteAllCart");
        //  获取到成功的返回后，再次获取购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改商品的全部选中状态
    async updateAllCartChecked(event) {
      // 获取当前元素的选中状态，当前元素的选中状态决定了购物车中所有商品都选中状态
      // 选中为1，没有选中为0
      let isChecked = event.target.checked ? "1" : "0";
      // 派发一个acton，修改全部商品的状态
      try {
        // 确保捕获到promise对象成功的状态
        await this.$store.dispatch("updateAllCartChecked", isChecked);
        //  修改成功之后，重新获取购物车中的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    // cartList并不是我们需要的数据，我们需要的数据是其中的cartInfoList，所以还需要计算
    cartInfoList() {
      // 设置保底操作，防止报错，其保底是一个数组
      return this.cartList.cartInfoList || [];
    },
    // 计算出购物车中总共多少价格
    getSum() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        // 将每个商品到总价相加再一起
        sum += item.skuNum * item.skuPrice;
      });
      // 最后将总数返回
      return sum;
    },
    // 如果购物车中的商品全部都是选中的，则全选则需要选中
    isAllChecked() {
      // 数组的every方法，就是数组中的每一项元素都满足条件，则该方法返回真，如果有一个元素不满足则返回假
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
    // 计算出有总共有多少商品是选中的
    getAllCart(){
      let shopList = this.cartInfoList.filter(item => item.isChecked == 1)
      return shopList.length
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>