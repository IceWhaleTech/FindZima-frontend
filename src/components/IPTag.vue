<template>
    <div class="flex items-center" >
        <div class="p-3 rounded-full cursor-pointer" :class="ip&&ip.length?'bg-primary':'bg-[#EBF3FF]'" @click="goto()">
            <Link :style="{fill:ip&&ip.length?'#fff':'rgba(26, 26, 26, 0.35)'}"/>
        </div>
        <div v-if="ip&&ip.length" class="bg-white border rounded-md px-2 leading-[38px] ml-2 cursor-pointer hover:bg-[#EEE]" :title="$t('device.to-copy')" @click="copyTo()">
            <template v-for="(item,index) in ip.split('.')">
                <span>{{ item }}</span>
                <i v-if="index<3" class="opacity-35 mr-[2px]">·</i>
            </template>
        </div>
    </div>
</template>
<script setup>
import copy from "copy-to-clipboard";
import { event } from "vue-gtag";
import Link from '../assets/images/link.svg'
import { createToaster } from "@meforma/vue-toaster";
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 
const toaster = createToaster({ position: "bottom" });
const props = defineProps({
    ip:'',
    initUrl:""
})


const goto = () => {
  if (!props.initUrl) return
  event("access", {
    event_category: "access",
    event_label: "access",
  });
  window.open(props.initUrl, "_blank");
};


const copyTo = () => {
  event("copy", {
    event_category: "copy",
    event_label: "copy-clipboard",
  });
  copy(props.initUrl, {
    debug: true,
    message: "Press #{key} to copy",
  });
  toaster.show(t('common.toast.copied'));
};
</script>