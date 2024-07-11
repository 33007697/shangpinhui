<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{ orderId }}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{ payInfo.totalFee }}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- 使用elementUI，点击立即支付时，显示弹窗，显示微信支付码 -->
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
           <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入生成二维码的库qrcode
import QRcode from 'qrcode'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Pay',
    // 订单支付详情数据保存
    data(){
      return {
        // 支付详情信息
        payInfo:{},
        // 支付状态的定时器标识
        timer:null,
        // 支付状态码
        code:''
      }
    },
    computed:{
      // 计算出orderId，订单号
      orderId(){
        return this.$route.query.orderId
      }
    },
    // 生命周期函数
    mounted(){
      this.getPayInfo()
    },
    methods:{
      // 获取支付详情信息
      async getPayInfo(){
        // 通过订单号，获取订单支付详情信息
        let result = await this.$API.reqPayInfo(this.orderId)
        // 判断数据是否请求成功
        if(result.code === 200){
          // 数据请求成功，将支付详情数据存储到data中
          this.payInfo = result.data
        }else{
          // 请求失败，提示失败信息
          alert(result.message)
        }
      },
      // 点击立即支付，显示弹窗，使用ElementUI
      async open(){
        // 使用qrcode.toDataURL生成二维码,该函数返回的是一个promise对象
        // 使用await和async后，获取到的就是二维码，使用图片将其展示出来即可
        let ewm = await QRcode.toDataURL(this.payInfo.codeUrl)
        // 点击立即支付，显示弹窗,以下代码就是ElementUI组件，该组件放到到Vue的原型对象上了
        // 展示二维码图片，在$alert的第一个参数上
        this.$alert(`<img src=${ewm} />`, '请使用微信支付', {
          // 是否将message属性作为代码片段
          dangerouslyUseHTMLString: true,
          // 是否显示右上角的叉叉
          showClose:false,
          // 是否居中显示
          center:true,
          // 是否显示取消按钮
          showCancelButton:true,
          // 设置取消按钮的文字显示
          cancelButtonText:'支付出现问题',
          // 设置确认按钮的文字显示
          confirmButtonText:'已支付完成',
          // 弹窗关闭之前，需要进行验证
          beforeClose:(type,instence,done)=>{
            // type:用于判断当前点击的是哪个按钮，是确定按钮confirm，还是取消按钮cancel，
            // instence：当前对象的实例，vm
            // done：关闭弹窗函数，执行即可以关闭弹窗
            // 首先判断点击的是哪个按钮
            if(type == 'cancel'){
              // 当前点击的是取消按钮，点击取消提示用户找管理员支持之前，需要关闭定时器，并更新定时器标识的值
              clearInterval(this.timer)
              this.timer = null
              // 提示用户
              alert('请找管理员咨询，提供支持')
              // 最后关闭弹窗
              done()
            }else{
              // 当前点击的是确认按钮，首先需要判断一下是否支付成功，即code是否为200
              // 当前开启了一个后门，让其不用支付也可以通过
              // if(this.code == 200){
                // 支持成功，需要清除定时器，更新定时器标识
                clearInterval(this.timer)
                this.timer = null
                // 关闭弹窗，跳转页面、
                this.$router.push('/paysuccess')
                done()
              // }
            }
          }
        });
        // 还需要持续执行获取支付返回的信息，获取支付状态信息，需要使用定时器
        // 判断一下是否有定时器存在
        if(!this.timer){
          // 如果没有定时器，则开启定时器
          this.timer = setInterval(async ()=>{
            // 发送请求，获取支付状态，需要获取其返回值
            let result = await this.$API.reqPayStatus(this.orderId)
            // 判断其是否支付成功，支付成功后code为200
            if(result.code == 200){
              // 支付成功之后，首先停止定时器，然后更新定时器标识码
              clearInterval(this.timer)
              this.timer = null
              // 将支付成功之后的code，保存到data中
              this.code = result.code
              // 关闭弹窗，关闭遮罩层
              this.$msgbox.close()
              // 跳转路由地址
              this.$router.push('/paysuccess')
            }
          },1000)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>