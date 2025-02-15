import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LoadScript from 'vue-plugin-load-script'
import App from './App.vue'
import router from './router'
import SvgIcon from '@jamescoyle/vue-icon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(LoadScript)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
