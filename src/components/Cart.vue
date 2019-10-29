<template>
    <div class="cart">
        <a href="#">
            <i class="fas fa-cart-plus"></i>
        </a>
    </div>
</template>
<script>
import { stringify } from "querystring";
export default {
    name: "cart",
    props: {
        name: String,
        price: String,
        productId: String
    },
    data(){
        return{
            
            productName: this.name,
            productPrice: this.price,
            product_id: this.id
        }
    },
};
</script>
<style lang="scss" scoped>
</style>