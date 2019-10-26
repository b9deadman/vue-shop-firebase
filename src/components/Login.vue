<template>
    <div>
        <b-modal id="modal-center" centered title="J&M Shopping Center" hide-footer>
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
                                    <label for="name">Your name</label>
                                    <input
                                        type="text"
                                        v-model="name"
                                        class="form-control"
                                        id="name"
                                        placeholder="Your nice name"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input
                                        type="email"
                                        v-model="email"
                                        class="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        v-model="password"
                                        class="form-control"
                                        id="password"
                                        placeholder="Password"
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
        </b-modal>
    </div>
</template>
<script>
import { fb } from "../firebase.js"

export default {
    name: "Login",
    data() {
        return {
            name: null,
            email: null,
            password: null
        };
    },
    methods: {
        register() {
            fb.auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.replace("admin")
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    // [START_EXCLUDE]
                    if (errorCode == "auth/weak-password") {
                        alert("The password is too weak.")
                    } else if (errorCode == "auth/email-already-in-use") {
                        alert("Email already registered")
                    } else {
                        alert(errorCode)
                    }
                    console.log(error)
                    // [END_EXCLUDE]
                });
        },
        login() {
            fb.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.replace("/admin")
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong password please try again")
                    } else if (errorCode == "auth/user-disabled") {
                        alert("Please contact in office for assistance")
                    } else if (errorCode == "auth/user-not-found") {
                        alert("User not found please register")
                    } else if (errorCode == "auth/wrong-password") {
                        alert("Wrong password please try again")
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>