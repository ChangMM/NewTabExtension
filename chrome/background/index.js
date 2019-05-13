const first_install_config = require('./first_install.json')

let f_init_extension = () => {
  chrome.storage.sync.get('first-install', (value) => {
    if (value['first-install'] == undefined) {
      console.log('第一次安装')
      chrome.storage.sync.set(first_install_config, () => {
        console.log('第一次用户安装配置成功')
      })
    } else {
      console.log('已经是老用户了')
    }
  })
}

f_init_extension()
