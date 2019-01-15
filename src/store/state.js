import Vue from 'vue'
import router from '../router'

let user_info = localStorage.getItem('user_info');
const state = {
    api_url: 'http://card.tech/',
    //api_url: 'http://www.card.loc/',
    user_info: user_info || '{}',
    user_tabs_selected: '1',
    response: {
        ok: (data, success) => {
            if (data.body.code === 0) {
                success(data.body.data);
            } else if (data.body.code === 1111) {
                router.push('/login');
            } else {
                Vue.$toast(data.body.msg);
            }
        },
        err: () => {
            Vue.$toast('服务器繁忙，请稍候再试');
        }
    },
    el: {
        '101': {
            q: /^0*(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[2|3|4|5|6|7|8|9]|18[0-9]|19[0-9])\d{8}$/,
            a: '手机号码格式错误'
        }
    }
};

export default state
