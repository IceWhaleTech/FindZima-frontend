import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue' 
import './index.css'
import './style.css'
import VueGtag from "vue-gtag";

createApp(App).use(VueGtag, {
    config: { id: "G-79K9N4GT5K" }
}).use(i18n).mount('#app')
