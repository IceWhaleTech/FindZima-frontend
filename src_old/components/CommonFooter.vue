<script setup>
import { computed } from "vue";
const props = defineProps({
  lineStyle: {
    type: String,
    default: "border",
  },
});

const buttonContainerWidth = computed(() => {
  return props.lineStyle === "border2"
    ? { width: "280px" }
    : { width: "200px" };
});

const footerClass = computed(() => {
  return props.lineStyle === "border2" ? "" : "action-footer";
});
</script>

<template>
  <footer :class="footerClass">
    <div class="is-flex is-align-items-center">
      <div class="is-flex-grow-1" :class="lineStyle"></div>
      <div class="button-container" :style="buttonContainerWidth">
        <slot></slot>
      </div>
      <div class="is-flex-grow-1 right" :class="lineStyle"></div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: 100px;
  .border {
    height: 48px;
    background: url(../assets/images/footer-line.png) no-repeat bottom;
    background-size: 100% 48px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: all 0.2s ease-in-out;
    &.right {
      transform: scaleX(-1);
    }
  }

  .border2 {
    height: 2px;
    background: url(../assets/images/footer-line2.png) no-repeat bottom;
    background-size: 100% 2px;

    &.right {
      transform: scaleX(-1);
    }
  }

  .button-container {
    position: relative;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 1024px) and (max-width: 1439px) {
  footer {
    margin-top: 60px;
  }
}

@media (max-width: 1023px) {
  // Your styles here
  footer {
    margin-top: 48px;
  }
}
</style>
