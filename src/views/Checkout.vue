<template>
    <b-container fluid>
        <Navbar />
        <b-row>
            <b-col>
                <h4 class="py-4">Checkout page</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="8">
                <ul>
                    <li v-for="item in this.$store.state.cart" class="media">
                        <img
                            :src="item.productImage"
                            width="80px"
                            class="align-self-center mr-3"
                            alt
                        />
                        <div class="media-body">
                            <h5 class="mt-0">
                                {{item.productName}}
                                <span
                                    class="float-right"
                                    @click="$store.commit('removeFromCart',item)"
                                >X</span>
                            </h5>
                            <p class="mt-0">{{item.productPrice}}</p>
                            <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                        </div>
                    </li>
                </ul>
            </b-col>
            <b-col cols="4">Total Price</b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    name: "Checkout"
};
</script>
<style lang="scss" scoped>
</style>