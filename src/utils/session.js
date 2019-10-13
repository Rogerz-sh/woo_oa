export default {
    install(Vue) {
        Vue.prototype.auth = function () {
            if (!sessionStorage.getItem('token')) {
                this.$router.push('/');
            }
        }
    }
};