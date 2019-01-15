import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import LoginMobile from '../components/LoginMobile'
import User from '../components/User'
import UserCoupon from '../components/UserCoupon'
import UserCard from '../components/UserCard'
import UserDeduction from '../components/UserDeduction'
import Business from '../components/Business'
import BusinessCouponList from '../components/BusinessCouponList'
import BusinessCouponAdd from '../components/BusinessCouponAdd'
import BusinessCouponSub from '../components/BusinessCouponSub'
import BusinessCouponListAdd from '../components/BusinessCouponListAdd'
import BusinessCouponListEdit from '../components/BusinessCouponListEdit'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/loginMobile',
            component: LoginMobile
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/userCoupon',
            component: UserCoupon
        },
        {
            path: '/userCoupon',
            component: UserCoupon
        },
        {
            path: '/userCard/:id',
            component: UserCard,
            name: 'userCard'
        },
        {
            path: '/userDeduction/:id',
            component: UserDeduction,
            name:'userDeduction'
        },
        {
            path: '/business',
            component: Business
        },
        {
            path: '/businessCouponList',
            component: BusinessCouponList
        },
        {
            path: '/businessCouponAdd',
            component: BusinessCouponAdd
        },
        {
            path: '/businessCouponSub',
            component: BusinessCouponSub
        },
        {
            path: '/businessCouponListAdd',
            component: BusinessCouponListAdd
        },
        {
            path: '/businessCouponListEdit',
            component: BusinessCouponListEdit
        }
    ]
})