import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/admin/Admin.vue";
import Overview from "./views/admin/Overview.vue"
import Orders from "./views/admin/Orders.vue"
import Products from "./views/Products.vue"
import Profile from "./views/admin/Profile.vue"
import AdminProducts from "./views/admin/AdminProducts.vue"
import Logout from "./views/admin/Logout.vue"
import {fb} from "./firebase.js"

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/products",
            name: "products",
            component: Products
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            meta:{requiresAuth: true},

            children: [
                {
                    path: "overview",
                    name: "overview",
                    component: Overview
                },
                {
                    path: "profile",
                    name: "profile",
                    component: Profile
                },
                {
                    path: "adminproducts",
                    name: "adminproducts",
                    component: AdminProducts
                },
                {
                    path: "orders",
                    name: "orders",
                    component: Orders
                },
                {
                    path: "logout",
                    name: "logout",
                    component: Logout
                },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser

    if (requiresAuth && !currentUser){
        next('/')
    } else if (requiresAuth && currentUser){
        next()
    } else {
        next()
    }
})

export default router;