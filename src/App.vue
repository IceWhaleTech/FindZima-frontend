<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NavHeader />
      <HeaderBar />
      <div class="gpx max-w-screen-xl mx-auto flex flex-col gap-6 md:gap-[50px] pt-[180px] pb-[100px]">
        <FadeIn>
          <ZimaOS />
        </FadeIn>
        <FadeIn delay="200">
          <ZimaClient />
          <FadeIn delay="300" class="flex justify-center mt-4 md:mt-6">
            <HowToUse />
          </FadeIn>
        </FadeIn>
        <div class="flex flex-col gap-4">
          <FadeIn delay="300">
            <Help class="px-[24px] mt-[4px] py-6 rounded-[30px] border md:px-[80px] md:pt-[39px] md:pb-[35px]" />
          </FadeIn>
          <FadeIn delay="300">
            <Explore />
          </FadeIn>
        </div>
        <div class="text-center text-[12px] mt-[24px] mb-[40px] opacity-80 ">{{ $t('common.copyrights', { year: getCurrentYear() }) }}</div>
      </div>
      <CookieTip />
    </NMessageProvider>
  </NConfigProvider>
</template>
<script setup>
import NavHeader from './components/NavHeader.vue'
import Help from './components/Help.vue'
import Explore from './components/Explore.vue'
import FadeIn from './components/FadeIn.vue'
import ZimaOS from './components/ZimaOS.vue'
import ZimaClient from './components/ZimaClient.vue'
import HowToUse from './components/HowToUse.vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import themeOverrides from './assets/css/naive-overrides';
import HeaderBar from './components/HeaderBar.vue';
import CookieTip from './components/CookieTip.vue';

function getCurrentYear() {
  return new Date().getFullYear();
}
</script>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.anifade1-enter-active {
  animation: fade1 1.2s  ease;
}
.anifade2-enter-active {
  animation: fade2 1.2s  ease;
}
@keyframes fade1 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade2 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>