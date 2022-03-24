<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0 ">
      <div class="info-header">
          <div class="header-title">用户评价</div>
          <div class="header-more">
              更多
              <i class="arror-right"></i>
          </div>
      </div>

      <div class="info-user">
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>

      <div class="info-detail">
          <p>{{commentInfo.content}}</p>
          <div class="info-other">
              <span>{{commentInfo.created | showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
          <div class="info-imgs">
              <img v-for="(item, index) in commentInfo.images"
                   :key="index"
                   :src="item">
          </div>
      </div>
      
  </div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
    name: "DetailCommentInfo",
    props: {
        commentInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        showDate(value) {
            // 转换成时间
            const date = new Date(value * 1000)
            // console.log(date)
            // 格式
            return formatDate(date, 'yyyy/MM/dd hh:mm:ss')
        }
    }
}
</script>

<style scoped>
.comment-info{
    border-bottom: 5px solid #f2f5f8;

}
.info-header{
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.info-title{
    float: left;
}
.info-more{
    float: right;
}
.info-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
</style>