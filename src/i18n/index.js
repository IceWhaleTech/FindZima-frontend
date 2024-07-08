import { createI18n } from 'vue-i18n'

import en_US from './locales/en_US.json'
import zh_CN from './locales/zh_CN.json'
import ja_JP from './locales/ja_JP.json'

const messages = {
    "en-US":en_US,
    "zh-CN":zh_CN,
    "ja-JP":ja_JP
}

const i18n = createI18n({
    locale: 'en-US',
    // locale: 'zh_US',
    legacy: false,
    globalInjection: true,
    messages: messages
})

export default i18n