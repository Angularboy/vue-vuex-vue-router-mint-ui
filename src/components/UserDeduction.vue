<template>
    <div>
        <mt-header title="抵扣券详情" fixed>
            <router-link to="/user" slot="left">
                <mt-button icon="back"/>
            </router-link>
        </mt-header>

        <div style="padding-top:40px;" >

            <div class="card" style="background-color:#fff; margin:10px;">
                <div class="item item-content">
                    <p>
                        <span>抵扣券名称：</span>
                        <span class="item-note">{{name}}</span>
                    </p>
                    <p>
                        <span>账户剩余：</span>
                        <span class="item-note" style="font-size:1.4rem; color:#f00;">￥{{money}}</span>
                    </p>
                    <p>
                        <span>状态：</span>
                        <span class="item-note" v-show="status===1">正常</span>
                        <span class="item-note" v-show="status===2">冻结</span>
                    </p>
                    <p>
                        <span>开通时间：</span>
                        <span class="item-note">{{created_at}}</span>
                    </p>
                </div>
                <div class="item " id="shopListItem">
                    <p @click="showShopMore()">
                        <span>使用店铺：</span>
                        <ul class="item-note">
                            <li v-for="(d,index) in bus_shop_list" :key="d" v-show="index<3||show_shop_more">{{d.shop_name}}</li>
                        </ul>
                    </p>
                    <p v-show="bus_shop_list.length>3" @click="showShopMore()">
                        <span class="item-note" v-show="!show_shop_more"><i class="iconfont icon-down"></i></span>
                        <span class="item-note" v-show="show_shop_more"><i class="iconfont icon-up"></i></span>
                    </p>
                </div>
            </div>
            <div :class="{'fixed-top':tabsBarFixed}" style="top:40px; overflow:hidden;">
                <div class="list" style="background-color:#fff;">
                    <div class="item" style="border-top:0; ">
                        <h2>账户记录</h2>
                    </div>
                </div>
            </div>
            

            <mt-cell v-for="d in record_list" :key="d" :title="d.remark" :value="d.change_money>0?'+'+d.change_money:d.change_money" label=""/>
           
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'',
                money: '0',
                status:0,
                created_at:'',
                record_list:[],
                record_list_loading: false,
                record_list_loadmore:true,
                record_list_page: 1,
                bus_shop_list:[],
                show_shop_more:false,
                tabsBarFixed:false
            }
        },
        created() {
            let id = this.$route.params.id;

            if (!id) {
                this.$router.push('/user');
            }

            //加载会员卡账户
            this.$http.get(this.$store.state.api_url + 'api/user/user_deduction_account/'+id)
                .then(response => {
                    this.$store.state.response.ok(response, (data) => {
                        // this.coupon_data = data;
                        if(data){
                            this.name=data.deduction_name;
                            this.money=data.money;
                            this.status=data.status;
                            this.created_at=data.created_at;
                            this.bus_shop_list=data.bus_shop_deduction_account;
                        }

                    });
                }, () => {
                    
                });

            this.get_data(1);

            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            showShopMore(){
                this.show_shop_more=!this.show_shop_more;
            },
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

                var objHeight=document.getElementById('shopListItem').offsetHeight;

                if(scrollTop-objHeight>120) {
                    this.tabsBarFixed=true;
                }else{
                    this.tabsBarFixed=false;
                }

                var documentHeight = document.documentElement.offsetHeight;
                var viewPortHeight = getViewportSize().h;

                function getViewportSize(w){
                    //使用指定的窗口， 如果不带参数则使用当前窗口
                    w = w || window;

                    //除了IE8及更早的版本以外，其他浏览器都能用
                    if(w.innerWidth != null)
                        return {w: w.innerWidth, h: w.innerHeight};

                    //对标准模式下的IE（或任意浏览器）
                    var d = w.document;
                    if(document.compatMode == "CSS1Compat")
                        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

                    //对怪异模式下的浏览器
                    return {w: d.body.clientWidth, h: d.body.clientHeight};
                }

                //滚动加载
                if(documentHeight - viewPortHeight - scrollTop < 20) this.get_data();
            },
            get_data(page){
                if(page) {this.record_list_page=page;this.record_list=[];this.record_list_loadmore=true;}
                if (!this.record_list_loading&&this.record_list_loadmore) {
                    this.record_list_loading = true;
                    let ajaxData = {
                        page: this.record_list_page
                    };
                    this.$http.get(this.$store.state.api_url + 'api/user/user_deduction_account_record/'+this.$route.params.id, {params: ajaxData})
                        .then(response => {
                            this.$store.state.response.ok(response, (data) => {
                                this.record_list_loading = false;
                                if (data.data.length > 0 ) {
                                    data.data.map((d)=>{

                                        this.record_list.push(d);
                                    });
                                    this.record_list_page++;
                                }
                                if(!data.last_page||data.last_page==data.current_page){this.record_list_loadmore=false;return false;}
                            });
                        }, () => {
                            this.$store.state.response.err();
                            
                        });
                }
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>