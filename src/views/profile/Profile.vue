<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <ul >
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        

      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'



  // console.log(BScroll)













export default {
    name: 'Profile',
    data() {
      return {
        scroll: null
      }
    },
    mounted() {

        const bscroll = new BScroll(this.$refs.wrapper,{
          probeType: 3,
          click: true,
          pullUpLoad: true
        })

        bscroll.on('scroll', (position) => {
          console.log(position)
          })

        bscroll.on('pullingUp', () => {
          console.log('上拉加载更多')
          bscroll.finishPullUp()
          // setTimeout(() => {
          //   bscroll.finishPullUp()
          // }, 2000);
        })


        




    }

}
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: red;
  overflow: hidden;
}
</style>

