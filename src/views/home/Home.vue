<template>
  <div id="home">  
  
  
 
  <nav-bar class="home-nav"><h2 slot='center'>首页</h2></nav-bar>

  <tab-control      class="tab-control" 
                    ref="tabControl1"
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    v-show="isTabFixed"></tab-control>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll= "contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
    <home-swiper :banners='banners'
                  @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends='recommends'></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" 
                  ref="tabControl2"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
 

  </scroll>
  
  <back-top @click.native="backClick"
            :isShow="isShowBackTop"></back-top>

  
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import { getHomeMultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'

import {itemListenerMixin} from 'common/mixin'


export default {
    name: 'Home',
     components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
      
    },
    mixins: [itemListenerMixin],
    data(){
      return {
        multidata: '',
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}

        },
        currentType:'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
        
        
     
      }
    },
   
    created() {
      this.getHomeMultidata()

      
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


      



    },
    mounted() {
      // scroll卡顿 总线的监听 图片加载后刷新
      // this.$bus.$on('itemImageLoad', () => {
      //   this.$refs.scroll.refresh()
      // })
      // 节流 debounce
      // const newRefresh = debounce(this.$refs.scroll.refresh,500)
      // // 把执行函数分出来
      // this.itemImgListener = () => {newRefresh() }
      // // 全局监听
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    




    },
    activated() {
      // 滚动到保留的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 100)
      this.$refs.scroll.refresh()
      
    },
    deactivated() {
      // 保存离开位置
      this.saveY = this.$refs.scroll.getScrollY()
      

      // 取消itemImg的全局监听
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    computed: {
      showGoods() {
        
        return this.goods[this.currentType].list
      }

    },
    methods: {
// 事件监听 方法

    



      // 导航分类显示
      tabClick(index){
        
        switch(index){
          case 0:
            this.currentType = 'pop'
            console.log(this.currentType)
            break
          case 1:
            this.currentType = 'new'
            console.log(this.currentType)
            break
          case 2:
            this.currentType = 'sell'
            console.log(this.currentType)
            break
        }
        
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        

      },
      // 返回顶部
      backClick() {
        
        this.$refs.scroll.scrollTo(0, 0, 500)
       
      },
      // 显示位置  子传父 传过来position
      contentScroll(position) {
        
        // 规定位置显示图标
        this.isShowBackTop = (-position.y) > 1000
        // 与顶部的距离 是否显示吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        
      },
      // 加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
        
      },
      // 轮播图的图片加载完 tab距离顶部距离
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        
      },
      



// 网络请求函数
      // 轮播图数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // console.log(res)
      
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })

      },
      // 加载分类的  加载更多 下一页
      getHomeGoods(type){
        const page = this.goods[type].page + 1 

        getHomeGoods(type, page).then(res => {
          
            // console.log(res.data.data.list)
          this.goods[type].list.push(...res.data.data.list)
          // console.log(this.goods[type].list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()

        })
      }


    }



}


</script>

<style scoped>
#home{
  height: 100vh;
  /* padding-top: 44px; */
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}
.tab-control{
  position: sticky;

   top: 44px;
  z-index: 9;
}
.content{
  /* 不知道干啥用 */
  /* overflow: hidden; */
  position:absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* margin-top: 44px;
  margin-bottom: 49px; */
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

</style>
