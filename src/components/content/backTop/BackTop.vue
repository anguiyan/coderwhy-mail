<template>
    <div class="back-top" v-show="isShow" >
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name: "BackTop",
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            
        }
    }

}
</script>

<style scoped>
.back-top{
    position: fixed;
    bottom: 55px;
    right: 8px;
}
</style>