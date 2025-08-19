<template>
  <div
    class="flex flex-col px-[24px] bg-[#292929] justify-between border rounded-[30px] py-6 text-white mt-[4px] gap-4 lg:flex-row lg:py-5 md:px-[80px]">
    <h4 class="text-[30px] leading-[32px] whitespace-nowrap lg:text-[20px] lg:leading-[24px]">{{ $t('explore.title') }}</h4>
    <p v-html=" $t('explore.desc',{url:`href='https://www.zimaspace.com/${locale==='en_US'?'':locale}' target='_blank'`}) "></p>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n() 
</script>