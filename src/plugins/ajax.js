import axios from 'axios'
import config from '../config'

export default {
    install(Vue) {
        const ajax = axios.create({
            baseURL: config.server_host
        });
        ajax.interceptors.response.use((resp) => {
            if (resp.status === 200) {
                if (resp.data.code == 401) {
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('token');
                    alert('请求未授权或登录已超时');
                    location.href = '/';
                }
                return resp.data;
            } else {
                return resp;
            }
        });
        ajax.interceptors.request.use((config) => {
            config.headers.common['oa-auth-uid'] = sessionStorage.getItem('uid') || '';
            config.headers.common['oa-auth-token'] = sessionStorage.getItem('token') || '';
            // config.withCredentials = true;
            return config;
        });
        Vue.prototype.$http = ajax;
    }
}