<template>
  <div class="flex flex-col gap-4 md:gap-6">
    <h2 class="text-[24px] leading-[32px] md:text-[40px] md:leading-[40px]">{{ $t('common.zimaclient') }}</h2>
    <div class="flex flex-col gap-2 md:flex-row md:gap-4">
      <FadeIn v-for="(client,index) in clientList" :key="client.name" :delay="(index+1) * 100" class="flex-1">
        <div  class="flex flex-row md:flex-col gap-2 md:gap-10 border rounded-[30px] p-6 bg-white justify-between">
          <h4 class="text-[20px] leading-[28px]">{{ client.name }}</h4>
          <div v-if="client.isMobile">
            <div>{{$t('client.coming')}}</div>
            <div v-if="false" class="hidden md:block">
              <n-popover trigger="hover" placement="bottom-start" :show-arrow="false" 
                style="padding: 0 !important;background-color: transparent !important;border-radius: 14px;">
                <template #trigger>
                  <NButton secondary>{{ $t('common.qr-code') }}</NButton>
                </template>
                <div class="border rounded-[14px] overflow-hidden">
                  <img :src="client.QRCode" alt="" class="w-[120px] h-[120px]">
                </div>
              </n-popover>
              <NButton text class="hidden md:inline-block ml-2" @click="openStore(client.storeLink!)">
                {{ client.storeName }}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" d="M6 4.5L9.5 8L6 11.5" stroke-width="1"/></svg>
              </NButton>
            </div>
            <div v-if="false" class="block md:hidden">
              <NButton :type="currentOS === client.name ? 'primary' : 'default'" :secondary="currentOS !== client.name" @click="openStore(client.storeLink!)">{{ client.storeName }}</NButton>
            </div>
          </div>
          <div v-else>
            <NButton :type="currentOS === client.name ? 'primary' : 'default'" :secondary="currentOS !== client.name" @click="downloadClient(client.name!)">
                {{ $t('common.download') }}
            </NButton>
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { NPopover } from 'naive-ui';
import { event } from "vue-gtag";
import FadeIn from './FadeIn.vue';
// @ts-ignore
import QR_iOS from '../assets/images/code-ios.png';
// @ts-ignore
import QR_Android from '../assets/images/code-android.png';

const mac_intel_link
  = 'https://zima-client.r2.icewhale.io/get/v2/mac/x64/latest'
const mac_arm_link
  = 'https://zima-client.r2.icewhale.io/get/v2/mac/arm64/latest'
const win_link
  = 'https://zima-client.r2.icewhale.io/get/v2/win/x64/latest'

const defaultClientList = [
  {
    name: 'macOS',
    isMobile: false,
  },
  {
    name: 'Windows',
    isMobile: false,
  },
  {
    name: 'iOS',
    isMobile: true,
    QRCode: QR_iOS,
    storeName: 'App Store',
    storeLink: 'https://apps.apple.com/app/zima-client/id6743763150',
  },
  {
    name: 'Android',
    isMobile: true,
    QRCode: QR_Android,
    storeName: 'Google Play',
    storeLink: 'https://play.google.com/store/apps/details?id=net.icewhale.zima',
  }
]

const currentOS = ref('')
const sortBy = ref<string[]>([])
const clientList = ref<any[]>([])
onMounted(() => {
  currentOS.value = getOS()
  clientList.value = defaultClientList.sort((a, b) => sortBy.value.indexOf(a.name) - sortBy.value.indexOf(b.name))
})

const getOS = () => {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes('iPhone')) {
    sortBy.value = ['iOS', 'Android', 'macOS', 'Windows']
    return 'iOS';
  } else if (userAgent.includes('Android')) {
    sortBy.value = ['Android', 'iOS', 'macOS', 'Windows']
    return 'Android';
  } else if (userAgent.includes('Mac')) {
    sortBy.value = ['macOS', 'Windows', 'iOS', 'Android']
    return 'macOS';
  } else if (userAgent.includes('Windows')) {
    sortBy.value = ['Windows', 'macOS', 'iOS', 'Android']
    return 'Windows';
  } else  {
    sortBy.value = ['macOS', 'Windows', 'iOS', 'Android']
    return 'Unknown';
  }
}

const downloadClient = (type: string) => {
  if (type) {
    type == 'macOS' ? downloadMac() : downloadWin()
  }
}


const openStore = (storeLink: string) => {
  window.open(storeLink, '_blank')
}

const downloadMac = () => {
  event("download", {
    event_category: "download",
    event_label: "mac",
  });
  const canvas = document.createElement("canvas");
  const w = canvas.getContext("webgl");
  if (w) {
    const d = w.getExtension("WEBGL_debug_renderer_info");
    const g = (d && w.getParameter(d.UNMASKED_RENDERER_WEBGL)) || "";
    if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
      window.open(mac_arm_link);
      return;
    }
  }
  window.open(mac_intel_link);
};

const downloadWin = () => {
  event("download", {
    event_category: "download",
    event_label: "win",
  });

  window.open(win_link);
};

</script>