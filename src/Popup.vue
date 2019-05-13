<template>
  <div id="popup">
    <div class="sites-wrap select-no clearfix">
      <a :href="item.url" v-for="item in m_websites[1].sites">
        <div class="site-item">
          <div class="logo-wrap">
            <img :src="item.logo" class="logo" alt="豆瓣读书">
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </a>
      <!-- <a :href="item.url" v-for="item in m_websites[1].sites">
        <div class="site-item">
          <div class="logo-wrap">
            <img :src="item.logo" class="logo" alt="豆瓣读书">
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </a> -->
    </div>
  </div>
</template>
<script>
import Websites from './config/Website.js'
export default {
  name: "popup",
  data: () => ({
    m_websites: Websites
  })
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  line-height: 1.5;
  font-size: 14px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'PingFang SC', 'Source Sans Pro', 'Hiragino Sans GB', 'Helvetica Neue',Helvetica,'Microsoft Yahei',arial,sans-serif;
}
#popup {
  width: 320px;
  height: 480px;
  position: relative;
  margin: auto;
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
    content: " "; // 1
    display: table; // 2
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
.sites-wrap{
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width:3px!important;
    height:6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius:2px;
    background: #ddd;
  }
  .site-item{
    width: 25%;
    height: 90px;
    padding-top:15px;
    float: left;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
    color: #999;
    font-size: 12px;
    transition: all ease 0.3s;
    &:hover{
      background-color: #efefef;
    }
    .logo-wrap{
      height: 36px;
      line-height: 36px;
      display: inline-block;
      .logo{
        max-height:36px;
        max-width:40px;
        border-radius: 50%;
        border: 1px solid #ddd;
        vertical-align: middle;
      }
    }
    .name{
      margin-top: 8px;
    }
  }
}
</style>
