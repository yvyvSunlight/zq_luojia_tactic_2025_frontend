import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElmentPlus from 'element-plus'
import 'element-plus/dist/index.css'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(ElmentPlus)
app.mount('#app')

