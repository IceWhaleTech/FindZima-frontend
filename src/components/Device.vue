<template>
  <div class="flex  justify-between h-[152px] md:h-[167px] border rounded-lg bg-neutral-50 px-5 py-4 "
    >
    <div class="left h-full flex-1 flex flex-col justify-between">
      <template v-if="loading">
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">{{ $t('device.search') }}</h3>
        <IPTag />
      </template>
      <template v-else-if="device">
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">{{ device.device_name }}</h3>
        <IPTag class="ml-[-4px] mb-[-4px]" :ip="device && device.lan_ipv4[0] + port" :initUrl="initUrl"/>
      </template>
      <template v-else>
        <h3 class="text-[20px] leading-6 md:text-[30px] md:leading-8">{{ $t('device.oops') }} <br />{{ $t('device.no-device') }}</h3>
        <p class="description leading-5 text-fontLow" v-html="$t('device.no-device-tip')"></p>
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
  const deviceArray = ["ZimaBoard", "ZimaBlade" , "ZimaCube","ZimaCube Pro"];
  const url = deviceArray.indexOf(name) > -1 ? name : "ZimaCube";
  return new URL(`../assets/images/${url}.svg`, import.meta.url).href;
};



</script>
<style scoped>
:deep(.description b) {
  color: #1a1a1a;
}
</style>