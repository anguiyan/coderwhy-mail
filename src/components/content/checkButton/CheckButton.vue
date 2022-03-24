<template>
  <div class="check-button">
      <img src="~assets/img/cart/tick.svg" :class="{check: isChecked}" >
     
  </div>
</template>

<script>
export default {
    name: "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style scoped>
.check-button{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
}
.check{
    border-radius: 50%;
    border: 2px solid red;
    border-color: red;
    background-color: red;
   
}
</style>