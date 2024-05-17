import { createApp } from 'vue'
import i18n from './i18n'
import './assets/scss/app.scss'
import App from './App.vue' 

import VueGtag from "vue-gtag";

createApp(App).use(VueGtag, {
    config: { id: "G-79K9N4GT5K" }
}).use(i18n).mount('#app')
