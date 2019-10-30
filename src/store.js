import Vue from 'vue'
import Vuex from 'vuex'
import { valueFromASTUntyped } from 'graphql'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
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
        }
    }
    
})