<script lang="ts" setup>
import { ref , computed , onMounted} from "vue"
const mounted = ref(false);
const cookiesConsent = ref("");

const showCookieTip = computed(() => {
  return mounted.value && cookiesConsent.value === "";
});

const acceptCookies = () => {
  localStorage.setItem("cookiesConsent", "accepted");
  cookiesConsent.value = "accepted";
};
const rejectCookies = () => {
  localStorage.setItem("cookiesConsent", "rejected");
  cookiesConsent.value = "rejected";
};

onMounted(() => {
  mounted.value = true;
  cookiesConsent.value = localStorage.getItem("cookiesConsent") ?? "";
});
</script>

<template>
  <div
    v-if="showCookieTip"
    :class="[
      'fixed bottom-0 left-0 z-50 w-screen bg-[#555]/50 px-10 py-4 text-white backdrop-blur-2xl',
      'flex flex-col items-center justify-between gap-4 sm:flex-row',
      showCookieTip ? 'flex' : 'hidden',
    ]"
  >
    <p>
      {{$t('common.cookie-tip')}}
    </p>
    <div class="flex flex-row gap-4">
      <button
        class="bg-primary whitespace-nowrap px-4 py-2 text-[#FFF] rounded-[8px] hover:brightness-105 active:brightness-90"
        @click="acceptCookies"
      >
        {{$t('common.accept')}}
      </button>
      <button
        class="bg-[#404040] whitespace-nowrap px-4 py-2 text-white rounded-[8px] hover:brightness-105 active:brightness-90"
        @click="rejectCookies"
      >
      {{$t('common.reject')}}
      </button>
    </div>
  </div>
</template>

<style></style>
