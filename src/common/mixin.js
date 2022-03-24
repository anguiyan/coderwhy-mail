import {debounce} from './utils'
import {BACK_POSITION} from './const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
      // 节流 debounce
      this.newRefresh = debounce(this.$refs.scroll.refresh,500)
      // 把执行函数分出来
      this.itemImgListener = () => {this.newRefresh() }
      // 全局监听
      this.$bus.$on('itemImageLoad', this.itemImgListener)
        
    },
    deactivated() {
        
  
        // 取消itemImg的全局监听
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0,0)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > BACK_POSITION
        }

    }
}




