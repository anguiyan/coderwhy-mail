<template>
  <div class="detail">
     
      <detail-nav-bar class="detail-nav" 
                      @titleClick="titleClick"
                      ref="nav"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
      <detail-swiper :topImages="topImages" class="detail-swiper"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info 
        :detail-info="detailInfo"
        @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo"  ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
      </scroll>
      <detail-bottom-bar @addItemCart="addDetailCart"/>
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
      
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'





import {getDetail, Goods, Shop,GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {BACK_POSITION} from 'common/const'
import {mapActions} from 'vuex'

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
     
       
        
        
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs:[],
            getThemeTopY: null,
            currentIndex: 0
            
            
            
        }
    },
    created() {
        this.iid = this.$route.params.iid
        console.log(this.iid)
       // 网络请求 请求detail数据
        this.getDetail(this.iid)
        // 网络请求 请求推荐数据
        this.getRecommend()
        // 距离顶部数据
        this.getThemeTopY = () => {this.themeTopYs =[]
               this.themeTopYs.push(0);
               this.themeTopYs.push(this.$refs.params.$el.offsetTop);
               
               this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
               this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
               this.themeTopYs.push(Number.MAX_VALUE)
               
               }
            


        
        
        
    },
    mounted() {
        // 全局监听刷新
      
    },
    deactivated() {
      

      // 取消itemImg的全局监听
      
    },
    methods: {
// 方法
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh()
            // console.log('refresh')


            // 图片加载完后  记录标题的各个位置
            // this.themeTopYs =[]
            //    this.themeTopYs.push(0);
            //    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //    console.log(this.$refs.params.$el.offsetTop)
            //    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            //    console.log(this.themeTopYs)


            this.getThemeTopY()
            

        },
        // navBar点击事件 标题点击 滚动到具体位置
        titleClick(index) {
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
        },
        
        // 滚动事件 滚动到哪 导航对应
        contentScroll(position) {
            
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i = 0; i < length; i++ ){
                // if(this.currentIndex != i && (i< length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
                // || i === length-1 && positionY >= this.themeTopYs[i])){
                //     this.currentIndex = i;
                //     this.$refs.nav.currentIndex = this.currentIndex
                // }
                // 在最后添加最大值，不用分条件
                if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
                )){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }

            // 是否显示  回到顶部
           this.listenShowBackTop(position)



        },
        // 添加到购物车
        addDetailCart() {
            // 购物车显示 的数据   放到一个对象里
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price =this.goods.realPrice;
            product.iid = this.iid;
            
            // 把商品放到购物车里
            // this.$store.dispatch('addCart' , product).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })

            // 用actions的映射  不用dispatch了，当成自己的方法
            this.addCart(product).then(res => {
                console.log(res)
                // 自定义弹框插件 $toast调用方法
                this.$toast.showToast(res)
                
            })




        },
       





// 网络请求
        getDetail(iid) {
            
            getDetail(iid).then(res => {
                
                const data = res.data.result
                this.topImages = data.itemInfo.topImages

                // 把多处的数据放到一个类里
                // 商品基础信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                // 商店信息
                this.shop = new Shop(data.shopInfo)
                
                // 详情图片信息
                this.detailInfo = data.detailInfo
                //参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                // 评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
                


            }).catch(err => {
                console.log(err)
            })
           
        },
        getRecommend() {
            getRecommend().then(res => {
                // console.log(res)
                this.recommends = res.data.data.list
                // console.log(this.recommends)
            }).catch(err => {
                console.log(err)
            })
        }
        
    }
}
</script>

<style scoped>
.detail{
     height: 100vh;
  
  position: relative;
  z-index: 1;
  
}
.detail-nav{
    /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  position: relative;
  z-index: 9;
  background-color: #fff;

}


 
.content{

    background-color: #fff;
    height: calc(100vh - 44px - 49px);

  
  /* position:absolute;
  top:44px;
  bottom: 98px;
  
  left: 0;
  right: 0; */

}
</style>