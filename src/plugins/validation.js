import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

extend('username', {
  validate: value => {
    if (!value) {
      return '用户名不能为空';
    }
    return true;
  }
})

extend('password', {
  validate: value => {
    if (!value) {
      return '密码不能为空'
    }
    if (!/^[a-zA-Z0-9_]{6,18}$/.test(value)) {
      return '密码必须是6-18位字母、数字或下划线的组合'
    }
    return true;
  }
})

export default {
  install(Vue) {
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);
  }
};