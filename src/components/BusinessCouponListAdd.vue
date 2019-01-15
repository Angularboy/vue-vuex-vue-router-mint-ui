<template>
    <div>
        <mt-header title="添加优惠券" fixed>
            <router-link to="/businessCouponList" slot="left">
                <mt-button icon="back"/>
            </router-link>
        </mt-header>

        <div style="padding-top: 40px;">
            <mt-field label="优惠券名称" placeholder="请输入优惠券名称" v-model="name"/>
            <mt-checklist
                    title="复选框列表"
                    v-model="value"
                    :options="options">
            </mt-checklist>
            <div style="text-align: center;margin-top: 15px;">
                <mt-button type="primary" @click="post()">确认提交</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: null,
                value: [],
                options: []
            }
        },
        created() {
            this.get_data();
        },
        methods: {
            get_data() {
                this.$http.get(this.$store.state.api_url + 'api/bus/bus_shop')
                    .then(response => {
                        this.$store.state.response.ok(response, (data) => {
                            data.map(item => {
                                this.options.push({
                                    label: item.name,
                                    value: item.id
                                })
                            });
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });
            },
            post() {
                let ajaxData = {
                    name: this.name,
                    shop_ids: this.value
                };
                if(!ajaxData.name){
                    this.$toast('请输入优惠券名称');
                    return false;
                }
                if(ajaxData.shop_ids.length<1){
                    this.$toast('请至少选择一个店铺');
                    return false;
                }
                this.$http.post(this.$store.state.api_url + 'api/bus/bus_coupon', ajaxData)
                    .then(response => {
                        this.$store.state.response.ok(response, () => {
                            this.$toast('添加成功');
                            setTimeout(() => {
                                this.$router.push('businessCouponList')
                            }, 2000)
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