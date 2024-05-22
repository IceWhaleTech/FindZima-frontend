<template>
    <div class="flex items-center cursor-pointer">
        <div class="p-3 rounded-full " :class="ip&&ip.length?'bg-primary':'bg-[#EBF3FF]'">
            <Link :style="{fill:ip&&ip.length?'#fff':'rgba(26, 26, 26, 0.35)'}"/>
        </div>
        <div v-if="ip&&ip.length" class="bg-white border rounded-md px-2 leading-[38px] ml-2 cursor-pointer hover:bg-[#EEE]" title="Copy IP address">
            <template v-for="(item,index) in ip.split('.')">
                <span>{{ item }}</span>
                <i v-if="index<3" class="text-[grey]">·</i>
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