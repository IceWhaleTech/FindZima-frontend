<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>
<template>
  <div class="bg-[#EBF3FF] flex flex-col gap-5 lg:flex-row">
    <h3 class="text-[30px] leading-[32px] flex-1 mb-2 md:text-[36px]">{{ $t('help.title') }}</h3>
    <p class="w-auto leading-5 lg:w-[22%]"
      v-html="$t('help.desc', { urlP: `href='https://docs.zimaspace.com/zimaos/How-to-download-and-install-ZimaClient.html' target='_blank'`, urlC: `href='https://www.zimaspace.com/${locale}/support/contact?utm_source=head&utm_medium=menu' target='_blank'`, })">
    </p>
    <p class="w-auto leading-5  lg:w-[24%] lg:text-right" v-html="$t('help.support',{url:`href='https://icewhale.community' target='_blank'`,urlD:`href='https://discord.com/invite/f9nzbmpMtU' target='_blank'`})"></p>
  </div>
</template>