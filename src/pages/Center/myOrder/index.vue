<template>
  <div>
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="ord in order.records" :key="ord.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ord.createTime}}&nbsp;订单编号：{{ ord.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart,index) in ord.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 100px;height: 100px;"/>
                  <a href="#" class="block-text"
                    >{{ cart.skuName }}</a
                  >
                  <span>x{{ cart.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- 单元格合并，合并数量就是数组中元素的个数，只需要第一个，其他的不要，因为合并了 -->
              <td :rowspan="ord.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{ ord.consignee }}</td>
              <td :rowspan="ord.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{ ord.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="ord.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                <a href="#" class="btn">{{ ord.orderStatusName }} </a>
              </td>
              <td :rowspan="ord.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页器 -->
        <Pagination :pageNo="page" :pageSize="limit" :total="order.total" :continues="5" @getPageNo="getPageNo"/>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data() {
    return {
      // 请求参数
      page: 1, //当前是第几页
      limit: 5, //每页有多少条数据
      // 订单详情数据
      order: {},
    };
  },
  // 获取订单详情
  mounted() {
    // 获取订单详情信息
    this.getData();
  },
  methods: {
    async getData() {
      // 从data中解构出需要的参数
      const { page, limit } = this;
      // 发送请求，获取订单详情数据
      let result = await this.$API.reqMyOrderList(page, limit);
      // 判断一下是否请求成功
      if (result.code == 200) {
        // 将数据存储到data中
        this.order = result.data;
      }
    },
    // 自定义分页器的回调函数
    getPageNo(page) {
      console.log(page)
      // 跟新data中page的值
      this.page = page;
      // 更新了page，就需要重新获取数据
      this.getData();
    },
  },
};
</script>

<style>
</style>