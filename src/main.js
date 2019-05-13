import Vue from 'vue'
import App from './App'
import Filter from './Filter'
import Http from './Http'
import VueResource from 'vue-resource'

// import '../chrome/content-script/note/index.js'
import '../chrome/content-script/search/index.js'

Vue.use(Http)
Vue.use(Filter)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
