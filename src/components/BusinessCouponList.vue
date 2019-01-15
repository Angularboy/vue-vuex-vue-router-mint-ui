<template>
    <div>
        <mt-header title="优惠券种类" fixed>
            <router-link to="/business" slot="left">
                <mt-button icon="back"/>
            </router-link>
            <router-link to="/businessCouponListAdd" slot="right">
                <mt-button style="font-size: 12px;">
                    添加优惠券
                </mt-button>
            </router-link>
        </mt-header>

        <div style="padding-top: 40px;">
            <mt-cell-swipe v-for="d in data" :key="d.id" :title="d.name" :right="d.right_arr"/>

            <div v-if="data.length<1" style="text-align: center;font-size: 12px;padding: 10px;color: #999999;">暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: []
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
                                item.right_arr = [
                                    {
                                        content: '修改',
                                        style: {
                                            background: '#ef4f4f',
                                            color: '#fff',
                                            borderLeft: '2px solid #ffffff'
                                        },
                                        handler: () => {
                                            this.$router.push({
                                                path: 'businessCouponListEdit', query: {
                                                    id: item.id
                                                }
                                            })
                                        }
                                    }
                                ];
                                if (item.status === 1) {
                                    item.right_arr.push({
                                        content: '关闭',
                                        style: {
                                            background: '#ef4f4f',
                                            color: '#fff',
                                            borderLeft: '2px solid #ffffff'
                                        },
                                        handler: () => {
                                            this.put(item, 2, '关闭')
                                        }
                                    })
                                }
                                if (item.status === 2) {
                                    item.right_arr.push({
                                        content: '开启',
                                        style: {
                                            background: 'green',
                                            color: '#fff',
                                            borderLeft: '2px solid #ffffff'
                                        },
                                        handler: () => {
                                            this.put(item, 1, '开启')
                                        }
                                    })
                                }
                            });
                            this.data = data;
                        });
                    }, () => {
                        this.$store.state.response.err();
                    });
            },
            put(item, status, title) {
                this.$messagebox.confirm('确定' + title + '此优惠券吗?', {title: ''}).then(() => {
                    this.$http.put(this.$store.state.api_url + 'api/bus/bus_coupon/' + item.id, {status: status})
                        .then(response => {
                            this.$store.state.response.ok(response, () => {
                                this.$toast(title + '成功');
                                this.get_data();
                            });
                        }, () => {
                            this.$store.state.response.err();
                        });
                }, () => {

                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mint-cell {
        border-bottom: 1px solid #eeeeee;
    }

    .mint-cell:last-child {
        border-bottom: 0 none;
    }
</style>