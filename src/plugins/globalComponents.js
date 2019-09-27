import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

extend('username', {
  validate: value => {
    if (!!value == false) {
      return '用户名不能为空';
    }
    return true;
  }
})

const GlobalComponents = {
  install(Vue) {
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);
  }
};

export default GlobalComponents;