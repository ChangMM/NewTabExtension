<template>
  <div id="zj-inject-note-wrap">
    <div id="zj-inject-note">
      <div class="note-header">
        <div class="note-type-wrap clearfix">
          <div class="note-type-item">
            <span class="icon icon-jishi"></span>
            <p>新建记事</p>
          </div>
          <div class="note-type-item">
            <span class="icon icon-lianjie"></span>
            <p>采集链接</p>
          </div>
          <div class="note-type-item">
            <span class="icon icon-image"></span>
            <p>添加图片</p>
          </div>
        </div>
        <div class="textarea" contenteditable="true" v-on:focus='f_focus_textarea' v-on:blur='f_blur_textarea'>
          <div class="note-url" contenteditable="false">
            <img src="https://cdn.Iizhi.cn/logo/google.png" class="note-url-logo" alt="谷歌">
            <p class="title">知乎-发现更大的世界。发现更大的世界。发现更大的世界。</p>
            <p class="url">https://zhihu.com</p>
            <span class="delete-url" title="删除链接"></span>
          </div>
          请在这里记录...
        </div>
        <div class="label-wrap select-no">
          <i class="label-icon"></i>
          <label v-for="item,index in m_current_labels">
            {{item}}
            <img src="https://cdn.Iizhi.cn/icons/close-hover.png" v-on:click="f_delete_label(index)" class="cancel" alt="删除">
          </label>
          <input type="text" v-model="m_label_input" class="label-input" v-on:keyup.enter="f_add_label" placeholder="回车添加标签">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "note",
  data: () => ({
    m_note_show: false,
    m_current_labels: [],
    m_label_input: ''
  }),
  mounted() {
    this.f_init_event()
  },
  methods: {
    f_init_event() {
    },
    f_add_label() {
      this.m_current_labels.push(this.m_label_input)
      this.m_label_input = ''
    },
    f_delete_label(index) {
      this.m_current_labels.splice(index, 1)
    },
    f_focus_textarea() {
      if (event.currentTarget.innerHTML.trim() == '请在这里记录...') {
        event.currentTarget.innerHTML = ''
      }
    },
    f_blur_textarea() {
      if (event.currentTarget.innerHTML.trim() == '') {
        event.currentTarget.innerHTML = '请在这里记录...'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../_base.scss";
#zj-inject-note-wrap{
  top: 0;
  bottom: 0;
  width: 370px;
  left:-360px;
  position: fixed;
  z-index: 999999999;
  color: #333;
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1.5px;
  box-sizing: border-box;
  padding-right: 10px;
  transition: left ease 0.2s;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: 'PingFang SC', 'Source Sans Pro', 'Hiragino Sans GB', 'Helvetica Neue',Helvetica,'Microsoft Yahei',arial,sans-serif;
  &:hover{
    left:0;
  }
}
#zj-inject-note{
  position: absolute;
  top:0;
  left:0;
  width: 360px;
  height: 100%;
  padding-top: 360px;
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  .note-header{
    height: 360px;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    background-color: #eee;
    padding-bottom:30px;
    padding-top: 131px;
    box-sizing: border-box;
    .note-type-wrap{
      top:0;
      left:0;
      width: 100%;
      padding: 15px;
      position: absolute;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      .note-type-item{
        height: 100px;
        width: 100px;
        float: left;
        color: #666;
        margin-right: 15px;
        border-radius: 4px;
        background-color: #ddd;
        text-align: center;
        cursor: pointer;
        transition: all ease 0.3s;
        p{
          text-align: center;
        }
        .icon{
          height: 36px;
          width: 36px;
          display: inline-block;
          margin-top: 14px;
          margin-bottom: 4px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          transition: all ease 0.3s;
        }
        .icon-jishi{
          background-image: url('https://cdn.Iizhi.cn/icons/jishi-1.png')
        }
        .icon-lianjie{
          background-image: url('https://cdn.Iizhi.cn/icons/lianjie.png')
        }
        .icon-image{
          background-image: url('https://cdn.Iizhi.cn/icons/image.png')
        }
        &:hover{
          color: #333;
          background-color: #d0d0d0;
          .icon-jishi{
            background-image: url('https://cdn.Iizhi.cn/icons/jishi-1-hover.png')
          }
          .icon-lianjie{
            background-image: url('https://cdn.Iizhi.cn/icons/lianjie-hover.png')
          }
          .icon-image{
            background-image: url('https://cdn.Iizhi.cn/icons/image-hover.png')
          }
        }
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .textarea{
      border: none;
      outline: none;
      padding: 15px;
      height: 200px;
      font-size: 12px;
      max-height: 200px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width:4px!important;
        height:6px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius:2px;
        background: #d0d0d0;
      }
      .note-url{
        background-color: #ddd;
        height: 44px;
        padding-left: 44px;
        position: relative;
        margin-top: 4px;
        margin-bottom: 4px;
        border-radius: 2px;
        border: 1px solid #d0d0d0;
        padding-right: 30px;
        .note-url-logo{
          height:34px;
          width:34px;
          top:5px;
          left:5px;
          border-radius: 50%;
          position: absolute;
        }
        .title{
          height: 24px;
          font-size: 14px;
          font-weight: bold;
          line-height: 26px;
          max-width: 100%;
          overflow-x: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .url{
          height: 20px;
          line-height: 20px;
          max-width: 100%;
          overflow-x: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .delete-url{
          height: 24px;
          width: 24px;
          position: absolute;
          cursor: pointer;
          top:10px;
          right: 6px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('https://cdn.Iizhi.cn/icons/delete-link.png');
          &:hover{
            background-image: url('https://cdn.Iizhi.cn/icons/delete-link-hover.png');
          }
        }
      }
    }
    .label-wrap{
      position: absolute;
      bottom:0;
      left:0;
      height: 30px;
      line-height: 28px;
      width: 100%;
      font-size: 12px;
      box-sizing: border-box;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding-left: 30px;
      .label-icon{
        position: absolute;
        top:5px;
        left: 5px;
        height: 20px;
        width: 20px;
        background: url('https://cdn.Iizhi.cn/icons/label.png') no-repeat center;
        background-size: contain;
      }
      label{
        height: 22px;
        padding: 0 6px;
        border-radius: 10px;
        line-height: 22px;
        background-color: #ddd;
        display: inline-block;
        margin-left: 6px;
        &:first-child{
          margin-left:0;
        }
        .cancel{
          height: 12px;
          width: 12px;
          vertical-align: -2px;
          cursor: pointer;
        }
      }
      .label-input{
        height: 22px;
        border: none;
        width: 80px;
        margin-left: 6px;
        outline: none;
        border-bottom: 1px solid #ddd;
        background-color: transparent;
      }
    }
  }
  .note-trigger{
    top:0;
    right:-20px;
    width: 20px;
    height: 100%;
    background-color: red;
    position: absolute;

  }
}
</style>
