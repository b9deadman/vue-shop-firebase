import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery'
import 'popper.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'
import {fb} from "./firebase.js"
import VueFirestore from 'vue-firestore'
import Swal from 'sweetalert2'

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)
Vue.use(BootstrapVue)
Vue.config.productionTip = false;
window.$ = window.jQuery = jQuery
window.Swal = Swal

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
  })

window.Toast = Toast
Vue.component('Navbar', require('./components/Navbar.vue').default)

let app = "";

fb.auth().onAuthStateChanged(function () {
	if (!app) {
		new Vue({
			router,
			render: h => h(App)
		}).$mount("#app");

	}
});
