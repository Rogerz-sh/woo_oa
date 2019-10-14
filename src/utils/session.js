export default {
    install(Vue) {
        Vue.prototype.auth = function () {
            if (!sessionStorage.getItem('token')) {
                if (this.$route.path != '/') this.$router.push('/');
            }
        }
    }
};