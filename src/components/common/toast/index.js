import Toast from './Toast'


const obj = {}

obj.install = function (Vue) {
   

    // 1.创建构造器
    const toastConstrustor = Vue.extend(Toast)
    // 2.新创建组件对象
    const toast = new toastConstrustor()
    // 3.对象手动挂载到元素上
    toast.$mount(document.createElement('div'))
    // 4.toast.$el对应div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}



export default obj



