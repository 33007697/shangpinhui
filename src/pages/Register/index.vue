<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1[3-9]{1}\d{9}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
        &nbsp;
        <!-- 验证码，点击获取验证码 -->
        <button style="width: 100px; height: 38px" @click="getCode">
          验证码
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="pwd"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input
          name="agree"
          type="checkbox"
          :checked="agree"
          v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="getUserRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  // 收集表单数据
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      pwd: "",
      agree: true,
    };
  },
  methods: {
    // 点击获取验证码，然后将验证码放到验证码输入框中
    async getCode() {
      // 捕获请求的成功与失败信息
      try {
        // 收集手机号信息
        const { phone } = this;
        // 点击派发一个action，获取用户的验证码
        // 正则表达式匹配手机号
        // eslint-disable-next-line no-unused-vars
        const reg = /^1[3-9]{1}\d{9}$/;
        // 做一个简单的判断，手机号必须存在并且有值，才能派发action获取验证码
        phone.trim() && (await this.$store.dispatch("getUserCode", this.phone));
        // 然后将验证码写入code中
        this.code = this.$store.state.user.code;
      } catch (error) {
        // 请求失败提示信息
        alert(error.message);
      }
    },
    // 点击注册按钮，注册用户
    async getUserRegister() {
      // 获取表单验证的全部验证结果，全部验证通过则返回true，否则有一个不通过则返回false
      const success = await this.$validator.validateAll();
      // 判断一下表单验证是否通过
      if (success) {
        // 表单验证通过
        // 捕获请求注册的结果信息
        try {
          // 从this中解构用户输入的数据
          const { phone, code, password } = this;
          // 简单的判断一下，这四个属性必须存在数值，并且password和pwd的值必须一样，然后再派发action
            await this.$store.dispatch("getUserRegister", {
              phone,
              code,
              password,
            });
          // 注册成功之后，需要跳转到登录页面
          this.$router.push("/login");
        } catch (error) {
          // 请求失败，提示失败信息
          alert(error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>