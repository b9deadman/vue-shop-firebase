<template>
    <b-container>
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
        </div>
    </b-container>
</template>
<script>
export default {
    name: "MiniCart"
};
</script>
<style lang="scss" scoped>
</style>