<template>
  <div id="app" v-on:click="f_close_panel">
    <wall-paper></wall-paper>
    <header-bar v-on:setting="f_show_setting"></header-bar>
    <search></search>
    <setting v-show="m_setting_show" v-on:close="f_close_setting"></setting>
  </div>
</template>

<script>
import HeaderBar from './components/Header.vue'
import Search from './components/Search.vue'
import Setting from './components/Setting.vue'
import WallPaper from './components/WallPaper/WallPaper.vue'
export default {
  name: 'app',
  data: () => ({
    m_setting_show: false
  }),
  methods: {
    f_show_setting() {
      this.m_setting_show = true
    },
    f_close_setting() {
      this.m_setting_show = false
    },
    f_close_panel() {
      this.m_setting_show = false
    }
  },
  components: {
    Search,
    Setting,
    HeaderBar,
    WallPaper
  }
}
</script>

<style lang='scss'>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'PingFang SC', 'Source Sans Pro', 'Hiragino Sans GB', 'Helvetica Neue', Helvetica, 'Microsoft Yahei', arial, sans-serif;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1.5px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
html,body,#app{
  height: 100%;
  overflow: hidden;
}
#app {
  position: relative;
  background-size: cover;
}
ul{
  list-style: none;
}
a{
  color: inherit;
}
.clearfix{
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
  *zoom:1;
}
.select-no{
  -moz-user-select:none;
  -webkit-user-select:none;
}
</style>
