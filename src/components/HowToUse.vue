<template>
  <NButton class="white" @click="open">{{ t('common.how-to-use') }} {{ t('common.zimaclient') }}</NButton>
  <NModal v-model:show="show" preset="card" class="w-[800px] rounded-[30px] border p-5" >
    <template #header>
      <h2 class=" text-[24px] md:text-[36px] leading-[32px] md:leading-[40px]">{{ t('common.how-to-use') }} {{ t('common.zimaclient') }}</h2>
    </template>
    <div class="w-full overflow-hidden">
      <div v-if="currentType === 'text'" class="text-base text-fontLow">
        <p class="*-[b]:text-black" v-html="t('client.desc')"></p>
        <p class="mt-[20px]">
            {{t("client.tip-start")}} 
            <a @click="currentType = 'scan'">{{t("client.tip-button")}}</a> {{t("client.tip-end")}}
          </p>
      </div>
      <div v-if="show" v-show="currentType === 'scan'" class="w-[70vw] md:w-full max-w-[710px] overflow-hidden">
        <DeviceWrapper />
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NButton, NModal } from 'naive-ui';
import { ref } from 'vue';
import DeviceWrapper from './DeviceWrapper.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const show = ref(false)
const currentType = ref<'text' | 'scan'>('text')

const open = () => {
  show.value = true
  currentType.value = 'text'
}
</script>