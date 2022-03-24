<template>
<div>

  <button @click="addClick">测试</button>
  <div>{{testData}}</div>


</div>

</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      testData: ''
    }
  },
  methods: {
    addClick() {
      this.$store.dispatch('adda', {name: "hehe",height: 112})
    }
  },
  created() {
    this.testData = this.$store.state.cartList;
  }

}
</script>

<style>

</style>