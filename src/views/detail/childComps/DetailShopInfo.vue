<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span class="title">{{shop.name}}</span>
      </div>
      <div class="shop-middle">
          <div class="shop-middle-item shop-middle-left" >
              <div class="info-sells">
                  <div class="sells-count">
                      {{shop.sells | sellCountFilter}}
                  </div>
                  <div class="sells-text">总销量</div>
              </div>
              <div class="info-goods">
                  <div class="goods-count">
                      {{shop.goodsCount}}
                  </div>
                  <div class="goods-text">全部宝贝</div>
              </div>
              
          </div>
          <div class="shop-middle-item shop-middle-right" >
              <table>
                  <tr v-for="(item, index) in shop.score">
                      <td>{{item.name}}</td>
                      <td class="score" :class="{'score-better': item.isBetter}">
                          <span>{{item.score}}</span>
                        </td>
                      <td class="better" :class="{'better-more': item.isBetter}">
                          <span>{{item.isBetter ? '高': '低'}}</span>
                      </td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
      </div>
      
  </div>
</template>

<script>
export default {
    name:"DetailShopInfo",
    props: {
        shop: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        sellCountFilter(value) {
            let result = value;
            if(value > 10000) {
                result = (result / 10000).toFixed(1) + '万'
            }
            return result
        }
    }
}
</script>

<style scoped>
.shop-info{
    border-bottom: 5px solid #f2f5f8;
}
.shop-top{
    display: flex;
    /* 垂直居中 */
    align-items: center;
    
}
.shop-info img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1)
}
.shop-info .title{
    margin-left: 10px;
    /* vertical-align: middle; */
}
.shop-middle{
    display: flex;
    align-items: center;
}
.shop-middle-item{
    flex: 1;
}
.shop-middle-left{
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1)
}
.shop-middle-right table{
    width: 120px;
    margin-left: 30px;
}
.shop-middle-right table td{
    padding: 5px 0;
}
.shop-middle-right .score{
    color:  #5ea732;
}
.shop-middle-right .score-better{
    color: #f13e3a;
}
.shop-middle-right .better span{
    background-color: #5ea732;
    color: #fff;
    text-align: center;
    
}
.shop-middle-right .better-more span{
    background-color: #f13e3a;
}
</style>