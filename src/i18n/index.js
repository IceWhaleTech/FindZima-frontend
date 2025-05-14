import { createI18n } from 'vue-i18n'

import en_US from './locales/en_US.json'
import zh_CN from './locales/zh_CN.json'
import ja_JP from './locales/ja_JP.json'
import de_DE from './locales/de_DE.json'
import es_ES from './locales/es_ES.json'
import fr_FR from './locales/fr_FR.json'
import it_IT from './locales/it_IT.json'
import ko_KR from './locales/ko_KR.json'
import nl_NL from './locales/nl_NL.json'
import pl_PL from './locales/pl_PL.json'
import pt_PT from './locales/pt_PT.json'
import sv_SE from './locales/sv_SE.json'


const messages = {
    "en":en_US,
    "zh":zh_CN,
    "jp":ja_JP,
    "de":de_DE,
    "es":es_ES,
    "fr":fr_FR,
    "it":it_IT,
    "ko":ko_KR,
    "nl":nl_NL,
    "pl":pl_PL,
    "pt":pt_PT,
    "sv":sv_SE,
}

const i18n = createI18n({
    locale: 'en',
    // locale: 'zh_US',
    legacy: false,
    globalInjection: true,
    messages: messages
})

export default i18n