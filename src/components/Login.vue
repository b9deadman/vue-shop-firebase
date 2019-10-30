<template>
    <div>
        <Navbar />
        <div>
            <b-card no-body>
                <b-tabs pills card fill>
                    <b-tab title="Sign IN" active>
                        <b-card-text>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    v-model="email"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                                <small
                                    class="form-text text-muted"
                                >We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    @keyup.enter="login"
                                    v-model="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="form-group">
                                <b-button variant="success" @click="login">Login</b-button>
                            </div>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Sign UP">
                        <b-card-text>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="name"
                                    class="form-control"
                                    placeholder="Your nice name"
                                />
                            </div>

                            <div class="form-group">
                                <input
                                    type="email"
                                    v-model="email"
                                    class="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    v-model="password"
                                    class="form-control"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="address"
                                    class="form-control"
                                    placeholder="address"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="int"
                                    v-model="phone"
                                    class="form-control"
                                    placeholder="Phone"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    v-model="landmark"
                                    class="form-control"
                                    placeholder="Land Mark"
                                />
                            </div>

                            <div class="form-group">
                                <b-button variant="success" @click="register">Signup</b-button>
                            </div>
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>
<script>
import { fb, db } from "../firebase.js";

export default {
    name: "Login",
    data() {
        return {
            name: null,
            email: null,
            password: null,
            address: null,
            phone: null,
            landmark: null
        };
    },
    methods: {
        register() {
            fb.auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    // Add a new document in collection "cities"
                    db.collection("profiles")
                        .doc(user.user.uid)
                        .set({
                            name: this.name,
                            email: this.email,
                            address: this.address,
                            phone: this.phone,
                            landmark: this.landmark
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    this.$router.replace("admin");
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    // [START_EXCLUDE]
                    if (errorCode == "auth/weak-password") {
                        alert("The password is too weak.");
                    } else if (errorCode == "auth/email-already-in-use") {
                        alert("Email already registered");
                    } else {
                        alert(errorCode);
                    }
                    console.log(error);
                    // [END_EXCLUDE]
                });
        },
        login() {
            fb.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.replace("/admin/profile");
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong password please try again");
                    } else if (errorCode == "auth/user-disabled") {
                        alert("Please contact in office for assistance");
                    } else if (errorCode == "auth/user-not-found") {
                        alert("User not found please register");
                    } else if (errorCode == "auth/wrong-password") {
                        alert("Wrong password please try again");
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>