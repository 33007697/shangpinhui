<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-if="categoryView.category1Name">{{ categoryView.category1Name }}</span>
        <span v-if="categoryView.category2Name">{{ categoryView.category2Name }}</span>
        <span v-if="categoryView.category3Name">{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果,将父组件的数据给到子组件中-->
          <Zoom :skuImageList="skuImageList"/>
          <!-- 小图列表,将其需要的数据传递给子组件中 -->
          <ImageList :skuImageList="skuImageList"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">{{ skuInfo.skuDesc }}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>
          <!-- 商品属性选择 -->
          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <!-- 循环遍历数据，获取数据的信息 -->
              <dl  v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                <dt class="title">{{ saleAttr.saleAttrName }}</dt>
                <dd changepirce="0" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" 
                :key="saleAttrValue.id"
                :class="{active:saleAttrValue.isChecked === '1'}"
                @click="getActive(saleAttrValue,saleAttr.spuSaleAttrValueList)"
                >{{ saleAttrValue.saleAttrValueName }}</dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <!-- 双向绑定数据，让用户输入的值实时更新 -->
                 <!-- 还需要绑定用户输入事件，判断用户输入的值是否合法 -->
                <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeNum">
                <!-- 绑定点击事件，修改skuNum的值 -->
                 <!-- 点击当前按钮skuNum自增 -->
                <a href="javascript:" class="plus" @click="skuNum++">+</a>
                <!-- 点击当前按钮skuNum自减，还要判断一下skuNum是否小于等于1，最少为1 -->
                <a href="javascript:" class="mins" @click="skuNum <= 1? skuNum = 1:skuNum--">-</a>
              </div>
              <div class="add">
                <a href="javascript:" @click="addShopCar">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699) </div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39">
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50">
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59">
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99">
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">
                套餐价
              </div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">
                商品介绍
              </a>
            </li>
            <li>
              <a href="###">
                规格与包装
              </a>
            </li>
            <li>
              <a href="###">
                售后保障
              </a>
            </li>
            <li>
              <a href="###">
                商品评价
              </a>
            </li>
            <li>
              <a href="###">
                手机社区
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ImageList from './ImageList/ImageList'
  import Zoom from './Zoom/Zoom'
  import { mapGetters } from 'vuex'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Detail',
    components: {
      ImageList,
      Zoom
    },
    // 定义一个动态的数据保存用户输入的值
    data(){
      return{
        // 初始化，默认值为1
        skuNum:1
      }
    },
    // 在mounted中获取商品详情页面数据
    mounted(){
      // 派发一个action，获取商品详情数据
      this.$store.dispatch('getGoodInfo',this.$route.params.skuId)
    },
    // 计算属性，从vuex中获取数据
    computed:{
      ...mapGetters(['categoryView','skuInfo','spuSaleAttrList']),
      skuImageList(){
        // 将数据取出来，要传递给其子组件，最少必须传递一个空数组，避免数据为取到，导致报错
        return this.skuInfo.skuImageList || [];
      }
    },
    methods:{
      // 点击时，获取到当前点击的对象，还需要获取到当前点击对象的的父对象
      // 用于选项排外，即只有当前点击的对象有指定的属性，其他的对象没有指定的属性
      getActive(saleAttrValue,spuSaleAttrValueList){
        // 首先遍历父对象，将其中的指定的属性值改为0
        spuSaleAttrValueList.forEach(item => {
          // 返回的时，每个对象中指定的属性的值修改为0
          return item.isChecked = '0'
        });
        // 然后再修改当前点击的对象的中指定的值为1
        saleAttrValue.isChecked = '1'
      },
      // 获取用户输入的数据，进行判断，去除非法值
      changeNum(event){
        // 首先获取一下用户输入的数据,然后用这个数据*1，如果是数字则正常，如其中包含了其他数值，则出现NaN
        let inp = event.target.value * 1
        // 判断一下inp是否为NaN，如果不为NaN，是否为负数
        if(isNaN(inp) || inp < 1){
          // 如果为当前情况，则让skuNum就等于1
          this.skuNum = 1
        }else{
          // 如果是正常情况，还需要判断一下是否为小数，直接对数据进行取整操作即可
          // 然后将取整的数据赋值给skuNum
          this.skuNum = parseInt(inp)
        }
      },
      // 点击添加商品到购物车
      async addShopCar(){
        // 1.首先点击当前按钮时，触发当前事件，派发一个action,并将skuId和skuNum传入
        // 当使用dispatch派发action时，就是在调用addOrUpdateShopCar函数，但是该是一个使用了async修饰的函数
        // 代表了该函数可以返回一个promise对象，可以通过try...catch 异常信息捕获，捕获到错误信息，对用户发起提示
        // 使用try...catch捕获promise异常时，可以使用async和await，保证获取到成功或失败的信息
        // 如捕获到成功信息，则跳转路由，并传递参数
        try {
          await this.$store.dispatch('addOrUpdateShopCar',{skuId:this.$route.params.skuId,skuNum:this.skuNum})
          // 请求发送成功后，需要将需要的数据放到浏览器会话存储中
          /*
            浏览器会话存储和本地存储的区别
            会话存储---不能持久化，会话关闭之后就会消失
            本地存储---可以持久化，关闭计算机之后，数据都还在
            // 注意：以上存储只能存储字符串，不支持存储对象
          */ 
        //  将添加购物车成功后，需要的商品详细数据存储到会话存储中，数据需要进行JSON转换
        sessionStorage.setItem('ADDSHOPCAR',JSON.stringify(this.skuInfo))
        // 跳转路由，并将商品数量skuNum传递过去
        this.$router.push({name:'addcartsuccess',query:{skuNum:this.skuNum}})
        } catch (error) {
          // 如果promise返回错误信息，则直接展示错误信息
          console.log(error.message)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        &>span+span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            color: #e12228;
            margin-top: 15px;
          }

          .priceArea {
            background: #fee9eb;
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

              .remark {
                float: right;
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }


          }

          .support {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  float: left;
                }

                dd {
                  float: left;
                  margin-right: 5px;
                  color: #666;
                  line-height: 24px;
                  padding: 2px 14px;
                  border-top: 1px solid #eee;
                  border-right: 1px solid #bbb;
                  border-bottom: 1px solid #bbb;
                  border-left: 1px solid #eee;

                  &.active {
                    color: green;
                    border: 1px solid green;
                  }
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }

                .plus,
                .mins {
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .product-detail {
      width: 1200px;
      margin: 30px auto 0;
      overflow: hidden;

      .aside {
        width: 210px;
        float: left;
        border: 1px solid #ccc;

        .tabWraped {
          height: 40px;

          h4 {
            border-top: 3px solid #fff;
            float: left;
            line-height: 37px;
            width: 105px;
            text-align: center;
            border-bottom: 1px solid #ccc;

            &.active {
              border-top: 3px solid #e1251b;
              border-bottom: 0;
              font-weight: normal;
            }
          }
        }

        .tabContent {
          padding: 10px;

          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .partList {
                overflow: hidden;

                li {
                  width: 50%;
                  float: left;
                  border-bottom: 1px dashed #ededed;
                  line-height: 28px;
                }
              }

              .goodsList {
                &>li {
                  margin: 5px 0 15px;
                  border-bottom: 1px solid #ededed;
                  padding-bottom: 5px;

                  .list-wrap {
                    .p-img {
                      text-align: center;

                      img {
                        width: 152px;
                      }
                    }

                    .price {
                      font-size: 16px;
                      color: #c81623;
                    }

                    .operate {
                      text-align: center;
                      margin: 5px 0;

                      a {
                        background-color: transparent;
                        border: 1px solid #8c8c8c;
                        color: #8c8c8c;
                        display: inline-block;
                        padding: 2px 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .detail {
        width: 980px;
        float: right;

        .fitting {
          border: 1px solid #ddd;
          margin-bottom: 15px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #333;
            padding: 5px 0 5px 15px;
          }

          .good-suits {
            height: 170px;
            padding-top: 10px;

            .master {
              width: 127px;
              height: 165px;
              text-align: center;
              position: relative;
              float: left;

              img {
                width: 87px;
              }

              p {
                color: #c81623;
                font-size: 16px;
                font-weight: 700;
              }

              i {
                position: absolute;
                top: 48px;
                right: -25px;
                font-size: 16px;
              }
            }

            .suits {
              width: 668px;
              height: 165px;
              float: left;

              .suitsItem {
                float: left;
                width: 127px;
                padding: 0 20px;
                text-align: center;

                img {
                  width: 120px;
                  height: 130px;
                }

                p {
                  font-size: 12px;
                }

                label {
                  display: block;
                  position: relative;

                  input {
                    vertical-align: middle;
                  }

                  span {
                    vertical-align: middle;
                  }
                }
              }
            }

            .result {
              border-left: 1px solid #ddd;
              width: 153px;
              height: 165px;
              padding-left: 20px;
              float: left;

              .num {
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .price-tit {
                font-weight: bold;
                margin-bottom: 10px;
              }

              .price {
                color: #B1191A;
                font-size: 16px;
                margin-bottom: 10px;
              }

              .addshopcar {
                background-color: #e1251b;
                border: 1px solid #e1251b;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                box-sizing: border-box;
              }
            }
          }
        }

        .intro {
          .tab-wraped {
            background: #ededed;
            // border: 1px solid #ddd;
            overflow: hidden;

            li {
              float: left;

              &+li>a {
                border-left: 1px solid #ddd;
              }

              &.active {
                a {
                  // border: 0;
                  background: #e1251b;
                  color: #fff;
                }
              }

              a {
                display: block;
                height: 40px;
                line-height: 40px;
                padding: 0 11px;
                text-align: center;
                color: #666;
                background: #fcfcfc;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
              }
            }
          }

          .tab-content {
            .tab-pane {
              display: none;

              &.active {
                display: block;
              }

              &:nth-child(1) {
                .goods-intro {
                  padding-left: 10px;

                  li {
                    margin: 10px 0;
                  }
                }

                .intro-detail {
                  img {
                    width: 100%;
                  }
                }
              }
            }

          }
        }
      }
    }
  }
</style>