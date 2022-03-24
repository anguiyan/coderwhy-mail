<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
      <table class="info-size"
             v-for="(table, index) in paramInfo.sizes"
             :key="index">
          <tr v-for="(tr, indey) in table" :key="indey">
              <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
          </tr>
      </table>
      <table class="info-param">
          <tr v-for="(info, index) in paramInfo.infos">
              <td class="info-param-key">{{info.key}}</td>
              <td class="info-param-value">{{info.value}}</td>
          </tr>
      </table>
      <div class="info-img" v-if="paramInfo.image.length !== 0 ">
          
          <img :src="paramInfo.image" alt="">
          <span>{{paramInfo.image.length}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: "DetailParamInfo",
    props: {
        paramInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    }

}
</script>

<style scoped>
.param-info{
    border-bottom: 5px solid #f2f5f8;
}
table{
    width: 100%;
    border-collapse: collapse;
}
.param-info table tr{
   
    height: 42px;
    text-align: center;
}
.param-info table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1)
}
.info-param-key{
    width: 100px;
}
.info-img img{
    width: 100%;
    height: 200px;
}
</style>