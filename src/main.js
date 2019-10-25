import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import  jQuery from 'jquery'
import 'popper.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = false;
window.$ = window.jQuery = jQuery

Vue.component('Navbar', require('./components/Navbar.vue').default)

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
