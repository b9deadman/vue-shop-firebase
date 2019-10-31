import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
    },
    mutations: {
        addtoCart(state, item) {
            // state.cart.push(item)
            let found = state.cart.find(product => product.product_id == item.product_id)
            if(found){
                found.productQuantity++
            }else{
                state.cart.push(item)
            }
            this.commit('saveData')
        },
        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    }
    
})