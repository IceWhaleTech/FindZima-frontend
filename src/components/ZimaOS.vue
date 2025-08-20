<template>
  <div class="flex flex-col gap-6 md:gap-0 md:flex-row justify-between border rounded-[30px] p-8 bg-white items-center">
    <img class="w-[80px] h-[80px] md:w-[120px] md:h-[120px] block md:hidden" src="../assets/images/logo.png" alt="">
    <div class="flex flex-col gap-6 md:gap-10">
      <div class="text-[24px] leading-[32px] md:text-[36px] md:leading-[40px] text-center md:text-left">
        <h2>ZimaOS</h2>
        <p>{{ $t('common.next-generation') }}</p>
      </div>  
      <div class="flex gap-3 justify-center md:justify-start flex-wrap">
        <NButton type="primary">
          <a :href="link &&link.url || 'https://github.com/IceWhaleTech/ZimaOS/releases/download/1.4.3/zimaos_zimacube-1.4.3_installer.img'" target="_blank">{{ $t('common.download-latest') }}</a>
        </NButton>
        <!-- <NButton secondary>{{ $t('common.how-to-install') }}</NButton> -->
      </div>
    </div>
    <img class="w-[80px] h-[80px] md:w-[120px] md:h-[120px] hidden md:block" src="../assets/images/logo.png" alt="">
  </div>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'
import { onMounted } from 'vue'
import request from '../utils/api'
import { ref } from 'vue'
const link = ref<any>(null)
onMounted(() => {
  request.get('/download/data').then(res => {
    link.value = res.data.find(item => item.code === 'zimaos')
  })
})
</script>