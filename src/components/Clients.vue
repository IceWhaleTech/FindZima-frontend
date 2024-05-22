<template>
  <div class="flex flex-row gap-[4px]">
    <div v-for="item in cards" class="flex-1 bg-neutral-50 border rounded-[8px] pt-4 pr-3 pb-3 pl-4"
      :class="{ 'cursor-pointer': item.icon }" @click="handleDownload(item.icon)">
      <h5 class="text-[20px] leading-[24px]">{{ item.title }}</h5>
      <p class="text-[13px] leading-[16px] opacity-35">{{ item.version }}</p>
      <div class="mt-[57px]">
        <div class="flex justify-end" v-if="item.icon">
          <figure class="image border p-[11px] rounded-full " :class="currentOS == item.icon ? 'bg-primary' : 'bg-[#EEE]'">
            <Mac v-if="item.icon == 'mac'" :style="{ fill: currentOS == item.icon ? '#fff' : '#3c3c3c' }" />
            <Win v-if="item.icon == 'win'" :style="{ fill: currentOS == item.icon ? '#fff' : '#3c3c3c' }" />
          </figure>
        </div>
        <div class="whitespace-nowrap" v-else>
          <a class="text-[15px] leading-[40px]">
            <span>Provide ideas</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Mac from "../assets/images/mac.svg";
import Win from "../assets/images/win.svg";
import { event } from "vue-gtag";
const cards = [
  {
    title: 'macOS',
    version: 'V 0.1.7 2024.4.1',
    icon: 'mac',
  },
  {
    title: 'Windows',
    version: 'V 0.1.7 2024.4.1',
    icon: 'win',
  },
  {
    title: 'Mobile',
    version: 'Coming soon!',
    link_text: 'Provide ideas',
    link_url: 'https://github.com/',
  }
]

const currentOS = ref('');
onMounted(() => {
  currentOS.value = getOS();
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
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/Zima-latest-x64.dmg";
const mac_arm_link =
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/Zima-latest-arm64.dmg";
const win_link =
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/squirrel.windows/x64/Zima-latest%20Setup.exe";

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