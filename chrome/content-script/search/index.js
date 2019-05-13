import Vue from 'vue'
import App from './App'
// import '../body.scss'

let ele = document.createElement('div')
ele.id = 'zj-search'
document.querySelector('html').appendChild(ele)

Vue.config.productionTip = false
new Vue({
  el: '#zj-search',
  template: '<App/>',
  components: { App }
})
