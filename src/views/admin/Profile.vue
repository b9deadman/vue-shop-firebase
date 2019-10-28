<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <h3>Profile settings</h3>
                <p>Change your profile settings here</p>
            </b-col>
            <b-col>
                <img src="/img/svg/profile.svg" width="300" alt class="img-fluid" />
            </b-col>
        </b-row>
        <b-row>
            <b-container fluid>
                <b-col cols="8">
                    <b-card no-body>
                        <b-tabs pills card vertical>
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
                                                class="float-right mt-2 mb-2"
                                                @click="updateAccount"
                                            >Save</b-button>
                                        </b-from-group>
                                    </b-card-text>
                                </b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-container>
        </b-row>
    </b-container>
</template>
<script>
export default {
    name: "Profile"
};
</script>
<style lang="scss" scoped>
    .img {
        height: 65%;
    }
</style>