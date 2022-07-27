import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 去除vue chrome默认阻止事件warning
import 'default-passive-events'
//引入外挂css
import "@/assets/notify.css"
const app = createApp(App)

// 导入ElementUIIcons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(createPinia()).use(router).mount('#app')
