<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 使用事件代理，绑定鼠标移出事件,再绑定一个鼠标移入事件，鼠标移入时显示该内容 -->
      <div @mouseleave="disbackground" @mouseenter="showSortList">
        <h2 class="all">全部商品分类</h2>
        <!-- 使用transition标签，设置过度动画，但是需要过度动画的标签必须被transition标签包裹，可以指定name属性 -->
        <transition name="sort">
          <!-- 添加v-show指令，动态是否展示该内容 -->
          <div class="sort" v-show="show">
            <!-- 点击当前元素的子元素，触发点击事件，实现路由跳转，使用的是事件委派 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 添加鼠标移入事件和动态class -->
              <div
                class="item"
                v-for="(c1, index) in home.categoryList"
                :key="c1.categoryId"
                @mouseenter="showbackground(index)"
                :class="{ cur: category === index }"
              >
                <h3>
                  <!-- 在每个a标签中添加一个categoryName的自定义属性 -->
                  <!-- 在每个a标签中添加一个自定义属性categoryId，用于判断是哪一级的菜单 -->
                  <a
                    :data-categoryname="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: category === index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryname="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入mapState
import { mapState } from "vuex";
// 引入lodash函数库
// 节流throttle函数
import throttle from "lodash/throttle";
// 防抖debounce函数
// import debounce from 'lodash/debounce'
export default {
  name: "TypeNav",
  // 生成一个状态
  data() {
    return {
      // 鼠标移动选中的id
      category: -1,
      // 是否展示列表
      show: true,
    };
  },
  methods: {
    // 函数防抖和节流
    // 防抖：前面所有的调用都被取消，在规定的时间之后只执行一次调用
    // 节流：把频繁的调用变为少量调用，在间隔一定的时间之后执行一次，没间隔一定的时间后执行一次
    // 使用lodash函数中debounce和throttle，其有三个参数，第一个是要执行的回调函数，第二个为指定时间，第三个为配置对象
    // 注意debounce和throttle函数中回调函数不能使用箭头函数，否则会导致this指向错误问题

    // 显示背景颜色,使用函数节流，注意函数节流中的回调函数不能使用箭头函数
    showbackground: throttle(function (index) {
      // 跟新data中的category数据的值
      this.category = index;
    }, 60),
    // 鼠标移出时隐藏背景颜色，不在home页面下，鼠标移出隐藏该内容
    disbackground() {
      this.category = -1;
      // 不在home页面时，鼠标移出隐藏该内容
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 点击跳转路由，并获取参数
    goSearch(event) {
      // 获取到触发事件的元素
      let node = event.target;
      // 从当前触发事件的节点中的dataset中结构出所有的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      // 判断一下categoryname是否有值，有则表示当前触发事件的标签一定是a标签
      if (categoryname) {
        // 定义一个query参数，用于路由传递query参数
        let query = { categoryName: categoryname };
        //判断一下当前a标签中的自定义属性categoryID
        // 判断一下当前的a标签是哪一级的菜单
        if (category1id) {
          //一级菜单,将一级菜单id放入query中
          query.category1Id = category1id;
        } else if (category2id) {
          //二级菜单,将二级菜单id放入到query中
          query.category2Id = category2id;
        } else if (category3id) {
          //三级菜单,将三级菜单id放入到query中
          query.category3Id = category3id;
        }
        //判断一下当前路由有没有params参数，有则添加上,即合并params参数和query参数
        if (this.$route.params) {
          // 将路由参数整合一下，触发路由跳转，并传递参数，合并参数
          let location = {
            name: "search",
            query: query,
            params: this.$route.params,
          };
          // 发起路由跳转
          this.$router.push(location);
        }
      }
    },
    // 鼠标移入时显示该内容
    showSortList() {
      // 只有不在home页面的情况下鼠标移入显示该内容
      if (this.$route.path !== "/home") {
        // 显示内容
        this.show = true;
      }
    },
  },
  // 组件加载完毕之后发送请求，获取列表
  mounted() {
    // 获取三级菜单的数据，为一次性数据，即只需要请求一次即可，可以放到App组件中的mounted中
    // 判断一下当前的地址是否为home。不是则隐藏三级列表内容
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  // 在组件中使用vuex中的数据，使用计算属性
  computed: {
    ...mapState(["home"]),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    // sort的过度动画
    // 过度动画开始样式
    .sort-enter {
      height: 0px;
    }
    // 过度动画结束样式
    .sort-enter-to {
      height: 461px;
    }
    // 过度动画的速率和时间
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>