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
                        <td>
                            {{item.price}} | 
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
                                <!-- <vue-editor v-model="product.description"></vue-editor> -->
                                <b-form-textarea
                                    id="textarea"
                                    v-model="product.description"
                                    placeholder="Product Description"
                                    rows="3"
                                    max-rows="6"
                                ></b-form-textarea>
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
                                    placeholder="Use , for seperate tag"
                                    v-model="tag"
                                    class="form-control"
                                    @keyup.188="addTag"
                                />
                                <div class="d-flex">
                                    <p v-for="tag in product.tags">
                                        <span class="p-1">{{tag}}</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>Product Image</p>
                                <b-form-file multiple @change="uploadImage" />
                            </div>
                            <div class="form d-flex">
                                <div class="p-1" v-for="(image,index) in product.images">
                                    <img :src="image" width="80px" height="80px" />
                                    <span class="delete-img" @click="deleteImage(image,index)"><i class="fas fa-times"></i></span>
                                </div>
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
import { fb, db } from "@/firebase.js";
import { VueEditor } from "vue2-editor";

export default {
    name: "AdminProducts",
    components: {
        VueEditor
    },
    data() {
        return {
            products: [],
            product: {
                name: null,
                description: null,
                price: null,
                tags: [],
                images: []
            },
            modal: null,
            tag: null
        };
    },
    firestore() {
        return {
            //install vue-firestore to use this code
            products: db.collection("products")
        };
    },
    methods: {
        deleteImage(img,index){
            let image = fb.storage().refFromURL(img)

            this.product.images.splice(index,1)
            image.delete().then(() => {
                console.log('image deleted');
            }).catch((error) =>{
                console.log('an error occured')
            })
        },
        addTag() {
            this.product.tags.push(this.tag);
            this.tag = "";
        },
        uploadImage(e) {
            if (e.target.files[0]) {
                let file = e.target.files[0];
                var storageRef = fb.storage().ref("productImages/" + file.name);
                let uploadTask = storageRef.put(file);

                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                        }
                    },
                    error => {
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(downloadURL => {
                                this.product.images.push(downloadURL);
                            });
                    }
                );
            }
        },
        addNew() {
            this.product = {
                name: null,
                description: null,
                price: null,
                tags: [],
                images: []
            }
            this.modal = "new";
            this.$bvModal.show("modal-addnew");
        },
        watcher() {},
        updateProduct() {
            this.$bvModal.hide("modal-addnew");
            this.$firestore.products.doc(this.product.id).update(this.product);
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
.img-wrapp{
    position: relative
}
.img-wrapp span.delete-img{
    position: ablolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
    cursor:pointer;
}
</style>