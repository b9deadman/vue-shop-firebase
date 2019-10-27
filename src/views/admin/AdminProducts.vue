<template>
    <div class="container-fluid">
        <div class="intro">
            <div class="row">
                <div class="col-md-4">
                    <h1>Products Page</h1>
                    <p>Lorem dolor, sit amet consectetur adipisicing elit. Ducimus laudantium accusamus suscipit nobis omnis numquam non rem iusto rerum quos impedit, nihil quo consequatur nemo obcaecati, dignissimos quaerat pariatur! Beatae.</p>
                </div>
                <div class="col-md-8">
                    <img class="img" src="/img/svg/products.svg" alt="overview.svg" />
                </div>
            </div>
        </div>
        <hr />
        <h4>Basic Crud in firebase and vue</h4>
        <div class="product-test">
            <div class="form-group">
                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
            </div>
            <div class="form-group">
                <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
            </div>
            <div class="form-group">
                <b-button @click="saveData" variant="info">Save</b-button>
            </div>

            <hr />
            <h3>Product List</h3>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product">
                            <td>{{product.data().name}}</td>
                            <td>{{product.data().price}}</td>
                            <td>
                                <b-button variant="success" @click="editProduct(product)">Update</b-button>
                                <b-button variant="danger" @click="deleteProduct(product.id)">Delete</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <b-modal id="modal-center" centered title="J&M Update Product" hide-footer>
                <div class="form-group">
                <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
                </div>
                <div class="form-group">
                    <b-button variant="success" @click="updateProduct()">Save</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { db } from "@/firebase.js";
import {fb} from "@/firebase.js"

export default {
    name: "AdminProducts",
    data() {
        return {
            products: [],
            product: {
                name: null,
                price: null
            }
        };
    },
    methods: {
        updateProduct(){

        },
        editProduct(product) {
            this.$bvModal.show('modal-center')
            this.product = product.data()
        },
        deleteProduct(doc) {
            if (confirm("Sure you want to delete")) {
                db.collection("products")
                    .doc("doc")
                    .delete()
                    .then(() => {
                        this.readData();
                        // alert("Product successfully deleted!");
                    })
                    .catch(function(error) {
                        alert("Error removing document: ", error);
                    });
            } else {
            }
        },
        readData() {
            db.collection("products")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.products.push(doc);
                        // console.log(`${doc.id} => ${doc.data()}`)
                    });
                });
        },
        saveData() {
            db.collection("products")
                .add(this.product)
                .then(() => {
                    Object.assign(this.$data, this.$options.data.apply(this));
                    this.readData();
                    alert("product add success ");
                })
                .catch(error => {
                    alert("Error adding document: ", error);
                });
        },
        reset() {
            // Object.assign(this.$data, this.$options.data.apply(this))
        }
    },
    created() {
        this.readData();
    }
};
</script>
<style lang="scss" scoped>
    .img {
        height: 65%;
    }
</style>