<template>
    <div>
        <mt-header title="给用户加券" fixed>
            <router-link to="/business" slot="left">
                <mt-button icon="back"/>
            </router-link>
        </mt-header>

        <div style="padding-top: 40px;position: relative;z-index: 1;">
            <mt-picker :slots="slots" valueKey="name" @change="onValuesChange" :visibleItemCount="3" :itemHeight="30"
                       style="padding: 15px 0;"/>
            <mt-field type="number" label="手机号" placeholder="请输入手机号" v-model="mobile" :attr="{maxlength:20}"/>
            <mt-field type="number" label="每满" placeholder="0" v-model="per_full_money" :attr="{maxlength:20}"/>
            <mt-field type="number" label="优惠" placeholder="0" v-model="coupon_money" :attr="{maxlength:20}"/>
            <div class="mint-cell-wrapper" style="padding: 15px 10px;">
                <div class="mint-cell-title"><span class="mint-cell-text">{{validity_type?'长期有效':'有效期'}}</span></div>
                <div class="mint-cell-value">
                    <mt-switch v-model="validity_type" name="开关"/>
                </div>
            </div>

            <mt-field type="text" label="开始时间" :placeholder="start_time|time_limit" readonly v-show="!validity_type"
                      :attr="{maxlength:20}">
                <i @click="openPicker('start_time_picker')" class="iconfont icon-xuanze" style="color: #26a2ff;"></i>
            </mt-field>
            <template>
                <mt-datetime-picker
                        ref="start_time_picker"
                        v-model="start_time">
                </mt-datetime-picker>
            </template>

            <mt-field type="text" label="结束时间" :placeholder="end_time|time_limit" readonly v-show="!validity_type"
                      :attr="{maxlength:20}">
                <i @click="openPicker('end_time_picker')" class="iconfont icon-xuanze" style="color: #26a2ff;"></i>
            </mt-field>
            <template>
                <mt-datetime-picker
                        ref="end_time_picker"
                        v-model="end_time">
                </mt-datetime-picker>
            </template>

            <mt-field type="number" label="加券张数" placeholder="0" v-model="user_coupon_num" :attr="{maxlength:20}"
                      style="margin-top: 15px;"/>
            <mt-field type="text" label="支付密码" placeholder="请输入支付密码" v-model="pay_password" :attr="{maxlength:20}"
                      class="mb15"/>

            <div class="mint-cell-wrapper">
                <mt-button size="large" type="primary" @click="post()">提交</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Sha256 from 'js-sha256'

    export default {
        data() {
            return {
                mobile: null,
                per_full_money: null,
                coupon_money: null,
                validity_type: true,
                slots: [
                    {
                        values: [],
                    }
                ],
                values: null,
                start_time: null,
                end_time: null,
                user_coupon_num: null,
                pay_password: null
            }
        },
        created() {
            this.get_data();
        },
        methods: {
            get_data() {
                this.$http.get(this.$store.state.api_url + 'api/bus/bus_coupon')
                    .then(response => {
                        this.$store.state.response.ok(response, (data) => {
                            data.map(item => {
                                this.slots[0].values.push({
                                    name: item.name,
                                    id: item.id
                                });
                            });
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });
            },
            onValuesChange(picker, values) {
                this.values = values;
            },
            openPicker(picker) {
                this.$refs[picker].open();
            },
            post() {
                const ajaxData = {
                    mobile: this.mobile,
                    per_full_money: this.per_full_money,
                    coupon_money: this.coupon_money,
                    validity_type: this.validity_type ? 1 : 2,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    bus_coupon_id: this.values[0].id,
                    temp_pay_password: this.pay_password,
                    user_coupon_num: this.user_coupon_num

                };



                if (ajaxData.temp_pay_password) {
                    ajaxData.pay_password = Sha256(this.pay_password)
                }

                if (ajaxData.validity_type === 1) {
                    delete ajaxData.start_time;
                    delete ajaxData.end_time;
                }


                // console.log(ajaxData)

                // return false;
                this.$http.post(this.$store.state.api_url + 'api/bus/user_coupon', ajaxData)
                    .then(response => {
                        this.$store.state.response.ok(response, (data) => {
                            console.log(data);
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });
            }
        },
        filters: {
            time_limit(UTCDateString) {
                if (!UTCDateString) {
                    return '请选择时间';
                }

                function formatFunc(str) {
                    return str > 9 ? str : '0' + str
                }

                const date2 = new Date(UTCDateString);
                const year = date2.getFullYear();
                const mon = formatFunc(date2.getMonth() + 1);
                const day = formatFunc(date2.getDate());
                const hour = formatFunc(date2.getHours());
                const min = formatFunc(date2.getMinutes());
                return year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':00';
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>