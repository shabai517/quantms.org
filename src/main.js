import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ELIcons from '@element-plus/icons-vue'

const app = createApp(App)
router.afterEach(() => {
  window.scrollTo(0, 0)
})
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
app.use(store).use(router).mount('#app')
