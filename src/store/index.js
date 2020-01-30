import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../http/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartNum: 0
    },
    mutations: {},
    actions: {
        getCart({
            state
        }) {
            $api.getCarts().then(res => {
                if (res.code === 200) {
                    let num = 0
                    res.data.map(item => {
                        num += item.count
                    })
                    state.cartNum = num
                }
            })
        }
    },
    modules: {}
})