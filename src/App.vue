<template>
  <NavHeader />
  <div class="wrapper pt-16">
    <h3 class="text-[30px] leading-[32px] px-[24px] mb-[20px] md:text-[34px] md:px-[80px] md:mb-[40px]">Start using your
      Zima devices</h3>
    <div class="flex flex-row gap-[4px] ">
      <MainCard class="flex-1 border lg:block" :class="{ hidden: item.index == 1 }" v-for="item in cardArry"
        :title="item.title" :index="item.index" :description="item.description">
        <component :is="item.compo" />
      </MainCard>
    </div>
    <Mobile class="block mt-1 lg:hidden" />
    <Help class="px-[24px] mt-[4px] py-6 rounded-[14px] border md:px-[80px] md:pt-[39px] md:pb-[35px]" />
    <div
      class="flex flex-col px-[24px] bg-[#292929] justify-between border rounded-[14px] py-6 text-white mt-[4px] gap-4 lg:flex-row lg:py-5 md:px-[80px]">
      <h4 class="text-[30px] leading-[32px] whitespace-nowrap lg:text-[20px] lg:leading-[24px]">Explore Zima</h4>
      <p>Visit <a href="https://www.zimaspace.com/" target="_blank">ZimaSpace</a> to explore the next generation of
        digital asset management.</p>
    </div>
    <div class="text-center text-[12px] mt-[24px] opacity-80 ">© 2020-2024 IceWhale Technology Limited. All rights
      reserved.</div>
  </div>
</template>
<script setup>
import NavHeader from './components/NavHeader.vue'
import MainCard from './components/MainCard.vue'
import Clients from './components/Clients.vue'
import DeviceWrapper from './components/DeviceWrapper.vue'
import Help from './components/Help.vue'
import Mobile from './components/Mobile.vue'

const cardArry = [
  {
    title: 'Download and install ZimaClient',
    index: 1,
    compo: Clients,
    description: 'Download and install the ZimaClient client. After launching the client, click on "<b>Scan and connect to Zima</b>". The system will automatically scan and start the initialization process for the new device.'
  },
  {
    title: 'Scan and connect to Devices',
    index: 2,
    compo: DeviceWrapper,
    description: 'If you are initializing from a mobile device or unable to download and install the ZimaClient client, please proceed with the initialization process by clicking the button below.'
  }
]
</script>