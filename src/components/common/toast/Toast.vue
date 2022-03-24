<template>
  <div class="toast">
      <div v-show="show">{{message}}</div>

  </div>
</template>

<script>
export default {
    name: "Toast",
    props: {
        // 这个是用子组件传数据
        // message: {
        //     type: String,
        //     default: ''
        // },
        // show: {
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            show: false,
            message: 'wowu'
        }
    },
    methods: {
        showToast(message, duration=2000){
            this.show = true
            this.message = message
            
            setTimeout(() => {
                this.show = false
                this.message = ''
                
            },duration)
        }
    }

}
</script>

<style scoped>
.toast{
    color: #fff;
    background-color: rgba(0, 0, 0, 1);

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1px;

    z-index: 9;
}
</style>