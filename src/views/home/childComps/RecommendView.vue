<template>
<div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
        </a>
    </div>
</div>
  
</template>

<script>
export default {
    name:'RecommendView',
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }


}
</script>

<style scoped>
.recommend{
    width: 100%;
    display: flex;
    border-bottom: 8px solid #eee;
}

.recommend-item{
    flex: 1;
}



.recommend-item img{
    width: 65px;
    height: 65px;
}

</style>