<template>
    <div class="cart">
        <a href="#" @click="addtoCart">
            <i class="fas fa-cart-plus"></i>
        </a>
    </div>
</template>
<script>

export default {
    name: "cart",
    props: {
        name: String,
        price: String,
        productId: String
    },
    data() {
        return {
            item: {
                productName: this.name,
                productPrice: this.price,
                product_id: this.productId,
                productQuantity: 1,
            }
        };
    },
    methods:{
    addtoCart() {
        this.$store.commit("addtoCart",this.item);
    }
    }
};
</script>
<style lang="scss" scoped>
</style>