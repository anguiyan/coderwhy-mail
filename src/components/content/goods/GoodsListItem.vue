<template>
<div class="goods-item"
            @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
</div>
  
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    computed: {
        showImage() {
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imageLoad() {
           this.$bus.$emit('itemImageLoad')
           
        },
        itemClick() {
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
    // computed: {
    //     goodsPrice(price) {
    //         console.log(price)
    //         console.log(this.goodsItem.price)
    //         return price.toFixed(2)
    //     }
    // }
   

}
</script>

<style scoped>
.goods-item{
    width: 48%;
    padding-bottom: 40px;
    


    position: relative;
    

}
.goods-item img{
    width: 100%;
    height: 98%;
    border-radius: 5px;
}
.goods-info{
    overflow: hidden;
    text-align: center;

    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;
    


}
.goods-info p{

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-bottom: 3px;
}

</style>

