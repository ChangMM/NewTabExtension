<template>
  <div id="search" class="select-no">
    <div class="intro-wrap">
      <p class="time-wrap">
        <span class="hour">{{m_time.hour | calLessTen}}</span>
        <span class="dot">:</span>
        <span class="minute">{{m_time.minute | calLessTen}}</span>
      </p>
      <div class="name-wrap">
        <span>{{m_nickname || '朋友'}},</span>
        <template v-if="m_time.hour >= 0 && m_time.hour < 5">
          <span>夜已深了。</span>
        </template>
        <template v-if="m_time.hour >= 5 && m_time.hour < 8">
          <span>早上好！</span>
        </template>
        <template v-if="m_time.hour >= 8 && m_time.hour < 12">
          <span>上午好！</span>
        </template>
        <template v-if="m_time.hour >= 12 && m_time.hour < 19">
          <span>下午好！</span>
        </template>
        <template v-if="m_time.hour >= 19 && m_time.hour < 24">
          <span>晚上好！</span>
        </template>
      </div>
    </div>
    <div class="search-wrap">
      <!-- 隐藏详细的搜索类别 -->
      <!-- <ul class="search-type-wrap">
        <li v-for="item,index in m_cur_engine.search" :class="{'active': m_search_type == index}" v-on:click="f_choose_search_type(index)">
          <template v-if="item.isLink">
            <a :href="item.url">{{item.name}}</a>
          </template>
          <template v-else>
            {{item.name}}
          </template>
        </li>
      </ul> -->
      <div class="search-input-wrap clearfix">
        <div class="search-logo-wrap" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
          <img :src="m_cur_engine.logo" class="search-logo">
          <img src="https://cdn.Iizhi.cn/icons/down.png" class="down" >
        </div>
        <input type="text" ref="search" class="search-input" v-model="m_search_word" v-on:keyup.enter='f_search'>
        <span class='search-button' v-on:click="f_search">
          <img src="https://cdn.Iizhi.cn/icons/search.png" class="search-icon" alt="搜索图标">
        </span>
      </div>
    </div>
    <div class="search-engine-choose" v-show="m_enginse_choose_show" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
      <div class="choose-panel clearfix">
        <div class="choose-item" v-for="item,index in m_engines" v-on:click="f_choose_engine(index)">
          <img :src="item.logo" class="logo" alt="google">
          <p>{{item.name}}</p>
        </div>
        <div class="choose-item" v-on:click="f_choose_engine('more')">
          <img src="https://cdn.Iizhi.cn/icons/plus.png" class="logo" alt="添加">
          <p>添加更多</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Engine from '../config/Engine.js'
import Status from './Status.js'
export default {
  name: "search",
  data: () => ({
    m_time: {
      hour: 0,
      minute: 0
    },
    m_nickname: '朋友',
    m_search_type: 0,
    m_engines: Engine,
    m_search_word: '',
    m_enginse_choose_show: false,
    m_cur_engine: {
      search: []
    }
  }),
  mounted() {
    try{
      chrome.storage.sync.get(['engine-type', 'nickname'], (value) => {
        this.m_cur_engine = this.m_engines[value['engine-type']]
        this.m_nickname = value['nickname']
      })
    } catch(err) {
      this.m_cur_engine = this.m_engines[0]
    }

    this.$refs.search.focus()
    this.m_time.hour = new Date().getHours()
    this.m_time.minute = new Date().getMinutes()

    // 获取当前时间
    setInterval(() => {
      this.m_time.hour = new Date().getHours()
      this.m_time.minute = new Date().getMinutes()
    }, 1000)

    // 监听昵称修改的变化
    Status.$on('nickname', (nickname) => {
      this.m_nickname = nickname
      try{
        chrome.storage.sync.set({'nickname': nickname}, () => {
          // todo
        })
      } catch (err) {
        // todo
      }
    })
  },
  methods: {
    f_choose_search_type(type) {
      this.m_search_type = type
    },
    f_choose_engine(index) {
      event.stopPropagation()
      if (index == 'more') {
        return window.open('https://wj.qq.com/s/1581201/50d9/')
      }
      this.m_cur_engine = this.m_engines[index]
      this.m_search_type = 0
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
    f_search() {
      if (this.m_search_word.trim() == '') {
        return
      }
      let url = this.m_cur_engine.search[this.m_search_type].url
      window.location.href = url + this.m_search_word
    }
  }
}
</script>
<style lang="scss" scoped>
#search{
  position: absolute;
  width: 680px;
  padding: 40px;
  top:60px;
  left:0;
  right:0;
  margin: auto;
  border-radius: 4px;
  .intro-wrap{
    text-align: center;
    text-shadow: 1px 1px 1px #666;
    .time-wrap{
      color: #fff;
      span{
        display: inline-block;
        height: 60px;
        line-height: 60px;
        font-size: 60px;
        &.dot{
          position: relative;
          top:-5px;
        }
      }
    }
    .name-wrap{
      margin-top: 10px;
      font-size: 16px;
      color: #fff;
      position: relative;
      left: 6px;
    }
  }
  .search-wrap{
    .search-type-wrap{
      list-style: none;
      margin-top: 20px;
      li{
        color: #fff;
        text-shadow: 1px 1px 1px #666;
        width: 56px;
        height: 40px;
        cursor: pointer;
        font-size: 15px;
        line-height: 40px;
        display: inline-block;
        transition: all ease 0.3s;
        a{
          text-decoration: none;
        }
        &.active{
          color: #333;
          text-shadow: 1px 1px 1px #aaa;
        }
        &:hover{
          color: #333;
          text-shadow: 1px 1px 1px #aaa;
        }
      }
    }
    .search-input-wrap{
      position: relative;
      filter: drop-shadow(0 0 10px #eee);
      margin-top: 30px;
      .search-logo-wrap{
        position: absolute;
        top:0;
        left:0;
        height: 46px;
        line-height: 46px;
        width: 54px;
        padding-left: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        .search-logo{
          width: 20px;
          vertical-align: middle;
        }
        .down{
          height: 14px;
          vertical-align: middle;
        }
        &:hover{
          cursor: pointer;
          background-color: #eee;
        }
      }
    }
    .search-input{
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
       letter-spacing: 1.2px;
       font-weight: 400;
       float: left;
    }
    .search-button{
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
      .search-icon{
        height: 24px;
        vertical-align: middle;
      }
    }
  }
  .search-engine-choose{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    .choose-panel{
      width: 600px;
      background-color: #fff;
      position: absolute;
      top:280px;
      border-radius: 4px;
      left:0;
      right:0;
      margin: auto;
      border: 1px solid #eee;
      .choose-item{
        width: 12.5%;
        padding: 8px;
        float:left;
        color: #999;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #eee;
        overflow: hidden;
        position: relative;
        .cancel{
          height: 20px;
          width: 20px;
          position: absolute;
          top:2px;
          right: 2px;
        }
        .logo{
          width:30px;
        }
        &.choose-plus{
          height: 69px;
          line-height: 53px;
          .plus{
            height: 30px;
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
