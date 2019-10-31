<template>
    <b-container fluid>
        <div>
            <div v-for="item in this.$store.state.cart" class="d-flex align-items-right">
                <div>
                    <img src="/img/svg/orders.svg" height="100px" class="align-self-center" />
                </div>
                <div class="media-body">
                    <h6>{{item.productName}}</h6>
                    <p>{{item.productPrice}}</p>
                    <p>Quantity : {{item.productQuantity}}</p>
                    <hr />
                </div>
            </div>
        </div>
        <div class="float-right">
            <router-link to="/products">
                <b-button variant="info" class="m-1">Continue Shopping</b-button>
            </router-link>
            <router-link to="/checkout">
                <b-button variant="warning" class="m-1">Check Out</b-button>
            </router-link>
            <!-- <b-button variant="success" class="m-1" @click="checkout">Check Out</b-button> -->
        </div>
    </b-container>
</template>
<script>
export default {
    name: "MiniCart",
    data(){
        return{

        }
    },
    methods:{
        // checkout(){
        //     this.$bvModal.hide("cart-modal");
        //     this.$router.push('/checkout')
        // }
    }
};
</script>
<style lang="scss" scoped>
</style>