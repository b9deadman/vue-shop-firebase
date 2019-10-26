<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" class="custome-nav">
            <b-navbar-brand href="#">
                <em>J&M</em>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/">Home</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/products">Products</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/about">About</router-link>
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                        <b-button v-b-modal.modal-center>Lets Start</b-button>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
import Login from "./Login.vue";
export default {
    name: "Navbar"
};
</script>
<style lang="scss">
    @media (min-width: 992px) {
        .navbar.custom-nav {
            top: 16px;
            background-color: transparent !important;
        }
    }
</style>