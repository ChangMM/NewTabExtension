import Vue from 'vue'
import App from './App'

let ele = document.createElement('div')
ele.id = 'zj-note'
document.querySelector('body').appendChild(ele)

Vue.config.productionTip = false
new Vue({
  el: '#zj-note',
  template: '<App/>',
  components: { App }
})
