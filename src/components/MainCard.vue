<template>
  <div class="bg-white border rounded-[14px] pt-10 pb-4 px-6 overflow-hidden md:px-20 md:pt-[64px] md:pb-[56px]">
    <div class="flex">
      <h3 class="text-[30px] leading-[32px] md:text-[34px] flex-1">{{ title }}</h3>
      <figure class="image hidden lg:block">
        <Icon1 class="h-[120px]" v-if="index == 1" />
        <Icon2 class="h-[120px]" v-if="index == 2" />
      </figure>
    </div>
    <div class="flex justify-start pt-[36px] pb-[30px]  lg:pt-[56px] lg:justify-end ">
      <p class="description  leading-[19px] text-fontLow  md:w-[317px] md:h-[130px]" v-html="description"></p>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import Icon1 from '../assets/images/1.svg'
import Icon2 from '../assets/images/2.svg'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

</script>
<style scoped>
:deep(.description b) {
  color: #1a1a1a;
}
</style>