<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" 
                        :is-checked="isSelectAll"
                        @click.native="checkAllClick"/>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        // 总价
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter( item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        // 被选中几个
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },
        // 是否是全选
        isSelectAll() {
            if(this.cartList.length === 0) {
                return false
            }else{
                return !this.cartList.filter(item => !item.checked).length
            }      
        
        }
        
    },
    methods: {
        // 点击全选 全部取反
        checkAllClick() {
            if(this.isSelectAll) {
                this.cartList.forEach(item => item.checked = false)
            }else {
                this.cartList.forEach(item => item.checked = true)
            }
        }

    }

}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    
}

.check-content{
    display: flex;
    align-items: center;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    
    margin-right: 5px;
}

.price{
    /* 自己占剩下一份， */
    flex: 1;
    
}
.calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
    
}
</style>