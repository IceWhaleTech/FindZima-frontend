<template>
  <div
  :class="[
      'fixed z-20 w-full bg-white backdrop-blur transition-[top] duration-300 py-4 shadow-sm',
      showHeader ? 'top-16' : 'top-0',
    ]"
  >
    <div class="gpx max-w-screen-xl mx-auto flex justify-between items-center">
      <h3 class="text-base">{{ $t('common.download-center') }}</h3>
      <div class="flex gap-2">
        <!-- <NButton secondary>
          <a href="https://casaos.zimaspace.com/" target="_blank" class="text-inherit hover:underline-none">
            {{ $t('common.explore-casaos') }}
          </a>
        </NButton> -->
        <NButton secondary>
          <a href="https://github.com/IceWhaleTech/ZimaOS" target="_blank" class="text-inherit underline-none">
            {{ $t('common.github') }}
          </a>
        </NButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NButton } from 'naive-ui';
import { ref, onMounted } from 'vue';
const showHeader = ref(true);

onMounted(() => {
  const prevScrollY = ref(0);
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 64) {
      showHeader.value = true;
      return;
    }
    if (currentScroll > prevScrollY.value) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
    prevScrollY.value = currentScroll;
  });
});
</script>