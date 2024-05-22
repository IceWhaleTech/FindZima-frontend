<template>
  <div class="flex  justify-between h-[152px] md:h-[167px] border rounded-lg bg-neutral-50 px-5 py-4 "
    :class="{ 'cursor-pointer': device }" @click="goto()">
    <div class="left h-full flex-1 flex flex-col justify-between">
      <template v-if="loading">
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">Searching on local network...</h3>
        <IPTag />
      </template>
      <template v-else-if="device">
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">{{ device.device_name }}</h3>
        <IPTag class="ml-[-4px] mb-[-4px]" :ip="device && device.lan_ipv4[0] + port" @click.stop="copyTo" />
      </template>
      <template v-else>
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">Oops! <br />No devices...</h3>
        <p class="leading-5 text-fontLow">Please make sure your Zima device and your equipment are <b
            class="text-base">on the same network</b> .</p>
      </template>
    </div>
    <div class="right w-4/12 h-full" v-if="device || loading">
      <figure class="image" v-if="device">
        <img :src="getAssetsFile(device.device_model || device.device_name)" />
      </figure>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import Loading from "./Loading.vue";
import IPTag from "./IPTag.vue";
// import copy from "copy-to-clipboard";
import { event } from "vue-gtag";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "bottom" });
const props = defineProps({
  device: Object,
  loading: Boolean,
});

const port = computed(() => {
  return props.device.port === 80 ? "" : ":" + props.device.port;
});

const initUrl = computed(() => {
  if (props.device) {
    return props.device.port === 80
      ? "http://" + props.device.lan_ipv4[0]
      : "http://" + props.device.lan_ipv4[0] + ":" + props.device.port;
  } else {
    return null
  }
});

const getAssetsFile = (name) => {
  const deviceArray = ["ZimaBoard", "ZimaCube", "ZimaBlade"];
  const url = deviceArray.indexOf(name) > -1 ? name : "ZimaBoard";
  return new URL(`../assets/images/${url}.svg`, import.meta.url).href;
};

const goto = () => {
  if (!initUrl.value) return
  event("access", {
    event_category: "access",
    event_label: "access",
  });
  window.open(initUrl.value, "_blank");
};

const copyTo = () => {
  window.navigator.clipboard.writeText(initUrl.value);
  //   event("copy", {
  //     event_category: "copy",
  //     event_label: "copy-clipboard",
  //   });
  //   copy(initUrl.value, {
  //     debug: true,
  //     message: "Press #{key} to copy",
  //   });
  toaster.show('Copied');
};
</script>