<template>
    <div style="overflow:hidden;">
        <div class="header clearFix mb15">
            <div class="user_pic">
                <img :src="user_info.user.head_pic[0].src" width="80">
            </div>
            <div class="user_info">
                <p><b>{{user_info.user.username}}</b></p>
                <p>{{user_info.user.mobile}}</p>
                <p>优惠券（<span class="red">{{user_coupon_num}}</span>）</p>
                <p>会员卡（<span class="red">{{user_card_num}}</span>）</p>
                <p>抵扣券（<span class="red">{{user_deduction_num}}</span>）</p>
            </div>
        </div>

        <div :style="user_info.type===2?'padding-bottom: 53px':''">
            <div :class="{'fixed-top':tabsBarFixed}">
                <mt-navbar class="mb15" v-model="selected">
                    <mt-tab-item id="1">
                        <div @click="get_coupon_data('1',1)">优惠券</div>
                    </mt-tab-item>
                    <mt-tab-item id="2">
                        <div @click="get_coupon_data('2',1)">会员卡</div>
                    </mt-tab-item>
                    <mt-tab-item id="3">
                        <div @click="get_coupon_data('3',1)">抵扣券</div>
                    </mt-tab-item>
                </mt-navbar>
                <!-- <div v-show="selected=='1'">
                    <mt-search v-model="coupon_search" cancel-text="取消" placeholder="搜索"></mt-search>
                </div> -->
            </div>

            <div v-show="selected=='1'">
                <div class="card " :class="{'disable':d.status===2}" v-for="d in coupon_data" :key="d" style="">
                    <div class="item item-divider ">
                        <span>{{d.coupon_name}}</span>
                        <span class="item-note" v-show="d.status==1">未使用</span>
                        <span class="item-note" v-show="d.status==2">已使用</span>
                    </div>
                    <div class="item ">
                        <p>
                            <span>优惠方式：</span>
                            <span class="item-note" style="font-size:1.4rem;">
                                每满<span style="font-size:1.4rem;color:#f00;">￥{{d.per_full_money}}</span>元，优惠<span
                                    style="font-size:1.4rem;color:#f00;">￥{{d.coupon_money}}</span>元
                            </span>
                        </p>
                        <p v-show="d.validity_type===2&&parseInt(new Date(d.end_time).getTime())-parseInt(new Date().getTime())>0">
                            <span>有效时间：</span>
                            <span class="item-note">{{d.start_time}} 至 {{d.end_time}}</span>
                        </p>
                        <p v-show="d.validity_type===1">
                            <span>有效时间：</span>
                            <span class="item-note">长期有效</span>
                        </p>
                    </div>
                    <div class="item " v-show="d.status==1">
                        <p @click="showShopMore(d)">
                            <span>使用店铺：</span>
                        <ul class="item-note" v-show="d.status==1">
                            <li v-for="(dd,index) in d.bus_shop_coupon" :key="dd" v-show="index<3||d.show_shop_more">
                                {{dd.shop_name}}
                            </li>
                        </ul>
                        </p>
                        <p v-show="d.bus_shop_coupon.length>3&&d.status==1" @click="showShopMore(d)">
                            <span class="item-note" v-show="!d.show_shop_more"><i class="iconfont icon-down"></i></span>
                            <span class="item-note" v-show="d.show_shop_more"><i class="iconfont icon-up"></i></span>
                        </p>
                    </div>
                </div>

                <div class="no-data" v-show="!coupon_data||coupon_data.length==0">暂无数据</div>
            </div>

            <div v-show="selected=='2'">
                <div class="card" :class="{'disable':d.status===2}" v-for="d in card_data" :key="d">
                    <router-link :to="{name:'userCard',params:{id:d.id}}">
                        <div class="item item-divider ">
                            <span>{{d.card_name}}</span>
                            <span class="item-note" v-show="d.status===1">
                                查看详情
                                <i class="iconfont icon-right"></i>
                            </span>
                        </div>
                    </router-link>
                    <div class="item item-content ">
                        <span>账户剩余：</span>
                        <span class="item-note" style="font-size:1.4rem; color:#f00;">￥{{d.money}}</span>
                    </div>
                    <div class="item ">
                        <p @click="showShopMore(d)">
                            <span>使用店铺：</span>
                        <ul class="item-note" v-show="d.status==1">
                            <li v-for="(dd,index) in d.bus_shop_card_account" :key="dd"
                                v-show="index<3||d.show_shop_more">{{dd.shop_name}}
                            </li>
                        </ul>
                        </p>
                        <p v-show="d.bus_shop_card_account.length>3&&d.status==1" @click="showShopMore(d)">
                            <span class="item-note" v-show="!d.show_shop_more"><i class="iconfont icon-down"></i></span>
                            <span class="item-note" v-show="d.show_shop_more"><i class="iconfont icon-up"></i></span>
                        </p>
                    </div>
                </div>
                <div class="no-data" v-show="!card_data||card_data.length==0">暂无数据</div>
            </div>

            <div v-show="selected=='3'">
                <div class="card" :class="{'disable':d.status===2}" v-for="d in deduction_data" :key="d">
                    <router-link :to="{name:'userDeduction',params:{id:d.id}}">
                        <div class="item item-divider ">
                            <span>{{d.deduction_name}}</span>
                            <span class="item-note" v-show="d.status===1">
                                查看详情
                                <i class="iconfont icon-right"></i>
                            </span>
                        </div>
                    </router-link>
                    <div class="item item-content ">
                        <span>账户剩余：</span>
                        <span class="item-note" style="font-size:1.4rem; color:#f00;">￥{{d.money}}</span>
                    </div>
                    <div class="item ">
                        <p @click="showShopMore(d)">
                            <span>使用店铺：</span>
                        <ul class="item-note" v-show="d.status==1">
                            <li v-for="(dd,index) in d.bus_shop_deduction_account" :key="dd"
                                v-show="index<3||d.show_shop_more">{{dd.shop_name}}
                            </li>
                        </ul>
                        </p>
                        <p v-show="d.bus_shop_deduction_account.length>3&&d.status==1" @click="showShopMore(d)">
                            <span class="item-note" v-show="!d.show_shop_more"><i class="iconfont icon-down"></i></span>
                            <span class="item-note" v-show="d.show_shop_more"><i class="iconfont icon-up"></i></span>
                        </p>
                    </div>
                </div>
                <div class="no-data" v-show="!deduction_data||deduction_data.length==0">暂无数据</div>
            </div>

        </div>

        <mt-tabbar fixed v-model="selected1" v-if="user_info.login_log.type===2">
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
                selected: '1',
                selected1: '1',
                user_coupon_num: '0',
                user_card_num: '0',
                user_deduction_num: '0',
                coupon_search: '',
                coupon_data: [],
                coupon_data_loading: false,
                coupon_data_loadmore: true,
                coupon_page: 1,
                card_data: [],
                card_data_loading: false,
                card_data_loadmore: true,
                card_page: 1,
                deduction_data: [],
                deduction_data_loading: false,
                deduction_data_loadmore: true,
                deduction_page: 1,
                tabsBarFixed: false
            }
        },
        computed: {
            user_info() {
                return this.$store.getters.user_info_json
            }

        },
        created() {

            //加载用户账户
            this.$http.get(this.$store.state.api_url + 'api/user/user_card_info', {})
                .then(response => {
                    this.$store.state.response.ok(response, (data) => {
                        // this.coupon_data = data;
                        if (data) {
                            this.user_coupon_num = data.user_coupon_num;
                            this.user_card_num = data.user_card_num;
                            this.user_deduction_num = data.user_deduction_num;
                        }

                    });
                }, () => {

                });

            this.get_coupon_data(this.$store.state.user_tabs_selected);
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 120) {
                    this.tabsBarFixed = true;
                } else {
                    this.tabsBarFixed = false;
                }

                var documentHeight = document.documentElement.offsetHeight;
                var viewPortHeight = getViewportSize().h;

                function getViewportSize(w) {
                    //使用指定的窗口， 如果不带参数则使用当前窗口
                    w = w || window;

                    //除了IE8及更早的版本以外，其他浏览器都能用
                    if (w.innerWidth != null)
                        return {w: w.innerWidth, h: w.innerHeight};

                    //对标准模式下的IE（或任意浏览器）
                    var d = w.document;
                    if (document.compatMode == "CSS1Compat")
                        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

                    //对怪异模式下的浏览器
                    return {w: d.body.clientWidth, h: d.body.clientHeight};
                }

                //滚动加载
                if (documentHeight - viewPortHeight - scrollTop < 20) this.get_coupon_data(this.selected);
            },
            showShopMore(d) {
                d.show_shop_more = !d.show_shop_more;
            },
            get_coupon_data(id, page) {

                this.$store.dispatch('user_tabs_update', id);
                this.selected = this.$store.state.user_tabs_selected;

                if (id == '1') {
                    if (page) {
                        this.coupon_page = page;
                        this.coupon_data = [];
                        this.coupon_data_loadmore = true;
                    }
                    if (!this.coupon_data_loading && this.coupon_data_loadmore) {
                        this.coupon_data_loading = true;
                        let ajaxData = {
                            page: this.coupon_page
                        };
                        this.$http.get(this.$store.state.api_url + 'api/user/user_coupon', {params: ajaxData})
                            .then(response => {
                                this.$store.state.response.ok(response, (data) => {
                                    this.coupon_data_loading = false;
                                    if (data.data.length > 0) {
                                        data.data.map((d) => {

                                            d.show_shop_more = false;
                                            this.coupon_data.push(d);
                                        });
                                        this.coupon_page++;
                                    }
                                    if (!data.last_page || data.last_page == data.current_page) {
                                        this.coupon_data_loadmore = false;
                                        return false;
                                    }
                                });
                            }, () => {
                                this.$store.state.response.err();

                            });
                    }
                }
                else if (id == '2') {
                    if (page) {
                        this.card_page = page;
                        this.card_data = [];
                        this.card_data_loadmore = true;
                    }
                    if (!this.card_data_loading && this.card_data_loadmore) {
                        this.card_data_loading = true;
                        let ajaxData = {
                            page: this.card_page
                        };
                        this.$http.get(this.$store.state.api_url + 'api/user/user_card_account', {params: ajaxData})
                            .then(response => {
                                this.$store.state.response.ok(response, (data) => {
                                    this.card_data_loading = false;
                                    if (data.data.length > 0) {
                                        data.data.map((d) => {
                                            d.show_shop_more = false;
                                            this.card_data.push(d);
                                        });
                                        this.card_page++;
                                    }
                                    if (!data.last_page || data.last_page == data.current_page) {
                                        this.card_data_loadmore = false;
                                        return false;
                                    }
                                });
                            }, () => {
                                this.$store.state.response.err();
                            });
                    }
                }
                else if (id == '3') {
                    if (page) {
                        this.deduction_page = page;
                        this.deduction_data = [];
                        this.deduction_data_loadmore = true;
                    }
                    if (!this.deduction_data_loading && this.deduction_data_loadmore) {
                        this.deduction_data_loading = true;
                        let ajaxData = {
                            page: this.deduction_page
                        };
                        this.$http.get(this.$store.state.api_url + 'api/user/user_deduction_account', {params: ajaxData})
                            .then(response => {
                                this.$store.state.response.ok(response, (data) => {
                                    this.deduction_data_loading = false;
                                    if (data.data.length > 0) {
                                        data.data.map((d) => {
                                            d.show_shop_more = false;
                                            this.deduction_data.push(d);
                                        });
                                        this.deduction_page++;
                                    }
                                    if (!data.last_page || data.last_page == data.current_page) {
                                        this.deduction_data_loadmore = false;
                                        return false;
                                    }
                                });
                            }, () => {
                                this.$store.state.response.err();
                            });
                    }
                } else {
                    return;
                }

            }
        }
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

</style>