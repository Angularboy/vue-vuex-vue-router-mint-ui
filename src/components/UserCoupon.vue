<template>
    <div>
        <mt-header title="优惠券详情" fixed>
            <router-link to="/user" slot="left">
                <mt-button icon="back"/>
            </router-link>
        </mt-header>

        <div style="padding-top: 40px;">
            <mt-cell title="标题文字1" value="说明文字" :label="id"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
            <mt-cell title="标题文字" value="说明文字" label="描述信息"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.query.id
            }
        },
        created() {
            if (!this.id) {
                this.$router.push('/user');
            }
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>