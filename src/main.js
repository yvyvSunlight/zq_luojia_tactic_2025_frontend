import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElmentPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Picker, Button, Popup, Dialog, ConfigProvider} from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
// createApp(App).mount('#app')

const app = createApp(App)
app.config.globalProperties.$axios = axios // 自定义添加
app.use(router)
app.use(ElmentPlus)
app.use(Picker)
app.use(Button)
app.use(Popup)
app.use(Dialog)
app.use(ConfigProvider)
app.mount('#app')

