<template>
  <div id="zj-inject-search" :class="{'zj-inject-search-in': !this.m_search_show, 'zj-inject-search-out': this.m_search_show}">
    <div class="zj-search-wrap">
      <div class="zj-search-input-wrap clearfix">
        <div class="zj-search-logo-wrap" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
          <img :src="m_cur_engine.logo" class="zj-search-logo" alt="搜索引擎logo">
          <img src="https://cdn.Iizhi.cn/icons/down.png" class="zj-down" alt="下拉按钮">
        </div>
        <input type="text" ref="search" class="zj-search-input" v-model="m_search_word" v-on:keyup.enter='f_search'>
        <span class='zj-search-button' v-on:click="f_search">
          <img src="https://cdn.Iizhi.cn/icons/search.png" class="zj-search-icon" alt="搜索图标">
        </span>
      </div>
    </div>
    <div class="zj-search-engine-choose" v-show="m_enginse_choose_show" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
      <div class="zj-choose-panel clearfix">
        <div class="zj-choose-item" v-for="item,index in m_engines" v-on:click="f_choose_engine(index)">
          <img :src="item.logo" class="zj-logo" alt="google">
          <p>{{item.name}}</p>
        </div>
        <div class="zj-choose-item" v-on:click="f_choose_engine('more')">
          <img src="https://cdn.Iizhi.cn/icons/plus.png" class="zj-logo" alt="添加">
          <p>添加更多</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Engine from '@/config/Engine.js'
export default {
  name: "zj-inject-search",
  data: () => ({
    m_search_show: false,
    m_engines: Engine,
    m_search_word: '',
    m_enginse_choose_show: false,
    m_cur_engine: {
      logo: '',
      search: []
    }
  }),
  mounted() {
    this.m_cur_engine = this.m_engines[0]
    try{
      chrome.storage.sync.get('engine-type', (value) => {
        this.m_cur_engine = this.m_engines[value['engine-type']]
      })
    } catch(err) {
      console.log('未安装插件')
    }
    this.f_init_event()
  },
  methods: {
    f_init_event() {
      window.document.addEventListener('keydown', (e) => {
        const ctrlKey = e.ctrlKey || e.metaKey
        const shiftKey = e.shiftKey
        if (ctrlKey && e.keyCode == 75) {
          this.f_trigger_search()
          return
        }
        if (e.keyCode == 27) {
          this.m_enginse_choose_show = false
          this.m_search_show = false
          return
        }
      })
    },
    f_trigger_search() {
      this.m_search_show = !this.m_search_show
      if (this.m_search_show) {
        this.$refs.search.focus()   //自动聚焦搜索输入框
      }
      if (this.m_enginse_choose_show) {
        this.m_enginse_choose_show = false
      }
    },
    f_search() {
      if (this.m_search_word.trim() == '') {
        return
      }
      let url = this.m_cur_engine.search[0].url
      window.open(url + this.m_search_word)
    },
    f_choose_engine(index) {
      event.stopPropagation()
      if (index == 'more') {
        return window.open('https://wj.qq.com/s/1581201/50d9/')
      }
      this.m_cur_engine = this.m_engines[index]
      this.m_enginse_choose_show = !this.m_enginse_choose_show
      // 将选择的结果存储在 storage 里面。
      try {
        chrome.storage.sync.set({"engine-type": index}, () => {
          console.log('设置搜索引擎成功')
        })
      } catch (err) {
        console.log('未安装插件')
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../_base.scss";
#zj-inject-search{
  left:0;
  right:0;
  margin: auto;
  padding-top: 20px;
  z-index: 999999999;
  position: fixed;
  width: 600px;
  top: -80px;
  opacity: 0;
  color: #333;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  transition: all ease 0.3s;
  background-color: transparent;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'PingFang SC', 'Source Sans Pro', 'Hiragino Sans GB', 'Helvetica Neue',Helvetica,'Microsoft Yahei',arial,sans-serif;
  &.zj-inject-search-in{
    top: -80px;
    opacity: 0;
  }
  &.zj-inject-search-out{
    top: 0;
    opacity: 1;
  }
  .zj-search-wrap{
    text-align: center;
    background-color: transparent;
    .zj-search-input-wrap{
      display: inline-block;
      position: relative;
      filter: drop-shadow(0 0 20px #ddd);
      background-color: transparent;
      .zj-search-logo-wrap{
        position: absolute;
        top:0;
        left:0;
        height: 46px;
        line-height: 46px;
        width: 54px;
        padding-left: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        .zj-search-logo{
          width: 20px;
          vertical-align: middle;
        }
        .zj-down{
          height: 14px !important; // 解决部分含有图文富文本页面对图片设置的 !important 属性
          vertical-align: middle;
        }
        &:hover{
          cursor: pointer;
          background-color: #eee;
        }
      }
    }
    .zj-search-input{
      width: 550px;
      height: 46px;
      outline: none;
      border: none;
      background-color: #fff;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      font-size: 16px;
      color: #333;
      padding-left: 60px;
      letter-spacing: 1px;
      font-weight: 400;
      float: left;
      box-sizing: border-box;
    }
    .zj-search-button{
      height: 46px;
      width: 50px;
      float: left;
      cursor: pointer;
      line-height: 46px;
      text-align: center;
      display: inline-block;
      background-color: #fff;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      &:hover{
        background-color: #eee;
      }
      &:active{
        background-color: #ddd;
      }
      .zj-search-icon{
        height: 24px !important;
        vertical-align: middle;
      }
    }
  }
  .zj-search-engine-choose{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    .zj-choose-panel{
      width: 600px;
      background-color: #fff;
      position: absolute;
      top:80px;
      border-radius: 4px;
      left:0;
      right:0;
      margin: auto;
      border: 1px solid #eee;
      .zj-choose-item{
        width: 12.5%;
        padding: 8px;
        box-sizing: border-box;
        float:left;
        color: #999;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #eee;
        overflow: hidden;
        position: relative;
        p{
          text-align: center;
        }
        .zj-cancel{
          height: 20px !important;
          width: 20px !important;
          position: absolute;
          top:2px;
          right: 2px;
        }
        .zj-logo{
          width:30px !important;
        }
        &.zj-choose-plus{
          height: 69px;
          line-height: 53px;
          .zj-plus{
            height: 30px !important;
            vertical-align: middle;
          }
        }
        &:hover{
          cursor: pointer;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
