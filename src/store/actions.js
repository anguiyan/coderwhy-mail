import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'
import { resolve } from 'any-promise';


export default {
    addCart(context, payLoad) {
        return new Promise((resolve, reject) => {
              // 查找之前是否加购物车
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
            //如果有值 count+1
            if(oldProduct) {
                
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前商品数量+1')
            //  没有，count设置1，数组push
            }else{
                payLoad.count = 1
                payLoad.checked = false
                context.commit(ADD_TO_CART,payLoad)
                resolve('添加了新商品')
            }

        })
      
             
             
    }
}

