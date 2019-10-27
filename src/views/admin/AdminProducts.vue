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
                <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                />
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
                        <tr v-for="item in products">
                            <td>{{item.data().name}}</td>
                            <td>{{item.data().price}}</td>
                            <td>
                                <b-button variant="success" @click="editProduct(item)">Update</b-button>
                                <b-button variant="danger" @click="deleteProduct(item.id)">Delete</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <b-modal id="modal-center" centered title="J&M Update Product" hide-footer>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Product Name"
                        v-model="product.name"
                        class="form-control"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Price"
                        v-model="product.price"
                        class="form-control"
                    />
                </div>
                <div class="form-group">
                    <b-button variant="success" @click="updateProduct">Save</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { db } from "@/firebase.js";

export default {
    name: "AdminProducts",
    data() {
        return {
            products: [],
            product: {
                name: null,
                price: null
            },
            activeItem: null
        };
    },
    methods: {
        watcher() {
            db.collection("products")
                .onSnapshot((querySnapshot) => {
                    this.products = [];
                    querySnapshot.forEach((doc) => {
                        this.products.push(doc)
                    })
                });
        },
        updateProduct() {
            db.collection("products")
                .doc(this.activeItem)
                .update(this.product)
                .then(() => {
                    this.$bvModal.hide("modal-center");
                    this.watcher()
                    alert("update success");
                })
                .catch(error => {
                    // The document probably doesn't exist.
                    console.log("error updating document: ", error);
                    // alert("Error updating document: ", error)
                });
        },
        editProduct(item) {
            this.$bvModal.show("modal-center");
            this.product = item.data();
            this.activeItem = item.id;
        },
        deleteProduct(doc) {
            if (confirm("Sure you want to delete")) {
                db.collection("products")
                    .doc("doc")
                    .delete()
                    .then(() => {
                        this.watcher()
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
                    // Object.assign(this.$data, this.$options.data.apply(this));
                    this.watcher()
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