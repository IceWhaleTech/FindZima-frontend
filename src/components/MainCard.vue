<template>
    <div class="bg-white border rounded-[14px] py-[64px] px-[80px]">
        <h3 class="text-[34px]">{{ title }}</h3>
        <i>{{ index }}</i>
        <p>{{ description }}</p>
        <slot></slot>
    </div>
</template>
<script setup>
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