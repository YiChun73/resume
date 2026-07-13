import { createApp } from 'vue'

import App from './App.vue'
import { applyDocumentMeta, i18n } from './i18n'
import router from './router'

import '@/styles/main.scss'

const app = createApp(App).use(router).use(i18n)

applyDocumentMeta()

app.mount('#app')
