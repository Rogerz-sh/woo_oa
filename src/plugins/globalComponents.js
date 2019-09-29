import Validation from './validation'

const GlobalComponents = {
  install(Vue) {
    Vue.use(Validation)
  }
};

export default GlobalComponents;