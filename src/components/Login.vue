<template>
    <div>
        <mt-header title="登陆"/>
        <mt-field type="text" label="用户名" placeholder="请输入用户名" v-model="username" :attr="{maxlength:20}"/>
        <mt-field class="mb15" type="password" label="密码" placeholder="请输入密码" v-model="password"
                  :attr="{maxlength:20}"/>

        <mt-field class="mb15" label="验证码" placeholder="请输入验证码" v-model="captcha" disableClear :attr="{maxlength:4}">
            <img :src="captcha_data.img" @click="get_captcha_data()">
        </mt-field>

        <div class="mint-cell-wrapper mb15">
            <mt-button size="large" type="primary" @click="login()">登录</mt-button>
        </div>

        <div class="mint-cell-wrapper">
            <div class="mint-cell-title"></div>
            <div class="mint-cell-value">
                <router-link to="/loginMobile">
                    短信验证码登陆
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Sha256 from 'js-sha256'

    export default {
        data() {
            return {
                username: '13398190620',
                password: '111111',
                captcha: '',
                captcha_data: {}
            }
        },
        created() {
            this.get_captcha_data();

        },
        methods: {
            get_captcha_data() {
                this.$http.get(this.$store.state.api_url + 'api/captcha')
                    .then(response => {
                        this.$store.state.response.ok(response, (data) => {
                            this.captcha_data = data;
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });
            },
            login() {
                let ajaxData = {
                    "type": "password",
                    "username": this.username,
                    "password": Sha256(this.password),
                    "temp_password": this.password,
                    "captcha": this.captcha,
                    "captcha_key": this.captcha_data.key
                };

                this.$http.post(this.$store.state.api_url + 'api/login', ajaxData)
                    .then(response => {
                        this.$store.state.response.ok(response, (data) => {
                            this.$store.dispatch('user_info_update', JSON.stringify(data));
                            this.$router.push('/user');
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });


            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>