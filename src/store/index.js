import Vue from 'vue'
import Vuex from 'vuex'

import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'



// 1.安装插件
Vue.use(Vuex)


// 2.创建store对象
const store = new Vuex.Store({
    state: {
        cartList: [],
        

    },
    mutations,

    
    actions,
    getters
  


})

// 3.挂载Vue实例上
export default store

    //    购物车物品添加
        // addToCart(state, payLoad) {
             // 添加购物车  判断购物车里有没有
            //1. 有，放在中间变量，不添加购物车，只count+1
            // let oldProduct = null;
            // for(let item of state.cartList) {
            //     if(item.iid === payLoad.iid) {
            //         oldProduct = item
            //     }
            // }

            // if(oldProduct) {
            //     oldProduct.count += 1
            // }else {
            //     payLoad.count = 1
            //     state.cartList.push(payLoad)
            // }


            // 2.数组是否包含值  包含，返回下标值  这是错误的indexOf不可以
            // let index = state.cartList.indexOf(payLoad)
            // if(index !== -1) {
            //     let oldProduct = state.cartList[index]
            //     oldProduct.count += 1
            // }else{
            //     payLoad.count = 1
            //     state.cartList.push(payLoad)
            // }
            // 3.数组的find函数  重构判断放在actions中
        //     state.cartList.push(payLoad)


            
        // }


