import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

import './common/style.css' // 这里需要引入基本的样式
import './common/iconfont/iconfont.css'

Vue.use(MintUI);

Vue.use(VueResource);


Vue.http.interceptors.push((request, next) => {
    let user_info = localStorage.getItem('user_info');
    if (user_info) {
        request.headers.append('token', JSON.parse(user_info).login_log.token);
    }
    // request.headers.append('X-Requested-With', 'XMLHttpRequest');
    next((response) => {
        return response;
    });
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
