<template>
    <div class="flex items-center cursor-pointer" title="Copy IP address">
        <div class="p-3 rounded-full " :class="ip&&ip.length?'bg-primary':'bg-[#EBF3FF]'">
            <Link :style="{fill:ip&&ip.length?'#fff':'rgba(26, 26, 26, 0.35)'}"/>
        </div>
        <div v-if="ip&&ip.length" class="bg-white border rounded-md px-2 leading-[38px] ml-2 cursor-pointer hover:bg-[#EEE]" >
            <template v-for="(item,index) in ip.split('.')">
                <span>{{ item }}</span>
                <i v-if="index<3" class="opacity-35 mr-[2px]">·</i>
            </template>
        </div>
    </div>
</template>
<script setup>
import Link from '../assets/images/link.svg'
const props = defineProps({
    ip:''
})
</script>