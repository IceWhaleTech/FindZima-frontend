<script setup>
import { ref, computed } from "vue";
import { Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { event, pageview } from "vue-gtag";
import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();
import "swiper/css";
import "swiper/css/mousewheel";

import Home from "./components/Home.vue";
import FindZima from "./components/FindZima.vue";
import Help from "./components/Help.vue";
import CookieTip from "./components/CookieTip.vue";

const swiperRef = ref(null);
const zimaRef = ref(null);
const modules = ref([Mousewheel, Keyboard]);
const activeKeyboard = ref(false);

const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};


const onSlideChange = (swiper) => {
  if (swiper.activeIndex == 1) {
    activeKeyboard.value = true;
    zimaRef.value.init();
  } else {
    activeKeyboard.value = false;
    zimaRef.value.reset();
  }

  switch (swiper.activeIndex) {
    case 0:
      pageview("/home");
      break;
    case 1:
      pageview("/search");
      break;
    case 2:
      pageview("/help");
      break;
    default:
      break;
  }
};

const gotoSlide = (index) => {
  swiperRef.value.slideTo(index);
};
</script>

<template>
  <swiper
    :slides-per-view="1"
    :direction="'vertical'"
    :mousewheel="{
      thresholdDelta: 20,
    }"
    :allow-touch-move="width < 1024"
    keyboard
    :modules="modules"
    @init="onSwiper"
    @slideChangeTransitionEnd="onSlideChange"
  >
    <swiper-slide>
      <home @gotoSlide="gotoSlide" />
    </swiper-slide>
    <swiper-slide>
      <find-zima
        ref="zimaRef"
        :active="activeKeyboard"
        @gotoSlide="gotoSlide"
      />
    </swiper-slide>
    <swiper-slide>
      <help />
    </swiper-slide>
  </swiper>
  <cookie-tip />
</template>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  .swiper-slide {
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
