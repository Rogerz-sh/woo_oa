import axios from 'axios'
import config from '../config'

export default {
    install(Vue) {
        const ajax = axios.create({
            baseURL: config.server_host
        });
        ajax.interceptors.response.use((resp) => {
            if (resp.status === 200) {
                return resp.data       //到时候请求的时候，直接拿到data(不含status那些)
            } else {
                return resp;
            }
        });
        Vue.prototype.$http = ajax;
    }
}