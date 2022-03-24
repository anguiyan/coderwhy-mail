<template>
  <div>
      
      <nav-bar>
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <cart-list></cart-list>
      
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'



import { mapGetters } from 'vuex'

export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList
     
    },
    data() {
      return {
        
      }
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
    // getters映射第一种方法   带引号
      // ...mapGetters(['cartLength'])
    // getters映射第二种
      ...mapGetters({
        length: 'cartLength'
      })
    }

}
</script>

<style scoped>

</style>

