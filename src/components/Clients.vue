<template>
  <div v-if="mode == 'row'" class="flex flex-row gap-[4px]">
    <div v-for="item in cards" class="flex-1 bg-neutral-50 border rounded-[8px] pt-4 pr-3 pb-3 pl-4 transition hover:shadow-md"
      :class="[
        item.icon?'cursor-pointer hover:shadow-md': 'cursor-default',
        currentOS == item.icon ? 'bg-primary text-white' : 'bg-[#EEE]'
      ]" @click="handleDownload(item.icon)">
      <h5 class="text-[20px] leading-[24px]">{{ item.title }}</h5>
      <p class="text-[13px] leading-[16px] whitespace-nowrap opacity-0">{{ item.version }}</p>
      <div class="mt-[57px]">
        <div class="flex justify-end" v-if="item.icon">
          <figure class="flex whitespace-nowrap items-center image border p-[8px] rounded-[12px] bg-[#EEEEEE]" >
            <Mac v-if="item.icon == 'mac'" :style="{ fill: '#3c3c3c' }" />
            <Win v-if="item.icon == 'win'" :style="{ fill: '#3c3c3c' }" />
            <a :class="locale=='ja-JP'?'text-[13px]':'text-[15px]'">{{$t('common.download')}}</a>
          </figure>
        </div>
        <div class="whitespace-nowrap flex justify-end" v-else>
          <a class="border p-[8px] rounded-[12px] bg-[#EEEEEE] text-black hover:text-primary" 
          :class="locale=='ja-JP'?'text-[13px]':'text-[15px]'"
          href="https://github.com/IceWhaleTech/zimaos-rauc/issues" target="_blank">
            <span>{{ $t("client.provide") }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-row flex-wrap gap-[4px]">
    <div v-for="item in cards" class="flex flex-col justify-between bg-neutral-50 border rounded-[8px] pt-4 pr-3 pb-3 pl-4 transition"
      :class="[
        item.icon?'cursor-pointer hover:shadow-md flex-1 w-1/2 h-[278px]': 'cursor-default w-full h-[122px]',
        currentOS == item.icon ? 'bg-primary text-white' : 'bg-[#EEE]'
      ]" @click="handleDownload(item.icon)">
      <div>
        <h5 class="text-[30px] leading-[32px]">{{ item.title }}</h5>
        <p v-if="!item.icon" class="text-[13px] leading-[16px] whitespace-nowrap opacity-35">{{ item.version }}</p>
      </div>
      <div>
        <div class="flex justify-end text-black" v-if="item.icon">
          <figure class="flex items-center image border p-[8px] rounded-[12px] bg-[#EEEEEE]" >
            <Mac v-if="item.icon == 'mac'" :style="{ fill: '#3c3c3c' }" />
            <Win v-if="item.icon == 'win'" :style="{ fill: '#3c3c3c' }" />
            <a class="ml-1">{{$t('common.download')}}</a>
          </figure>
        </div>
        <div class="whitespace-nowrap flex justify-end" v-else>
          <a class="text-[15px]  border p-[8px] rounded-[12px] bg-[#EEEEEE] text-black hover:text-primary" href="https://github.com/IceWhaleTech/zimaos-rauc/issues" target="_blank">
            <span>{{ $t("client.provide") }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import Mac from "../assets/images/mac.svg";
import Win from "../assets/images/win.svg";
import { event } from "vue-gtag";
import { useI18n } from 'vue-i18n'

const props = defineProps({
  mode:{
    type: String, // row
  }
})

const { t , locale} = useI18n() 

// 获取版本号
// https://zimaos.oss-accelerate.aliyuncs.com/client/releases/darwin/arm64/RELEASES.json
const cards = computed(()=>(
  [
    {
      title: 'macOS',
      version: 'V 0.1.10 2024.6.3',
      icon: 'mac',
    },
    {
      title: 'Windows',
      version: 'V 0.1.10 2024.6.3',
      icon: 'win',
    },
    {
      title: 'Mobile',
      version: t('client.coming'),
    }
  ]
)) 

const currentOS = ref('');
onMounted(() => {
  currentOS.value = getOS();
  // fetch('https://zimaos.oss-accelerate.aliyuncs.com/client/releases/darwin/arm64/RELEASES.json')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
});

const getOS = () => {
  //   const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

  if (macosPlatforms.indexOf(platform) !== -1) {
    return 'mac';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return 'win';
  } else {
    return 'Unknown';
  }
}



const mac_intel_link =
  "https://zima-client.r2.icewhale.io/v2/mac/x64/Zima-2.0.0-mac-x64.dmg";
const mac_arm_link =
  "https://zima-client.r2.icewhale.io/v2/mac/arm64/Zima-2.0.0-mac-arm64.dmg";
const win_link =
  "https://zima-client.r2.icewhale.io/v2/win/x64/Zima-2.0.0-win-x64.exe";

const handleDownload = (type) => {
  if (type) {
    type == 'mac' ? downloadMac() : downloadWin()
  }
}

const downloadMac = () => {
  event("download", {
    event_category: "download",
    event_label: "mac",
  });
  const w = document.createElement("canvas").getContext("webgl");
  const d = w.getExtension("WEBGL_debug_renderer_info");
  const g = (d && w.getParameter(d.UNMASKED_RENDERER_WEBGL)) || "";
  if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
    window.open(mac_arm_link);
  } else {
    window.open(mac_intel_link);
  }
};

const downloadWin = () => {
  event("download", {
    event_category: "download",
    event_label: "win",
  });

  window.open(win_link);
};

</script>