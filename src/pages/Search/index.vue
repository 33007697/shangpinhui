<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 请求分类名称面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- 用户输入的搜索信息面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 请求品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 请求分类属性的面包屑 -->
             <!-- 因为其分类属性为数组，需要进行遍历 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{ prop.split(':')[1] }}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 使用自定义事件获取其子组件中的数据 -->
        <SearchSelector  @trademark="trademark" @getsProps="getsProps"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序相关 -->
              <ul class="sui-nav">
                <!-- 有类active，则表示选中，有背景颜色样式,动态添加类名 -->
                 <!-- 如果searchParams的order中有1，则表示选中的为综合，如为2表示选中的为价格 -->
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <!-- 动态显示箭头样式 icon-down-->
                  <a>综合<i v-if="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></i></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<i v-if="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 将分页器拆分出来作为全局组件使用 -->
           <!-- 自定义分页器所需要的四大要素
                1.pageNo：当前是哪个分页
                2. pageSize：每一页有多少条数据
                3. total：总共有有多少条数据
                4. continues：连续显示分页的个数，默认值为5或者7，是奇数，对称好看
              自定义分页器中最重要的是连续显示分页的计算方式 ,需要计算出开始分页和结束分页
           -->
                <!-- 现在的四要素数据为模拟数据 -->
          <!-- 添加一个自定义事件 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  // 引入mapGetters方法获取vuex中getters中的计算属性
  import { mapGetters,mapState } from 'vuex';
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Search',
    // 设定一个data用户动态接收请求参数
    data(){
      return {
        // 定义一个动态参数对象，其中需要设定参数的初始值
        searchParams:{
          // 一级菜单id
          category1Id:'',
          // 二级菜单id
          category2Id:'',
          // 三级菜单id
          category3Id:'',
          // 菜单分类名称
          categoryName:'',
          // 用户输入的搜索关键字
          keyword:'',
          // 商品属性参数数组
          props:[],
          // 品牌名称
          trademark:'',
          // 排序，1综合，2价格 asc升序，desc降序，例子："1:desc"，默认值为"1:desc"
          order:'1:desc',
          // 当前页码，默认值为1
          pageNo:1,
          // 每页显示数量
          pageSize:5
        },
      }
    },
    components: {
      SearchSelector
    },
    // 修改动态请求参数，需要在mounted之前操作，使用beforeMount()生命周期函数
    beforeMount(){
      // 动态修改动态参数对象中的属性值
      // this.searchParams.category1Id = this.$route.query.category1Id
      // this.searchParams.category2Id = this.$route.query.category2Id
      // this.searchParams.category3Id = this.$route.query.category3Id
      // this.searchParams.keyword = this.$route.params.keyword
      // 或者是使用Object.assign()方法，将多个对象进行合并，这样可以自动更新对象中的数据
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    // 页面加载完毕之后执行的生命周期函数
    mounted(){
      this.getSearch()
    },
    // 计算属性
    computed:{
      // mapGetters()方法的参数是数组，需要哪个计算属性就写哪个计算属性名称
      ...mapGetters(['goodsList']),
      // 通过计算属性，计算出searchParams中的order中的数据
      // order中是否包含“1”，表示选中的是综合项
      isOne(){
        return this.searchParams.order.indexOf('1') !== -1;
      },
      // order中是否包含‘2’，表示选中的是价格项
      isTwo(){
        return this.searchParams.order.indexOf('2') !== -1;
      },
      // 计算一下order中是包含“asc”，表示为升序
      isAsc(){
        return this.searchParams.order.indexOf('asc') !== -1;
      },
      // 计算一下order中是否包含desc，表示降序
      isDesc(){
        return this.searchParams.order.indexOf('desc') !== -1;
      },
      // 从vuex中取出分页总条目数
      ...mapState({
        total:state => state.search.searchList.total
      })
    },
    methods:{
      // 设定一个函数，这个函数用于派发action，这个函数会多次调用
      getSearch(){
        // 分发一个action,并传递一个参数
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      // 点击删除分类名称categoryName的面包屑
      removeCategoryName(){
        // 首先需要先删除serachParams中的CategoryName的值
        this.searchParams.categoryName = undefined;
        // 再次删除CategoryID的值，分类名称删除，CategoryID也需要删除
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        // 请求参数中的数据发生了变化，则需要再次发起请求
        this.getSearch()
        // 最后需要修改路由地址，清除路由地址中的query参数，但是如果有params参数，需要保留
        // 如果路由中的params参数存在，则发起路由跳转，跳转到本身地址，同时携带params参数，如果没有则发起路由跳转时，不需要携带参数
        if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 点击删除用户输入的搜索信息的面包屑
      removeKeyword(){
        // 首先清除searchParams中的keyword的数据
        this.searchParams.keyword = undefined;
        // 通过全局事件总线，通知该组件的兄弟组件Header将用户输入的信息清除，通过this.$bus.$emit("事件名称")方法激活$bus上的方法
        // 前提条件是该事件必须已经通过$bus.$on("事件名称",callback回调函数)绑定到了全局事件总线$bus上
        this.$bus.$emit('clearKeyword')
        // 修改了searchParams中的keyword的值，则需要重新请求数据，获取最新的数据展示
        this.getSearch()
        // 同时修改路由参数，清除params参数，如果有query参数，则保留该参数，路由跳转到本身时携带该参数
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      // 通过自定义事件，获取其子组件中的trademark数据
      // 其数据结构 "ID:品牌名称"
      trademark(trademark){
        // 获取到数据之后，更新searchParams中trademark的值,要注意其值的数据结构
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        // searchParams中的数据发生改变，需要重新请求数据，获取最新数据
        this.getSearch()
      },
      // 点击删除品牌trademark的面包屑
      removeTrademark(){
        // 首先删除searchParams中的trademark的值
        this.searchParams.trademark = undefined;
        // 因为请求参数searchParams中的参数发生改变，则需要重新请求数据
        this.getSearch()
      },
      // 自定义属性，获取其子组件中需要的props中的数据
      getsProps(attr,attrValue){
        // 首先处理接收到的数据，数据结构："属性ID:属性值:属性名"
        let value = `${attr.attrId}:${attrValue}:${attr.attrName}`
        // 然后将处理过的数据放到searchParams中的props数组中
        // 但是还需要进行数组去重，重复的数据不要加入,indexOf的值等于-1，表示其中没有这个值
        if(this.searchParams.props.indexOf(value) === -1){
          // 没有这个值，则直接push进数组中
          this.searchParams.props.push(value)
        }
        // 最后searchParams中的props数据发生了改变，则需要重新发起请求,获取最新的数据
        this.getSearch()
      },
      // 点击删除分类属性props中的面包屑
      removeProps(index){
        // 根据数组的index，删除数组中指定位置的数据，使用splice(index,指定位数)方法
        this.searchParams.props.splice(index,1)
        // searchParams中的props中的数据发生了改变，则需要重新请求数据，获取最新的数据
        this.getSearch()
      },
      // 点击排序事件
      changeOrder(flag){
        // 获取当前searchParams中order的值
        let originOrder = this.searchParams.order
        // 将获取到的order的值按照':'进行拆分、
        // 拆分出列表ID值
        let originFlag = originOrder.split(':')[0]
        // 拆分出排序的方式，是降序还是升序
        let orginSort = originOrder.split(':')[1]
        // 定义一个值，用于接收新的order信息
        let newOrder = ''
        // 判断一下当前点击的列表ID值是否与原始的列表ID值一致，一致则表明当前点击的是综合项
        // originFlag的值是会变动的每次点击都会重新赋值
        if(flag === originFlag){
          // 如果一样，则处理升序，降序问题，默认值为降序desc
          // 其中还需要判断一下原始排序方式是否为desc，如果是则需要取反，显示asc,只有desc和asc两种方式相互交替
          newOrder = `${originFlag}:${orginSort === 'desc'? 'asc':'desc'}`
        }else{
          // 如果flag和originFlag不同，则表示当前点击的是价格项
          // 如果是价格项，则直接设定其排序方式为‘desc’，因为默认值就是desc降序
          newOrder = `${flag}:${'desc'}`
        }
        // 将新的newOrder赋值给searchParams中的order中
        // 通过if语句处理之后的新order值跟新给searchParams中
        this.searchParams.order = newOrder;
        // 因为searchParams中的值发生了改变，需要重新请求数据，获取最新的数据展示
        this.getSearch()
      },
      getPageNo(pageNo){
        // 将分页页码更新到searchParams中的pageNo上
        this.searchParams.pageNo = pageNo
        // searchParams中的数据发生了改变，需要重新获取数据
        this.getSearch()
      }
    },
    // 需要监测路由的变化，然后通过路由的变化，再次提交请求，获取数据展示
    // 这里可以使用watch监视$route中数据的变化，$route也是data中的动态数据结构，同样可以适用于watch监视
    // 而且现因为其数据结构比较简单，不需要开启深度监视
    watch:{
      $route(){
        // 一旦路由中的数据发生改变，立刻执行当前函数，重新更新请求参数，然后再次发起请求
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 请求参数更新完毕后，再次发起请求
        this.getSearch()
        // 同时需要清除请求参数中的三个菜单的categoryID,避免这些CategoryID出现冲突，这三个CategoryID每次请求时，只能存在其中一个，另外两的值为空或undefined
        // 将三个CategoryID的值设置为undefined，请求发送时，只要值是undefined的参数，则不携带
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>