<template>
    <b-container fluid>
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <a href="#" id="show-sidebar" class="btn btn-sm btn-dark" @click="closeMenu">
                <i class="fas fa-bars"></i>
            </a>
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-brand  -->
                    <div class="sidebar-item sidebar-brand">
                        <a href="#">J&M</a>
                        <div id="close-sidebar" @click="closeMenu">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div class="user-pic">
                            <img
                                class="img-responsive img-rounded"
                                src="/img/user.png"
                                alt="User picture"
                            />
                        </div>
                        <div class="user-info">
                            <span class="user-name">
                                <strong>Asad</strong>
                            </span>
                            <span class="user-role">{{email}}</span>
                            <span class="user-status">
                                <i class="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>
                    <!-- sidebar-search  -->
                    <div class="sidebar-item sidebar-search">
                        <div>
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control search-menu"
                                    placeholder="Search..."
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- sidebar-menu  -->
                    <div class="sidebar-item sidebar-menu">
                        <ul>
                            <li class="header-menu">
                                <span>Menu</span>
                            </li>
                            <li>
                                <router-link to="/admin/overview">
                                    <i class="fas fa-eye"></i>
                                    <span class="menu-text">Overview</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/profile">
                                    <i class="fas fa-user-circle"></i>
                                    <span class="menu-text">Profile</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/adminproducts">
                                    <i class="fas fa-shopping-basket"></i>
                                    <span class="menu-text">Products</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/orders">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span class="menu-text">Orders</span>
                                </router-link>
                            </li>
                            <li>
                                <a href="#" @click="logout">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span class="menu-text">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- sidebar-menu  -->
                </div>
            </nav>
            <!-- sidebar-content  -->
            <main class="page-content pt-2">
                <div id="overlay" class="overlay"></div>
                <div class="container-fluid p-5">
                    <router-view />
                </div>
            </main>
            <!-- sidebar-content" -->
        </div>
    </b-container>
</template>

<script>
// @ is an alias to /src
// import Hero from "@/components/Hero.vue";
import {fb} from "@/firebase.js"

export default {
    name: "admin",
    data(){
        return{
            name: null,
            email:null,
        }
    },
    components: {
        // Hero
    },
    methods: {
        closeMenu() {
            $(".page-wrapper").toggleClass("toggled");
        },
        logout(){
            fb.auth().signOut().then(() => {
                this.$router.replace('/')
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    created(){
        var user = fb.auth().currentUser;
        this.email = user.email
    }
};
</script>
