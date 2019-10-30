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
                        <a href="#" v-b-modal.cart-modal>
                            <i class="fas fa-shopping-cart mr-3"></i>
                        </a>
                        <router-link to="/login">Login</router-link>
                        <!-- <b-button v-b-modal.modal-center>Lets Start</b-button> -->
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div>
            <b-modal id="cart-modal" centered title="J&M Cart" hide-footer>
                <div>
                    <ul>
                        <li v-for="item in this.$store.state.cart">
                            {{item.productName}}
                        </li>
                    </ul>
                </div>
                <div class="float-right">
                <b-button variant="info" class="m-1">Continue Shopping</b-button>
                <b-button variant="warning" class="m-1">Check Out</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
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