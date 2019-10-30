<template>
    <div>
        <Navbar />
        <b-container fluid>
            <div class="row">
                <div v-for="product in products">
                    <div class="card m-1" style="width: 150px">
                        <!-- <div v-for="(image, index) in items.images" /> -->
                        <img src="/img/svg/orders.svg" class="card-img" />
                        <div class="card-body">
                            <h4 class="text-center">{{product.name}}</h4>

                            <h6 class="text-center">
                                <i class="fas fa-rupee-sign"></i>
                                - {{product.price}}
                            </h6>
                            <!-- <p class="card-text text-center" v-html="item.description" /> -->
                            <Cart
                                :name="product.name"
                                :price="product.price"
                                :product-id="product.id">
                            </Cart>
                        </div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
import { db } from "../firebase.js";


export default {
    name: "products",
    
    data() {
        return {
            
        };
    },
    firestore() {
        return {
            //install vue-firestore to use this code
            products: db.collection("products")
        };
    },
    methods: {
        getImage(images){
            return images[0]
        }
    }
};
</script>
<style lang="scss" scoped>
    img {
        align-items: center;
        width: 100%;
    }
    element.style {
        margin-top: 0;
    }
    .card:hover {
        -webkit-box-shadow: -1px 9px 40px -12px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -1px 9px 40px -12px rgba(0, 0, 0, 0.75);
        box-shadow: -1px 9px 40px -12px rgba(0, 0, 0, 0.75);
    }
    .card-body {
        padding: 01px;
    }
</style>