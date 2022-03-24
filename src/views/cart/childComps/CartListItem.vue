<template>
  <div class="cart-list-item">
      <div class="item-selector">
          <check-button :is-checked="itemInfo.checked"
                        @click.native="checkClick"/>
      </div>
      <div class="item-img">
          <img :src="itemInfo.image" alt="">
      </div>
      <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">{{itemInfo.desc}}</div>
          <div class="info-bottom">
              <div class="item-price">￥{{itemInfo.price}}</div>
              <div class="item-count">x{{itemInfo.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'



export default {
    name: "CartListItem",
    props: {
        itemInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        CheckButton
    },
    methods: {
        checkClick() {
            // 选择  点击取反
            this.itemInfo.checked = !this.itemInfo.checked
            
        }
    }

}
</script>

<style scoped>
.cart-list-item{
    width: 100%;
    
    display: flex;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 20px;
    display: flex;
    /* 水平居中 */
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
}

.item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-img{
    padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info{
   color: #333;
   
   padding: 5px 10px;
    
    overflow: hidden;
    position: relative;
    
}
.item-desc{
    font-size: 14px;
    margin-top: 15px;
    overflow: hidden;
    
}



.info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;

}
.item-price{
    color: orangered;
}
.item-count{
    
    float: right;
    margin-left: 100px;
   


  
}

</style>