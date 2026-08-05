import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'
import { vuetify } from './plugins/vuetify'

createApp(App)
  .use(vuetify)
  .use(createPinia())
  .use(router)
  .mount('#app')
