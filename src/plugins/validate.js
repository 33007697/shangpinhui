// 表单验证功能，使用vee-validate插件，该插件了解会用即可，学习困难，相当的复杂
// 引入vue
import Vue from "vue";
// 引入vee-validate插件
import VeeValidate from "vee-validate";
// 引入VeeValidate中的中文提示信息，默认是英文
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 注册使用vee-validate
Vue.use(VeeValidate)

// 表单验证配置信息，配置完毕之后，使用插件生成的自定义命令v-validate指定具体的校验规则
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    // 规则匹配字段,需要验证的字段
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: '协议'
    },
});

//自定义校验规则，用于校验选择框
VeeValidate.Validator.extend("agree", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});