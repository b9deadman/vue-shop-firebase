<template>
    <b-container fluid>
        <div class="row">
        <div v-for="item in products">
            <div class="card m-1" style="width: 150px">
                <img src="/img/svg/orders.svg" class="card-img" />
                <div class="card-body">
                    <h4 class="card-title text-center">{{item.name}}</h4>
                    <h6 class="text-center">{{item.price}}</h6>
                    <p class="card-text text-center" v-html="item.description"/>
                </div>
            </div>
        </div>
        </div>

        <!-- </b-container>
            <div v-for="item in products">
                <div class="card-img-top p-2" style="width: 18rem;">
                    <carousel :perPage="1">
                        <slide v-for="(image, index) in item.images">
                            <img :src="image" />
                        </slide>
                    </carousel>
                    <div class="card-body">
                        <h5 class="card-title">{{item.name}}</h5>
                        <p class="card-text">{{item.description}}</p>
                        <a href="#" class="btn btn-primary">Add to cart</a>
                    </div>
                </div>
        </div>-->
    </b-container>
</template>
<script>
import { db } from "../firebase.js";
export default {
    name: "products",
    data() {
        return {
            products: []
        };
    },
    firestore() {
        return {
            //install vue-firestore to use this code
            products: db.collection("products")
        };
    },
    methods: {}
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
</style>