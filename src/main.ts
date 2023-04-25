import { createApp } from 'vue'
// import "./style.css"
import ArcoVue from '@arco-design/web-vue';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue'
import './samples/node-api'
import '@arco-design/web-vue/dist/arco.css';
import router from './router'

createApp(App)
  .use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
