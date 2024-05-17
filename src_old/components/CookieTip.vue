<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

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
    v-if="showCookieTip" class="cookie-tip"
    
  >
    <p>
      {{ $t("cookie-tip.text") }}
    </p>
    <div class="button-container">
      <button
        class="button is-disabled"
        @click="acceptCookies"
      >
        {{ $t("cookie-tip.button1") }}
      </button>
      <button
        class="button is-disabled"
        @click="rejectCookies"
      >
      {{ $t("cookie-tip.button2") }}
      </button>
    </div>
  </div>
</template>

<style></style>
