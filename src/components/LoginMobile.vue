<template>
    <div>
        <mt-header title="登陆"/>
        <mt-field type="number" label="手机号" placeholder="请输入手机号" v-model="mobile" :attr="{maxlength:20}"/>

        <mt-field class="mb15" label="验证码" placeholder="请输入验证码" v-model="code" disableClear :attr="{maxlength:6}">
            <mt-button size="large" type="danger" @click="get_sms()" style="font-size: 12px;min-width: 100px;"
                       :disabled="is_disabled">{{code_text}}
            </mt-button>
        </mt-field>

        <div class="mint-cell-wrapper mb15">
            <mt-button size="large" type="primary" @click="login()">登录</mt-button>
        </div>

        <div class="mint-cell-wrapper">
            <div class="mint-cell-title"></div>
            <div class="mint-cell-value">
                <router-link to="/login">
                    密码登陆
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mobile: '',
                code: '',
                code_text: '获取手机验证码',
                is_disabled: false,
                code_second: 60
            }
        },
        methods: {
            get_sms() {
                let ajaxData = {
                    sms_type: 'user_login',
                    mobile: this.mobile
                };
                let el = this.$store.state.el;
                if (!el['101'].q.test(ajaxData.mobile)) {
                    this.$toast(el['101'].a);
                    return false;
                }
                if (!this.is_disabled) {

                    this.$http.post(this.$store.state.api_url + 'api/sms', ajaxData)
                        .then(response => {
                            this.$store.state.response.ok(response, () => {
                                const _this = this;
                                _this.is_disabled = true;
                                _this.code_text = _this.code_second + '秒后重新获取';
                                const s = setInterval(function () {
                                    _this.code_second--;
                                    _this.code_text = _this.code_second + '秒后重新获取';
                                    if (_this.code_second === 0) {
                                        clearInterval(s);
                                        _this.is_disabled = false;
                                        _this.code_text = '获取手机验证码';
                                    }
                                }, 1000);
                            });
                        }, () => {
                            this.$store.state.response.err();
                        });

                }
            },
            login() {
                let ajaxData = {
                    "type": "mobile",
                    "mobile": this.mobile,
                    "code": this.code
                };
                let el = this.$store.state.el;
                if (!el['101'].q.test(ajaxData.mobile)) {
                    this.$toast(el['101'].a);
                    return false;
                }

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