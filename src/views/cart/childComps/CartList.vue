<template>
  <div class="cart-list">

      <scroll class="content">
         
        <cart-list-item v-for="(item, index) in cartList"
                        :key="index"
                        :item-info="item"/>
                        
        
        
       
          
         
       
      </scroll>
      <cart-bottom-bar/>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './CartBottomBar'


import { mapGetters } from 'vuex'


export default {
    name: "CartList",
    components: {
        CartListItem,
        Scroll,
        CartBottomBar
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activatied() {
        this.$store.refresh()
    }

}
</script>

<style scoped>
.cart-list{
    height: calc(100vh - 44px - 49px - 40px);
   
}
.content{
    height: 100%;
    overflow: hidden;
    
}

</style>