<script setup>
import { computed, resolveDirective } from "vue";
import copy from "copy-to-clipboard";
import { event } from "vue-gtag";
import { createToaster } from "@meforma/vue-toaster";
import { useI18n } from 'vue-i18n'

const { t } = useI18n() 

const toaster = createToaster({ position: "bottom" });

const props = defineProps({
  device: Object,
});

const port = computed(() => {
  return props.device.port === 80 ? "" : ":" + props.device.port;
});

const initUrl = computed(() => {
  return props.device.port === 80
    ? "http://" + props.device.lan_ipv4[0]
    : "http://" + props.device.lan_ipv4[0] + ":" + props.device.port;
});

const getAssetsFile = (name) => {
  const deviceArray = ["ZimaBoard", "ZimaCube", "ZimaBlade"];
  const url = deviceArray.indexOf(name) > -1 ? name : "ZimaBoard";
  return new URL(`../assets/images/${url}.svg`, import.meta.url).href;
};

const deviceIcon = computed(() => {
  const deviceIcon = new URL(
    "../assets/images/" + props.device.device_model + ".svg",
    import.meta.url
  ).href;
  const defaultIcon = new URL("../assets/images/ZimaBox.svg", import.meta.url)
    .href;
  return props.device.device_model != "" ? deviceIcon : defaultIcon;
});

const goto = () => {
  event("access", {
    event_category: "access",
    event_label: "access",
  });
  window.open(initUrl.value, "_blank");
};

const copyTo = () => {
  event("copy", {
    event_category: "copy",
    event_label: "copy-clipboard",
  });
  copy(initUrl.value, {
    debug: true,
    message: "Press #{key} to copy",
  });

  toaster.show(t('common.toast.copied'));
};
</script>
<template>
  <div class="main-card common-card card1 device-card">
    <div class="is-flex">
      <div class="is-flex-shrink-0 mr-5">
        <figure class="image">
          <img :src="getAssetsFile(device.device_model)" />
        </figure>
      </div>
      <div class="is-flex-grow-1 is-flex is-align-items-center">
        <div style="width: 100%">
          <h2 class="title is-3 mb-2">{{ device.device_name }}</h2>
          <div class="desc mb-5 is-flex is-align-items-center">
            {{ $t('search.device-card.ip') }} <br class="only-mobile" />{{
              device.lan_ipv4[0] + port
            }}
            <figure class="image is-18x18 ml-2 is-clickable" @click="copyTo">
              <img src="../assets/images/copy.svg" />
            </figure>
          </div>
          <button class="button" @click="goto">{{ $t('search.device-card.button') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
