<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="addr in address" :key="addr.id">
        <span class="username" :class="{ selected: addr.isDefault == 1 }">{{
          addr.consignee
        }}</span>
        <p @click="addressHandler(address, addr)">
          <span class="s1">{{ addr.fullAddress }}</span>
          <span class="s2">{{ addr.phoneNum }}</span>
          <span class="s3" v-if="addr.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="detail in orderInfo.detailArrayList"
          :key="detail.skuId"
        >
          <li>
            <img :src="detail.imgUrl" />
          </li>
          <li>
            <p>
              {{ detail.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ detail.orderPrice }}</h3>
          </li>
          <li>X{{ detail.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="msg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ orderInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ orderInfo.totalAmount }}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:<span>¥{{ orderInfo.totalAmount }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userAddressDefault.fullAddress }}</span>
        收货人：<span>{{ userAddressDefault.consignee }}</span
        >&nbsp;
        <span>{{ userAddressDefault.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- 点击提交订单时，需要发送请求将订单信息发送给服务器，获取到服务返回的订单号 -->
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a class="subBtn" @click="subOrderPay">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Trade",
  data() {
    return {
      // 收集买家留言信息
      msg: "",
      // 订单号保存起来
      orderId:''
    };
  },
  // 生命周期函数，页面挂载完毕
  mounted() {
    // 派发action，获取用户地址信息
    this.$store.dispatch("getUserAddress");
    // 派发action，获取用户订单页面详情信息
    this.$store.dispatch("getOrderInfo");
  },
  computed: {
    ...mapGetters(["address", "orderInfo"]),
    // 从地址数组中计算出当前选中的地址，使用数组的find方法，其返回的是符合条件的项
    userAddressDefault() {
      // 将地址列表中isDefautl的值为1的那个对象返回,设置保底返回一个对象，否则容易出现假错误
      return this.address.find((item) => item.isDefault == 1) || {};
    },
  },
  methods: {
    // 地址排它
    addressHandler(address, addr) {
      // 将地址数组中每一项中的isDefault的值改为0
      address.forEach((item) => (item.isDefault = 0));
      // 将当前选中的项中的isDefault的值改为1
      addr.isDefault = 1;
    },
    // 提交订单，需要发送请求
    async subOrderPay(){
// 提交订单之前，需要先或取需要发送给服务器的数据
    // 用户订单号：tradeNo
      let tradeNo = this.orderInfo.tradeNo
      // data参数
      let data = {
        consignee:this.userAddressDefault.consignee,   //收件人姓名
        consigneeTel:this.userAddressDefault.phoneNum,   //收件人电话
        deliveryAddress:this.userAddressDefault.fullAddress,  //收件人地址
        paymentWay:'ONLINE',   //支付方式，ONLINE在线支付
        orderComment:this.msg,   //订单备注，即买家留言
        orderDetailList:this.orderInfo.detailArrayList   //购买的商品详情列表
    }
    // 发送请求，获取成功的信息，并且将服务器返回的支付订单号保存起来
     let result = await this.$API.reqOrderPay(tradeNo,data)
    //  判断请求是否发送给成功
    if(result.code === 200){
      // 请发送成功
      this.orderId = result.data
      // 并且跳转路由，然后将订单号传递过去
      this.$router.push(`/pay?orderId=${result.data}`)
    }else{
      // 请求发送失败，提示失败信息
      alert(result.message)
    }
    }
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        img {
          width: 100px;
          height: 100px;
        }
        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>