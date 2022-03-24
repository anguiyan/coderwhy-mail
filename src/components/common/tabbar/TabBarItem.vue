<template>
  <div class="tab-bar-item" @click="tabbarClick" >
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
       <div :style="activeStyle"><slot name="item-text"></slot></div>
       
      
      <!-- <img src="../assets/img/tabbar/home.svg" alt="">
      <div>首页</div> -->
  </div>

</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return {
            //  isActive:true
        }
    },

    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1
//让每一个组件都和当前活跃的  path作对比  包含不是-1
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}
        }
//绑定样式 计算属性  1.需要判断是不是活跃 2.需要给color赋值新传过来的值  ？：
    },

    methods:{
        tabbarClick(){
            this.$router.replace(this.path)
        }
    }

}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top: 3px;

    
}
.active{
    color:red;
}

</style>