<template>
  <NavHeader />
  <div class="wrapper pt-16">
    <h3 v-if="scanShow" class="text-[30px] leading-[32px] px-[24px] mb-[20px] md:text-[34px] md:px-[80px] md:mb-[40px]">{{ $t("common.title") }}</h3>
    <DefaultCard v-if="!scanShow" v-model:scanShow="scanShow" />
    <div v-else class="flex flex-row gap-[4px] ">
      <MainCard class="flex-1 border lg:block" :class="{ hidden: item.index == 1 }" v-for="item in cardArry"
        :title="item.title" :index="item.index" :description="item.description">
        <component :mode="'row'" :is="item.compo" />
      </MainCard>
    </div>
    <Mobile class="block mt-1 lg:hidden" />
    <Help class="px-[24px] mt-[4px] py-6 rounded-[14px] border md:px-[80px] md:pt-[39px] md:pb-[35px]" />
    <div
      class="flex flex-col px-[24px] bg-[#292929] justify-between border rounded-[14px] py-6 text-white mt-[4px] gap-4 lg:flex-row lg:py-5 md:px-[80px]">
      <h4 class="text-[30px] leading-[32px] whitespace-nowrap lg:text-[20px] lg:leading-[24px]">{{ $t('explore.title') }}</h4>
      <p v-html=" $t('explore.desc',{url:`href='https://www.zimaspace.com/' target='_blank'`}) "></p>
    </div>
    <div class="text-center text-[12px] mt-[24px] mb-[40px] opacity-80 ">{{ $t('common.copyrights') }}</div>
    <CookieTip />
  </div>
</template>
<script setup>
import NavHeader from './components/NavHeader.vue'
import DefaultCard from './components/DefaultCard.vue'
import MainCard from './components/MainCard.vue'
import Clients from './components/Clients.vue'
import DeviceWrapper from './components/DeviceWrapper.vue'
import Help from './components/Help.vue'
import Mobile from './components/Mobile.vue'
import CookieTip from './components/CookieTip.vue'
import { useI18n } from 'vue-i18n'
import { computed, provide, ref } from 'vue'

const { t } = useI18n() 

const scanShow = ref(false)

isMobile()? scanShow.value = true : scanShow.value = false


function isMobile() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let getArr = Agents.filter(i => userAgentInfo.includes(i));
  return getArr.length ? true : false;
}

const cardArry = computed(()=>{
  return [
  {
    title: t('client.title'),
    index: 1,
    compo: Clients,
    description: t('client.desc'),
  },
  {
    title:  t('device.title'),
    index: 2,
    compo: DeviceWrapper,
    description:  t('device.desc')
  }
]
}) 
</script>