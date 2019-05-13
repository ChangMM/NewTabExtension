import Vue from 'vue'
import Popup from './Popup.vue'
import Filter from './Filter'

Vue.use(Filter)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Popup/>',
  components: { Popup }
})
