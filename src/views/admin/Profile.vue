<template>
    <b-container fluid>
        <h3>Profile settings</h3>
        <br />
        <p>Change your profile settings here</p>
        <hr />
        <b-card no-body>
            <b-tabs pills card>
                <b-tab title="Profile" active>
                    <b-card-text>
                        <b-form-group>
                            <b-form-input
                                v-model="profile.name"
                                placeholder="Enter your name"
                                class="mt-2"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                                v-model="profile.phone"
                                placeholder="Enter your phone"
                                class="mt-2"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                                v-model="profile.address"
                                placeholder="Enter your address"
                                class="mt-2"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input
                                v-model="profile.landmark"
                                placeholder="Enter any land mark"
                                class="mt-2"
                            ></b-form-input>
                        </b-form-group>
                        <b-from-group>
                            <b-button
                                variant="success"
                                class="float-right mt-2 mb-2"
                                @click="updateProfile"
                            >Save</b-button>
                        </b-from-group>
                    </b-card-text>
                </b-tab>
                <b-tab title="Account">
                    <b-card-text>
                        <b-card-text>
                            <b-form-group>
                                <b-form-input
                                    v-model="account.user"
                                    placeholder="User Name"
                                    class="mt-2"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input
                                    v-model="account.email"
                                    placeholder="Email Address"
                                    class="mt-2"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input
                                    v-model="account.password1"
                                    placeholder="New Password"
                                    class="mt-2"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input
                                    v-model="account.password2"
                                    placeholder="Confirm Password"
                                    class="mt-2"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-file></b-form-file>
                            </b-form-group>
                            <b-from-group>
                                <b-button
                                    variant="success"
                                    class="float-right mt-2 mb-2 ml-2"
                                    @click="updateAccount"
                                >Save</b-button>
                                <b-button
                                    variant="success"
                                    class="float-right mt-2 mb-2 ml-2"
                                    @click="resetPassword"
                                >Reset Password</b-button>
                            </b-from-group>
                        </b-card-text>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>
<script>
import { fb, db } from "@/firebase.js";

export default {
    name: "profile",
    data() {
        return {
            profile: {
                name: null,
                phone: null,
                address: null,
                landmark: null
            },
            account: {
                name: null,
                email: null,
                photoUrl: null,
                emailVerified: null,
                password: null,
                confirmPassword: null,
                uid: null
            }
        };
    },
    firestore() {
        const user = fb.auth().currentUser;
        return {
            profile: db.collection("profiles").doc(user.uid)
        };
    },
    methods: {
        resetPassword() {
            const auth = fb.auth();
            auth.sendPasswordResetEmail(auth.currentUser.email)
                .then(() => {
                    Toast.fire({
                        type: 'success',
                        title: 'Email Sent'
                    })
                })
                .catch((error) => {
                    alert(error)
                });
        },
        updateProfile() {
            this.$firestore.profile.update(this.profile);
        },
        uploadImage() {}
    }
};
</script>
<style lang="scss" scoped>
    .img {
        height: 65%;
    }
</style>