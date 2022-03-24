import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'



import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// 总线
Vue.prototype.$bus = new Vue()
// 使用自定义弹框插件
Vue.use(toast)
// 移动端300ms延迟
FastClick.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast

}).$mount('#app')
