let Http = {}

let url_prefix = 'https://api.iizhi.cn'

// json 格式化数据
const f_format_data = (data) => {
  let format_data
  try {
    format_data = JSON.parse(data)
  } catch (err) {
    format_data = data
  }
  return format_data
}

Http.install = function (Vue, options) {
  Vue.mixin({
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      $get_daily_article() {
        return this.$http.get(url_prefix + '/api/article/today').then((response) => {
          return new Promise(function (resolve) {
            resolve(f_format_data(response.body))
          })
        })
      },
      $get_random_article() {
        return this.$http.get(url_prefix + '/api/article.random').then((response) => {
          return new Promise(function (resolve) {
            resolve(f_format_data(response.body))
          })
        })
      },
      $get_image_total() {
        return new Promise(function (resolve) {
          resolve(14)
        })
      },
      $get_video_total() {
        return new Promise(function (resolve) {
          resolve(50)
        })
      }
    }
  })
}
export default Http
