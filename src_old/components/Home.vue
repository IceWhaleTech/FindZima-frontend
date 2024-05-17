<script setup>
import CommonHeader from "./CommonHeader.vue";
import CommonFooter from "./CommonFooter.vue";
import { event } from "vue-gtag";
const emit = defineEmits(["gotoSlide"]);

const mac_intel_link =
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/Zima-latest-x64.dmg";
const mac_arm_link =
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/Zima-latest-arm64.dmg";
const win_link =
  "https://zimaos.oss-accelerate.aliyuncs.com/client/releases/latest/squirrel.windows/x64/Zima-latest%20Setup.exe";

const goto = () => {
  event("goto", {
    event_category: "goto",
    event_label: "quick-scan",
  });
  emit("gotoSlide", 1);
};

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

<template>
  <div class="container">
    <!-- Header Start -->
    <common-header>{{ $t('home.title') }}</common-header>
    <!-- Header Stop -->
    <div class="container">
      <div class="main-contents">
        <div class="columns is-variable is-2">
          <div class="column">
            <div class="main-card common-card card1">
              <div class="is-flex">
                <div class="is-flex-shrink-0 mr-5">
                  <figure class="image">
                    <img src="../assets/images/mac.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1">
                  <h2 class="title is-3 mb-2">{{ $t('home.mac-client.title') }}</h2>
                  <p class="desc mb-5">
                    {{ $t('home.mac-client.desc') }}
                  </p>
                  <button class="button" @click="downloadMac">{{ $t('home.mac-client.button') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="main-card common-card card2">
              <div class="is-flex">
                <div class="is-flex-shrink-0 mr-5">
                  <figure class="image">
                    <img src="../assets/images/win.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1">
                  <h2 class="title is-3 mb-2">{{ $t('home.win-client.title') }}</h2>
                  <p class="desc mb-5">
                    {{ $t('home.win-client.desc') }}
                  </p>
                  <button class="button" @click="downloadWin">{{ $t('home.win-client.button') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Start -->
    <common-footer>
      <div class="bottom-button" @click="goto">{{ $t('home.footer.title') }}</div>
    </common-footer>
    <!-- Footer End -->
  </div>
</template>

<style lang="scss" scoped></style>
