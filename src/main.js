import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// ++++++++++++ mainStyle.css ++++++++++++
import "./assets/mainStyle.css"
// ++++++++++++ bootstrap 5 ++++++++++++
import 'bootstrap/dist/css/bootstrap.min.css' 
// ++++++++++++ fontawesome library ++++++++++++
/* import the fontawesome css */
import '@fortawesome/fontawesome-free/css/all.css'
/* import the fontawesome js */
import '@fortawesome/fontawesome-free/js/all.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
