<template>
    <div class="container-fluid">
        <div class="product-test">
            <h3 class="d-inline-block">Product List</h3>
            <b-button variant="info" @click="addNew" class="float-right">Add</b-button>
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
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Tag</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products">
                        <td>
                            <a href="#" @click="editProduct(item)">
                                <i class="fas fa-edit mr-1"></i>
                            </a>
                            | {{item.name}}
                        </td>
                        <td>{{item.description}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.tag}}</td>
                        <td>
                            {{item.image}} |
                            <a href="#" @click="deleteProduct(item)">
                                <i class="fas fa-trash-alt ml-1"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <b-modal id="modal-addnew" centered title="J&M Add Product" hide-footer>
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    v-model="product.name"
                                    class="form-control"
                                />
                            </div>
                            <div class="form-group">
                                <vue-editor v-model="product.description"></vue-editor>
                                <!-- <b-form-textarea
                                    id="textarea"
                                    v-model="product.description"
                                    placeholder="Product Description"
                                    rows="3"
                                    max-rows="6"
                                ></b-form-textarea> -->
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Product price"
                                    v-model="product.price"
                                    class="form-control"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Product tag"
                                    v-model="product.tag"
                                    class="form-control"
                                />
                            </div>
                            <div>
                                <p>Product Image</p>
                                <b-form-file multiple @change="uploadImage()" />
                            </div>
                            <div class="form-group float-right mt-4">
                                <b-button
                                    variant="success"
                                    @click="addProduct"
                                    class="float-right"
                                    v-if="modal == 'new'"
                                >Save</b-button>
                                <b-button
                                    variant="success"
                                    @click="updateProduct"
                                    class="float-right"
                                    v-if="modal == 'edit'"
                                >Update</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { db } from "@/firebase.js";
import { VueEditor } from "vue2-editor"

export default {
    name: "AdminProducts",
    components:{
        VueEditor
    },
    data() {
        return {
            products: [],
            product: {
                name: null,
                description: null,
                price: null,
                tag: null,
                image: null
            },
            modal: null
        };
    },
    firestore() {
        return {
            //install vue-firestore to use this code
            products: db.collection("products")
        };
    },
    methods: {
        uploadImage() {},
        addNew() {
            this.product.name = null;
            this.product.description = null;
            this.product.price = null;
            this.product.tag = null;
            this.product.image = null;
            this.modal = "new";
            this.$bvModal.show("modal-addnew");
        },
        watcher() {},
        updateProduct() {
            this.$bvModal.hide("modal-addnew");
            this.$firestore.products.doc(this.product.id).update(this.product)
            Toast.fire({
                type: "success",
                title: "Update success"
            });
        },
        editProduct(item) {
            this.modal = "edit";
            this.$bvModal.show("modal-addnew");
            this.product = item;
        },
        deleteProduct(item) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$firestore.products.doc(item.id).delete();
                    Toast.fire({
                        type: "success",
                        title: "Delete success"
                    });
                }
            });
        },
        readData() {},
        addProduct() {
            this.$firestore.products.add(this.product);
            this.$bvModal.hide("modal-addnew");
            Toast.fire({
                type: "success",
                title: "Add new product success"
            });
        }
    },
    created() {}
};
</script>
<style lang="scss" scoped>
</style>