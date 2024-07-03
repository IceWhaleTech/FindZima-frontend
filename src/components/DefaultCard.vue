<template>
  <div class="flex justify-between bg-white border gap-6 md:gap-24 rounded-[14px] px-20 pt-[64px] pb-[56px]">
    <div class="flex-1 flex flex-col gap-12">
      <h3 class="text-[30px] leading-[32px] md:text-[34px]">{{ $t("common.title") }}</h3>
      <h4 class="text-[24px] leading-[28px]">{{ t('client.title') }}</h4>
      <div>
        <p class="description  leading-[19px] text-fontLow  max-w-[400px] " v-html="$t('client.desc')"></p>
        <p class="description  leading-[19px] text-fontLow  max-w-[400px] mt-[20px]">
          {{$t("client.tip-start")}} 
          <a @click="handleClick">{{$t("client.tip-button")}}</a> {{$t("client.tip-end")}}
        </p>
      </div>
    </div>
    <div class="flex-1">
      <Clients />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import Clients from './Clients.vue'

const { t } = useI18n()
const props = defineProps({
  scanShow: Boolean,
})
const emits = defineEmits('update:scanShow')

const handleClick = ()=>{
  console.log('click')
  emits('update:scanShow',true)
}

</script>
<style scoped>
:deep(.description b) {
  color: #1a1a1a;
}
</style>