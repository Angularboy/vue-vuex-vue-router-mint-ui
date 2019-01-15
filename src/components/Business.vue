<template>
    <div>
        <div class="header clearFix mb15">
            <div class="user_pic">
                <img :src="user_info.user.head_pic[0].src" width="80">
            </div>
            <div class="user_info">
                <p><b>{{user_info.user.username}}</b></p>
                <p>{{user_info.user.mobile}}</p>
            </div>
        </div>

        <div style="padding-bottom: 53px;">

            <div class="mb5">
                <mt-cell class="title" title="优惠券管理"/>
                <mt-cell is-link to="/businessCouponList">
                    <span>增加券种类</span>
                    <i slot="icon" class="iconfont icon-tianjiawengao"></i>
                </mt-cell>
                <mt-cell is-link to="/businessCouponAdd">
                    <span>给用户加券</span>
                    <i slot="icon" class="iconfont icon-zengjia"></i>
                </mt-cell>
                <mt-cell is-link to="/businessCouponSub">
                    <span>给用户扣券</span>
                    <i slot="icon" class="iconfont icon-jianshao"></i>
                </mt-cell>
            </div>

            <div class="mb5">
                <mt-cell class="title" title="会员卡管理"/>
                <mt-cell is-link>
                    <span>增加券种类</span>
                    <i slot="icon" class="iconfont icon-tianjiawengao"></i>
                </mt-cell>
                <mt-cell is-link>
                    <span>给用户加券</span>
                    <i slot="icon" class="iconfont icon-zengjia"></i>
                </mt-cell>
                <mt-cell is-link>
                    <span>给用户扣券</span>
                    <i slot="icon" class="iconfont icon-jianshao"></i>
                </mt-cell>
            </div>

            <div class="mb5">
                <mt-cell class="title" title="抵扣券管理"/>
                <mt-cell is-link>
                    <span>增加券种类</span>
                    <i slot="icon" class="iconfont icon-tianjiawengao"></i>
                </mt-cell>
                <mt-cell is-link>
                    <span>给用户加券</span>
                    <i slot="icon" class="iconfont icon-zengjia"></i>
                </mt-cell>
                <mt-cell is-link>
                    <span>给用户扣券</span>
                    <i slot="icon" class="iconfont icon-jianshao"></i>
                </mt-cell>
            </div>

        </div>

        <mt-tabbar fixed v-model="selected1">
            <mt-tab-item id="1">
                <router-link to="/user">
                    <div class="iconfontbox"><i class="iconfont icon-geren11"></i></div>
                    <div>个人</div>
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="2">
                <router-link to="/business">
                    <div class="iconfontbox"><i class="iconfont icon-shangjialiebiaoicon"></i></div>
                    <div>商家</div>
                </router-link>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected1: '2'
            }
        },
        computed: {
            user_info() {
                return this.$store.getters.user_info_json
            }
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        padding: 10px;
        background: #ffffff;
    }

    .user_pic {
        float: left;
        overflow: hidden;
        border-radius: 1000px;
        margin-right: 10px;
    }

    .user_info {
        padding-left: 90px;
        color: #666666;
        font-size: 12px;
    }

    .iconfontbox {
        height: 25px;
    }

    .title {
        font-weight: bold;
        border-bottom: 1px solid #eeeeee;
    }

    .mint-cell {
        border-bottom: 1px dashed #eeeeee;
    }

    .mint-cell:last-child {
        border: 0 none;
    }
</style>