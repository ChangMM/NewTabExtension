<template>
  <div id="website">
    <div class="nav">
      <ul>
        <li v-for="item,index in m_site_navs" :class="{'active': m_site_nav == index}" v-on:click="f_choose_website(index)">{{item.type}}</li>
      </ul>
    </div>
    <div class="nav-content clearfix">
      <div class="site-item" v-for="item in m_current_sites">
        <div class="left">
          <img v-if="item.logo == ''||item.logo == undefined" src="https://cdn.Iizhi.cn/logo/google.png" :alt="item.name">
          <img v-else :src="item.logo" :alt="item.name">
        </div>
        <div class="right">
          <span class="add"><span class="tool-tip long">添加到首页</span></span>
          <a class="open" :href='item.url' target="_blank"><span class="tool-tip">打开</span></a>
          <p class="name">{{item.name}}<label class="hot"></label></p>
          <p class="intro">{{item.intro}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Websites from '../config/Website.js'
export default {
  name: "website",
  data: () => ({
    m_site_nav: 0,
    m_site_navs: Websites,
    m_current_sites: Websites[0]
  }),
  methods: {
    f_choose_website(nav) {
      this.m_site_nav = nav
      this.m_current_sites = this.m_site_navs[nav].sites
    },
  }
}
</script>
<style lang="scss" scoped>
.nav{
  position: absolute;
  top:1px;
  left: 0;
  border-right: 1px solid #ddd;
  width: 80px;
  height: 100%;
  background-color: #eee;
  li{
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 13px;
    color: #999;
    transition: all ease 0.3s;
    cursor: pointer;
    &.active,&:hover{
      background-color: #fff;
      color: #333;
    }
  }
}
.site-item{
  margin: 10px auto;
  width: 94%;
  height: 80px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #eee;
  padding-left: 60px;
  position: relative;
  .left{
    position: absolute;
    top:0;
    left:0;
    width: 60px;
    height: 100%;
    text-align: center;
    border-right: 1px dashed #ddd;
    &:after{
      content: '';
      position: absolute;
      width: 16px;
      height: 8px;
      background-color: #f8f9fb;
      border-bottom-left-radius:8px;
      border-bottom-right-radius: 8px;
      border: 1px solid #eee;
      border-top: none;
      top:-1px;
      right:-9px;
    }
    &:before{
      content: '';
      position: absolute;
      width: 16px;
      height: 8px;
      background-color: #f8f9fb;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border: 1px solid #eee;
      border-bottom: none;
      bottom:-1px;
      right:-9px;
    }
    img{
      border: 1px solid #ddd;
      border-radius: 50%;
      height: 44px;
      width: 44px;
      position: relative;
      top:50%;
      margin-top: -22px;
    }
  }
  .right{
    padding: 10px;
    position: relative;
  }
  .name{
    font-weight: bold;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
  }
  .intro{
    color: #666;
    text-align: justify;
    height: 36px;
    font-size: 12px;
    line-height: 18px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .add{
    height: 20px;
    width: 20px;
    display: none;
    position: absolute;
    top:8px;
    right:40px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://cdn.Iizhi.cn/icons/plus.png');
    &:hover{
      background-image: url('https://cdn.Iizhi.cn/icons/plus-hover.png');
      .tool-tip{
        display: block;
      }
    }
    &.stick{
      height: 16px;
      width: 16px;
      top:10px;
      background-image: url('https://cdn.Iizhi.cn/icons/stick.png');
    }
    &.stick:hover{
      background-image: url('https://cdn.Iizhi.cn/icons/stick-hover.png');
      .tool-tip{
        display: block;
      }
    }
  }
  .open{
    height: 16px;
    width: 16px;
    display: none;
    position: absolute;
    top:10px;
    right:10px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://cdn.Iizhi.cn/icons/open.png');
    &:hover{
      background-image: url('https://cdn.Iizhi.cn/icons/open-hover.png');
      .tool-tip{
        display: block;
      }
    }
  }
  .tool-tip{
    display: none;
    background-color: rgba(#000, 0.7);
    font-size: 12px;
    position: absolute;
    padding: 2px;
    border-radius: 2px;
    top: 24px;
    left:50%;
    transform: translateX(-50%);
    display: inline-block;
    color: #fff;
    text-align: center;
    z-index: 999;
    &.long{
      width: 76px;
    }
    width: 40px;
  }
  &:hover{
    .add{
      display: block;
    }
    .open{
      display: block;
    }
    .tool-tip{
      display: none;
    }
  }
}
</style>
