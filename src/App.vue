<template>
  <div class="wrapper">
    <h3 class="text-[34px] px-[80px] mb-[40px]">Start using your Zima devices</h3>
    <div class="flex flex-row gap-[4px] ">
      <MainCard  class="flex-1" v-for="item in cardArry" :title="item.title" :index="item.index" :description="item.description" >
      <div>这里是个插槽</div>
      </MainCard>
    </div>
    <div class="flex px-[80px] bg-[#292929] justify-between rounded-[14px] py-[20px] text-white mt-[4px]">
      <h4 class="text-[20px] leading-[24px]">Explore Zima</h4>
      <p>Visit <a>ZimaSpace</a>  to explore the next generation of digital asset management.</p>
    </div>
    <div class="text-center text-[12px] mt-[24px] opacity-80 ">© 2020-2024 IceWhale Technology Limited. All rights reserved.</div>
  </div>
</template>
<script setup>
import MainCard from './components/MainCard.vue'
const cardArry = [
  {
    title:'Download and install ZimaClient',
    index:1,
    description: 'Download and install the ZimaClient client. After launching the client, click on "Scan and connect to Zima". The system will automatically scan and start the initialization process for the new device.'
  },
  {
    title:'Scan and connect to Devices',
    index:2,
    description: 'If you are initializing from a mobile device or unable to download and install the ZimaClient client, please proceed with the initialization process by clicking the button below.'
  }
]
</script>